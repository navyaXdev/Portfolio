// ── CURSOR TRAIL ──
(function() {
  const trail = document.getElementById('cur-trail');
  const ring  = document.getElementById('cur-ring');
  if (!trail || !ring) return;

  let mx = -200, my = -200, tx = -200, ty = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    trail.style.left = mx + 'px';
    trail.style.top  = my + 'px';
  });

  (function lerp() {
    tx += (mx - tx) * 0.18;
    ty += (my - ty) * 0.18;
    ring.style.left = tx + 'px';
    ring.style.top  = ty + 'px';
    requestAnimationFrame(lerp);
  })();

  document.querySelectorAll('a,button,.btn,.skill-card,.repo-card,.tool-tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '44px';
      ring.style.height = '44px';
      ring.style.borderColor = 'rgba(0,245,160,0.9)';
      trail.style.transform = 'translate(-50%,-50%) scale(1.8)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '28px';
      ring.style.height = '28px';
      ring.style.borderColor = 'rgba(0,245,160,0.55)';
      trail.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });

  document.addEventListener('mousedown', () => {
    ring.style.width  = '16px';
    ring.style.height = '16px';
    ring.style.borderColor = '#fff';
  });
  document.addEventListener('mouseup', () => {
    ring.style.width  = '28px';
    ring.style.height = '28px';
    ring.style.borderColor = 'rgba(0,245,160,0.55)';
  });
})();

// ── MATRIX RAIN ──
(function() {
  const canvas = document.getElementById('matrix-bg');
  const ctx = canvas.getContext('2d');
  let cols, drops;
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01アイウ01ABCDEF0123456789';

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / 18);
    drops = Array.from({length: cols}, () => Math.random() * -canvas.height / 18);
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(6,10,15,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00f5a0';
    ctx.font = '13px Share Tech Mono, monospace';
    for (let i = 0; i < cols; i++) {
      const c = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(c, i * 18, drops[i] * 18);
      if (drops[i] * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(draw, 50);
})();

// ── TERMINAL TYPEWRITER ──
(function() {
  const lines = [
    { type: 'prompt', text: 'whoami' },
    { type: 'output', text: 'dinesh_patra', cls: 'ok' },
    { type: 'prompt', text: 'nmap -sV 192.168.1.1' },
    { type: 'output', text: 'PORT   STATE SERVICE', cls: '' },
    { type: 'output', text: '22/tcp open  ssh', cls: 'hi' },
    { type: 'output', text: '80/tcp open  http', cls: 'hi' },
    { type: 'prompt', text: 'airmon-ng start wlan0' },
    { type: 'output', text: '[+] monitor mode: wlan0mon', cls: 'ok' },
    { type: 'cursor' }
  ];
  const body = document.getElementById('terminal-body');
  let i = 0;
  function next() {
    if (i >= lines.length) return;
    const l = lines[i++];
    const el = document.createElement('span');
    el.classList.add('term-line');
    if (l.type === 'prompt') {
      el.innerHTML = `<span class="prompt">dinesh@kali:~$ </span><span class="cmd">${l.text}</span>`;
    } else if (l.type === 'cursor') {
      el.innerHTML = `<span class="prompt">dinesh@kali:~$ </span><span class="cursor"></span>`;
    } else {
      el.innerHTML = `<span class="output ${l.cls || ''}">${l.text}</span>`;
    }
    body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(next, l.type === 'prompt' ? 700 : 300);
  }
  setTimeout(next, 1200);
})();

// ── SKILLS CARD STAGGER REVEAL ──
(function() {
  const cards = document.querySelectorAll('.skill-card');
  const skillsIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const idx  = Array.from(cards).indexOf(card);
        setTimeout(() => {
          card.classList.add('card-visible');
          // animate skill bar after card appears
          const fill = card.querySelector('.skill-fill');
          if (fill) fill.style.width = fill.dataset.w + '%';
        }, idx * 100); // 100ms stagger per card
        skillsIo.unobserve(card);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach(c => skillsIo.observe(c));
})();

// ── GENERAL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ── COUNT-UP ──
function countUp(el, target, dur) {
  let start = 0, step = target / (dur / 16);
  const tick = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.round(start) + (target > 10 ? '+' : '');
    if (start < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const statIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(el => {
        countUp(el, +el.dataset.count, 1000);
      });
      statIo.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.stat-row').forEach(el => statIo.observe(el));

// ── GITHUB REPOS ──
(function() {
  const GITHUB_USERNAME = 'navyaXdev';
  const grid   = document.getElementById('repos-grid');
  const status = document.getElementById('repos-status');

  const langColors = {
    Python:'#3572A5', JavaScript:'#f1e05a', C:'#555555',
    HTML:'#e34c26', CSS:'#563d7c', Shell:'#89e051',
    'C++':'#f34b7d', Java:'#b07219', TypeScript:'#2b7489',
    Go:'#00ADD8', Rust:'#dea584', Ruby:'#701516'
  };

  function timeAgo(d) {
    const diff = Date.now() - new Date(d);
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'today';
    if (days === 1) return '1 day ago';
    if (days < 30) return days + ' days ago';
    const m = Math.floor(days / 30);
    if (m < 12) return m + ' month' + (m > 1 ? 's' : '') + ' ago';
    const y = Math.floor(m / 12);
    return y + ' year' + (y > 1 ? 's' : '') + ' ago';
  }

  function renderRepos(repos) {
    status.style.display = 'none';
    if (!repos.length) {
      status.style.display = '';
      status.innerHTML = '<span style="color:var(--muted);font-family:var(--mono);font-size:0.82rem;">// no public repositories found</span>';
      return;
    }
    repos.forEach((repo, idx) => {
      const card = document.createElement('div');
      card.className = 'repo-card reveal';
      const lang = repo.language || '';
      const dot  = lang ? `<span class="repo-lang-dot" style="background:${langColors[lang]||'#888'}"></span><span class="repo-lang">${lang}</span>` : '';
      card.innerHTML = `
        <div class="repo-top">
          <a class="repo-name" href="${repo.html_url}" target="_blank" rel="noopener">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="vertical-align:-2px;margin-right:6px;opacity:0.5"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8A1 1 0 004 13.25v.25a1 1 0 001 1h7.25a.75.75 0 000-1.5H5.5a.25.25 0 01-.25-.25v-.5a2.5 2.5 0 01-3.25-2.4V2.5z" fill="currentColor"/></svg>
            ${repo.name}
          </a>
          ${repo.fork ? '<span class="repo-badge">fork</span>' : ''}
          ${repo.archived ? '<span class="repo-badge archived">archived</span>' : ''}
        </div>
        <p class="repo-desc">${repo.description || '<em style="opacity:0.4">no description</em>'}</p>
        <div class="repo-meta">
          ${dot}
          <span class="repo-stat">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style="vertical-align:-2px;margin-right:3px;opacity:0.6"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.873 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" fill="currentColor"/></svg>
            ${repo.stargazers_count}
          </span>
          <span class="repo-stat">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style="vertical-align:-2px;margin-right:3px;opacity:0.6"><path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" fill="currentColor"/></svg>
            ${repo.forks_count}
          </span>
          <span class="repo-updated">${timeAgo(repo.updated_at)}</span>
        </div>`;
      grid.appendChild(card);
      setTimeout(() => card.classList.add('visible'), idx * 70);
    });
  }

  fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(data => renderRepos(data))
    .catch(err => {
      status.innerHTML = `<span style="color:var(--red);font-family:var(--mono);font-size:0.82rem;">// error fetching repos: ${err}</span>`;
    });
})();

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseSize: number;
  currentSize: number;
  baseColor: [number, number, number];
  currentColor: [number, number, number];
  opacity: number;
  phase: number;
  // Threat & Protection Simulation
  state: 'normal' | 'turning_red' | 'warning' | 'scanning' | 'protecting' | 'recovering';
  stateTime: number;
  threatDuration: number;
  connectedCount: number;
}

interface DataPacket {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: [number, number, number];
  active: boolean;
}

export const Floating3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Accessibility: Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // --- Scene, Perspective Camera & WebGL Renderer ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Pure transparent WebGL canvas
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // --- Responsive Particle Density & Minimal Connectivity ---
    // Balanced count: covers extreme left to extreme right without visual clutter
    const getParticleCount = () => {
      const w = window.innerWidth;
      if (w < 640) return 45; // Mobile: Lightweight, battery-efficient, clean
      if (w < 1024) return 85; // Tablet
      return 135; // Desktop: Elegant, airy, uncluttered
    };

    const particleCount = getParticleCount();
    const connectionRadius = 3.8; // Reduced connection radius to eliminate long screen-crossing lines
    const maxConnectionsPerParticle = 3; // Maximum 3 connections per node keeps the network delicate and minimal
    const maxLines = particleCount * maxConnectionsPerParticle;

    // 3D Spatial Boundaries
    const boundsX = 18.0;
    const boundsY = 11.0;
    const boundsZ = 6.0;

    // Palette Definitions
    // Dark Theme: Subtle Emerald (#00F5A0), Cyan Specular (#06B6D4), Alert Red (#FF2A2A), Scanning Amber (#F59E0B)
    // Light Theme: Deep Jewel Emerald (#008F68), Accent Teal (#087F8C), Alert Crimson (#DC2626), Scanning Amber (#D97706)
    const emeraldRGB: [number, number, number] = isLight
      ? [0.0, 0.56, 0.41]
      : [0.0, 0.96, 0.63];

    const cyanRGB: [number, number, number] = isLight
      ? [0.03, 0.50, 0.55]
      : [0.02, 0.75, 0.88];

    const warningRedRGB: [number, number, number] = isLight
      ? [0.86, 0.15, 0.15]
      : [1.0, 0.16, 0.16];

    const goldScanRGB: [number, number, number] = isLight
      ? [0.85, 0.47, 0.04]
      : [0.98, 0.72, 0.15];

    // --- Initialize Particles with Slow, Serene Ambient Velocity ---
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const isCyan = Math.random() < 0.14;
      const baseCol = isCyan ? cyanRGB : emeraldRGB;
      particles.push({
        x: (Math.random() - 0.5) * boundsX * 2,
        y: (Math.random() - 0.5) * boundsY * 2,
        z: (Math.random() - 0.5) * boundsZ * 2,
        // Reduced velocity (65% slower) for calm, intelligent, continuous drifting
        vx: (Math.random() - 0.5) * 0.0035,
        vy: (Math.random() - 0.5) * 0.0028,
        vz: (Math.random() - 0.5) * 0.002,
        baseSize: isLight ? 2.4 + Math.random() * 0.9 : 1.8 + Math.random() * 1.1,
        currentSize: isLight ? 2.6 : 2.0,
        baseColor: [...baseCol],
        currentColor: [...baseCol],
        opacity: isLight ? 0.95 : 0.88,
        phase: Math.random() * Math.PI * 2,
        state: 'normal',
        stateTime: 0,
        threatDuration: 3.2 + Math.random() * 1.0, // Deliberate, clearly observable threat duration
        connectedCount: 0,
      });
    }

    // Threat cycle timers: exactly 1 threat active at a time, cycling between visible flanks
    let threatTimer = 1.2; // Starts first threat 1.2s after mount
    let threatSideLeft = true;

    // --- Particle Points Geometry & Custom Shader ---
    const pointPositions = new Float32Array(particleCount * 3);
    const pointColors = new Float32Array(particleCount * 4); // RGBA
    const pointSizes = new Float32Array(particleCount);

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    pointGeo.setAttribute('color', new THREE.BufferAttribute(pointColors, 4));
    pointGeo.setAttribute('size', new THREE.BufferAttribute(pointSizes, 1));

    // Custom Shader: Delicate pinpoint stars with saturated nucleus (zero color blowout)
    const pointMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute vec4 color;
        attribute float size;
        varying vec4 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // Perspective size attenuation: delicate pinpoint stars in depth
          gl_PointSize = size * (72.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec4 vColor;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          
          // Sharp, saturated central nucleus that preserves authentic hue
          float alpha = smoothstep(0.5, 0.04, dist);
          float nucleus = smoothstep(0.14, 0.0, dist);
          ${isLight ? 'vec3 col = vColor.rgb * (1.0 - nucleus * 0.18);' : 'vec3 col = vColor.rgb * (1.0 + nucleus * 1.3);'}
          gl_FragColor = vec4(col, vColor.a * alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const pointCloud = new THREE.Points(pointGeo, pointMaterial);
    scene.add(pointCloud);

    // --- Dynamic Connecting Lines Geometry & Shader ---
    const linePositions = new Float32Array(maxLines * 2 * 3);
    const lineColors = new Float32Array(maxLines * 2 * 4); // RGBA per vertex

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 4));

    const lineMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute vec4 color;
        varying vec4 vColor;
        void main() {
          vColor = color;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec4 vColor;
        void main() {
          gl_FragColor = vColor;
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const lineSegments = new THREE.LineSegments(lineGeo, lineMaterial);
    scene.add(lineSegments);

    // --- Traveling Data Telemetry Packets ---
    // Reduced to 16 packets moving slowly and occasionally
    const packetCount = 16;
    const packets: DataPacket[] = [];
    for (let i = 0; i < packetCount; i++) {
      packets.push({
        fromIndex: 0,
        toIndex: 1,
        progress: Math.random(),
        speed: 0.18 + Math.random() * 0.12, // Slowed down from 0.55 for calm data traversal
        color: [...emeraldRGB],
        active: false,
      });
    }

    const packetPositions = new Float32Array(packetCount * 3);
    const packetColors = new Float32Array(packetCount * 4);
    const packetSizes = new Float32Array(packetCount);

    const packetGeo = new THREE.BufferGeometry();
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
    packetGeo.setAttribute('color', new THREE.BufferAttribute(packetColors, 4));
    packetGeo.setAttribute('size', new THREE.BufferAttribute(packetSizes, 1));

    const packetCloud = new THREE.Points(packetGeo, pointMaterial);
    scene.add(packetCloud);

    // --- Spatial Grid Indexing for O(N) Neighbor Queries ---
    const cellSize = connectionRadius;
    const grid = new Map<string, number[]>();

    const getCellKey = (x: number, y: number, z: number) => {
      const cx = Math.floor(x / cellSize);
      const cy = Math.floor(y / cellSize);
      const cz = Math.floor(z / cellSize);
      return `${cx},${cy},${cz}`;
    };

    // Color Lerp Utility
    const lerpColor = (
      c1: [number, number, number],
      c2: [number, number, number],
      t: number
    ): [number, number, number] => {
      return [
        c1[0] + (c2[0] - c1[0]) * t,
        c1[1] + (c2[1] - c1[1]) * t,
        c1[2] + (c2[2] - c1[2]) * t,
      ];
    };

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Clock & Render Loop ---
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (document.visibilityState === 'hidden') return;

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      // =======================================================================
      // 1. THREAT & CYBERSECURITY PROTECTION LIFECYCLE
      // Exactly 1 solid, glowing red warning particle cycling deliberately
      // NO large hollow circular outline line loops!
      // =======================================================================
      threatTimer -= delta;
      if (threatTimer <= 0) {
        // Pick a normal particle in the visible flank (alternating left and right)
        const candidates = particles
          .map((p, idx) => ({ p, idx }))
          .filter((item) => {
            if (item.p.state !== 'normal') return false;
            const inFlank = threatSideLeft
              ? item.p.x < -4.5 && item.p.x > -13.5
              : item.p.x > 4.5 && item.p.x < 13.5;
            return inFlank && Math.abs(item.p.y) < 6.0 && item.p.z > -2.5;
          });

        if (candidates.length > 0) {
          const chosen = candidates[Math.floor(Math.random() * candidates.length)];
          chosen.p.state = 'turning_red';
          chosen.p.stateTime = 0;
          threatSideLeft = !threatSideLeft; // Alternate sides
        }

        // Schedule next independent threat event in 8.5 to 12.0 seconds
        threatTimer = 8.5 + Math.random() * 3.5;
      }

      // Update particle state machines
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.stateTime += delta;

        if (p.state === 'turning_red') {
          // STEP 2: THREAT DETECTION — Smooth color transition from Emerald to Solid Alert Red
          const t = Math.min(1.0, p.stateTime / 1.2);
          p.currentColor = lerpColor(p.baseColor, warningRedRGB, t);
          p.currentSize = p.baseSize * (1.0 + 0.35 * t);
          if (t >= 1.0) {
            p.state = 'warning';
            p.stateTime = 0;
          }
        } else if (p.state === 'warning') {
          // Warning Red Node: Solid glowing central dot with calm, steady pulse (2.0 Hz)
          // Proportional to network nodes, NO hollow outline
          const pulse = Math.sin(p.stateTime * 4.0) * 0.5 + 0.5;
          p.currentSize = p.baseSize * (1.25 + pulse * 0.35);
          p.currentColor = [...warningRedRGB];

          if (p.stateTime >= p.threatDuration) {
            p.state = 'scanning';
            p.stateTime = 0;
          }
        } else if (p.state === 'scanning') {
          // STEP 3: PROTECTION SCAN — Scanning pulse illuminates node and nearby connections
          const scanPulse = Math.sin(p.stateTime * 5.0) * 0.5 + 0.5;
          p.currentColor = lerpColor(warningRedRGB, goldScanRGB, scanPulse * 0.7);
          p.currentSize = p.baseSize * (1.35 + scanPulse * 0.25);

          if (p.stateTime >= 1.8) {
            p.state = 'protecting';
            p.stateTime = 0;
          }
        } else if (p.state === 'protecting') {
          // STEP 4: PROTECTION SUCCESS — Smooth transition from Red -> Gold -> Emerald
          const t = Math.min(1.0, p.stateTime / 2.2);
          if (t < 0.35) {
            p.currentColor = lerpColor(warningRedRGB, goldScanRGB, t / 0.35);
          } else {
            p.currentColor = lerpColor(goldScanRGB, emeraldRGB, (t - 0.35) / 0.65);
          }

          // Gentle momentary glow intensification
          const flare = Math.sin(t * Math.PI) * 0.5;
          p.currentSize = p.baseSize * (1.3 + flare);

          if (t >= 1.0) {
            p.state = 'recovering';
            p.stateTime = 0;

            // STEP 5: NETWORK RECOVERY — Emit green signal pulses along surrounding lines
            packets.forEach((pkt) => {
              if (!pkt.active && Math.random() < 0.45) {
                pkt.fromIndex = i;
                pkt.progress = 0;
                pkt.active = true;
                pkt.color = [...emeraldRGB];
              }
            });
          }
        } else if (p.state === 'recovering') {
          const t = Math.min(1.0, p.stateTime / 1.4);
          p.currentColor = [...p.baseColor];
          p.currentSize = p.baseSize * (1.25 - 0.25 * t);
          if (t >= 1.0) {
            p.state = 'normal';
            p.stateTime = 0;
          }
        } else {
          // NORMAL: Calm, subtle living breath
          const breathe = Math.sin(elapsed * 0.8 + p.phase) * 0.08;
          p.currentSize = p.baseSize * (1.0 + breathe);
          p.currentColor = [...p.baseColor];
        }
      }

      // =======================================================================
      // 2. 3D POSITION INTEGRATION & SPATIAL HASHING
      // Slow, smooth continuous drifting with soft boundary reflection
      // =======================================================================
      grid.clear();

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Smooth independent drifting with very gentle acceleration (65% slower)
        p.x += p.vx + Math.sin(elapsed * 0.15 + p.phase) * 0.0005;
        p.y += p.vy + Math.cos(elapsed * 0.12 + p.phase) * 0.0004;
        p.z += p.vz + Math.sin(elapsed * 0.1 + p.phase) * 0.0003;

        // Smooth boundary reflection
        if (p.x > boundsX) {
          p.x = boundsX;
          p.vx = -Math.abs(p.vx);
        } else if (p.x < -boundsX) {
          p.x = -boundsX;
          p.vx = Math.abs(p.vx);
        }

        if (p.y > boundsY) {
          p.y = boundsY;
          p.vy = -Math.abs(p.vy);
        } else if (p.y < -boundsY) {
          p.y = -boundsY;
          p.vy = Math.abs(p.vy);
        }

        if (p.z > boundsZ) {
          p.z = boundsZ;
          p.vz = -Math.abs(p.vz);
        } else if (p.z < -boundsZ) {
          p.z = -boundsZ;
          p.vz = Math.abs(p.vz);
        }

        // Write position to Point buffer
        pointPositions[i * 3] = p.x;
        pointPositions[i * 3 + 1] = p.y;
        pointPositions[i * 3 + 2] = p.z;

        // Write RGBA color
        pointColors[i * 4] = p.currentColor[0];
        pointColors[i * 4 + 1] = p.currentColor[1];
        pointColors[i * 4 + 2] = p.currentColor[2];
        pointColors[i * 4 + 3] = p.opacity;

        // Write size
        pointSizes[i] = p.currentSize;

        // Reset connection counter
        p.connectedCount = 0;

        // Insert into spatial grid
        const key = getCellKey(p.x, p.y, p.z);
        const cell = grid.get(key);
        if (cell) {
          cell.push(i);
        } else {
          grid.set(key, [i]);
        }
      }

      pointGeo.attributes.position.needsUpdate = true;
      pointGeo.attributes.color.needsUpdate = true;
      pointGeo.attributes.size.needsUpdate = true;

      // =======================================================================
      // 3. ELEGANT, MINIMAL PROXIMITY-BASED CONNECTION SYSTEM
      // Maximum 3 connections per node, distance-squared faint opacity falloff
      // =======================================================================
      let lineVertexIndex = 0;
      const activeLinePairs: [number, number][] = [];

      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        if (p1.connectedCount >= maxConnectionsPerParticle) continue;

        const cx = Math.floor(p1.x / cellSize);
        const cy = Math.floor(p1.y / cellSize);
        const cz = Math.floor(p1.z / cellSize);

        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
              const neighborKey = `${cx + dx},${cy + dy},${cz + dz}`;
              const neighbors = grid.get(neighborKey);
              if (!neighbors) continue;

              for (let n = 0; n < neighbors.length; n++) {
                const j = neighbors[n];
                if (j <= i) continue;

                const p2 = particles[j];
                if (p2.connectedCount >= maxConnectionsPerParticle) continue;

                const distSq =
                  (p1.x - p2.x) * (p1.x - p2.x) +
                  (p1.y - p2.y) * (p1.y - p2.y) +
                  (p1.z - p2.z) * (p1.z - p2.z);

                if (distSq < connectionRadius * connectionRadius) {
                  const dist = Math.sqrt(distSq);
                  // Distance falloff: clear, crisp hairline connections in Light theme
                  const distRatio = 1.0 - dist / connectionRadius;
                  const lineAlpha = isLight
                    ? Math.pow(distRatio, 1.35) * 0.44
                    : Math.pow(distRatio, 2.0) * 0.24;

                  const isThreat =
                    p1.state === 'warning' ||
                    p2.state === 'warning' ||
                    p1.state === 'turning_red' ||
                    p2.state === 'turning_red';

                  const isScanning =
                    p1.state === 'scanning' ||
                    p2.state === 'scanning' ||
                    p1.state === 'protecting' ||
                    p2.state === 'protecting';

                  // Lines connected to warning node illuminate in red with controlled brightness
                  const intensityBoost = isThreat ? 2.2 : isScanning ? 2.4 : 1.0;
                  const finalAlpha = Math.min(isLight ? 0.85 : 0.75, lineAlpha * intensityBoost);

                  // Vertex 1
                  linePositions[lineVertexIndex * 3] = p1.x;
                  linePositions[lineVertexIndex * 3 + 1] = p1.y;
                  linePositions[lineVertexIndex * 3 + 2] = p1.z;

                  const v1Color = isThreat
                    ? p1.state === 'warning'
                      ? warningRedRGB
                      : p1.currentColor
                    : p1.currentColor;

                  lineColors[lineVertexIndex * 4] = v1Color[0];
                  lineColors[lineVertexIndex * 4 + 1] = v1Color[1];
                  lineColors[lineVertexIndex * 4 + 2] = v1Color[2];
                  lineColors[lineVertexIndex * 4 + 3] = finalAlpha;

                  // Vertex 2
                  linePositions[(lineVertexIndex + 1) * 3] = p2.x;
                  linePositions[(lineVertexIndex + 1) * 3 + 1] = p2.y;
                  linePositions[(lineVertexIndex + 1) * 3 + 2] = p2.z;

                  const v2Color = isThreat
                    ? p2.state === 'warning'
                      ? warningRedRGB
                      : p2.currentColor
                    : p2.currentColor;

                  lineColors[(lineVertexIndex + 1) * 4] = v2Color[0];
                  lineColors[(lineVertexIndex + 1) * 4 + 1] = v2Color[1];
                  lineColors[(lineVertexIndex + 1) * 4 + 2] = v2Color[2];
                  lineColors[(lineVertexIndex + 1) * 4 + 3] = finalAlpha;

                  lineVertexIndex += 2;
                  p1.connectedCount++;
                  p2.connectedCount++;

                  activeLinePairs.push([i, j]);

                  if (lineVertexIndex >= maxLines * 2) break;
                }
              }
              if (lineVertexIndex >= maxLines * 2) break;
            }
            if (lineVertexIndex >= maxLines * 2) break;
          }
          if (lineVertexIndex >= maxLines * 2) break;
        }
      }

      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;
      lineGeo.setDrawRange(0, lineVertexIndex);

      // =======================================================================
      // 4. SMOOTH, DELIBERATE TELEMETRY DATA PULSES
      // =======================================================================
      if (activeLinePairs.length > 0) {
        for (let k = 0; k < packetCount; k++) {
          const pkt = packets[k];

          if (!pkt.active) {
            const pair = activeLinePairs[Math.floor(Math.random() * activeLinePairs.length)];
            pkt.fromIndex = pair[0];
            pkt.toIndex = pair[1];
            pkt.progress = 0;
            pkt.active = true;
            pkt.color = [...emeraldRGB];
          }

          pkt.progress += delta * pkt.speed;
          if (pkt.progress >= 1.0) {
            pkt.active = false;
            pkt.progress = 0;
          }

          const fromP = particles[pkt.fromIndex];
          const toP = particles[pkt.toIndex];

          if (fromP && toP) {
            const px = fromP.x + (toP.x - fromP.x) * pkt.progress;
            const py = fromP.y + (toP.y - fromP.y) * pkt.progress;
            const pz = fromP.z + (toP.z - fromP.z) * pkt.progress;

            packetPositions[k * 3] = px;
            packetPositions[k * 3 + 1] = py;
            packetPositions[k * 3 + 2] = pz;

            const pulseFactor = Math.sin(pkt.progress * Math.PI);
            packetColors[k * 4] = pkt.color[0];
            packetColors[k * 4 + 1] = pkt.color[1];
            packetColors[k * 4 + 2] = pkt.color[2];
            packetColors[k * 4 + 3] = isLight ? 0.85 * pulseFactor : 0.8 * pulseFactor;

            packetSizes[k] = (isLight ? 2.4 : 1.7) * (0.8 + 0.4 * pulseFactor);
          }
        }
      }

      packetGeo.attributes.position.needsUpdate = true;
      packetGeo.attributes.color.needsUpdate = true;
      packetGeo.attributes.size.needsUpdate = true;

      // =======================================================================
      // 5. VERY SLOW SERENE AMBIENT ROTATION (ZERO MOUSE DRAG / TILT)
      // =======================================================================
      pointCloud.rotation.y = elapsed * 0.0012;
      pointCloud.rotation.x = elapsed * 0.0006;
      lineSegments.rotation.y = elapsed * 0.0012;
      lineSegments.rotation.x = elapsed * 0.0006;
      packetCloud.rotation.y = elapsed * 0.0012;
      packetCloud.rotation.x = elapsed * 0.0006;

      renderer.render(scene, camera);
    };

    animate();

    // =======================================================================
    // CLEANUP ON UNMOUNT
    // =======================================================================
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      pointGeo.dispose();
      pointMaterial.dispose();
      lineGeo.dispose();
      lineMaterial.dispose();
      packetGeo.dispose();
      renderer.dispose();
    };
  }, [isLight]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

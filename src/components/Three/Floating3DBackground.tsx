import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useTheme } from '../../context/ThemeContext';

interface FloatingObjectData {
  initialX: number;
  initialY: number;
  initialZ: number;
  floatSpeed: number;
  floatAmp: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  phase: number;
}

interface LoadedModelTemplates {
  shield: THREE.Group | null;
  serverRack: THREE.Group | null;
  aiProcessor: THREE.Group | null;
  laptop: THREE.Group | null;
}

export const Floating3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Accessibility: respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // --- Scene, Camera & WebGL Renderer ---
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
    renderer.setClearColor(0x000000, 0); // Pure transparent canvas
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // --- Cinematic Luxury Studio Lighting ---
    const ambientLight = new THREE.AmbientLight(
      isLight ? 0xf8fafc : 0x1e293b,
      isLight ? 1.3 : 0.8
    );
    scene.add(ambientLight);

    // Emerald Key Light (Tech Luminescence)
    const emeraldKeyLight = new THREE.DirectionalLight(
      isLight ? 0x059669 : 0x00f5a0,
      isLight ? 1.2 : 2.0
    );
    emeraldKeyLight.position.set(16, 18, 14);
    scene.add(emeraldKeyLight);

    // Cyan Fill Light (Atmospheric Depth)
    const cyanFillLight = new THREE.DirectionalLight(
      isLight ? 0x0284c7 : 0x06b6d4,
      isLight ? 0.85 : 1.4
    );
    cyanFillLight.position.set(-16, -12, 10);
    scene.add(cyanFillLight);

    // Luminous Core Light
    const corePointLight = new THREE.PointLight(
      isLight ? 0x10b981 : 0x00f5a0,
      isLight ? 0.9 : 1.6,
      36
    );
    corePointLight.position.set(0, 2, 8);
    scene.add(corePointLight);

    // Memory Store for clean disposal
    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    const regGeo = <T extends THREE.BufferGeometry>(geo: T): T => {
      geometries.push(geo);
      return geo;
    };

    // Calculate responsive layout parameters based on viewport width
    const getResponsiveParams = () => {
      const w = window.innerWidth;
      if (w < 768) {
        // Mobile: scaled down & tucked far into margins with gentle opacity
        return {
          scaleMult: 0.35,
          xLeft: -7.5,
          xRight: 7.5,
          opacityMult: 0.16,
        };
      } else if (w < 1024) {
        // Tablet portrait
        return {
          scaleMult: 0.62,
          xLeft: -9.5,
          xRight: 9.5,
          opacityMult: 0.42,
        };
      } else if (w < 1366) {
        // Small Desktop / Laptop (1280x800 - 1366x768)
        return {
          scaleMult: 0.82,
          xLeft: -11.2,
          xRight: 11.2,
          opacityMult: 0.85,
        };
      } else if (w < 1680) {
        // Standard Desktop (1440p / 1080p, e.g. 1440x900)
        return {
          scaleMult: 0.95,
          xLeft: -12.2,
          xRight: 12.2,
          opacityMult: 1.0,
        };
      } else {
        // Ultrawide (1920x1080, 2560x1440)
        return {
          scaleMult: 1.18,
          xLeft: -13.8,
          xRight: 13.8,
          opacityMult: 1.0,
        };
      }
    };

    let responsiveParams = getResponsiveParams();

    // Helper: autonomous floating metadata setup
    const setupFloating = (
      obj: THREE.Object3D,
      x: number,
      y: number,
      z: number,
      amp: number = 0.34,
      speed: number = 0.62,
      rotX: number = 0.0018,
      rotY: number = 0.003,
      rotZ: number = 0.0012
    ) => {
      obj.position.set(x, y, z);
      const data: FloatingObjectData = {
        initialX: x,
        initialY: y,
        initialZ: z,
        floatSpeed: speed,
        floatAmp: amp,
        rotSpeedX: rotX,
        rotSpeedY: rotY,
        rotSpeedZ: rotZ,
        phase: Math.random() * Math.PI * 2,
      };
      obj.userData = data;
    };

    // Section Groups
    const heroGroup = new THREE.Group();
    const aboutGroup = new THREE.Group();
    const skillsGroup = new THREE.Group();
    const githubGroup = new THREE.Group();
    const journeyGroup = new THREE.Group();
    const achievementsGroup = new THREE.Group();
    const roadmapGroup = new THREE.Group();
    const contactGroup = new THREE.Group();

    scene.add(
      heroGroup,
      aboutGroup,
      skillsGroup,
      githubGroup,
      journeyGroup,
      achievementsGroup,
      roadmapGroup,
      contactGroup
    );

    const sectionGroups = [
      { id: 'hero', group: heroGroup },
      { id: 'about', group: aboutGroup },
      { id: 'skills', group: skillsGroup },
      { id: 'github', group: githubGroup },
      { id: 'experience', group: journeyGroup },
      { id: 'achievements', group: achievementsGroup },
      { id: 'roadmap', group: roadmapGroup },
      { id: 'contact', group: contactGroup },
    ];

    // --- Atmospheric Ambient Stardust Particles ---
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 34;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    const particleGeo = regGeo(new THREE.BufferGeometry());
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.11,
      color: isLight ? 0x059669 : 0x00f5a0,
      transparent: true,
      opacity: isLight ? 0.35 : 0.45,
      blending: THREE.AdditiveBlending,
    });
    materials.push(particleMat);
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // =========================================================================
    // REAL CC0 GLB MODEL LOADING & LUXURY MATERIAL TUNING
    // =========================================================================
    const templates: LoadedModelTemplates = {
      shield: null,
      serverRack: null,
      aiProcessor: null,
      laptop: null,
    };

    const loader = new GLTFLoader();
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '') + '/';

    // Helper: normalize object scale and center around centroid
    const normalizeModel = (gltfScene: THREE.Group, targetSize: number) => {
      const box = new THREE.Box3().setFromObject(gltfScene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      // Center geometry around local origin
      gltfScene.position.sub(center);

      const wrapper = new THREE.Group();
      wrapper.add(gltfScene);

      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        const scale = targetSize / maxDim;
        gltfScene.scale.set(scale, scale, scale);
      }
      return wrapper;
    };

    // Helper: enhance materials while preserving authentic model textures and colors
    const tuneMeshMaterials = (object: THREE.Object3D, modelType: 'shield' | 'rack' | 'ai' | 'laptop') => {
      object.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.geometry) geometries.push(mesh.geometry);

          if (mesh.material) {
            const rawMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
            const mat = (rawMat as THREE.MeshStandardMaterial).clone();

            // 1. Maintain authentic textures and realistic base colors
            mat.metalness = Math.min(0.95, Math.max(0.65, (mat.metalness || 0.4) * 1.3));
            mat.roughness = isLight ? 0.35 : 0.25;

            // 2. Translucent atmospheric depth so models sit naturally in the background
            mat.transparent = true;
            mat.opacity = isLight ? 0.62 : 0.72;

            // 3. Subtle, selective emissive highlights without washing out geometry
            if (modelType === 'shield') {
              if (mesh.name === 'tower-shield_2') {
                // Central crest emblem - subtle emerald core glow
                mat.emissive = new THREE.Color(isLight ? 0x059669 : 0x00f5a0);
                mat.emissiveIntensity = isLight ? 0.25 : 0.45;
              } else if (mesh.name === 'tower-shield_0') {
                // Outer bronze/steel rim
                mat.emissive = new THREE.Color(isLight ? 0x064e3b : 0x022c22);
                mat.emissiveIntensity = 0.1;
              } else {
                // Main armor plate - no self-illumination, let studio lights highlight curvature
                mat.emissive = new THREE.Color(0x000000);
                mat.emissiveIntensity = 0;
              }
            } else if (modelType === 'rack') {
              if (mesh.name === 'server-rack-42u-open_2') {
                // Server module status indicators
                mat.emissive = new THREE.Color(isLight ? 0x059669 : 0x00f5a0);
                mat.emissiveIntensity = isLight ? 0.4 : 0.75;
              } else {
                mat.emissive = new THREE.Color(0x000000);
                mat.emissiveIntensity = 0;
              }
            } else if (modelType === 'ai') {
              if (mesh.name === 'data-centre-infiltration-kit-processor-board_1') {
                // Aluminum cooling matrix / silicon core
                mat.emissive = new THREE.Color(isLight ? 0x0284c7 : 0x06b6d4);
                mat.emissiveIntensity = isLight ? 0.15 : 0.3;
              } else if (mesh.name === 'data-centre-infiltration-kit-processor-board_3') {
                // Gold contact pins
                mat.metalness = 0.98;
                mat.roughness = 0.18;
                mat.emissive = new THREE.Color(0x000000);
              } else {
                mat.emissive = new THREE.Color(isLight ? 0x064e3b : 0x022c22);
                mat.emissiveIntensity = 0.08;
              }
            } else if (modelType === 'laptop') {
              if (mesh.name === 'laptop_3_2') {
                // Active terminal display screen
                mat.emissive = new THREE.Color(isLight ? 0x059669 : 0x00f5a0);
                mat.emissiveIntensity = isLight ? 0.25 : 0.45;
              } else {
                // Chassis and keyboard
                mat.emissive = new THREE.Color(0x000000);
                mat.emissiveIntensity = 0;
              }
            }

            materials.push(mat);
            mesh.material = mat;
          }
        }
      });
    };

    // Helper: instantiate model with custom layout and autonomous motion
    const createInstance = (
      template: THREE.Group,
      x: number,
      y: number,
      z: number,
      rotX: number,
      rotY: number,
      rotZ: number,
      scaleOverride: number = 1.0,
      floatSpeed: number = 0.62,
      floatAmp: number = 0.34
    ) => {
      const clone = template.clone(true);
      clone.rotation.set(rotX, rotY, rotZ);
      clone.scale.multiplyScalar(scaleOverride * responsiveParams.scaleMult);
      setupFloating(
        clone,
        x,
        y,
        z,
        floatAmp,
        floatSpeed,
        0.0018,
        0.003,
        0.0012
      );
      return clone;
    };

    // Build the curated section layouts once all models are loaded
    const assembleSections = () => {
      if (!templates.shield || !templates.serverRack || !templates.aiProcessor || !templates.laptop) {
        return;
      }

      const { xLeft, xRight } = responsiveParams;

      // =======================================================================
      // 1. HERO SECTION:
      // Left: Large Cybersecurity Shield (Primary) + 42U Server Rack (Secondary)
      // Right: Large AI Processor Board (Primary) + Kenney Laptop (Secondary)
      // Visually large (~25-35vw presence flanking Dinesh's portrait and text)
      // =======================================================================
      {
        // Left: Cybersecurity Shield (Upper-left quadrant above heading)
        const shieldHero = createInstance(
          templates.shield,
          xLeft + 0.8,
          2.4,
          -2.2,
          0.12,
          0.42,
          -0.08,
          0.88,
          0.58,
          0.32
        );
        // Left: Server Rack (Lower-left quadrant below CTAs)
        const rackHero = createInstance(
          templates.serverRack,
          xLeft + 0.8,
          -3.5,
          -2.6,
          0.15,
          0.35,
          0.02,
          0.75,
          0.5,
          0.25
        );
        // Right: AI Processor Board (Upper-right quadrant flanking Portrait)
        const aiHero = createInstance(
          templates.aiProcessor,
          xRight - 0.4,
          2.2,
          -2.0,
          0.62,
          -0.5,
          0.2,
          0.92,
          0.62,
          0.34
        );
        // Right: Kenney Laptop (Lower-right quadrant below Portrait)
        const laptopHero = createInstance(
          templates.laptop,
          xRight - 0.4,
          -2.8,
          -2.4,
          0.38,
          0.65,
          -0.1,
          0.82,
          0.56,
          0.28
        );

        heroGroup.add(shieldHero, rackHero, aiHero, laptopHero);
      }

      // =======================================================================
      // 2. ABOUT SECTION: Software Development & Systems Architecture
      // Left: 42U Server Rack (Cloud Infrastructure)
      // Right: Laptop (Developer Workstation angled open)
      // =======================================================================
      {
        const rackAbout = createInstance(
          templates.serverRack,
          xLeft + 0.6,
          0.0,
          -2.4,
          0.1,
          0.4,
          -0.05,
          0.85,
          0.55,
          0.28
        );
        const laptopAbout = createInstance(
          templates.laptop,
          xRight - 0.4,
          -1.2,
          -2.4,
          0.38,
          -0.55,
          0.1,
          0.85,
          0.6,
          0.3
        );
        aboutGroup.add(rackAbout, laptopAbout);
      }

      // =======================================================================
      // 3. SKILLS SECTION: Machine Learning, AI & Cybersecurity
      // Left: Cybersecurity Shield (Security Defense)
      // Right: AI Processor Board (Silicon Neural Core)
      // =======================================================================
      {
        const shieldSkills = createInstance(
          templates.shield,
          xLeft + 0.6,
          0.2,
          -2.2,
          0.14,
          0.35,
          -0.05,
          0.88,
          0.58,
          0.32
        );
        const aiSkills = createInstance(
          templates.aiProcessor,
          xRight - 0.4,
          0.0,
          -2.2,
          0.58,
          -0.42,
          0.18,
          0.88,
          0.62,
          0.32
        );
        skillsGroup.add(shieldSkills, aiSkills);
      }

      // =======================================================================
      // 4. GITHUB SECTION: Open Source Engineering & CI/CD Pipelines
      // Left: Laptop (Workstation Code Commits)
      // Right: Server Rack (Deployment Infrastructure)
      // =======================================================================
      {
        const laptopGithub = createInstance(
          templates.laptop,
          xLeft + 0.6,
          0.0,
          -2.4,
          0.35,
          0.62,
          -0.1,
          0.85,
          0.58,
          0.3
        );
        const rackGithub = createInstance(
          templates.serverRack,
          xRight - 0.4,
          0.0,
          -2.4,
          0.12,
          -0.48,
          0.06,
          0.85,
          0.52,
          0.28
        );
        githubGroup.add(laptopGithub, rackGithub);
      }

      // =======================================================================
      // 5. JOURNEY SECTION: Experience & Growth
      // Left: Server Rack (Enterprise Scale)
      // Right: Laptop (Developer Milestones)
      // =======================================================================
      {
        const rackJourney = createInstance(
          templates.serverRack,
          xLeft + 0.6,
          0.2,
          -2.4,
          0.14,
          0.5,
          -0.08,
          0.85,
          0.54,
          0.28
        );
        const laptopJourney = createInstance(
          templates.laptop,
          xRight - 0.4,
          -1.2,
          -2.4,
          0.4,
          -0.6,
          0.12,
          0.85,
          0.58,
          0.3
        );
        journeyGroup.add(rackJourney, laptopJourney);
      }

      // =======================================================================
      // 6. ACHIEVEMENTS SECTION: Recognition & Proven Excellence
      // Left: Cybersecurity Shield (Ethical Hacking & Defence Victories)
      // Right: AI Processor Board (High-Performance Compute & SIH Finalist)
      // =======================================================================
      {
        const shieldAchieve = createInstance(
          templates.shield,
          xLeft + 0.6,
          0.0,
          -2.2,
          0.1,
          0.4,
          -0.06,
          0.88,
          0.58,
          0.32
        );
        const aiAchieve = createInstance(
          templates.aiProcessor,
          xRight - 0.4,
          0.0,
          -2.2,
          0.6,
          -0.5,
          0.2,
          0.88,
          0.62,
          0.32
        );
        achievementsGroup.add(shieldAchieve, aiAchieve);
      }

      // =======================================================================
      // 7. ROADMAP SECTION: Future Directions
      // Left: Cybersecurity Shield
      // Right: AI Processor Board
      // =======================================================================
      {
        const shieldRoadmap = createInstance(
          templates.shield,
          xLeft + 0.6,
          0.0,
          -2.2,
          0.12,
          0.38,
          -0.05,
          0.88,
          0.56,
          0.3
        );
        const aiRoadmap = createInstance(
          templates.aiProcessor,
          xRight - 0.4,
          0.0,
          -2.2,
          0.58,
          -0.45,
          0.18,
          0.88,
          0.6,
          0.32
        );
        roadmapGroup.add(shieldRoadmap, aiRoadmap);
      }

      // =======================================================================
      // 8. CONTACT SECTION: Grand Collaboration Finale
      // Majestic quad framing flanking the central contact card
      // =======================================================================
      {
        const shieldContact = createInstance(
          templates.shield,
          xLeft + 0.6,
          1.0,
          -2.0,
          0.1,
          0.42,
          -0.05,
          0.86,
          0.58,
          0.32
        );
        const rackContact = createInstance(
          templates.serverRack,
          xLeft + 0.6,
          -2.6,
          -2.6,
          0.15,
          -0.55,
          0.06,
          0.78,
          0.5,
          0.26
        );
        const aiContact = createInstance(
          templates.aiProcessor,
          xRight - 0.4,
          1.1,
          -2.0,
          0.62,
          -0.52,
          0.22,
          0.86,
          0.62,
          0.32
        );
        const laptopContact = createInstance(
          templates.laptop,
          xRight - 0.4,
          -2.4,
          -2.4,
          0.4,
          0.65,
          -0.1,
          0.8,
          0.56,
          0.28
        );
        contactGroup.add(shieldContact, rackContact, aiContact, laptopContact);
      }
    };

    // Load each real GLB model asynchronously
    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === 4) {
        assembleSections();
      }
    };

    // 1. Cybersecurity Shield (Tower Shield, 3DAssets.dev, CC0)
    loader.load(
      baseUrl + 'models/cybersecurity-shield.glb',
      (gltf) => {
        tuneMeshMaterials(gltf.scene, 'shield');
        templates.shield = normalizeModel(gltf.scene, 5.0);
        checkAllLoaded();
      },
      undefined,
      (err) => console.warn('Failed to load cybersecurity shield:', err)
    );

    // 2. 42U Server Rack (3DAssets.dev, CC0)
    loader.load(
      baseUrl + 'models/server-rack.glb',
      (gltf) => {
        tuneMeshMaterials(gltf.scene, 'rack');
        templates.serverRack = normalizeModel(gltf.scene, 4.5);
        checkAllLoaded();
      },
      undefined,
      (err) => console.warn('Failed to load server rack:', err)
    );

    // 3. AI Processor Board (3DAssets.dev, CC0)
    loader.load(
      baseUrl + 'models/ai-processor.glb',
      (gltf) => {
        tuneMeshMaterials(gltf.scene, 'ai');
        templates.aiProcessor = normalizeModel(gltf.scene, 5.0);
        checkAllLoaded();
      },
      undefined,
      (err) => console.warn('Failed to load AI processor board:', err)
    );

    // 4. Development Laptop (Kenney, Poly Pizza, CC0)
    loader.load(
      baseUrl + 'models/laptop-development.glb',
      (gltf) => {
        tuneMeshMaterials(gltf.scene, 'laptop');
        templates.laptop = normalizeModel(gltf.scene, 3.6);
        checkAllLoaded();
      },
      undefined,
      (err) => console.warn('Failed to load laptop:', err)
    );

    // =========================================================================
    // SECTION TRACKING VIA SCROLL POSITION
    // =========================================================================
    let activeSectionIndex = 0;
    const targetSectionOpacities = sectionGroups.map((_, idx) => (idx === 0 ? 1 : 0));
    const currentSectionOpacities = [...targetSectionOpacities];

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const viewportMid = scrollY + window.innerHeight * 0.45;

      let foundIndex = 0;
      for (let i = 0; i < sectionGroups.length; i++) {
        const el = document.getElementById(sectionGroups[i].id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (viewportMid >= top && viewportMid < top + height) {
            foundIndex = i;
            break;
          }
        }
      }

      activeSectionIndex = foundIndex;
      for (let i = 0; i < sectionGroups.length; i++) {
        targetSectionOpacities[i] = i === activeSectionIndex ? 1 : 0;
      }
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();

    // =========================================================================
    // RESIZE LISTENER
    // =========================================================================
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      responsiveParams = getResponsiveParams();
    };
    window.addEventListener('resize', handleResize);

    // =========================================================================
    // 60 FPS AUTONOMOUS RENDER LOOP
    // Strictly zero mouse interaction! Continuous time harmonics
    // =========================================================================
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (document.visibilityState === 'hidden') return;

      const elapsed = clock.getElapsedTime();

      // Ensure active section is synchronized
      updateActiveSection();

      // Smooth scale & visibility blend between section groups
      for (let i = 0; i < sectionGroups.length; i++) {
        currentSectionOpacities[i] += (targetSectionOpacities[i] - currentSectionOpacities[i]) * 0.16;
        const group = sectionGroups[i].group;
        const op = Math.max(0, Math.min(1, currentSectionOpacities[i]));
        group.visible = op > 0.02;
        group.scale.set(op, op, op);
        group.position.y = (1 - op) * 1.5;

        // Animate all child objects in group
        if (group.visible) {
          group.children.forEach((child) => {
            if (child.userData && child.userData.floatSpeed) {
              const d = child.userData as FloatingObjectData;
              child.position.y = d.initialY + Math.sin(elapsed * d.floatSpeed + d.phase) * d.floatAmp;
              child.position.x = d.initialX + Math.cos(elapsed * d.floatSpeed * 0.7 + d.phase) * (d.floatAmp * 0.35);
              child.rotation.x += d.rotSpeedX;
              child.rotation.y += d.rotSpeedY;
              child.rotation.z += d.rotSpeedZ;
            }
          });
        }
      }

      // Rotate Ambient Stardust Particles
      particles.rotation.y = elapsed * 0.015;
      particles.rotation.x = elapsed * 0.007;

      // Subtle breathing core light
      corePointLight.intensity = (isLight ? 0.9 : 1.6) + Math.sin(elapsed * 1.5) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // =========================================================================
    // CLEANUP ON UNMOUNT
    // =========================================================================
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
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

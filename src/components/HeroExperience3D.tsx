import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Layers, ShieldCheck, Zap } from 'lucide-react';

interface HeroExperience3DProps {
  className?: string;
  onExploreClick?: () => void;
}

type ViewMode = 'cinematic' | 'hardware' | 'architecture';

export const HeroExperience3D: React.FC<HeroExperience3DProps> = ({
  className = '',
  onExploreClick: _onExploreClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('cinematic');
  const [isHovered, setIsHovered] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // References to keep animation loop clean
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const totemGroupRef = useRef<THREE.Group | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const screenMeshRef = useRef<THREE.Mesh | null>(null);
  const screenTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const dynamicLightRef = useRef<THREE.PointLight | null>(null);

  // Target camera state for smooth transitions
  const cameraTarget = useRef({ x: 0, y: 0.8, z: 9, lookY: 0 });
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Generate high-resolution kiosk touchscreen canvas texture
  const renderKioskTexture = useCallback((activeTab: number = 0, time: number = 0): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1536;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // Dark Titanium Luxury Base
    const grad = ctx.createLinearGradient(0, 0, 1024, 1536);
    grad.addColorStop(0, '#060a14');
    grad.addColorStop(0.5, '#0b1224');
    grad.addColorStop(1, '#03060d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1536);

    // Subtle Radial Pulse
    const pulseRadius = 500 + Math.sin(time * 2) * 50;
    const rad = ctx.createRadialGradient(512, 600, 50, 512, 600, pulseRadius);
    rad.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
    rad.addColorStop(0.6, 'rgba(139, 92, 246, 0.08)');
    rad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, 1024, 1536);

    // Kiosk Top Header Bar
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(0, 0, 1024, 110);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.fillRect(0, 108, 1024, 2);

    // Logo & Terminal ID
    ctx.font = 'bold 36px "Outfit", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('NEXORA SMART-KIOSK', 50, 70);

    // Operational Status Pill
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.beginPath();
    ctx.roundRect(700, 32, 274, 52, 26);
    ctx.fill();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#34d399';
    ctx.beginPath();
    ctx.arc(730, 58, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillStyle = '#34d399';
    ctx.fillText('LIVE: < 50ms SYNC', 750, 65);

    // Category Selector
    const categories = ['🔥 POPULAR', '🍔 MAINS', '🥗 COMBOS', '🥤 DRINKS'];
    let catX = 50;
    categories.forEach((cat, idx) => {
      const isSelected = idx === activeTab;
      const w = 215;
      ctx.beginPath();
      ctx.roundRect(catX, 145, w, 70, 35);
      if (isSelected) {
        const catGrad = ctx.createLinearGradient(catX, 145, catX + w, 215);
        catGrad.addColorStop(0, '#0284c7');
        catGrad.addColorStop(1, '#7c3aed');
        ctx.fillStyle = catGrad;
        ctx.fill();
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.font = 'bold 22px "Outfit", sans-serif';
      ctx.fillStyle = isSelected ? '#ffffff' : '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText(cat, catX + w / 2, 190);
      ctx.textAlign = 'left';
      catX += w + 20;
    });

    // Main Dish Spotlight Card
    ctx.fillStyle = 'rgba(17, 24, 39, 0.85)';
    ctx.beginPath();
    ctx.roundRect(50, 245, 924, 620, 32);
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dish Badge
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(85, 280, 160, 42, 21);
    ctx.fill();
    ctx.font = 'bold 18px "Outfit", sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText('★ CHEF SPECIAL', 100, 308);

    // Dish Title
    ctx.font = 'bold 44px "Outfit", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Royal Paneer & Truffle Sizzler', 85, 375);

    ctx.font = '24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Smoked artisanal cottage cheese, flame-charred peppers, microgreens.', 85, 425);

    // Spice Level Selector
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('CUSTOM SPICE PROFILE (4-TIER SELECTOR):', 85, 485);

    const spices = ['MILD', 'MEDIUM', 'HOT 🔥', 'EXTRA HOT 🌶️'];
    let spX = 85;
    spices.forEach((sp, i) => {
      const active = i === 2;
      ctx.beginPath();
      ctx.roundRect(spX, 510, 195, 56, 16);
      ctx.fillStyle = active ? '#ef4444' : 'rgba(255, 255, 255, 0.06)';
      ctx.fill();
      ctx.font = 'bold 18px "Outfit", sans-serif';
      ctx.fillStyle = active ? '#ffffff' : '#cbd5e1';
      ctx.textAlign = 'center';
      ctx.fillText(sp, spX + 97, 545);
      ctx.textAlign = 'left';
      spX += 215;
    });

    // Price & Add to Order Bar
    ctx.font = 'bold 52px "Outfit", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('₹ 480', 85, 635);

    // Add button
    const btnGrad = ctx.createLinearGradient(600, 580, 930, 660);
    btnGrad.addColorStop(0, '#10b981');
    btnGrad.addColorStop(1, '#059669');
    ctx.fillStyle = btnGrad;
    ctx.beginPath();
    ctx.roundRect(600, 580, 330, 76, 38);
    ctx.fill();
    ctx.font = 'bold 26px "Outfit", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('+ ADD TO TABLE ORDER', 765, 628);
    ctx.textAlign = 'left';

    // Live Cross-Screen Broadcast Stream (KDS Telemetry)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.beginPath();
    ctx.roundRect(50, 895, 924, 380, 32);
    ctx.fill();
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.fillStyle = '#c084fc';
    ctx.fillText('KITCHEN KDS REAL-TIME EVENT STREAM', 85, 945);

    // Event 1
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(85, 975, 854, 75);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(85, 975, 6, 75);
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillStyle = '#34d399';
    ctx.fillText('14:22:10 • TABLE 3', 105, 1010);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('TICKET #1028 BROADCAST -> CHEF ACKNOWLEDGED ("PREPARING")', 105, 1038);

    // Event 2
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(85, 1065, 854, 75);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(85, 1065, 6, 75);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('14:23:04 • TABLE 7', 105, 1100);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('CALL WAITER REQUEST ("ASSISTANCE") BROADCAST TO FLOOR PAGER', 105, 1128);

    // Event 3
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(85, 1155, 854, 75);
    ctx.fillStyle = '#eab308';
    ctx.fillRect(85, 1155, 6, 75);
    ctx.fillStyle = '#fde047';
    ctx.fillText('14:24:18 • KDS STATION 1', 105, 1190);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('86/SOLD-OUT TOGGLE ACTIVATED -> UPDATED ALL TABLE KIOSKS', 105, 1218);

    // Multilingual Switcher Footer
    ctx.fillStyle = 'rgba(10, 15, 30, 0.9)';
    ctx.fillRect(0, 1400, 1024, 136);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(0, 1400, 1024, 2);

    ctx.font = 'bold 22px "Outfit", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('LANGUAGES: [EN] ENGLISH • [TA] தமிழ் • [HI] हिन्दी • [TE] తెలుగు • [ES] ESPAÑOL', 60, 1475);

    return canvas;
  }, []);

  // Update camera target based on active view mode
  useEffect(() => {
    switch (viewMode) {
      case 'cinematic':
        cameraTarget.current = { x: 0, y: 0.6, z: 8.5, lookY: 0 };
        break;
      case 'hardware':
        cameraTarget.current = { x: 0.8, y: 0.2, z: 5.2, lookY: -0.1 };
        break;
      case 'architecture':
        cameraTarget.current = { x: -1.2, y: 1.4, z: 6.8, lookY: 0.3 };
        break;
    }
  }, [viewMode]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGL availability using an offscreen canvas
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030508, 0.045);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 8.5);
    cameraRef.current = camera;

    // 2. High-Performance WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      rendererRef.current = renderer;
    } catch (e) {
      console.error('Failed to create WebGLRenderer:', e);
      setWebglSupported(false);
      return;
    }

    // 3. Lighting Setup (Cinematic Studio Hierarchy)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Key Light (Electric Cyan)
    const cyanLight = new THREE.DirectionalLight(0x00f0ff, 2.8);
    cyanLight.position.set(6, 8, 7);
    scene.add(cyanLight);

    // Rim / Backlight (Bioluminescent Violet)
    const violetLight = new THREE.DirectionalLight(0x8b5cf6, 3.2);
    violetLight.position.set(-6, -4, -5);
    scene.add(violetLight);

    // Soft Fill Light (Liquid Platinum)
    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 1.2);
    fillLight.position.set(0, 5, -8);
    scene.add(fillLight);

    // Dynamic Mouse Responsive Light
    const mouseLight = new THREE.PointLight(0x38bdf8, 3.5, 12);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);
    dynamicLightRef.current = mouseLight;

    // 4. Detailed 3D Technological Environment
    const totemGroup = new THREE.Group();
    totemGroupRef.current = totemGroup;
    scene.add(totemGroup);

    // A. Luxury Kiosk Monolith Chassis (Brushed Titanium & Deep Carbon)
    const chassisGeo = new THREE.BoxGeometry(2.3, 3.6, 0.32);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.15,
      metalness: 0.92,
      envMapIntensity: 1.5,
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    totemGroup.add(chassis);

    // Chamfered Bezel Accents (Silver/Cyan Edge Trim)
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      metalness: 0.95,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2,
    });
    const leftTrim = new THREE.Mesh(new THREE.BoxGeometry(0.04, 3.62, 0.34), bezelMat);
    leftTrim.position.x = -1.16;
    totemGroup.add(leftTrim);

    const rightTrim = new THREE.Mesh(new THREE.BoxGeometry(0.04, 3.62, 0.34), bezelMat);
    rightTrim.position.x = 1.16;
    totemGroup.add(rightTrim);

    // Top Brand Plaque with Glow
    const plaqueMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.1,
    });
    const topPlaque = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.18, 0.35), plaqueMat);
    topPlaque.position.y = 1.75;
    totemGroup.add(topPlaque);

    // High-Resolution Touch Screen Surface
    const textureCanvas = renderKioskTexture(0, 0);
    const screenTexture = new THREE.CanvasTexture(textureCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    screenTextureRef.current = screenTexture;

    const screenGeo = new THREE.PlaneGeometry(2.12, 3.32);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.165;
    screenMeshRef.current = screenMesh;
    totemGroup.add(screenMesh);

    // Glass Screen Protective Layer with Physical Specular Reflection
    const glassGeo = new THREE.PlaneGeometry(2.14, 3.34);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      reflectivity: 0.8,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.z = 0.17;
    totemGroup.add(glassMesh);

    // Pedestal Base Stand (Solid Geometric Architecture)
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x070b14,
      metalness: 0.9,
      roughness: 0.3,
    });
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.75, 1.8, 32), standMat);
    stand.position.y = -2.5;
    totemGroup.add(stand);

    const basePlate = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.5, 0.15, 32), chassisMat);
    basePlate.position.y = -3.4;
    totemGroup.add(basePlate);

    // Glowing Base Floor Ring
    const floorRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
    });
    const floorRing = new THREE.Mesh(new THREE.RingGeometry(1.55, 1.62, 64), floorRingMat);
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.y = -3.39;
    totemGroup.add(floorRing);

    // B. Concentric Gyroscopic Orbit Rings & Computational Nodes
    const ringsGroup = new THREE.Group();
    ringsGroupRef.current = ringsGroup;
    scene.add(ringsGroup);

    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.015, 16, 100), ringMat1);
    ringsGroup.add(ring1);

    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.015, 16, 100), ringMat2);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ringsGroup.add(ring2);

    // Satellite Telemetry Sensor Spheres
    const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 2.5,
    });
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * 3.6, Math.sin(angle) * 3.6, 0);
      ring1.add(node);
    }

    // C. Atmospheric Quantum Particle Nebula
    const particleCount = 1200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x38bdf8);
    const colorViolet = new THREE.Color(0x8b5cf6);
    const colorSilver = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 18;

      const mixedColor = colorCyan.clone();
      if (Math.random() > 0.6) {
        mixedColor.lerp(colorViolet, Math.random());
      } else if (Math.random() > 0.8) {
        mixedColor.lerp(colorSilver, Math.random());
      }

      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    scene.add(particles);

    // 5. Mouse Interaction Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouse.current.targetX = x;
      mouse.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Responsive Window Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. Render Loop with Inertial Spring Dynamics
    let lastTime = performance.now();
    let startTime = lastTime;
    let animId: number;
    let textureUpdateTimer = 0;
    let activeKioskTab = 0;

    const animate = (currentTime: number) => {
      const now = currentTime || performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const time = (now - startTime) / 1000;

      // Smooth mouse interpolation
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Smooth camera interpolation towards active view mode
      camera.position.x += (cameraTarget.current.x + mouse.current.x * 0.6 - camera.position.x) * 0.05;
      camera.position.y += (cameraTarget.current.y + mouse.current.y * 0.4 - camera.position.y) * 0.05;
      camera.position.z += (cameraTarget.current.z - camera.position.z) * 0.05;
      camera.lookAt(0, cameraTarget.current.lookY, 0);

      // Move dynamic point light with cursor
      if (dynamicLightRef.current) {
        dynamicLightRef.current.position.x = mouse.current.x * 4;
        dynamicLightRef.current.position.y = mouse.current.y * 3 + 1;
      }

      // Gentle Totem Breathing & Hover Tilt
      if (totemGroupRef.current) {
        totemGroupRef.current.rotation.y = Math.sin(time * 0.4) * 0.08 + mouse.current.x * 0.15;
        totemGroupRef.current.rotation.x = Math.cos(time * 0.3) * 0.04 - mouse.current.y * 0.1;
        totemGroupRef.current.position.y = Math.sin(time * 0.8) * 0.06;
      }

      // Gyroscopic Ring Precession
      if (ringsGroupRef.current) {
        ringsGroupRef.current.children[0].rotation.z = time * 0.12;
        ringsGroupRef.current.children[1].rotation.z = -time * 0.08;
        ringsGroupRef.current.rotation.y = time * 0.05;
      }

      // Particle Nebula Drift
      if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.02;
        particlesRef.current.rotation.x = time * 0.01;
      }

      // Periodic Live Kiosk Screen Re-render (Simulates real-time active ordering & telemetry)
      textureUpdateTimer += delta;
      if (textureUpdateTimer > 3.5) {
        textureUpdateTimer = 0;
        activeKioskTab = (activeKioskTab + 1) % 4;
        const updatedCanvas = renderKioskTexture(activeKioskTab, time);
        if (screenTextureRef.current) {
          const ctx = (screenTextureRef.current.image as HTMLCanvasElement).getContext('2d');
          if (ctx) {
            ctx.drawImage(updatedCanvas, 0, 0);
            screenTextureRef.current.needsUpdate = true;
          }
        }
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      chassisGeo.dispose();
      screenGeo.dispose();
      glassGeo.dispose();
      particleGeo.dispose();
    };
  }, [renderKioskTexture]);

  if (!webglSupported) {
    return (
      <div className="relative w-full h-[600px] flex items-center justify-center rounded-3xl bg-[#090e1c] border border-cyan-500/20 p-8 text-center">
        <div className="space-y-4 max-w-md">
          <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">NEXORA Smart-Kiosk High-Res Display</h3>
          <p className="text-sm text-slate-300">
            WebGL hardware acceleration is disabled. Enjoy our interactive 2D architecture showcase below.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full h-[680px] sm:h-[760px] lg:h-[840px] overflow-hidden select-none ${className}`}
    >
      {/* 3D WebGL Canvas spanning full space */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
      />

      {/* Floating Spatial HUD Controls (Lusion / Awwwards Inspector Bar) */}
      <div className="absolute top-6 left-6 z-20 flex flex-wrap items-center gap-2">
        <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[11px] font-mono font-medium text-slate-300 flex items-center gap-2 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>SPATIAL 3D ENGINE • 60 FPS</span>
        </div>

        {/* View Mode Switcher */}
        <div className="inline-flex rounded-full bg-black/70 backdrop-blur-xl border border-white/10 p-1 shadow-2xl">
          <button
            onClick={() => setViewMode('cinematic')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'cinematic'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cinematic
          </button>
          <button
            onClick={() => setViewMode('hardware')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'hardware'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Hardware Ergonomics
          </button>
          <button
            onClick={() => setViewMode('architecture')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'architecture'
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Event Bus Core
          </button>
        </div>
      </div>

      {/* Floating HUD Telemetry Callouts (Bottom Left & Right) */}
      <div className="hidden md:flex absolute bottom-8 left-8 z-20 items-center gap-3 p-3.5 rounded-2xl bg-black/65 backdrop-blur-xl border border-white/10 text-left shadow-2xl">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">INTER-SCREEN SYNC</div>
          <div className="text-xs font-semibold text-white">&lt; 50ms BroadcastChannel Pipeline</div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 right-8 z-20 items-center gap-3 p-3.5 rounded-2xl bg-black/65 backdrop-blur-xl border border-white/10 text-left shadow-2xl">
        <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-violet-400 uppercase tracking-widest font-bold">TARGET HARDWARE</div>
          <div className="text-xs font-semibold text-white">8"–12" Commercial Tablets &amp; Totems</div>
        </div>
      </div>

      {/* Subtle Interaction Hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400/80 bg-black/50 px-3 py-1 rounded-full border border-white/5">
          {isHovered ? 'Move mouse to orbit • Click views to inspect' : 'Interactive 3D Stage'}
        </span>
      </div>
    </div>
  );
};

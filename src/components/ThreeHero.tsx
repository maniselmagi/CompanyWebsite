import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3D, Touchpad, UtensilsCrossed, ChefHat, Sparkles } from 'lucide-react';

interface ThreeHeroProps {
  className?: string;
}

const checkWebGLSupport = (): boolean => {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

/**
 * Procedural High-DPI Canvas Renderer for Kiosk Screen Texture
 * Draws a self-service ordering kiosk UI or kitchen display ticket line.
 */
function createKioskScreenCanvas(mode: 'order' | 'kds', pulsePhase: number = 0): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1360;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  if (mode === 'order') {
    // 1. Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1360);
    bgGrad.addColorStop(0, '#090d18');
    bgGrad.addColorStop(0.4, '#0d1326');
    bgGrad.addColorStop(1, '#060911');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1360);

    // Decorative radial glow
    const radial = ctx.createRadialGradient(512, 450, 50, 512, 450, 500);
    radial.addColorStop(0, 'rgba(59, 130, 246, 0.25)');
    radial.addColorStop(0.6, 'rgba(139, 92, 246, 0.08)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 1024, 1360);

    // 2. Status Bar Header
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1024, 90);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(0, 89, 1024, 2);

    // Brand on Screen
    ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('NEXORA SMART-KIOSK', 48, 56);

    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('TABLE 04', 580, 56);

    // Live Online Pill
    ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.beginPath();
    ctx.roundRect(760, 25, 216, 42, 21);
    ctx.fill();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(790, 46, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText('ONLINE • 60 FPS', 812, 53);

    // 3. Category Selector Bar
    const categories = ['🍔 ALL MAINS', '🍟 SIDES & EXTRAS', '🥤 BEVERAGES', '🍰 DESSERTS'];
    let catX = 48;
    categories.forEach((cat, index) => {
      const isSelected = index === 0;
      const w = 220;
      ctx.beginPath();
      ctx.roundRect(catX, 120, w, 56, 28);
      if (isSelected) {
        const catGrad = ctx.createLinearGradient(catX, 120, catX + w, 176);
        catGrad.addColorStop(0, '#2563eb');
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

      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = isSelected ? '#ffffff' : '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText(cat, catX + w / 2, 156);
      ctx.textAlign = 'left';
      catX += w + 20;
    });

    // 4. Featured Hero Dish Card
    ctx.beginPath();
    ctx.roundRect(48, 206, 928, 540, 32);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dish graphic area
    const dishGrad = ctx.createLinearGradient(48, 206, 976, 520);
    dishGrad.addColorStop(0, '#1e293b');
    dishGrad.addColorStop(0.5, '#0f172a');
    dishGrad.addColorStop(1, '#1e1b4b');
    ctx.beginPath();
    ctx.roundRect(68, 226, 888, 300, 24);
    ctx.fillStyle = dishGrad;
    ctx.fill();

    // Dish Badge
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(96, 252, 170, 38, 19);
    ctx.fill();
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText('★ CHEF SPECIAL', 114, 277);

    // Graphical Dish representation inside card
    ctx.beginPath();
    ctx.arc(512, 376, 100, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Stylized gourmet plate icon
    ctx.font = '90px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🍔', 512, 408);
    ctx.textAlign = 'left';

    // Dish Details
    ctx.font = 'extrabold 42px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Artisan Flame Truffle Burger', 72, 584);

    ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Wagyu beef patty, black truffle glaze, aged cheddar, toasted brioche', 72, 626);

    // Price & Rating
    ctx.font = 'extrabold 48px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('$16.50', 72, 706);

    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('⭐ 4.95 (148 reviews)', 260, 698);

    // 5. Spice Level Selector
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Spice Profile:', 48, 800);

    const spices = ['Mild', 'Medium 🌶️', 'Hot 🌶️🌶️', 'Extra 🔥'];
    let spX = 220;
    spices.forEach((sp, idx) => {
      const active = idx === 1;
      ctx.beginPath();
      ctx.roundRect(spX, 764, 170, 48, 24);
      ctx.fillStyle = active ? '#ef4444' : 'rgba(255, 255, 255, 0.06)';
      ctx.fill();
      if (!active) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(sp, spX + 85, 795);
      ctx.textAlign = 'left';
      spX += 186;
    });

    // 6. Action Button: TOUCH TO ORDER (Animated Pulse)
    const btnY = 850;
    const pulseAlpha = 0.5 + Math.sin(pulsePhase) * 0.3;
    ctx.shadowColor = `rgba(34, 211, 238, ${pulseAlpha})`;
    ctx.shadowBlur = 30;

    const btnGrad = ctx.createLinearGradient(48, btnY, 976, btnY + 120);
    btnGrad.addColorStop(0, '#00f2fe');
    btnGrad.addColorStop(0.5, '#3b82f6');
    btnGrad.addColorStop(1, '#8b5cf6');

    ctx.beginPath();
    ctx.roundRect(48, btnY, 928, 120, 36);
    ctx.fillStyle = btnGrad;
    ctx.fill();
    ctx.shadowBlur = 0; // reset

    ctx.font = 'extrabold 38px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ TOUCH TO ORDER • ADD TO CART', 512, btnY + 74);
    ctx.textAlign = 'left';

    // 7. Split Bill & Call Waiter Floating Row
    const rowY = 1010;
    // Call Waiter Button
    ctx.beginPath();
    ctx.roundRect(48, rowY, 448, 80, 24);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#f87171';
    ctx.textAlign = 'center';
    ctx.fillText('🛎️ Call Table Service', 272, rowY + 50);

    // Split Bill Button
    ctx.beginPath();
    ctx.roundRect(528, rowY, 448, 80, 24);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.fillText('💳 Split Bill & Tipping', 752, rowY + 50);
    ctx.textAlign = 'left';

    // 8. Bottom Active Cart Dock
    ctx.beginPath();
    ctx.roundRect(48, 1130, 928, 180, 28);
    ctx.fillStyle = '#080d19';
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🛒 Current Order (2 Items Selected)', 84, 1185);

    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('1x Artisan Burger (Medium) + 1x Truffle Fries', 84, 1228);

    ctx.font = 'extrabold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText('Total: $24.50', 84, 1280);

    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.roundRect(720, 1230, 220, 56, 28);
    ctx.fill();
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('CHECKOUT →', 830, 1266);
    ctx.textAlign = 'left';

  } else {
    // KDS Mode: Kitchen Display Ticket Grid
    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(0, 0, 1024, 1360);

    // KDS Header
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 1024, 100);
    ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🍳 NEXORA KITCHEN KDS — LIVE EXPEDITE', 48, 62);

    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(940, 52, 10, 0, Math.PI * 2);
    ctx.fill();

    // Ticket Cards
    const tickets = [
      { id: '#104', table: 'Table 04', time: '1m 24s', items: ['2x Wagyu Truffle Burger', '1x Loaded Fries', '2x Lemonade'], status: 'PREPARING', col: '#eab308' },
      { id: '#103', table: 'Table 09', time: '4m 10s', items: ['1x Crispy Salmon Bowl', '1x Iced Matcha Latte'], status: 'READY', col: '#22c55e' },
      { id: '#105', table: 'Table 02', time: '0m 30s', items: ['3x Smash Cheeseburger', '3x Cola Zero'], status: 'NEW TICKET', col: '#3b82f6' },
      { id: '#102', table: 'Bar 01', time: '7m 45s', items: ['2x Mocktail Berry Fizz'], status: 'EXPEDITE', col: '#ef4444' }
    ];

    tickets.forEach((t, i) => {
      const ty = 140 + i * 290;
      ctx.beginPath();
      ctx.roundRect(48, ty, 928, 260, 24);
      ctx.fillStyle = '#111827';
      ctx.fill();
      ctx.strokeStyle = t.col;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Header inside ticket
      ctx.fillStyle = '#1f2937';
      ctx.beginPath();
      ctx.roundRect(48, ty, 928, 64, 24);
      ctx.fill();

      ctx.font = 'extrabold 30px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${t.id} • ${t.table}`, 76, ty + 44);

      ctx.fillStyle = t.col;
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(t.status, 650, ty + 44);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`⏱️ ${t.time}`, 820, ty + 44);

      // Ticket Items
      t.items.forEach((item, idx) => {
        ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText(`• ${item}`, 76, ty + 115 + idx * 42);
      });
    });
  }

  return canvas;
}

export const ThreeHero: React.FC<ThreeHeroProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL] = useState<boolean>(() => checkWebGLSupport());
  const [activeScreen, setActiveScreen] = useState<'order' | 'kds'>('order');
  const [isRotatingManually, setIsRotatingManually] = useState(false);
  const activeScreenRef = useRef<'order' | 'kds'>('order');

  useEffect(() => {
    activeScreenRef.current = activeScreen;
  }, [activeScreen]);

  useEffect(() => {
    if (!hasWebGL) return;

    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.4, 6.2);

    // 3. Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 4. Main Kiosk Assembly Group
    const kioskAssembly = new THREE.Group();
    kioskAssembly.position.set(0, -0.3, 0);
    // Initial slight welcoming angle
    kioskAssembly.rotation.y = -0.35;
    kioskAssembly.rotation.x = 0.08;
    scene.add(kioskAssembly);

    // --- A. KIOSK TABLET CHASSIS ---
    const chassisWidth = 2.4;
    const chassisHeight = 3.2;
    const chassisDepth = 0.16;

    const chassisGeo = new THREE.BoxGeometry(chassisWidth, chassisHeight, chassisDepth);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x0f1422,
      metalness: 0.9,
      roughness: 0.2
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    kioskAssembly.add(chassisMesh);

    // Neon Edge Bevel for Kiosk Body
    const chassisEdges = new THREE.EdgesGeometry(chassisGeo);
    const chassisEdgeMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65
    });
    const chassisEdgeLines = new THREE.LineSegments(chassisEdges, chassisEdgeMat);
    kioskAssembly.add(chassisEdgeLines);

    // Camera / Sensor Pill Notch on Top
    const sensorGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.25, 16);
    const sensorMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const sensorMesh = new THREE.Mesh(sensorGeo, sensorMat);
    sensorMesh.rotation.z = Math.PI / 2;
    sensorMesh.position.set(0, 1.48, 0.085);
    kioskAssembly.add(sensorMesh);

    // Bottom NFC / Barcode Scanner Glow Strip
    const nfcGeo = new THREE.BoxGeometry(0.8, 0.05, 0.04);
    const nfcMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const nfcMesh = new THREE.Mesh(nfcGeo, nfcMat);
    nfcMesh.position.set(0, -1.48, 0.085);
    kioskAssembly.add(nfcMesh);

    // --- B. VIBRANT HIGH-RES SCREEN TEXTURE ---
    let pulsePhase = 0;
    const initialCanvas = createKioskScreenCanvas(activeScreenRef.current, pulsePhase);
    const screenTexture = new THREE.CanvasTexture(initialCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    const screenGeo = new THREE.PlaneGeometry(2.26, 2.92);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.082;
    kioskAssembly.add(screenMesh);

    // Screen Glass Layer with subtle specular reflection
    const glassGeo = new THREE.PlaneGeometry(2.28, 2.94);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 0.2,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      reflectivity: 0.9,
      clearcoat: 1.0
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.z = 0.088;
    kioskAssembly.add(glassMesh);

    // --- C. COMMERCIAL KIOSK STAND & DOCK BASE ---
    // Heavy Angled Stand Arm
    const standNeckGeo = new THREE.CylinderGeometry(0.09, 0.12, 1.6, 20);
    const standNeckMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.88,
      roughness: 0.28
    });
    const standNeckMesh = new THREE.Mesh(standNeckGeo, standNeckMat);
    standNeckMesh.position.set(0, -1.2, -0.32);
    standNeckMesh.rotation.x = -0.22;
    kioskAssembly.add(standNeckMesh);

    // Architectural Base Dock
    const baseDockGeo = new THREE.CylinderGeometry(0.95, 1.1, 0.14, 32);
    const baseDockMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      metalness: 0.92,
      roughness: 0.22
    });
    const baseDockMesh = new THREE.Mesh(baseDockGeo, baseDockMat);
    baseDockMesh.position.set(0, -1.95, -0.2);
    kioskAssembly.add(baseDockMesh);

    // Ambient Glowing Neon Floor Ring
    const neonRingGeo = new THREE.RingGeometry(1.05, 1.15, 48);
    const neonRingMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const neonRingMesh = new THREE.Mesh(neonRingGeo, neonRingMat);
    neonRingMesh.rotation.x = Math.PI / 2;
    neonRingMesh.position.set(0, -2.0, -0.2);
    kioskAssembly.add(neonRingMesh);

    // Outer Violet Ambient Halo Ring
    const outerHaloGeo = new THREE.RingGeometry(1.22, 1.3, 48);
    const outerHaloMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45
    });
    const outerHaloMesh = new THREE.Mesh(outerHaloGeo, outerHaloMat);
    outerHaloMesh.rotation.x = Math.PI / 2;
    outerHaloMesh.position.set(0, -2.01, -0.2);
    kioskAssembly.add(outerHaloMesh);

    // --- D. ORBITING HOLOGRAPHIC TECH PILLS ---
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    const badgeData = [
      { color: 0x38bdf8, radius: 2.3, speed: 0.4, yOffset: 1.1, size: 0.24 },
      { color: 0xa855f7, radius: 2.5, speed: -0.35, yOffset: -0.2, size: 0.22 },
      { color: 0x34d399, radius: 2.2, speed: 0.5, yOffset: -1.0, size: 0.2 },
      { color: 0x60a5fa, radius: 2.7, speed: -0.3, yOffset: 0.5, size: 0.25 }
    ];

    const orbitalNodes: { mesh: THREE.Mesh; angle: number; radius: number; speed: number; yOffset: number }[] = [];
    badgeData.forEach((b, idx) => {
      const geo = idx % 2 === 0 ? new THREE.OctahedronGeometry(b.size, 0) : new THREE.IcosahedronGeometry(b.size, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: b.color,
        metalness: 0.8,
        roughness: 0.2,
        wireframe: true
      });
      const mesh = new THREE.Mesh(geo, mat);
      orbitalGroup.add(mesh);
      orbitalNodes.push({
        mesh,
        angle: (idx * Math.PI) / 2,
        radius: b.radius,
        speed: b.speed,
        yOffset: b.yOffset
      });
    });

    // --- E. LIGHTING RIG ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const violetRim = new THREE.PointLight(0xa855f7, 3.5, 15);
    violetRim.position.set(-4, 1, 3);
    scene.add(violetRim);

    const floorGlow = new THREE.PointLight(0x06b6d4, 2.5, 8);
    floorGlow.position.set(0, -1.8, 1);
    scene.add(floorGlow);

    // --- F. INTERACTIVE MOUSE & DRAG ROTATION ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = -0.35;
    let targetRotationX = 0.08;
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const handleMouseMoveWindow = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        targetRotationY += deltaX * 0.008;
        targetRotationX = Math.max(-0.35, Math.min(0.45, targetRotationX + deltaY * 0.006));
        prevMouse = { x: e.clientX, y: e.clientY };
      } else {
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouseX = nx;
        mouseY = ny;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsRotatingManually(true);
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
      setTimeout(() => setIsRotatingManually(false), 2500);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsRotatingManually(true);
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouse.x;
      const deltaY = e.touches[0].clientY - prevMouse.y;
      targetRotationY += deltaX * 0.008;
      targetRotationX = Math.max(-0.35, Math.min(0.45, targetRotationX + deltaY * 0.006));
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
      setTimeout(() => setIsRotatingManually(false), 2500);
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMoveWindow);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (width < 640) {
        camera.position.set(0, 0.2, 7.8);
      } else {
        camera.position.set(0, 0.4, 6.2);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Screen Texture Update Mechanism
    let lastCanvasUpdate = 0;
    let currentMode = activeScreenRef.current;

    // --- G. ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Check if screen mode toggled
      if (currentMode !== activeScreenRef.current || time - lastCanvasUpdate > 0.08) {
        currentMode = activeScreenRef.current;
        lastCanvasUpdate = time;
        pulsePhase += 0.12;
        const updatedCanvas = createKioskScreenCanvas(currentMode, pulsePhase);
        screenTexture.image = updatedCanvas;
        screenTexture.needsUpdate = true;
      }

      if (!prefersReducedMotion) {
        // Natural hover response when not manually dragging
        if (!isDragging) {
          kioskAssembly.rotation.y += (targetRotationY + mouseX * 0.35 - kioskAssembly.rotation.y) * 0.06;
          kioskAssembly.rotation.x += (targetRotationX - mouseY * 0.2 - kioskAssembly.rotation.x) * 0.06;
          // Gentle breathing float
          kioskAssembly.position.y = -0.3 + Math.sin(time * 1.5) * 0.04;
        } else {
          kioskAssembly.rotation.y += (targetRotationY - kioskAssembly.rotation.y) * 0.15;
          kioskAssembly.rotation.x += (targetRotationX - kioskAssembly.rotation.x) * 0.15;
        }

        // Orbiting Nodes
        orbitalNodes.forEach((node) => {
          node.angle += node.speed * delta;
          node.mesh.position.x = Math.cos(node.angle) * node.radius;
          node.mesh.position.z = Math.sin(node.angle) * (node.radius * 0.8) - 0.2;
          node.mesh.position.y = node.yOffset + Math.sin(time * 2 + node.angle) * 0.15;
          node.mesh.rotation.x += delta * 0.8;
          node.mesh.rotation.y += delta * 1.1;
        });

        // Pulsing Neon Floor Rings
        neonRingMat.opacity = 0.65 + Math.sin(time * 2.5) * 0.25;
        outerHaloMat.opacity = 0.35 + Math.cos(time * 2.0) * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMoveWindow);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      screenTexture.dispose();
    };
  }, [hasWebGL]);

  if (!hasWebGL) {
    return (
      <div className={`relative w-full aspect-[4/5] max-h-[560px] rounded-2xl bg-[#0b1020] border border-blue-500/30 flex flex-col items-center justify-center p-6 text-center ${className}`}>
        <Touchpad className="w-16 h-16 text-blue-400 mb-4 animate-bounce" />
        <h3 className="text-xl font-bold text-white mb-2 font-display">Smart-Kiosk Terminal</h3>
        <p className="text-sm text-slate-300 max-w-xs">
          Interactive commercial touch terminal simulator.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="relative w-full h-[460px] sm:h-[540px] lg:h-[580px] cursor-grab active:cursor-grabbing select-none"
        title="Click and drag to rotate the 3D Self-Kiosk 360°"
      />

      {/* Floating Kiosk Controls & Mode Switcher */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
        <button
          onClick={() => setActiveScreen('order')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeScreen === 'order'
              ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Switch to Table Kiosk Ordering Screen"
        >
          <UtensilsCrossed className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Self-Order Kiosk</span>
          <span className="sm:hidden">Order</span>
        </button>

        <button
          onClick={() => setActiveScreen('kds')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeScreen === 'kds'
              ? 'bg-violet-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)]'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Switch to Kitchen KDS Ticket View"
        >
          <ChefHat className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Kitchen KDS</span>
          <span className="sm:hidden">KDS</span>
        </button>
      </div>

      {/* Floating Interactive Micro-Badge Tags */}
      <div className="absolute bottom-14 left-4 z-20 hidden sm:flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 backdrop-blur-md border border-cyan-500/30 text-[11px] font-semibold text-cyan-300 shadow-md">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Interactive 3D Hardware</span>
        </div>
      </div>

      {/* Rotation Hint Bottom Bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[11px] sm:text-xs text-slate-300 font-mono flex items-center gap-2 shadow-xl whitespace-nowrap">
        <Rotate3D className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>{isRotatingManually ? 'Rotating 3D Terminal...' : '3D Self-Kiosk • Drag to Rotate 360°'}</span>
      </div>
    </div>
  );
};

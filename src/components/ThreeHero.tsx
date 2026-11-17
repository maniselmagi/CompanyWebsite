import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3D, Touchpad, ChefHat, Sparkles, Tablet } from 'lucide-react';

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

export const ThreeHero: React.FC<ThreeHeroProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL] = useState<boolean>(() => checkWebGLSupport());
  const [activeScreen, setActiveScreen] = useState<'kiosk' | 'kds'>('kiosk');
  const [isRotatingManually, setIsRotatingManually] = useState(false);
  const activeScreenRef = useRef<'kiosk' | 'kds'>('kiosk');

  useEffect(() => {
    activeScreenRef.current = activeScreen;
  }, [activeScreen]);

  useEffect(() => {
    if (!hasWebGL) return;

    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.035);

    // 2. Camera Setup (Tuned for tabletop tablet viewing)
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.25, 4.4);

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

    // 4. Main Tablet Kiosk Group
    const tabletKioskGroup = new THREE.Group();
    tabletKioskGroup.position.set(0, -0.15, 0);
    tabletKioskGroup.rotation.y = -0.32; // Welcoming 3/4 perspective
    tabletKioskGroup.rotation.x = 0.12;  // Natural tabletop ergonomic tilt
    scene.add(tabletKioskGroup);

    // --- A. AUTHENTIC TABLET HARDWARE UNIBODY (Landscape 16:10) ---
    const tabletW = 2.85;
    const tabletH = 1.78;
    const tabletD = 0.08;

    // Tablet Chassis Body
    const tabletBodyGeo = new THREE.BoxGeometry(tabletW, tabletH, tabletD);
    const tabletBodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.22
    });
    const tabletBody = new THREE.Mesh(tabletBodyGeo, tabletBodyMat);
    tabletKioskGroup.add(tabletBody);

    // Clean Chamfered Bezel Edge
    const bezelEdges = new THREE.EdgesGeometry(tabletBodyGeo);
    const bezelMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55
    });
    const bezelLines = new THREE.LineSegments(bezelEdges, bezelMat);
    tabletKioskGroup.add(bezelLines);

    // Front Camera / Optical Sensor on Top Bezel
    const camGeo = new THREE.CircleGeometry(0.02, 16);
    const camMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const camMesh = new THREE.Mesh(camGeo, camMat);
    camMesh.position.set(0, tabletH / 2 - 0.038, tabletD / 2 + 0.005);
    tabletKioskGroup.add(camMesh);

    // Side Card Reader Attachment (Contactless NFC / Magnetic Swipe Slot)
    const readerGeo = new THREE.BoxGeometry(0.06, 0.45, 0.07);
    const readerMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.3 });
    const readerMesh = new THREE.Mesh(readerGeo, readerMat);
    readerMesh.position.set(tabletW / 2 + 0.03, 0, 0);
    tabletKioskGroup.add(readerMesh);

    // Reader Active Green LED Strip
    const readerLedGeo = new THREE.BoxGeometry(0.015, 0.16, 0.02);
    const readerLedMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const readerLed = new THREE.Mesh(readerLedGeo, readerLedMat);
    readerLed.position.set(tabletW / 2 + 0.062, 0, 0.02);
    tabletKioskGroup.add(readerLed);

    // --- B. VIBRANT HIGH-RES TABLET DISPLAY CANVAS (GUARANTEED VISIBLE) ---
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1400;
    screenCanvas.height = 875;
    const ctx = screenCanvas.getContext('2d');

    const dynamicScreenTexture = new THREE.CanvasTexture(screenCanvas);
    dynamicScreenTexture.generateMipmaps = true;
    dynamicScreenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    dynamicScreenTexture.magFilter = THREE.LinearFilter;

    // Resolve Asset Paths reliably across Vite & GitHub Pages
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

    const welcomeImg = new Image();
    welcomeImg.crossOrigin = 'anonymous';
    welcomeImg.src = `${cleanBase}assets/smart_kiosk/restaurant_food_welcome.jpg`;

    const kdsImg = new Image();
    kdsImg.crossOrigin = 'anonymous';
    kdsImg.src = `${cleanBase}assets/smart_kiosk/chef_plating_welcome.jpg`;

    let pulsePhase = 0;

    const renderTabletScreen = () => {
      if (!ctx) return;
      const isOrder = activeScreenRef.current === 'kiosk';
      const bgImg = isOrder ? welcomeImg : kdsImg;

      // Base background: ALWAYS drawn first so screen is NEVER black or empty
      const baseGrad = ctx.createLinearGradient(0, 0, 1400, 875);
      baseGrad.addColorStop(0, '#0a0f1d');
      baseGrad.addColorStop(0.5, '#0f172a');
      baseGrad.addColorStop(1, '#080d19');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, 1400, 875);

      // If photo is loaded, composite it with rich luxury overlay
      if (bgImg.complete && bgImg.naturalWidth > 0) {
        ctx.drawImage(bgImg, 0, 0, 1400, 875);

        // Dark luxury vignette for high contrast readability
        const vignette = ctx.createLinearGradient(0, 0, 0, 875);
        vignette.addColorStop(0, 'rgba(7, 10, 20, 0.90)');
        vignette.addColorStop(0.4, 'rgba(7, 10, 20, 0.55)');
        vignette.addColorStop(0.7, 'rgba(7, 10, 20, 0.75)');
        vignette.addColorStop(1, 'rgba(7, 10, 20, 0.95)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, 1400, 875);
      }

      if (isOrder) {
        // --- 1. TABLET ORDERING INTERFACE ---
        // Top Navigation Header
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 1400, 80);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.fillRect(0, 79, 1400, 1.5);

        // Brand Title
        ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('NEXORA OrderEase™ Tablet Kiosk', 40, 52);

        // Table 04 Badge
        ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.beginPath();
        ctx.roundRect(620, 18, 170, 44, 22);
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#38bdf8';
        ctx.textAlign = 'center';
        ctx.fillText('TABLE 04', 705, 47);
        ctx.textAlign = 'left';

        // Online Indicator
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(825, 40, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#34d399';
        ctx.fillText('READY TO ORDER • 5 LANGUAGES', 842, 47);

        // Call Waiter Button
        ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.beginPath();
        ctx.roundRect(1180, 18, 180, 44, 22);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = 'bold 17px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#f87171';
        ctx.textAlign = 'center';
        ctx.fillText('🛎️ Call Waiter', 1270, 46);
        ctx.textAlign = 'left';

        // Welcome Hero Banner
        ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('WELCOME TO YOUR TABLE-SIDE SELF-ORDER KIOSK', 40, 145);

        ctx.font = 'extrabold 50px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Experience Modern Dining.', 40, 208);

        ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText('Browse dishes, customize spice levels & send orders instantly to the kitchen display.', 40, 248);

        // Category Pills
        const categories = ['🍔 Gourmet Burgers', '🍕 Artisan Pizza', '🥗 Healthy Bowls', '🍹 Drinks & Cocktails'];
        let cx = 40;
        categories.forEach((cat, idx) => {
          const active = idx === 0;
          ctx.beginPath();
          ctx.roundRect(cx, 285, 290, 52, 26);
          ctx.fillStyle = active ? 'rgba(37, 99, 235, 0.95)' : 'rgba(255, 255, 255, 0.1)';
          ctx.fill();
          ctx.strokeStyle = active ? '#38bdf8' : 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText(cat, cx + 145, 318);
          ctx.textAlign = 'left';
          cx += 310;
        });

        // Large Prominent Touch Button (Pulsing Glow)
        const btnY = 385;
        const pulse = 0.55 + Math.sin(pulsePhase) * 0.4;
        ctx.shadowColor = `rgba(34, 211, 238, ${pulse})`;
        ctx.shadowBlur = 35;

        const btnGrad = ctx.createLinearGradient(40, btnY, 1360, btnY + 120);
        btnGrad.addColorStop(0, '#00f2fe');
        btnGrad.addColorStop(0.5, '#3b82f6');
        btnGrad.addColorStop(1, '#8b5cf6');

        ctx.beginPath();
        ctx.roundRect(40, btnY, 1320, 120, 32);
        ctx.fillStyle = btnGrad;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        ctx.font = 'extrabold 36px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('👆 TOUCH SCREEN TO START ORDERING • EXPLORE MENU', 700, btnY + 74);
        ctx.textAlign = 'left';

        // Bottom Table Tray Summary Card
        ctx.beginPath();
        ctx.roundRect(40, 545, 1320, 285, 26);
        ctx.fillStyle = 'rgba(11, 16, 28, 0.92)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('🛒 Current Table Tray (Table 04)', 75, 595);

        ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('• 2x Wagyu Truffle Burger (Medium Spicy)', 75, 642);
        ctx.fillText('• 1x Garlic Herb Truffle Fries', 75, 682);
        ctx.fillText('• 2x Handcrafted Citrus Soda', 75, 722);

        ctx.font = 'extrabold 32px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#34d399';
        ctx.fillText('Subtotal: $38.50', 75, 785);

        // Action Buttons inside tray
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.roundRect(820, 735, 230, 60, 20);
        ctx.fill();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#38bdf8';
        ctx.textAlign = 'center';
        ctx.fillText('💳 Split Bill & Tip', 935, 772);

        ctx.fillStyle = '#16a34a';
        ctx.beginPath();
        ctx.roundRect(1070, 735, 260, 60, 20);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('🚀 Send to Kitchen →', 1200, 772);
        ctx.textAlign = 'left';

      } else {
        // --- 2. KITCHEN KDS MODE ---
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 1400, 80);
        ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('🍳 ORDER-EASE KITCHEN KDS — LIVE EXPEDITE LINE', 40, 52);

        const tickets = [
          { id: '#104', table: 'Table 04', time: '1m 30s', status: 'PREPARING', col: '#eab308', items: ['2x Wagyu Truffle Burger', '1x Truffle Fries', '2x Citrus Soda'] },
          { id: '#103', table: 'Table 09', time: '4m 15s', status: 'READY', col: '#22c55e', items: ['1x Salmon Poke Bowl', '1x Iced Matcha Latte'] },
          { id: '#105', table: 'Table 02', time: '0m 45s', status: 'NEW TICKET', col: '#3b82f6', items: ['3x Smash Cheeseburger', '3x Cola Zero'] }
        ];

        tickets.forEach((t, i) => {
          const tx = 40 + i * 440;
          ctx.beginPath();
          ctx.roundRect(tx, 110, 410, 720, 24);
          ctx.fillStyle = '#111827';
          ctx.fill();
          ctx.strokeStyle = t.col;
          ctx.lineWidth = 2.5;
          ctx.stroke();

          ctx.fillStyle = '#1f2937';
          ctx.beginPath();
          ctx.roundRect(tx, 110, 410, 70, 24);
          ctx.fill();

          ctx.font = 'extrabold 26px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(t.id, tx + 20, 155);

          ctx.fillStyle = t.col;
          ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
          ctx.fillText(t.status, tx + 180, 155);

          ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = '#38bdf8';
          ctx.fillText(t.table, tx + 20, 230);

          ctx.fillStyle = '#9ca3af';
          ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
          ctx.fillText(`⏱️ Elapsed: ${t.time}`, tx + 20, 270);

          t.items.forEach((item, idx) => {
            ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
            ctx.fillStyle = '#e2e8f0';
            ctx.fillText(`• ${item}`, tx + 20, 340 + idx * 55);
          });
        });
      }

      dynamicScreenTexture.needsUpdate = true;
    };

    welcomeImg.onload = () => renderTabletScreen();
    kdsImg.onload = () => renderTabletScreen();
    // Render immediately on initial execution so screen is NEVER blank
    renderTabletScreen();

    // Screen Mesh: Placed safely IN FRONT of tablet body (tabletD / 2 = 0.04, screen at +0.045)
    // Using MeshBasicMaterial with toneMapped: false guarantees 100% full illumination
    const screenGeo = new THREE.PlaneGeometry(tabletW - 0.16, tabletH - 0.16);
    const screenMat = new THREE.MeshBasicMaterial({
      map: dynamicScreenTexture,
      toneMapped: false
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0, tabletD / 2 + 0.005);
    tabletKioskGroup.add(screenMesh);

    // --- C. COMMERCIAL TABLETOP POS WEDGE CRADLE (NO PC MONITOR POLE) ---
    const dockGroup = new THREE.Group();
    tabletKioskGroup.add(dockGroup);

    // Rear Mounting Plate
    const backMountGeo = new THREE.BoxGeometry(1.6, 1.0, 0.08);
    const backMountMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.3 });
    const backMount = new THREE.Mesh(backMountGeo, backMountMat);
    backMount.position.set(0, 0, -0.06);
    dockGroup.add(backMount);

    // Angled Tabletop Easel Wedge
    const wedgeGeo = new THREE.CylinderGeometry(0.55, 0.75, 0.9, 4);
    const wedgeMat = new THREE.MeshStandardMaterial({
      color: 0x0d1322,
      metalness: 0.92,
      roughness: 0.22
    });
    const tableWedge = new THREE.Mesh(wedgeGeo, wedgeMat);
    tableWedge.rotation.y = Math.PI / 4;
    tableWedge.rotation.x = -0.32;
    tableWedge.position.set(0, -0.55, -0.35);
    dockGroup.add(tableWedge);

    // Tabletop Base Dock Plate
    const basePlateGeo = new THREE.BoxGeometry(1.9, 0.08, 1.4);
    const basePlateMat = new THREE.MeshStandardMaterial({
      color: 0x090d18,
      metalness: 0.95,
      roughness: 0.2
    });
    const basePlate = new THREE.Mesh(basePlateGeo, basePlateMat);
    basePlate.position.set(0, -0.98, -0.25);
    dockGroup.add(basePlate);

    // Glowing Neon Tabletop Contact Rim
    const tableRimGeo = new THREE.RingGeometry(0.85, 0.92, 48);
    const tableRimMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const tableRim = new THREE.Mesh(tableRimGeo, tableRimMat);
    tableRim.rotation.x = Math.PI / 2;
    tableRim.position.set(0, -1.02, -0.25);
    dockGroup.add(tableRim);

    // Outer Violet Ambient Halo Ring
    const outerHaloGeo = new THREE.RingGeometry(1.05, 1.12, 48);
    const outerHaloMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45
    });
    const outerHalo = new THREE.Mesh(outerHaloGeo, outerHaloMat);
    outerHalo.rotation.x = Math.PI / 2;
    outerHalo.position.set(0, -1.03, -0.25);
    dockGroup.add(outerHalo);

    // --- D. ORBITING HOLOGRAPHIC TECH PILLS ---
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    const badgeData = [
      { color: 0x38bdf8, radius: 2.5, speed: 0.45, yOffset: 0.7, size: 0.2 },
      { color: 0xa855f7, radius: 2.7, speed: -0.35, yOffset: -0.2, size: 0.18 },
      { color: 0x34d399, radius: 2.3, speed: 0.5, yOffset: -0.7, size: 0.16 },
      { color: 0x60a5fa, radius: 2.8, speed: -0.3, yOffset: 0.35, size: 0.22 }
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const violetRim = new THREE.PointLight(0xa855f7, 3.8, 15);
    violetRim.position.set(-4, 1, 3);
    scene.add(violetRim);

    const tableGlow = new THREE.PointLight(0x06b6d4, 2.8, 8);
    tableGlow.position.set(0, -0.9, 1);
    scene.add(tableGlow);

    // --- F. INTERACTIVE MOUSE & DRAG ROTATION ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = -0.32;
    let targetRotationX = 0.12;
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
        camera.position.set(0, 0.2, 5.2);
      } else {
        camera.position.set(0, 0.25, 4.4);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // --- G. ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let lastPulseUpdate = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Periodic screen pulse update (keeps breathing effect active)
      if (time - lastPulseUpdate > 0.08) {
        lastPulseUpdate = time;
        pulsePhase += 0.12;
        renderTabletScreen();
      }

      if (!prefersReducedMotion) {
        if (!isDragging) {
          tabletKioskGroup.rotation.y += (targetRotationY + mouseX * 0.32 - tabletKioskGroup.rotation.y) * 0.06;
          tabletKioskGroup.rotation.x += (targetRotationX - mouseY * 0.18 - tabletKioskGroup.rotation.x) * 0.06;
          tabletKioskGroup.position.y = -0.15 + Math.sin(time * 1.5) * 0.03;
        } else {
          tabletKioskGroup.rotation.y += (targetRotationY - tabletKioskGroup.rotation.y) * 0.15;
          tabletKioskGroup.rotation.x += (targetRotationX - tabletKioskGroup.rotation.x) * 0.15;
        }

        orbitalNodes.forEach((node) => {
          node.angle += node.speed * delta;
          node.mesh.position.x = Math.cos(node.angle) * node.radius;
          node.mesh.position.z = Math.sin(node.angle) * (node.radius * 0.8) - 0.2;
          node.mesh.position.y = node.yOffset + Math.sin(time * 2 + node.angle) * 0.12;
          node.mesh.rotation.x += delta * 0.8;
          node.mesh.rotation.y += delta * 1.1;
        });

        tableRimMat.opacity = 0.65 + Math.sin(time * 2.5) * 0.25;
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
      dynamicScreenTexture.dispose();
    };
  }, [hasWebGL]);

  if (!hasWebGL) {
    return (
      <div className={`relative w-full aspect-[4/3] max-h-[520px] rounded-2xl bg-[#0b1020] border border-blue-500/30 flex flex-col items-center justify-center p-6 text-center ${className}`}>
        <Touchpad className="w-16 h-16 text-blue-400 mb-4 animate-bounce" />
        <h3 className="text-xl font-bold text-white mb-2 font-display">Tablet Self-Ordering Kiosk</h3>
        <p className="text-sm text-slate-300 max-w-xs">
          Interactive commercial tablet touch terminal simulator.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="relative w-full h-[440px] sm:h-[480px] lg:h-[520px] cursor-grab active:cursor-grabbing select-none"
        title="Click and drag to rotate the 3D Tablet Kiosk 360°"
      />

      {/* Floating Kiosk Controls & Mode Switcher */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
        <button
          onClick={() => setActiveScreen('kiosk')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeScreen === 'kiosk'
              ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Switch to Tablet Ordering Screen"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tablet Kiosk</span>
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
          <span>Restaurant Table Tablet Hardware</span>
        </div>
      </div>

      {/* Rotation Hint Bottom Bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[11px] sm:text-xs text-slate-300 font-mono flex items-center gap-2 shadow-xl whitespace-nowrap">
        <Rotate3D className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>{isRotatingManually ? 'Rotating 3D Tablet Kiosk...' : '3D Tablet Kiosk • Drag to Rotate 360°'}</span>
      </div>
    </div>
  );
};

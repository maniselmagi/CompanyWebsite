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

/**
 * High-DPI Landscape Canvas Renderer for Tablet-Based Self-Ordering Kiosk
 * Generates an ultra-crisp 16:10 tablet touch screen UI (1600x1000)
 */
function createTabletKioskCanvas(mode: 'order' | 'kds', pulsePhase: number = 0): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  if (mode === 'order') {
    // 1. Tablet Dark Luxury Canvas Background
    const bgGrad = ctx.createLinearGradient(0, 0, 1600, 1000);
    bgGrad.addColorStop(0, '#090d18');
    bgGrad.addColorStop(0.5, '#0c1326');
    bgGrad.addColorStop(1, '#060911');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1600, 1000);

    // Subtle Radial Glow behind active dish
    const radial = ctx.createRadialGradient(500, 480, 50, 500, 480, 550);
    radial.addColorStop(0, 'rgba(59, 130, 246, 0.22)');
    radial.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 1600, 1000);

    // 2. Top Tablet Navigation Header
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1600, 80);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(0, 79, 1600, 1.5);

    // Brand & Tablet ID
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('NEXORA SMART TABLET KIOSK', 40, 52);

    // Table Pill
    ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.beginPath();
    ctx.roundRect(580, 20, 160, 42, 21);
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('TABLE 04', 660, 48);
    ctx.textAlign = 'left';

    // Status Indicator
    ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.beginPath();
    ctx.roundRect(760, 20, 220, 42, 21);
    ctx.fill();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(785, 41, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText('ACTIVE • TOUCH READY', 805, 48);

    // Multilingual & Call Staff Header Actions
    ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('🌐 EN | தமிழ் | HI | ES', 1030, 49);

    // Call Waiter Button in Header
    ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
    ctx.beginPath();
    ctx.roundRect(1370, 18, 190, 44, 22);
    ctx.fill();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = 'bold 17px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#f87171';
    ctx.textAlign = 'center';
    ctx.fillText('🛎️ Call Waiter', 1465, 46);
    ctx.textAlign = 'left';

    // 3. Category Selector Bar (Landscape)
    const categories = ['🍔 ALL MAINS', '🍟 SIDES & EXTRAS', '🥗 FRESH BOWLS', '🥤 DRINKS & SHAKES'];
    let catX = 40;
    categories.forEach((cat, index) => {
      const isSelected = index === 0;
      const w = 230;
      ctx.beginPath();
      ctx.roundRect(catX, 105, w, 50, 25);
      if (isSelected) {
        const catGrad = ctx.createLinearGradient(catX, 105, catX + w, 155);
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

      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = isSelected ? '#ffffff' : '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText(cat, catX + w / 2, 137);
      ctx.textAlign = 'left';
      catX += w + 16;
    });

    // 4. MAIN COLUMN (Left Side, 1010px): Featured Dish Showcase
    ctx.beginPath();
    ctx.roundRect(40, 175, 990, 785, 28);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.35)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dish Graphic Showcase Box
    const dishBoxGrad = ctx.createLinearGradient(60, 195, 1010, 480);
    dishBoxGrad.addColorStop(0, '#1e293b');
    dishBoxGrad.addColorStop(0.5, '#0f172a');
    dishBoxGrad.addColorStop(1, '#1e1b4b');
    ctx.beginPath();
    ctx.roundRect(60, 195, 950, 310, 22);
    ctx.fillStyle = dishBoxGrad;
    ctx.fill();

    // Chef Pick Badge
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(85, 218, 160, 36, 18);
    ctx.fill();
    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText('★ CHEF SPECIAL', 102, 242);

    // Large Food Graphic / Icon Platter
    ctx.font = '120px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🍔', 535, 375);
    ctx.textAlign = 'left';

    // Dish Headline & Description
    ctx.font = 'extrabold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Artisan Wagyu Truffle Burger', 60, 560);

    ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Toasted brioche, 100% Japanese Wagyu patty, black truffle glaze, melted vintage cheddar & house aioli', 60, 600);

    // Price & Ratings
    ctx.font = 'extrabold 44px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('$16.50', 60, 675);

    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('⭐ 4.95 (148 reviews)', 230, 668);

    // Spice Level Customizer
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Customize Spice Profile:', 60, 740);

    const spices = ['Mild', 'Medium 🌶️', 'Hot 🌶️🌶️', 'Extra Hot 🔥'];
    let spX = 320;
    spices.forEach((sp, idx) => {
      const active = idx === 1;
      ctx.beginPath();
      ctx.roundRect(spX, 708, 155, 44, 22);
      ctx.fillStyle = active ? '#ef4444' : 'rgba(255, 255, 255, 0.06)';
      ctx.fill();
      if (!active) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(sp, spX + 77, 736);
      ctx.textAlign = 'left';
      spX += 170;
    });

    // Big Animated Tablet Touch Button
    const btnY = 800;
    const pulseAlpha = 0.5 + Math.sin(pulsePhase) * 0.35;
    ctx.shadowColor = `rgba(34, 211, 238, ${pulseAlpha})`;
    ctx.shadowBlur = 28;

    const btnGrad = ctx.createLinearGradient(60, btnY, 1010, btnY + 110);
    btnGrad.addColorStop(0, '#00f2fe');
    btnGrad.addColorStop(0.5, '#3b82f6');
    btnGrad.addColorStop(1, '#8b5cf6');

    ctx.beginPath();
    ctx.roundRect(60, btnY, 950, 110, 28);
    ctx.fillStyle = btnGrad;
    ctx.fill();
    ctx.shadowBlur = 0; // reset

    ctx.font = 'extrabold 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ TAP TABLET TO ORDER • ADD TO TICKET ($16.50)', 535, btnY + 68);
    ctx.textAlign = 'left';

    // 5. RIGHT COLUMN (510px): Live Table Cart & Split-Bill Dock
    ctx.beginPath();
    ctx.roundRect(1050, 175, 510, 785, 28);
    ctx.fillStyle = '#0a0f1d';
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Cart Header
    ctx.fillStyle = '#111827';
    ctx.beginPath();
    ctx.roundRect(1050, 175, 510, 75, 28);
    ctx.fill();

    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🛒 Table 04 Cart (3 Items)', 1080, 222);

    // Cart Item Lines
    const cartItems = [
      { name: '1x Wagyu Truffle Burger (Med)', price: '$16.50', sub: 'Extra Aged Cheddar' },
      { name: '1x Garlic Parmesan Fries', price: '$5.50', sub: 'Truffle Mayo Dip' },
      { name: '1x Handcrafted Berry Soda', price: '$4.50', sub: 'Less Ice' }
    ];

    cartItems.forEach((item, idx) => {
      const iy = 285 + idx * 105;
      ctx.beginPath();
      ctx.roundRect(1075, iy, 460, 85, 18);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = 'bold 19px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(item.name, 1095, iy + 35);

      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(item.price, 1450, iy + 35);

      ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(item.sub, 1095, iy + 65);
    });

    // Subtotal & Calculations
    const calcY = 630;
    ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Items Subtotal:', 1080, calcY);
    ctx.fillText('$26.50', 1470, calcY);

    ctx.fillText('Tax & Service:', 1080, calcY + 35);
    ctx.fillText('$2.40', 1475, calcY + 35);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(1080, calcY + 60);
    ctx.lineTo(1520, calcY + 60);
    ctx.stroke();

    ctx.font = 'extrabold 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Total:', 1080, calcY + 105);
    ctx.fillStyle = '#34d399';
    ctx.fillText('$28.90', 1430, calcY + 105);

    // Split Bill Button
    ctx.beginPath();
    ctx.roundRect(1075, 765, 460, 60, 20);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('💳 Split Bill & Tip at Table', 1305, 802);

    // Send Order to Kitchen Button
    ctx.beginPath();
    ctx.roundRect(1075, 845, 460, 85, 24);
    ctx.fillStyle = '#16a34a';
    ctx.fill();

    ctx.font = 'extrabold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🚀 SEND TO KITCHEN KDS →', 1305, 897);
    ctx.textAlign = 'left';

  } else {
    // Landscape KDS Kitchen Line Mode
    ctx.fillStyle = '#090d18';
    ctx.fillRect(0, 0, 1600, 1000);

    // KDS Header
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1600, 85);
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🍳 NEXORA KITCHEN KDS — LIVE LINE EXPEDITE', 40, 54);

    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(1540, 45, 10, 0, Math.PI * 2);
    ctx.fill();

    // 4 Ticket Columns
    const tickets = [
      { id: '#104', table: 'Table 04', time: '1m 24s', items: ['2x Wagyu Truffle Burger', '1x Truffle Mayo Fries', '2x Berry Soda'], status: 'PREPARING', col: '#eab308' },
      { id: '#103', table: 'Table 09', time: '4m 10s', items: ['1x Crispy Salmon Bowl', '1x Iced Matcha Latte'], status: 'READY', col: '#22c55e' },
      { id: '#105', table: 'Table 02', time: '0m 30s', items: ['3x Smash Cheeseburger', '3x Cola Zero'], status: 'NEW TICKET', col: '#3b82f6' },
      { id: '#102', table: 'Bar 01', time: '7m 45s', items: ['2x Mocktail Citrus Fizz', '1x Edamame Bowl'], status: 'EXPEDITE', col: '#ef4444' }
    ];

    tickets.forEach((t, i) => {
      const tx = 40 + i * 385;
      ctx.beginPath();
      ctx.roundRect(tx, 120, 360, 820, 24);
      ctx.fillStyle = '#111827';
      ctx.fill();
      ctx.strokeStyle = t.col;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#1f2937';
      ctx.beginPath();
      ctx.roundRect(tx, 120, 360, 80, 24);
      ctx.fill();

      ctx.font = 'extrabold 26px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(t.id, tx + 24, 168);

      ctx.fillStyle = t.col;
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(t.status, tx + 130, 168);

      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(t.table, tx + 24, 240);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`⏱️ Elapsed: ${t.time}`, tx + 24, 275);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(tx + 24, 295);
      ctx.lineTo(tx + 336, 295);
      ctx.stroke();

      // Items
      t.items.forEach((item, idx) => {
        ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText(`• ${item}`, tx + 24, 345 + idx * 55);
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

    // 2. Camera: Optimized perspective for landscape tablet
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.35, 5.2);

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

    // 4. Main Tablet Assembly Group
    const tabletAssembly = new THREE.Group();
    // Position tablet in 3D space with natural ergonomic tabletop viewing angle
    tabletAssembly.position.set(0, -0.15, 0);
    tabletAssembly.rotation.y = -0.32; // Welcoming 3/4 perspective
    tabletAssembly.rotation.x = 0.12;  // Slight ergonomic tabletop backward tilt
    scene.add(tabletAssembly);

    // --- A. LANDSCAPE TABLET HARDWARE UNIBODY ---
    // Tablet Aspect Ratio: 16:10 landscape (width 3.1, height 1.94, depth 0.09)
    const tabletWidth = 3.1;
    const tabletHeight = 1.94;
    const tabletDepth = 0.09;

    const tabletChassisGeo = new THREE.BoxGeometry(tabletWidth, tabletHeight, tabletDepth);
    const tabletChassisMat = new THREE.MeshStandardMaterial({
      color: 0x0f1524,
      metalness: 0.92,
      roughness: 0.22
    });
    const tabletChassis = new THREE.Mesh(tabletChassisGeo, tabletChassisMat);
    tabletAssembly.add(tabletChassis);

    // Sleek Chamfered Bezel Line
    const bezelEdges = new THREE.EdgesGeometry(tabletChassisGeo);
    const bezelEdgeMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6
    });
    const bezelLineMesh = new THREE.LineSegments(bezelEdges, bezelEdgeMat);
    tabletAssembly.add(bezelLineMesh);

    // Front Camera / Sensor Pinhole
    const camGeo = new THREE.CircleGeometry(0.022, 16);
    const camMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const camMesh = new THREE.Mesh(camGeo, camMat);
    camMesh.position.set(0, tabletHeight / 2 - 0.045, tabletDepth / 2 + 0.001);
    tabletAssembly.add(camMesh);

    // Tablet Power / Lock Button on Top Edge
    const btnGeo = new THREE.BoxGeometry(0.22, 0.02, 0.04);
    const btnMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 });
    const pwrBtn = new THREE.Mesh(btnGeo, btnMat);
    pwrBtn.position.set(0.9, tabletHeight / 2 + 0.01, 0);
    tabletAssembly.add(pwrBtn);

    // Side NFC Tap-to-Pay Module
    const nfcGeo = new THREE.BoxGeometry(0.04, 0.45, 0.06);
    const nfcMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const nfcModule = new THREE.Mesh(nfcGeo, nfcMat);
    nfcModule.position.set(tabletWidth / 2 + 0.015, 0, 0);
    tabletAssembly.add(nfcModule);

    // --- B. VIBRANT HIGH-RES TABLET DISPLAY ---
    let pulsePhase = 0;
    const initialCanvas = createTabletKioskCanvas(activeScreenRef.current, pulsePhase);
    const screenTexture = new THREE.CanvasTexture(initialCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    // Screen Dimensions: Ultra-thin bezels
    const screenGeo = new THREE.PlaneGeometry(2.96, 1.8);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = tabletDepth / 2 + 0.001;
    tabletAssembly.add(screenMesh);

    // Front Glass Layer with specular reflection
    const glassGeo = new THREE.PlaneGeometry(2.98, 1.82);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      opacity: 0.18,
      transparent: true,
      roughness: 0.08,
      metalness: 0.1,
      reflectivity: 0.95,
      clearcoat: 1.0
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.z = tabletDepth / 2 + 0.006;
    tabletAssembly.add(glassMesh);

    // --- C. COMMERCIAL TABLETOP SWIVEL STAND & TABLE DOCK ---
    // Swivel Hinge / Ball Mount on back of tablet
    const mountGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.14, 24);
    const mountMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.25 });
    const mountMesh = new THREE.Mesh(mountGeo, mountMat);
    mountMesh.rotation.x = Math.PI / 2;
    mountMesh.position.set(0, 0, -0.1);
    tabletAssembly.add(mountMesh);

    // Angled Stand Neck (Bent for ergonomic dining table touch angle)
    const standNeckGeo = new THREE.CylinderGeometry(0.085, 0.11, 1.25, 20);
    const standNeckMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.88,
      roughness: 0.25
    });
    const standNeckMesh = new THREE.Mesh(standNeckGeo, standNeckMat);
    standNeckMesh.position.set(0, -0.62, -0.36);
    standNeckMesh.rotation.x = -0.38;
    tabletAssembly.add(standNeckMesh);

    // Tabletop Weighted Base Dock
    const tableBaseGeo = new THREE.CylinderGeometry(0.85, 0.98, 0.1, 32);
    const tableBaseMat = new THREE.MeshStandardMaterial({
      color: 0x090d18,
      metalness: 0.95,
      roughness: 0.2
    });
    const tableBaseMesh = new THREE.Mesh(tableBaseGeo, tableBaseMat);
    tableBaseMesh.position.set(0, -1.22, -0.32);
    tabletAssembly.add(tableBaseMesh);

    // Ambient Glowing Neon Floor / Tabletop Ring
    const neonRingGeo = new THREE.RingGeometry(0.95, 1.05, 48);
    const neonRingMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const neonRingMesh = new THREE.Mesh(neonRingGeo, neonRingMat);
    neonRingMesh.rotation.x = Math.PI / 2;
    neonRingMesh.position.set(0, -1.26, -0.32);
    tabletAssembly.add(neonRingMesh);

    // Outer Violet Ambient Halo Ring
    const outerHaloGeo = new THREE.RingGeometry(1.12, 1.2, 48);
    const outerHaloMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45
    });
    const outerHaloMesh = new THREE.Mesh(outerHaloGeo, outerHaloMat);
    outerHaloMesh.rotation.x = Math.PI / 2;
    outerHaloMesh.position.set(0, -1.27, -0.32);
    tabletAssembly.add(outerHaloMesh);

    // --- D. ORBITING HOLOGRAPHIC TECH PILLS ---
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    const badgeData = [
      { color: 0x38bdf8, radius: 2.6, speed: 0.45, yOffset: 0.8, size: 0.22 },
      { color: 0xa855f7, radius: 2.8, speed: -0.35, yOffset: -0.2, size: 0.2 },
      { color: 0x34d399, radius: 2.4, speed: 0.5, yOffset: -0.8, size: 0.18 },
      { color: 0x60a5fa, radius: 2.9, speed: -0.3, yOffset: 0.4, size: 0.24 }
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.4);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const violetRim = new THREE.PointLight(0xa855f7, 3.6, 15);
    violetRim.position.set(-4, 1, 3);
    scene.add(violetRim);

    const tableGlow = new THREE.PointLight(0x06b6d4, 2.5, 8);
    tableGlow.position.set(0, -1.2, 1);
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
        camera.position.set(0, 0.25, 6.2);
      } else {
        camera.position.set(0, 0.35, 5.2);
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

      // Check if screen mode toggled or periodic pulse
      if (currentMode !== activeScreenRef.current || time - lastCanvasUpdate > 0.08) {
        currentMode = activeScreenRef.current;
        lastCanvasUpdate = time;
        pulsePhase += 0.12;
        const updatedCanvas = createTabletKioskCanvas(currentMode, pulsePhase);
        screenTexture.image = updatedCanvas;
        screenTexture.needsUpdate = true;
      }

      if (!prefersReducedMotion) {
        // Natural hover response when not manually dragging
        if (!isDragging) {
          tabletAssembly.rotation.y += (targetRotationY + mouseX * 0.35 - tabletAssembly.rotation.y) * 0.06;
          tabletAssembly.rotation.x += (targetRotationX - mouseY * 0.2 - tabletAssembly.rotation.x) * 0.06;
          // Gentle tabletop breathing float
          tabletAssembly.position.y = -0.15 + Math.sin(time * 1.5) * 0.035;
        } else {
          tabletAssembly.rotation.y += (targetRotationY - tabletAssembly.rotation.y) * 0.15;
          tabletAssembly.rotation.x += (targetRotationX - tabletAssembly.rotation.x) * 0.15;
        }

        // Orbiting Nodes
        orbitalNodes.forEach((node) => {
          node.angle += node.speed * delta;
          node.mesh.position.x = Math.cos(node.angle) * node.radius;
          node.mesh.position.z = Math.sin(node.angle) * (node.radius * 0.8) - 0.2;
          node.mesh.position.y = node.yOffset + Math.sin(time * 2 + node.angle) * 0.14;
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
      <div className={`relative w-full aspect-[4/3] max-h-[540px] rounded-2xl bg-[#0b1020] border border-blue-500/30 flex flex-col items-center justify-center p-6 text-center ${className}`}>
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
        className="relative w-full h-[440px] sm:h-[500px] lg:h-[540px] cursor-grab active:cursor-grabbing select-none"
        title="Click and drag to rotate the 3D Tablet Kiosk 360°"
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
          <span>Commercial Tablet Hardware 3D</span>
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

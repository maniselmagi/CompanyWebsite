import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3D, Touchpad, ChefHat, Sparkles, ShoppingBag } from 'lucide-react';

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
 * Creates the high-DPI vertical touchscreen display canvas for the standing self-order kiosk
 */
function createKioskScreen(mode: 'order' | 'kds', pulsePhase: number = 0): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 960;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  if (mode === 'order') {
    // 1. Dark Luxury Kiosk Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1440);
    bgGrad.addColorStop(0, '#090d18');
    bgGrad.addColorStop(0.4, '#0d1326');
    bgGrad.addColorStop(1, '#050811');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 960, 1440);

    // Subtle Radial Glow behind active dish card
    const radial = ctx.createRadialGradient(480, 500, 40, 480, 500, 480);
    radial.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
    radial.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 960, 1440);

    // 2. Top Kiosk Navigation Header
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 960, 95);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 94, 960, 2);

    ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('NEXORA SELF-ORDER', 45, 60);

    // Terminal Badge
    ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.beginPath();
    ctx.roundRect(520, 24, 180, 48, 24);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('KIOSK #01', 610, 54);
    ctx.textAlign = 'left';

    // Online Status Indicator
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(740, 48, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText('READY • 5 LANGS', 760, 55);

    // 3. Category Selector Bar (Pills)
    const categories = ['🍔 ALL MAINS', '🍟 COMBOS', '🥤 DRINKS', '🍰 DESSERT'];
    let catX = 45;
    categories.forEach((cat, idx) => {
      const active = idx === 0;
      const w = 202;
      ctx.beginPath();
      ctx.roundRect(catX, 125, w, 60, 30);
      if (active) {
        const catGrad = ctx.createLinearGradient(catX, 125, catX + w, 185);
        catGrad.addColorStop(0, '#2563eb');
        catGrad.addColorStop(1, '#7c3aed');
        ctx.fillStyle = catGrad;
        ctx.fill();
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.font = 'bold 19px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = active ? '#ffffff' : '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText(cat, catX + w / 2, 162);
      ctx.textAlign = 'left';
      catX += w + 20;
    });

    // 4. Featured Hero Dish Card
    ctx.beginPath();
    ctx.roundRect(45, 215, 870, 580, 32);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Dish Graphic Display Box
    const dishGrad = ctx.createLinearGradient(45, 215, 915, 550);
    dishGrad.addColorStop(0, '#1e293b');
    dishGrad.addColorStop(0.5, '#0f172a');
    dishGrad.addColorStop(1, '#1e1b4b');
    ctx.beginPath();
    ctx.roundRect(65, 235, 830, 320, 24);
    ctx.fillStyle = dishGrad;
    ctx.fill();

    // Chef Pick Badge
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(95, 260, 180, 42, 21);
    ctx.fill();
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText('★ CHEF SPECIAL', 115, 287);

    // Large Illustrated Gourmet Food Icon
    ctx.font = '130px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🍔', 480, 420);
    ctx.textAlign = 'left';

    // Dish Details
    ctx.font = 'extrabold 42px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Artisan Flame Truffle Burger', 75, 615);

    ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('100% Wagyu beef patty, shaved black truffles, aged cheddar on brioche', 75, 660);

    // Price & Rating
    ctx.font = 'extrabold 52px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('$14.99', 75, 745);

    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('⭐ 4.95 (148 reviews)', 290, 735);

    // 5. Spice Level Selector Row
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Spice Profile:', 45, 845);

    const spices = ['Mild', 'Medium 🌶️', 'Hot 🌶️🌶️', 'Extra 🔥'];
    let spX = 220;
    spices.forEach((sp, idx) => {
      const active = idx === 1;
      ctx.beginPath();
      ctx.roundRect(spX, 810, 160, 50, 25);
      ctx.fillStyle = active ? '#ef4444' : 'rgba(255, 255, 255, 0.08)';
      ctx.fill();
      if (!active) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(sp, spX + 80, 842);
      ctx.textAlign = 'left';
      spX += 175;
    });

    // 6. Large Animated "TOUCH TO ORDER" Button (Pulsing Glow)
    const btnY = 900;
    const pulseAlpha = 0.55 + Math.sin(pulsePhase) * 0.4;
    ctx.shadowColor = `rgba(34, 211, 238, ${pulseAlpha})`;
    ctx.shadowBlur = 38;

    const btnGrad = ctx.createLinearGradient(45, btnY, 915, btnY + 130);
    btnGrad.addColorStop(0, '#00f2fe');
    btnGrad.addColorStop(0.5, '#3b82f6');
    btnGrad.addColorStop(1, '#8b5cf6');

    ctx.beginPath();
    ctx.roundRect(45, btnY, 870, 130, 36);
    ctx.fillStyle = btnGrad;
    ctx.fill();
    ctx.shadowBlur = 0; // reset

    ctx.font = 'extrabold 38px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('👆 TOUCH TO ORDER NOW • ADD TO CART', 480, btnY + 80);
    ctx.textAlign = 'left';

    // 7. Split Bill & Call Staff Action Row
    const actY = 1065;
    ctx.beginPath();
    ctx.roundRect(45, actY, 420, 80, 24);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#f87171';
    ctx.textAlign = 'center';
    ctx.fillText('🛎️ Call Table Staff', 255, actY + 50);

    ctx.beginPath();
    ctx.roundRect(495, actY, 420, 80, 24);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.fillText('💳 Split Bill & Tipping', 705, actY + 50);
    ctx.textAlign = 'left';

    // 8. Bottom Active Cart Tray
    const cartY = 1180;
    ctx.beginPath();
    ctx.roundRect(45, cartY, 870, 210, 28);
    ctx.fillStyle = '#080d19';
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🛒 Current Order Tray (2 Items)', 85, cartY + 55);

    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('1x Artisan Truffle Burger + 1x Truffle Herb Fries', 85, cartY + 100);

    ctx.font = 'extrabold 38px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText('Total: $22.49', 85, cartY + 165);

    // Pay with Card CTA
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.roundRect(610, cartY + 115, 275, 65, 32);
    ctx.fill();

    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('TAP TO PAY →', 747, cartY + 156);
    ctx.textAlign = 'left';

  } else {
    // KDS Mode: Kitchen Display Ticket Grid
    ctx.fillStyle = '#090d18';
    ctx.fillRect(0, 0, 960, 1440);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 960, 110);
    ctx.font = 'bold 34px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🍳 ORDER-EASE KITCHEN KDS — LIVE LINE', 45, 68);

    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(890, 58, 12, 0, Math.PI * 2);
    ctx.fill();

    const tickets = [
      { id: '#104', table: 'Kiosk 01', time: '1m 24s', items: ['2x Wagyu Truffle Burger', '1x Loaded Fries', '2x Lemonade'], status: 'PREPARING', col: '#eab308' },
      { id: '#103', table: 'Table 09', time: '4m 10s', items: ['1x Crispy Salmon Bowl', '1x Iced Matcha Latte'], status: 'READY', col: '#22c55e' },
      { id: '#105', table: 'Table 02', time: '0m 30s', items: ['3x Smash Cheeseburger', '3x Cola Zero'], status: 'NEW TICKET', col: '#3b82f6' },
      { id: '#102', table: 'Bar 01', time: '7m 45s', items: ['2x Mocktail Berry Fizz'], status: 'EXPEDITE', col: '#ef4444' }
    ];

    tickets.forEach((t, i) => {
      const ty = 145 + i * 310;
      ctx.beginPath();
      ctx.roundRect(45, ty, 870, 280, 24);
      ctx.fillStyle = '#111827';
      ctx.fill();
      ctx.strokeStyle = t.col;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#1f2937';
      ctx.beginPath();
      ctx.roundRect(45, ty, 870, 70, 24);
      ctx.fill();

      ctx.font = 'extrabold 30px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${t.id} • ${t.table}`, 75, ty + 46);

      ctx.fillStyle = t.col;
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(t.status, 600, ty + 46);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`⏱️ ${t.time}`, 760, ty + 46);

      t.items.forEach((item, idx) => {
        ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText(`• ${item}`, 75, ty + 120 + idx * 45);
      });
    });
  }

  return canvas;
}

/**
 * Procedural 3D Gourmet Burger Mesh for floating food showcase
 */
function create3DBurgerMesh(): THREE.Group {
  const burgerGroup = new THREE.Group();

  // 1. Top Sesame Bun
  const topBunGeo = new THREE.SphereGeometry(0.35, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const topBunMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    roughness: 0.45,
    metalness: 0.1
  });
  const topBun = new THREE.Mesh(topBunGeo, topBunMat);
  topBun.scale.set(1, 0.55, 1);
  topBun.position.y = 0.12;
  burgerGroup.add(topBun);

  // Sesame seeds on top bun
  const seedGeo = new THREE.SphereGeometry(0.015, 8, 8);
  const seedMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.3 });
  for (let i = 0; i < 14; i++) {
    const seed = new THREE.Mesh(seedGeo, seedMat);
    const theta = (i / 14) * Math.PI * 2;
    const r = 0.18 + (i % 3) * 0.05;
    seed.position.set(Math.cos(theta) * r, 0.22, Math.sin(theta) * r);
    seed.scale.set(1.5, 0.8, 1);
    burgerGroup.add(seed);
  }

  // 2. Green Lettuce Layer
  const lettuceGeo = new THREE.CylinderGeometry(0.38, 0.39, 0.03, 16);
  const lettuceMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.6 });
  const lettuce = new THREE.Mesh(lettuceGeo, lettuceMat);
  lettuce.position.y = 0.07;
  burgerGroup.add(lettuce);

  // 3. Melted Cheddar Cheese Layer (Diamond rotated)
  const cheeseGeo = new THREE.BoxGeometry(0.5, 0.02, 0.5);
  const cheeseMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.35 });
  const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
  cheese.rotation.y = Math.PI / 4;
  cheese.position.y = 0.04;
  burgerGroup.add(cheese);

  // 4. Grilled Beef Patty
  const pattyGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.08, 20);
  const pattyMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.85 });
  const patty = new THREE.Mesh(pattyGeo, pattyMat);
  patty.position.y = -0.01;
  burgerGroup.add(patty);

  // 5. Bottom Toasted Bun
  const bottomBunGeo = new THREE.CylinderGeometry(0.34, 0.32, 0.08, 20);
  const bottomBunMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.45 });
  const bottomBun = new THREE.Mesh(bottomBunGeo, bottomBunMat);
  bottomBun.position.y = -0.09;
  burgerGroup.add(bottomBun);

  return burgerGroup;
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

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.035);

    // 2. Camera Setup (Tuned for commercial standing kiosk viewing)
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.2, 5.8);

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
    kioskAssembly.rotation.y = -0.15; // Welcoming angle displaying touchscreen front & center
    scene.add(kioskAssembly);

    // --- A. COMMERCIAL STANDING SELF-ORDER KIOSK TOTEM ---
    const totemW = 2.0;
    const totemH = 3.3;
    const totemD = 0.22;

    // Main Kiosk Pillar Body (Dark Obsidian Titanium)
    const totemGeo = new THREE.BoxGeometry(totemW, totemH, totemD);
    const totemMat = new THREE.MeshStandardMaterial({
      color: 0x0c1324,
      metalness: 0.9,
      roughness: 0.22
    });
    const totemMesh = new THREE.Mesh(totemGeo, totemMat);
    kioskAssembly.add(totemMesh);

    // Neon Bevel Edge Lines tracing the kiosk totem
    const totemEdges = new THREE.EdgesGeometry(totemGeo);
    const totemEdgeMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65
    });
    const totemEdgeLines = new THREE.LineSegments(totemEdges, totemEdgeMat);
    kioskAssembly.add(totemEdgeLines);

    // --- B. VIBRANT SELF-ILLUMINATING PORTRAIT TOUCHSCREEN ---
    let pulsePhase = 0;
    const initialCanvas = createKioskScreen(activeScreenRef.current, pulsePhase);
    const screenTexture = new THREE.CanvasTexture(initialCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    const screenW = 1.82;
    const screenH = 2.65;
    const screenGeo = new THREE.PlaneGeometry(screenW, screenH);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.18, totemD / 2 + 0.005);
    kioskAssembly.add(screenMesh);

    // --- C. ATTACHED HARDWARE MODULES ---
    // 1. Side POS Payment Terminal (Keypad & Contactless NFC Pad)
    const posMountArm = new THREE.BoxGeometry(0.25, 0.08, 0.12);
    const posMountMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85 });
    const posMount = new THREE.Mesh(posMountArm, posMountMat);
    posMount.position.set(totemW / 2 + 0.12, 0.15, 0);
    kioskAssembly.add(posMount);

    // Payment Terminal Body (Angled 45° for guest payment)
    const posBodyGeo = new THREE.BoxGeometry(0.18, 0.42, 0.09);
    const posBodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.88, roughness: 0.3 });
    const posBody = new THREE.Mesh(posBodyGeo, posBodyMat);
    posBody.position.set(totemW / 2 + 0.24, 0.15, 0.04);
    posBody.rotation.y = -0.4;
    kioskAssembly.add(posBody);

    // Contactless Tap-to-Pay LED Indicator
    const nfcLedGeo = new THREE.BoxGeometry(0.02, 0.1, 0.02);
    const nfcLedMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const nfcLed = new THREE.Mesh(nfcLedGeo, nfcLedMat);
    nfcLed.position.set(totemW / 2 + 0.3, 0.28, 0.08);
    kioskAssembly.add(nfcLed);

    // 2. Receipt Dispenser Slot at bottom
    const printerSlotGeo = new THREE.BoxGeometry(0.65, 0.03, 0.05);
    const printerSlotMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
    const printerSlot = new THREE.Mesh(printerSlotGeo, printerSlotMat);
    printerSlot.position.set(0, -1.22, totemD / 2 + 0.005);
    kioskAssembly.add(printerSlot);

    // Hanging Printed Receipt Paper
    const receiptGeo = new THREE.PlaneGeometry(0.48, 0.28);
    const receiptMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.8,
      side: THREE.DoubleSide
    });
    const receiptMesh = new THREE.Mesh(receiptGeo, receiptMat);
    receiptMesh.position.set(0, -1.36, totemD / 2 + 0.02);
    receiptMesh.rotation.x = -0.15;
    kioskAssembly.add(receiptMesh);

    // 3. Top Beacon Light Dome (Ready Indicator)
    const beaconGeo = new THREE.SphereGeometry(0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0, totemH / 2 + 0.01, 0);
    kioskAssembly.add(beacon);

    // 4. Commercial Architectural Floor Base
    const baseGeo = new THREE.BoxGeometry(2.3, 0.12, 1.4);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x080d19,
      metalness: 0.95,
      roughness: 0.2
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.set(0, -totemH / 2 - 0.06, 0);
    kioskAssembly.add(baseMesh);

    // Floor Glowing Neon Ring
    const floorRingGeo = new THREE.RingGeometry(1.2, 1.35, 48);
    const floorRingMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const floorRing = new THREE.Mesh(floorRingGeo, floorRingMat);
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.set(0, -totemH / 2 - 0.11, 0);
    kioskAssembly.add(floorRing);

    // Outer Violet Ambient Halo Ring
    const outerHaloGeo = new THREE.RingGeometry(1.45, 1.55, 48);
    const outerHaloMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45
    });
    const outerHalo = new THREE.Mesh(outerHaloGeo, outerHaloMat);
    outerHalo.rotation.x = Math.PI / 2;
    outerHalo.position.set(0, -totemH / 2 - 0.12, 0);
    kioskAssembly.add(outerHalo);

    // --- D. 3D FLOATING GOURMET FOOD & DRINK MESHES (PARALLAX) ---
    const burgerMesh = create3DBurgerMesh();
    burgerMesh.position.set(1.9, 0.6, 0.5);
    burgerMesh.scale.set(1.2, 1.2, 1.2);
    scene.add(burgerMesh);

    // Translucent Drink Cup Model
    const cupGroup = new THREE.Group();
    const cupBodyGeo = new THREE.CylinderGeometry(0.18, 0.13, 0.55, 20);
    const cupBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transmission: 0.85,
      opacity: 0.45,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1
    });
    const cupBody = new THREE.Mesh(cupBodyGeo, cupBodyMat);
    cupGroup.add(cupBody);

    const lidGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.04, 20);
    const lidMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const lid = new THREE.Mesh(lidGeo, lidMat);
    lid.position.y = 0.28;
    cupGroup.add(lid);

    // Neon Pink Straw
    const strawGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.5, 12);
    const strawMat = new THREE.MeshBasicMaterial({ color: 0xec4899 });
    const straw = new THREE.Mesh(strawGeo, strawMat);
    straw.rotation.z = 0.25;
    straw.position.set(0.04, 0.4, 0);
    cupGroup.add(straw);

    cupGroup.position.set(-1.8, -0.4, 0.4);
    scene.add(cupGroup);

    // --- E. ORBITING HOLOGRAPHIC TECH PILLS ---
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    const badgeData = [
      { color: 0x38bdf8, radius: 2.5, speed: 0.45, yOffset: 1.1, size: 0.2 },
      { color: 0xa855f7, radius: 2.7, speed: -0.35, yOffset: -0.2, size: 0.18 },
      { color: 0x34d399, radius: 2.4, speed: 0.5, yOffset: -0.9, size: 0.18 },
      { color: 0x60a5fa, radius: 2.8, speed: -0.3, yOffset: 0.4, size: 0.22 }
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

    // --- F. LIGHTING RIG ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.6);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const violetRim = new THREE.PointLight(0xa855f7, 3.8, 15);
    violetRim.position.set(-4, 1, 3);
    scene.add(violetRim);

    const floorGlow = new THREE.PointLight(0x06b6d4, 2.8, 8);
    floorGlow.position.set(0, -1.8, 1);
    scene.add(floorGlow);

    // --- ATMOSPHERIC 3D VOLUMETRIC EMBERS (LUSION-STYLE AMBIENCE) ---
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      particleSpeeds[i] = 0.2 + Math.random() * 0.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // --- G. INTERACTIVE MOUSE & DRAG ROTATION ---
    const defaultRotationY = -0.15;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = defaultRotationY;
    let targetRotationX = 0;
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    const handleMouseMoveWindow = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        targetRotationY += deltaX * 0.008;
        targetRotationX = Math.max(-0.25, Math.min(0.25, targetRotationX + deltaY * 0.005));
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
      if (resetTimer) clearTimeout(resetTimer);
      isDragging = true;
      setIsRotatingManually(true);
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        setIsRotatingManually(false);
        targetRotationY = defaultRotationY;
        targetRotationX = 0;
      }, 3500);
    };

    const handleDblClick = () => {
      targetRotationY = defaultRotationY;
      targetRotationX = 0;
      setIsRotatingManually(false);
    };

    // Responsive Touch Handler with Native Page Scroll Passthrough
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        if (resetTimer) clearTimeout(resetTimer);
        isDragging = true;
        setIsRotatingManually(true);
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouse.x;
      const deltaY = e.touches[0].clientY - prevMouse.y;

      // If user is swiping vertically to scroll down page, release drag!
      if (Math.abs(deltaY) > Math.abs(deltaX) * 1.25) {
        isDragging = false;
        return;
      }

      targetRotationY += deltaX * 0.008;
      targetRotationX = Math.max(-0.25, Math.min(0.25, targetRotationX + deltaY * 0.005));
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        setIsRotatingManually(false);
        targetRotationY = defaultRotationY;
        targetRotationX = 0;
      }, 3500);
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('dblclick', handleDblClick);
    window.addEventListener('mousemove', handleMouseMoveWindow);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    // Responsive Resize & Device Viewport Tuning (Mobile, Tablet, Desktop)
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (width < 480) {
        // Small Mobile Screens
        camera.position.set(0, 0.1, 7.8);
        burgerMesh.position.set(1.05, 1.25, 0.2);
        burgerMesh.scale.set(0.72, 0.72, 0.72);
        cupGroup.position.set(-1.05, -1.15, 0.2);
        cupGroup.scale.set(0.65, 0.65, 0.65);
        kioskAssembly.scale.set(0.86, 0.86, 0.86);
      } else if (width < 768) {
        // Standard Mobile / Phablets
        camera.position.set(0, 0.12, 6.9);
        burgerMesh.position.set(1.25, 1.1, 0.3);
        burgerMesh.scale.set(0.85, 0.85, 0.85);
        cupGroup.position.set(-1.25, -0.9, 0.3);
        cupGroup.scale.set(0.75, 0.75, 0.75);
        kioskAssembly.scale.set(0.92, 0.92, 0.92);
      } else if (width < 1024) {
        // Tablet Screens (iPad 768px - 1024px)
        camera.position.set(0, 0.16, 6.2);
        burgerMesh.position.set(1.5, 0.8, 0.35);
        burgerMesh.scale.set(1.0, 1.0, 1.0);
        cupGroup.position.set(-1.5, -0.6, 0.35);
        cupGroup.scale.set(0.85, 0.85, 0.85);
        kioskAssembly.scale.set(0.96, 0.96, 0.96);
      } else {
        // Desktop Screens (1024px+)
        camera.position.set(0, 0.2, 5.8);
        burgerMesh.position.set(1.9, 0.6, 0.5);
        burgerMesh.scale.set(1.2, 1.2, 1.2);
        cupGroup.position.set(-1.8, -0.4, 0.4);
        cupGroup.scale.set(1.0, 1.0, 1.0);
        kioskAssembly.scale.set(1.0, 1.0, 1.0);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Screen Texture Update Mechanism
    let lastCanvasUpdate = 0;
    let currentMode = activeScreenRef.current;

    // --- H. ANIMATION LOOP ---
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
        const updatedCanvas = createKioskScreen(currentMode, pulsePhase);
        screenTexture.image = updatedCanvas;
        screenTexture.needsUpdate = true;
      }

      if (!prefersReducedMotion) {
        // Natural hover response when not manually dragging
        if (!isDragging) {
          kioskAssembly.rotation.y += (targetRotationY + mouseX * 0.32 - kioskAssembly.rotation.y) * 0.06;
          kioskAssembly.rotation.x += (targetRotationX - mouseY * 0.15 - kioskAssembly.rotation.x) * 0.06;
          kioskAssembly.position.y = -0.3 + Math.sin(time * 1.5) * 0.035;
        } else {
          kioskAssembly.rotation.y += (targetRotationY - kioskAssembly.rotation.y) * 0.15;
          kioskAssembly.rotation.x += (targetRotationX - kioskAssembly.rotation.x) * 0.15;
        }

        // Floating 3D Burger: Gentle float and spin
        burgerMesh.rotation.y += delta * 0.8;
        burgerMesh.position.y = 0.6 + Math.sin(time * 2.0) * 0.08;

        // Floating 3D Drink Cup: Gentle bobbing
        cupGroup.rotation.y -= delta * 0.6;
        cupGroup.position.y = -0.4 + Math.cos(time * 1.8) * 0.06;

        // Orbiting Tech Nodes
        orbitalNodes.forEach((node) => {
          node.angle += node.speed * delta;
          node.mesh.position.x = Math.cos(node.angle) * node.radius;
          node.mesh.position.z = Math.sin(node.angle) * (node.radius * 0.8) - 0.2;
          node.mesh.position.y = node.yOffset + Math.sin(time * 2 + node.angle) * 0.14;
          node.mesh.rotation.x += delta * 0.8;
          node.mesh.rotation.y += delta * 1.1;
        });

        // Pulsing Neon Floor Rings
        floorRingMat.opacity = 0.65 + Math.sin(time * 2.5) * 0.25;
        outerHaloMat.opacity = 0.35 + Math.cos(time * 2.0) * 0.15;

        // Dynamic key light parallax tracking
        keyLight.position.x = 4 + mouseX * 1.5;
        keyLight.position.y = 5 - mouseY * 1.2;

        // Atmospheric 3D particle drift
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < particleCount; i++) {
          let py = posAttr.getY(i);
          py += particleSpeeds[i] * delta * 0.4;
          if (py > 3.5) py = -3.5;
          posAttr.setY(i, py);
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resetTimer) clearTimeout(resetTimer);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('dblclick', handleDblClick);
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
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [hasWebGL]);

  if (!hasWebGL) {
    return (
      <div className={`relative w-full aspect-[4/5] max-h-[520px] rounded-2xl bg-[#0b1020] border border-blue-500/30 flex flex-col items-center justify-center p-6 text-center ${className}`}>
        <Touchpad className="w-16 h-16 text-blue-400 mb-4 animate-bounce" />
        <h3 className="text-xl font-bold text-white mb-2 font-display">Commercial Self-Order Kiosk</h3>
        <p className="text-sm text-slate-300 max-w-xs">
          Interactive commercial touch terminal simulator.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* 3D WebGL Canvas Container with Cinematic Height & Touch-Action */}
      <div 
        ref={mountRef} 
        className="relative w-full h-[420px] sm:h-[500px] md:h-[580px] lg:h-[640px] cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'pan-y' }}
        title="Click and drag horizontally to rotate the 3D Self-Order Kiosk 360°"
      />

      {/* Floating Kiosk Controls & Mode Switcher (Fully Responsive) */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
        <button
          onClick={() => setActiveScreen('order')}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
            activeScreen === 'order'
              ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Switch to Self-Order Screen"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span className="hidden xs:inline sm:inline">Self-Order Kiosk</span>
          <span className="xs:hidden sm:hidden">Order</span>
        </button>

        <button
          onClick={() => setActiveScreen('kds')}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
            activeScreen === 'kds'
              ? 'bg-violet-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)]'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Switch to Kitchen KDS Ticket View"
        >
          <ChefHat className="w-3.5 h-3.5" />
          <span className="hidden xs:inline sm:inline">Kitchen KDS</span>
          <span className="xs:hidden sm:hidden">KDS</span>
        </button>
      </div>

      {/* Floating Interactive Micro-Badge Tags */}
      <div className="absolute bottom-12 sm:bottom-14 left-3 sm:left-4 z-20 hidden sm:flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 backdrop-blur-md border border-cyan-500/30 text-[11px] font-semibold text-cyan-300 shadow-md">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Interactive 3D Self-Order Terminal</span>
        </div>
      </div>

      {/* Rotation Hint Bottom Bar */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3.5 sm:px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs text-slate-300 font-mono flex items-center gap-2 shadow-xl whitespace-nowrap">
        <Rotate3D className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>{isRotatingManually ? 'Rotating 3D Kiosk Station...' : '3D Kiosk • Drag to Rotate 360°'}</span>
      </div>
    </div>
  );
};

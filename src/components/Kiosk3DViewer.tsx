import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3D, ExternalLink, Touchpad, CheckCircle2 } from 'lucide-react';

interface Kiosk3DViewerProps {
  className?: string;
  showDetails?: boolean;
}

export const Kiosk3DViewer: React.FC<Kiosk3DViewerProps> = ({ 
  className = '',
  showDetails = true 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeScreen, setActiveScreen] = useState<'kiosk' | 'kds'>('kiosk');
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Three.js Scene Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 4.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    const isMobileDevice = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileDevice ? 1.25 : 1.75));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Kiosk 3D Group
    const kioskGroup = new THREE.Group();
    kioskGroup.position.y = -0.15;
    scene.add(kioskGroup);

    // 1. Tablet Body (Chassis)
    const bodyGeometry = new THREE.BoxGeometry(2.3, 1.5, 0.12);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x111625,
      metalness: 0.9,
      roughness: 0.25
    });
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    kioskGroup.add(bodyMesh);

    // Subtle edge highlight
    const bodyEdges = new THREE.EdgesGeometry(bodyGeometry);
    const bodyLineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.4
    });
    const bodyLines = new THREE.LineSegments(bodyEdges, bodyLineMaterial);
    kioskGroup.add(bodyLines);

    // 2. Texture for Screen
    const textureLoader = new THREE.TextureLoader();
    const kioskTexturePath = activeScreen === 'kiosk' 
      ? './assets/smart_kiosk/restaurant_food_welcome.jpg'
      : './assets/smart_kiosk/chef_plating_welcome.jpg';

    const screenTexture = textureLoader.load(kioskTexturePath);
    screenTexture.generateMipmaps = true;

    const screenGeometry = new THREE.PlaneGeometry(2.14, 1.34);
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false
    });
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.z = 0.065;
    kioskGroup.add(screenMesh);

    // 3. Tablet Stand / Hardware Base Dock
    const standNeckGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.8, 16);
    const standNeckMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.3 });
    const standNeck = new THREE.Mesh(standNeckGeo, standNeckMat);
    standNeck.position.set(0, -0.65, -0.2);
    standNeck.rotation.x = -0.25;
    kioskGroup.add(standNeck);

    const baseGeo = new THREE.CylinderGeometry(0.65, 0.75, 0.08, 24);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
    const standBase = new THREE.Mesh(baseGeo, baseMat);
    standBase.position.set(0, -1.05, -0.1);
    kioskGroup.add(standBase);

    // Base glowing ring
    const ringGeo = new THREE.RingGeometry(0.72, 0.76, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, -1.08, -0.1);
    kioskGroup.add(ringMesh);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x60a5fa, 2.5);
    keyLight.position.set(3, 3, 4);
    scene.add(keyLight);

    const violetRim = new THREE.PointLight(0xa855f7, 2.8, 10);
    violetRim.position.set(-3, -1, 2);
    scene.add(violetRim);

    // 5. Interactive Drag & Mouse Orbit
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      kioskGroup.rotation.y += deltaX * 0.008;
      kioskGroup.rotation.x = Math.max(-0.4, Math.min(0.4, kioskGroup.rotation.x + deltaY * 0.005));

      rotationVelocity = { x: deltaY * 0.005, y: deltaX * 0.008 };
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    // Touch event support for tablets/mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      // Allow natural vertical page scroll on touchscreens
      if (Math.abs(deltaY) > Math.abs(deltaX) * 1.25) {
        isDragging = false;
        return;
      }

      kioskGroup.rotation.y += deltaX * 0.008;
      kioskGroup.rotation.x = Math.max(-0.4, Math.min(0.4, kioskGroup.rotation.x + deltaY * 0.005));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Responsive Resize Handler (Mobile, Tablet, Desktop)
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (width < 640) {
        camera.position.set(0, 0.3, 5.0);
      } else if (width < 1024) {
        camera.position.set(0, 0.35, 4.5);
      } else {
        camera.position.set(0, 0.4, 4.2);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation Loop with Visibility Pausing
    let animationFrameId = 0;
    let clock = new THREE.Clock();
    let isIntersecting = false;

    const animate = () => {
      if (!isIntersecting || document.hidden || document.body.classList.contains('mobile-menu-active')) {
        animationFrameId = 0;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging && !prefersReducedMotion) {
        // Apply inertia decay
        rotationVelocity.x *= 0.95;
        rotationVelocity.y *= 0.95;
        kioskGroup.rotation.y += rotationVelocity.y;
        kioskGroup.rotation.x += rotationVelocity.x;

        // Auto gentle breathing rotation when not dragged
        if (Math.abs(rotationVelocity.y) < 0.001) {
          const t = clock.getElapsedTime();
          kioskGroup.rotation.y = Math.sin(t * 0.6) * 0.35;
          kioskGroup.rotation.x = Math.sin(t * 0.4) * 0.08 - 0.05;
        }
      }

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !animationFrameId) {
          clock.start();
          animate();
        } else if (!isIntersecting && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      } else if (isIntersecting && !animationFrameId) {
        clock.start();
        animate();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      bodyGeometry.dispose();
      bodyMaterial.dispose();
      bodyEdges.dispose();
      bodyLineMaterial.dispose();
      screenGeometry.dispose();
      screenMaterial.dispose();
      screenTexture.dispose();
      standNeckGeo.dispose();
      standNeckMat.dispose();
      baseGeo.dispose();
      baseMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [activeScreen]);

  return (
    <div className={`relative rounded-3xl bg-gradient-to-br from-[#0c1222] to-[#070b16] border border-blue-500/30 shadow-2xl overflow-hidden p-4 sm:p-6 ${className}`}>
      {/* 3D Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08] relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Rotate3D className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>Interactive 3D Hardware Simulator</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                WebGL 60FPS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Drag or swipe to rotate tablet enclosure in 360° space
            </p>
          </div>
        </div>

        {/* Screen View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveScreen('kiosk')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeScreen === 'kiosk'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Table Kiosk View
          </button>
          <button
            onClick={() => setActiveScreen('kds')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeScreen === 'kds'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Culinary Menu View
          </button>
        </div>
      </div>

      {/* 3D Canvas Mount with Touch-Action */}
      <div 
        ref={mountRef}
        className="relative w-full h-[280px] sm:h-[360px] md:h-[400px] cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
        style={{ touchAction: 'pan-y' }}
      >
        <div ref={mountRef} className="w-full h-full" />

        {/* Drag Hint Overlay */}
        {!isInteracting && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 animate-bounce">
            <Touchpad className="w-3.5 h-3.5 text-blue-400" />
            <span>Click & Drag to Rotate in 3D</span>
          </div>
        )}
      </div>

      {/* Hardware & Spec Badges */}
      {showDetails && (
        <div className="pt-4 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10 text-xs">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>10.1" IPS Touch</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">High-Contrast Dining Mode</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
              <span>Heavy Table Dock</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Commercial Counterweight</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sub-50ms Sync</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Live Kitchen Ticket Bus</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <a
              href="https://maniselmagi.github.io/smart-kiosk-demo/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Launch Live App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="text-[11px] text-slate-400 mt-0.5">24/7 Cloud Demo URL</div>
          </div>
        </div>
      )}
    </div>
  );
};

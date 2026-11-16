import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

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

  useEffect(() => {
    if (!hasWebGL) return;

    const container = mountRef.current;
    if (!container) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.045);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    // Renderer
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

    // Group for the 3D Monolith & Orbiting Elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central 3D Digital Terminal Monolith (Software/Kiosk inspired)
    // Tablet / Screen Glass Box
    const screenGeometry = new THREE.BoxGeometry(2.4, 3.4, 0.16);
    const screenMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0c1326,
      metalness: 0.85,
      roughness: 0.15,
      transmission: 0.45,
      thickness: 0.6,
      transparent: true,
      opacity: 0.92,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    mainGroup.add(screenMesh);

    // Luminous Screen Bezel Rim
    const bezelGeometry = new THREE.BoxGeometry(2.44, 3.44, 0.14);
    const bezelEdges = new THREE.EdgesGeometry(bezelGeometry);
    const bezelMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.75
    });
    const bezelLines = new THREE.LineSegments(bezelEdges, bezelMaterial);
    mainGroup.add(bezelLines);

    // Inner Glowing UI Wireframe Lattice
    const latticeGeometry = new THREE.PlaneGeometry(2.1, 3.1, 4, 6);
    const latticeEdges = new THREE.EdgesGeometry(latticeGeometry);
    const latticeMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.45
    });
    const latticeLines = new THREE.LineSegments(latticeEdges, latticeMaterial);
    latticeLines.position.z = 0.09;
    mainGroup.add(latticeLines);

    // 2. Surrounding Orbital 3D Geometric Nodes (Representing modular services & components)
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    const nodeGeometries = [
      new THREE.OctahedronGeometry(0.32, 0),
      new THREE.IcosahedronGeometry(0.28, 0),
      new THREE.TetrahedronGeometry(0.3, 0),
      new THREE.BoxGeometry(0.35, 0.35, 0.35)
    ];

    const nodeMaterials = [
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.7,
        roughness: 0.2,
        wireframe: true
      }),
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        metalness: 0.6,
        roughness: 0.2,
        wireframe: true
      }),
      new THREE.MeshStandardMaterial({
        color: 0x60a5fa,
        metalness: 0.8,
        roughness: 0.3
      }),
      new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        metalness: 0.8,
        roughness: 0.25
      })
    ];

    const orbitalNodes: { mesh: THREE.Mesh; angle: number; radius: number; speed: number; yOffset: number }[] = [];
    const nodeCount = 6;
    for (let i = 0; i < nodeCount; i++) {
      const geo = nodeGeometries[i % nodeGeometries.length];
      const mat = nodeMaterials[i % nodeMaterials.length];
      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.8 + (i % 3) * 0.45;
      const speed = 0.003 + (i % 2) * 0.002;
      const yOffset = ((i % 3) - 1) * 0.9;

      orbitalNodes.push({ mesh, angle, radius, speed, yOffset });
      orbitalGroup.add(mesh);
    }

    // 3. Ambient Starfield / Micro-Particle Cloud (Technology depth)
    const particleCount = 220;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8 - 1;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 4. Lighting Rig (Electric Blue & Violet Highlights)
    const ambientLight = new THREE.AmbientLight(0x0a1128, 1.8);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 3.5, 20);
    blueLight.position.set(4, 3, 4);
    scene.add(blueLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 3.2, 20);
    violetLight.position.set(-4, -2, 3);
    scene.add(violetLight);

    const cyanRimLight = new THREE.DirectionalLight(0x06b6d4, 1.2);
    cyanRimLight.position.set(0, 5, -2);
    scene.add(cyanRimLight);

    // 5. Mouse Interaction Tracking (Smooth Damped Easing)
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      targetRotationY = x * 0.85;
      targetRotationX = -y * 0.65;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation Loop (60 FPS with lerp interpolation)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Damped mouse rotation
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;

        // Base continuous gentle float & tilt
        mainGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.6) * 0.08;
        mainGroup.rotation.y = currentRotationY + Math.cos(elapsedTime * 0.5) * 0.12;
        mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.12;

        // Animate orbital nodes
        orbitalNodes.forEach((node, idx) => {
          node.angle += node.speed;
          node.mesh.position.x = Math.cos(node.angle) * node.radius;
          node.mesh.position.z = Math.sin(node.angle) * node.radius;
          node.mesh.position.y = node.yOffset + Math.sin(elapsedTime + idx) * 0.15;
          node.mesh.rotation.x += 0.01;
          node.mesh.rotation.y += 0.015;
        });

        // Slow particle drift
        particleSystem.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js resources
      screenGeometry.dispose();
      screenMaterial.dispose();
      bezelGeometry.dispose();
      bezelMaterial.dispose();
      latticeGeometry.dispose();
      latticeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      nodeGeometries.forEach((g) => g.dispose());
      nodeMaterials.forEach((m) => m.dispose());

      renderer.dispose();
    };
  }, [hasWebGL]);

  // WebGL Fallback: CSS 3D Monolith
  if (!hasWebGL) {
    return (
      <div className={`relative flex items-center justify-center p-8 ${className}`}>
        <div className="relative w-72 h-96 rounded-3xl bg-gradient-to-br from-blue-950/40 to-violet-950/30 border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.3)] backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
            <span className="text-2xl font-mono">3D</span>
          </div>
          <div className="text-sm font-semibold text-white">NEXORA Software Architecture</div>
          <div className="text-xs text-slate-400">Interactive Commercial Kiosk & Touch Systems</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[420px] sm:h-[520px] lg:h-[600px] overflow-hidden ${className}`}
      aria-label="Interactive 3D Technology Visualization"
    />
  );
};

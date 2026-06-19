import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// --- Deterministic Noise for procedural land & clouds ---
function noise(x: number, y: number): number {
  const sx = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return sx - Math.floor(sx);
}

function smoothNoise(x: number, y: number): number {
  let value = 0;
  let scale = 1;
  let weight = 0.5;
  for (let o = 0; o < 3; o++) {
    const nx = x * scale;
    const ny = y * scale;
    const ix = Math.floor(nx);
    const iy = Math.floor(ny);
    const fx = nx - ix;
    const fy = ny - iy;
    
    const a = noise(ix, iy);
    const b = noise(ix + 1, iy);
    const c = noise(ix, iy + 1);
    const d = noise(ix + 1, iy + 1);
    
    const ux = fx * fx * (3 - 2 * fx);
    const uy = fy * fy * (3 - 2 * fy);
    
    const lerped = (1 - ux) * (1 - uy) * a +
                   ux * (1 - uy) * b +
                   (1 - ux) * uy * c +
                   ux * uy * d;
                   
    value += lerped * weight;
    scale *= 2.0;
    weight *= 0.5;
  }
  return value;
}

// --- High-Fidelity World Map Generator ---
function generateEarthTextures() {
  const width = 1024;
  const height = 512;
  
  const dayCanvas = document.createElement('canvas');
  dayCanvas.width = width;
  dayCanvas.height = height;
  const dayCtx = dayCanvas.getContext('2d')!;
  
  const nightCanvas = document.createElement('canvas');
  nightCanvas.width = width;
  nightCanvas.height = height;
  const nightCtx = nightCanvas.getContext('2d')!;

  const specCanvas = document.createElement('canvas');
  specCanvas.width = width;
  specCanvas.height = height;
  const specCtx = specCanvas.getContext('2d')!;
  
  // 1. Base Oceans
  dayCtx.fillStyle = '#091535'; // Deep Ocean Blue
  dayCtx.fillRect(0, 0, width, height);
  
  nightCtx.fillStyle = '#000000'; // Dark side ocean
  nightCtx.fillRect(0, 0, width, height);

  specCtx.fillStyle = '#ffffff'; // Oceans reflect light (high specularity)
  specCtx.fillRect(0, 0, width, height);
  
  // Continents coordinates
  const continents = [
    // North America
    [
      [-168, 65], [-160, 70], [-120, 75], [-90, 75], [-80, 80], [-60, 60], [-50, 50],
      [-55, 45], [-80, 25], [-80, 9], [-90, 16], [-100, 20], [-110, 23], [-115, 33],
      [-125, 48], [-140, 60]
    ],
    // South America
    [
      [-80, 9], [-72, 10], [-50, -5], [-35, -7], [-40, -20], [-60, -45], [-72, -56],
      [-75, -45], [-70, -20], [-80, -5]
    ],
    // Africa
    [
      [-17, 32], [-5, 36], [10, 37], [25, 33], [32, 31], [34, 27], [43, 12], [51, 11],
      [46, -22], [34, -34], [19, -34], [10, 5], [-15, 5]
    ],
    // Eurasia
    [
      [-10, 36], [0, 50], [10, 60], [30, 70], [60, 75], [100, 77], [140, 77], [170, 70],
      [170, 40], [140, 35], [120, 10], [105, 5], [95, 20], [80, 8], [70, 20], [45, 12],
      [35, 30], [15, 31], [-10, 36]
    ],
    // Australia
    [
      [113, -26], [115, -35], [135, -38], [148, -38], [152, -32], [142, -11], [130, -12],
      [120, -15]
    ],
    // Greenland
    [
      [-73, 78], [-60, 83], [-10, 80], [-20, 70], [-40, 60], [-50, 60]
    ]
  ];
  
  function drawContinent(ctx: CanvasRenderingContext2D, poly: number[][]) {
    ctx.beginPath();
    for (let i = 0; i < poly.length; i++) {
      const nextIdx = (i + 1) % poly.length;
      const p1 = poly[i];
      const p2 = poly[nextIdx];
      
      const steps = 12;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const lon = p1[0] * (1 - t) + p2[0] * t;
        const lat = p1[1] * (1 - t) + p2[1] * t;
        
        const disp = (smoothNoise(lon * 0.4, lat * 0.4) - 0.5) * 4.0;
        const finalLon = lon + disp;
        const finalLat = lat + disp;
        
        const x = ((finalLon + 180) / 360) * width;
        const y = (1 - (finalLat + 90) / 180) * height;
        
        if (s === 0 && i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    }
    ctx.closePath();
    ctx.fill();
  }
  
  // Land Base Mask
  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = width;
  maskCanvas.height = height;
  const maskCtx = maskCanvas.getContext('2d')!;
  maskCtx.fillStyle = '#ffffff';
  continents.forEach(poly => drawContinent(maskCtx, poly));
  
  // Paint day landmasses (greenish-blue land)
  dayCtx.fillStyle = '#0f2954';
  continents.forEach(poly => drawContinent(dayCtx, poly));

  // Paint specular map land (land does not reflect specular light)
  specCtx.fillStyle = '#000000';
  continents.forEach(poly => drawContinent(specCtx, poly));

  // Layer a beautiful dot-matrix pattern over land
  dayCtx.fillStyle = 'rgba(96, 165, 250, 0.45)';
  const step = 4;
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const maskPixel = maskCtx.getImageData(x, y, 1, 1).data[0];
      if (maskPixel > 128) {
        dayCtx.beginPath();
        dayCtx.arc(x, y, 1.1, 0, Math.PI * 2);
        dayCtx.fill();
      }
    }
  }
  
  // Faint Grid lines on day texture
  dayCtx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
  dayCtx.lineWidth = 0.5;
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = (1 - (lat + 90) / 180) * height;
    dayCtx.beginPath();
    dayCtx.moveTo(0, y);
    dayCtx.lineTo(width, y);
    dayCtx.stroke();
  }
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * width;
    dayCtx.beginPath();
    dayCtx.moveTo(x, 0);
    dayCtx.lineTo(x, height);
    dayCtx.stroke();
  }

  // Draw glowing city lights on the night texture
  for (let y = 0; y < height; y += 4) {
    const lat = 90 - (y / height) * 180;
    for (let x = 0; x < width; x += 4) {
      const maskPixel = maskCtx.getImageData(x, y, 1, 1).data[0];
      if (maskPixel > 128) {
        const densityThreshold = lat > 10 && lat < 55 ? 0.94 : 0.97;
        if (noise(x * 0.1, y * 0.1) > densityThreshold) {
          // Yellow-orange city light
          nightCtx.fillStyle = noise(x * 0.25, y * 0.25) > 0.5 ? '#f59e0b' : '#fbbf24';
          nightCtx.fillRect(x, y, 1.5, 1.5);
          
          if (noise(x * 0.5, y * 0.5) > 0.9) {
            nightCtx.fillStyle = 'rgba(245, 158, 11, 0.25)';
            nightCtx.beginPath();
            nightCtx.arc(x, y, 3, 0, Math.PI * 2);
            nightCtx.fill();
          }
        }
      }
    }
  }

  return {
    dayTex: new THREE.CanvasTexture(dayCanvas),
    nightTex: new THREE.CanvasTexture(nightCanvas),
    specTex: new THREE.CanvasTexture(specCanvas)
  };
}

// --- Procedural Cloud Texture ---
function generateCloudTexture(): THREE.Texture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, width, height);

  for (let y = 0; y < height; y += 2) {
    const lat = 90 - (y / height) * 180;
    for (let x = 0; x < width; x += 2) {
      const lon = (x / width) * 360 - 180;
      // Use noise octaves to generate realistic cloud patterns
      const n = smoothNoise(lon * 0.08, lat * 0.08) * 0.6 + smoothNoise(lon * 0.2, lat * 0.2) * 0.4;
      if (n > 0.53) {
        ctx.fillStyle = `rgba(255, 255, 255, ${(n - 0.53) * 1.6})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }

  return new THREE.CanvasTexture(canvas);
}

// --- Helper: Build a Satellite 3D Group ---
function createSatellite(bodyColor: number, panelColor: number): THREE.Group {
  const satellite = new THREE.Group();

  // Central Gold/Metallic Body
  const bodyGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: bodyColor,
    metalness: 0.95,
    roughness: 0.05,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  satellite.add(body);

  // Solar Panels (Left and Right wings)
  const panelGeo = new THREE.BoxGeometry(0.3, 0.07, 0.01);
  const panelMat = new THREE.MeshStandardMaterial({
    color: panelColor,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x051025
  });
  
  const leftPanel = new THREE.Mesh(panelGeo, panelMat);
  leftPanel.position.set(-0.21, 0, 0);
  satellite.add(leftPanel);

  const rightPanel = leftPanel.clone();
  rightPanel.position.set(0.21, 0, 0);
  satellite.add(rightPanel);

  // Radar Dish pointing down (cone)
  const dishGeo = new THREE.ConeGeometry(0.045, 0.07, 8);
  const dishMat = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    metalness: 0.9,
    roughness: 0.15
  });
  const dish = new THREE.Mesh(dishGeo, dishMat);
  dish.position.set(0, -0.09, 0);
  dish.rotation.x = Math.PI; // point down
  satellite.add(dish);

  return satellite;
}

export default function EarthAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    // Camera - Pull position back slightly (z=8.0) to prevent edge clipping
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8.0;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;

    // --- Textures ---
    const { dayTex, nightTex, specTex } = generateEarthTextures();
    const cloudTex = generateCloudTexture();

    // --- Create 3D Earth Globe ---
    const earthGeo = new THREE.SphereGeometry(2.0, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: dayTex,
      emissiveMap: nightTex,
      emissive: new THREE.Color(0xffffff), // Emissive glows city lights
      roughnessMap: specTex, // Differentiate reflective oceans vs matte land
      metalness: 0.1,
      roughness: 0.75,
      bumpScale: 0.05
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earthMesh);

    // --- Floating Cloud Layer ---
    const cloudGeo = new THREE.SphereGeometry(2.03, 64, 64);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTex,
      transparent: true,
      opacity: 0.38,
      blending: THREE.NormalBlending
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    scene.add(cloudMesh);

    // --- Atmosphere Glow Mesh ---
    const atmosphereGeo = new THREE.SphereGeometry(2.05, 32, 32);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphere);

    // --- Satellite Orbits & Meshes ---
    
    // Satellite 1: Gold Observation Satellite (Equatorial-ish tilted orbit)
    const sat1 = createSatellite(0xd4af37, 0x1e3a8a);
    scene.add(sat1);

    const orbit1Points = [];
    const orbit1Radius = 2.7;
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      const pt = new THREE.Vector3(Math.cos(theta) * orbit1Radius, 0, Math.sin(theta) * orbit1Radius);
      pt.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 5); // 36 degree tilt
      pt.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 6); // rotate around Y
      orbit1Points.push(pt);
    }
    const orbit1Geo = new THREE.BufferGeometry().setFromPoints(orbit1Points);
    const orbit1Mat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.22
    });
    const orbit1Line = new THREE.Line(orbit1Geo, orbit1Mat);
    scene.add(orbit1Line);

    // Satellite 2: Silver/Cyan SAR Radar Satellite (Polar-ish tilted orbit)
    const sat2 = createSatellite(0xbbbbbb, 0x06b6d4);
    scene.add(sat2);

    const orbit2Points = [];
    const orbit2Radius = 2.9;
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      const pt = new THREE.Vector3(Math.cos(theta) * orbit2Radius, 0, Math.sin(theta) * orbit2Radius);
      pt.applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 3.2); // polar-ish tilt
      pt.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 4);
      orbit2Points.push(pt);
    }
    const orbit2Geo = new THREE.BufferGeometry().setFromPoints(orbit2Points);
    const orbit2Mat = new THREE.LineBasicMaterial({
      color: 0xf43f5e,
      transparent: true,
      opacity: 0.18
    });
    const orbit2Line = new THREE.Line(orbit2Geo, orbit2Mat);
    scene.add(orbit2Line);

    // --- Lights Setup ---
    // Deep blue ambient light for the dark side of the globe
    const ambientLight = new THREE.AmbientLight(0x0e1528, 2.2);
    scene.add(ambientLight);

    // Sun Directional Light (illuminates day side)
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
    sunLight.position.set(6, 3, 5);
    scene.add(sunLight);

    // Soft cyan back light for beautiful atmosphere rim highlighting
    const backLight = new THREE.DirectionalLight(0x3b82f6, 1.4);
    backLight.position.set(-6, -2, -5);
    scene.add(backLight);

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Earth rotation (made faster per user request)
      earthMesh.rotation.y = time * 0.12;

      // Cloud layer rotates independently (adjusted to match Earth speed increase)
      cloudMesh.rotation.y = time * 0.14;

      // Animate Satellite 1
      const angle1 = time * 0.22;
      const pos1 = new THREE.Vector3(Math.cos(angle1) * orbit1Radius, 0, Math.sin(angle1) * orbit1Radius);
      pos1.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 5);
      pos1.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 6);
      sat1.position.copy(pos1);
      
      // Face Earth center and orient panels along orbit path
      sat1.lookAt(0, 0, 0);
      sat1.rotateY(Math.PI / 2);

      // Animate Satellite 2
      const angle2 = -time * 0.16;
      const pos2 = new THREE.Vector3(Math.cos(angle2) * orbit2Radius, 0, Math.sin(angle2) * orbit2Radius);
      pos2.applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 3.2);
      pos2.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 4);
      sat2.position.copy(pos2);
      sat2.lookAt(0, 0, 0);
      sat2.rotateY(Math.PI / 2);

      renderer.render(scene, camera);
    };

    animate();

    // --- Handle Resize ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      
      // Dispose materials/geometries/textures
      earthGeo.dispose();
      earthMat.dispose();
      dayTex.dispose();
      nightTex.dispose();
      specTex.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      cloudTex.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      orbit1Geo.dispose();
      orbit1Mat.dispose();
      orbit2Geo.dispose();
      orbit2Mat.dispose();
      
      const disposeGroup = (group: THREE.Group) => {
        group.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      };
      disposeGroup(sat1);
      disposeGroup(sat2);
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center overflow-visible"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* 3D WebGL Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing overflow-visible" 
      />
    </div>
  );
}

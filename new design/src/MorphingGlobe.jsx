import React, { useEffect, useRef, useState } from 'react';

export default function MorphingGlobe() {
  const canvasRef = useRef(null);
  const [shape, setShape] = useState('sphere'); // 'sphere' or 'cube'
  const shapeRef = useRef('sphere');

  // Sync state with ref for animation loop
  useEffect(() => {
    shapeRef.current = shape;
  }, [shape]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    let height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 600;
    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? 170 : 230;
    const particles = [];

    // 1. Generate Sphere points (Fibonacci Sphere)
    const spherePoints = [];
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      spherePoints.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi)
      });
    }

    // 2. Generate Cube points
    const cubePoints = [];
    const pointsPerFace = Math.floor(particleCount / 6);
    const gridSize = Math.floor(Math.sqrt(pointsPerFace)); // around 9 or 10

    for (let i = 0; i < particleCount; i++) {
      const face = Math.floor(i / pointsPerFace) % 6;
      const faceIdx = i % pointsPerFace;
      const row = Math.floor(faceIdx / gridSize);
      const col = faceIdx % gridSize;

      // Normalize to [-1, 1]
      const u = ((row + 0.5) / gridSize) * 2 - 1;
      const v = ((col + 0.5) / gridSize) * 2 - 1;

      const half = radius * 0.95; // slightly smaller than sphere radius for nice transition proportion
      let cx = 0, cy = 0, cz = 0;

      if (face === 0) { cx = half; cy = u * half; cz = v * half; }
      else if (face === 1) { cx = -half; cy = u * half; cz = v * half; }
      else if (face === 2) { cy = half; cx = u * half; cz = v * half; }
      else if (face === 3) { cy = -half; cx = u * half; cz = v * half; }
      else if (face === 4) { cz = half; cx = u * half; cy = v * half; }
      else { cz = -half; cx = u * half; cy = v * half; }

      cubePoints.push({ x: cx, y: cy, z: cz });
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        sx: spherePoints[i].x,
        sy: spherePoints[i].y,
        sz: spherePoints[i].z,
        cx: cubePoints[i].x,
        cy: cubePoints[i].y,
        cz: cubePoints[i].z,
        x: spherePoints[i].x,
        y: spherePoints[i].y,
        z: spherePoints[i].z,
        // assign a glowing blue/cyan/purple gradient color
        colorFactor: i / particleCount,
      });
    }

    // Rotation state
    let angleX = 0.5;
    let angleY = 0.5;

    // Rotation velocities (reduced for slower, uniform rotation)
    let rotSpeedX = 0.0005;
    let rotSpeedY = 0.0008;
    let targetSpeedX = 0.0005;
    let targetSpeedY = 0.0008;

    // Mouse drag/track state
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      const rect = canvas.getBoundingClientRect();
      prevMouseX = e.clientX - rect.left;
      prevMouseY = e.clientY - rect.top;
    };

    const handleMouseMove = (e) => {
      if (!isDragging) {
        // Subtle hover influence on rotation speed (damped for large screens)
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left - rect.width / 2;
        const my = e.clientY - rect.top - rect.height / 2;
        targetSpeedY = 0.0008 + mx * 0.000002;
        targetSpeedX = 0.0005 - my * 0.000001;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const deltaX = mx - prevMouseX;
      const deltaY = my - prevMouseY;

      angleY += deltaX * 0.005;
      angleX += deltaY * 0.005;

      prevMouseX = mx;
      prevMouseY = my;
    };

    const handleMouseUp = () => {
      isDragging = false;
      targetSpeedX = 0.0005;
      targetSpeedY = 0.0008;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support for mobile
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        const rect = canvas.getBoundingClientRect();
        prevMouseX = e.touches[0].clientX - rect.left;
        prevMouseY = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.touches[0].clientX - rect.left;
      const my = e.touches[0].clientY - rect.top;
      const deltaX = mx - prevMouseX;
      const deltaY = my - prevMouseY;
      angleY += deltaX * 0.008;
      angleX += deltaY * 0.008;
      prevMouseX = mx;
      prevMouseY = my;
    };

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleMouseUp);

    // Morph state animation
    let morphFactor = 0; // 0 = sphere, 1 = cube

    const animate = () => {
      // Clear canvas with a transparent motion trail
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      // Continuous 3D rotation update
      if (!isDragging) {
        rotSpeedX += (targetSpeedX - rotSpeedX) * 0.05;
        rotSpeedY += (targetSpeedY - rotSpeedY) * 0.05;
        angleX += rotSpeedX;
        angleY += rotSpeedY;
      } else {
        rotSpeedX = 0.0005;
        rotSpeedY = 0.0008;
      }

      // Animate morph factor based on target shape
      const targetMorph = shapeRef.current === 'cube' ? 1 : 0;
      morphFactor += (targetMorph - morphFactor) * 0.06; // smooth transition

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // 3D coordinates calculation, rotation, morphing & projection
      const renderedParticles = [];
      const focalLength = 320;
      const cameraDistance = 380;
      const scaleMultiplier = window.devicePixelRatio;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Morph interpolation
        const mx = p.sx * (1 - morphFactor) + p.cx * morphFactor;
        const my = p.sy * (1 - morphFactor) + p.cy * morphFactor;
        const mz = p.sz * (1 - morphFactor) + p.cz * morphFactor;

        // Apply 3D rotation (Y-axis, then X-axis)
        const xY = mx * cosY - mz * sinY;
        const zY = mx * sinY + mz * cosY;

        const rotatedX = xY;
        const rotatedY = my * cosX - zY * sinX;
        const rotatedZ = my * sinX + zY * cosX;

        // Perspective projection
        const scale = (focalLength / (focalLength + rotatedZ + cameraDistance)) * scaleMultiplier;
        const projX = width / 2 + rotatedX * scale;
        const projY = height / 2 + rotatedY * scale;

        renderedParticles.push({
          x: projX,
          y: projY,
          z: rotatedZ,
          scale: scale,
          colorFactor: p.colorFactor
        });
      }

      // Depth sort particles so foreground elements cover background elements
      renderedParticles.sort((a, b) => b.z - a.z);

      // Draw network grid lines between nearby particles
      ctx.lineWidth = 0.5;
      const connectionDistance = 45 * scaleMultiplier;

      // We check connections on a subset to keep performance smooth (60fps)
      for (let i = 0; i < particleCount; i += 3) {
        const p1 = renderedParticles[i];
        if (p1.z > 150) continue; // skip particles far in the back for connections

        for (let j = i + 1; j < particleCount; j += 6) {
          const p2 = renderedParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.12 * (1 - (p1.z + 100) / 400);
            if (alpha > 0) {
              const lr = Math.round(252 * (1 - morphFactor) + 249 * morphFactor);
              const lg = Math.round(211 * (1 - morphFactor) + 115 * morphFactor);
              const lb = Math.round(77 * (1 - morphFactor) + 22 * morphFactor);
              ctx.strokeStyle = `rgba(${lr}, ${lg}, ${lb}, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particleCount; i++) {
        const p = renderedParticles[i];
        const baseSize = 2.2;
        const size = Math.max(0.5, baseSize * p.scale);

        // Dynamic glowing colors (mixture of 2 distinct orange/yellow/amber shades in each state)
        let r, g, b;
        if (p.colorFactor < 0.5) {
          // Color 1: Warm Amber (Globe) -> Vibrant Orange (Cube)
          r = Math.round(245 * (1 - morphFactor) + 251 * morphFactor);
          g = Math.round(158 * (1 - morphFactor) + 146 * morphFactor);
          b = Math.round(11 * (1 - morphFactor) + 60 * morphFactor);
        } else {
          // Color 2: Bright Gold-Yellow (Globe) -> Pure Deep Orange (Cube)
          r = Math.round(253 * (1 - morphFactor) + 249 * morphFactor);
          g = Math.round(224 * (1 - morphFactor) + 115 * morphFactor);
          b = Math.round(71 * (1 - morphFactor) + 22 * morphFactor);
        }

        // Depth dimming (fog)
        const depthAlpha = Math.max(0.15, 1 - (p.z + 150) / 350);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${depthAlpha})`;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Extra subtle glow for foreground particles
        if (p.z < -80 && size > 1.8) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${depthAlpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  // Automorph toggling with custom timings (Globe: 3 seconds, Cube: 4 seconds)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShape(prev => prev === 'sphere' ? 'cube' : 'sphere');
    }, shape === 'sphere' ? 3000 : 4000);
    return () => clearTimeout(timeout);
  }, [shape]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full select-none">
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-[340px] h-[340px] md:w-[600px] md:h-[600px] max-w-full aspect-square cursor-grab active:cursor-grabbing"
      />

    </div>
  );
}

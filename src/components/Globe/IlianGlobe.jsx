import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import globePointsData from '../../data/globePoints.json';
import './IlianGlobe.css';

const TARGET_LAT = 28.6139; // Delhi, India
const TARGET_LON = 77.2090;

export default function IlianGlobe() {
  const { colorMode } = useTheme();
  const isLight = colorMode === 'light';

  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Rotation states: rotX = longitude/yaw, rotY = latitude/pitch
  const rotXRef = useRef(TARGET_LON * (Math.PI / 180));
  const rotYRef = useRef(0.35); // 20 degree initial forward tilt

  // Drag interaction states with velocity/inertia
  const isDraggingRef = useRef(false);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.002, y: 0 });
  const lastTimeRef = useRef(performance.now());
  const autoRotateRef = useRef(true);
  const animFrameRef = useRef(null);

  const [pinState, setPinState] = useState({ x: 0, y: 0, visible: true });

  // 3D Spherical Projection with full 2-axis rotation
  const projectPoint = useCallback((lat, lon, rotX, rotY, cx, cy, R) => {
    const phi = lat * (Math.PI / 180);
    const lambda = lon * (Math.PI / 180);

    const diffLon = lambda - rotX;
    const x0 = Math.cos(phi) * Math.sin(diffLon);
    const y0 = Math.sin(phi);
    const z0 = Math.cos(phi) * Math.cos(diffLon);

    // Rotate pitch around X-axis
    const y1 = y0 * Math.cos(rotY) - z0 * Math.sin(rotY);
    const z1 = y0 * Math.sin(rotY) + z0 * Math.cos(rotY);

    return {
      screenX: cx + x0 * R,
      screenY: cy - y1 * R,
      z: z1,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const ctx = canvas.getContext('2d');
    let width = container.clientWidth || 360;
    let height = container.clientHeight || 350;

    const resize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let pulseTime = 0;

    const render = (now) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;
      pulseTime += 0.04;

      // Handle auto-rotation & inertia physics
      if (!isDraggingRef.current) {
        if (autoRotateRef.current) {
          // Gentle continuous orbital drift
          rotXRef.current += 0.0018;
        } else {
          // Decay drag velocity smoothly with friction
          rotXRef.current += velocityRef.current.x;
          rotYRef.current += velocityRef.current.y;
          velocityRef.current.x *= 0.94;
          velocityRef.current.y *= 0.94;

          // Clamp vertical pitch between -75 deg and +75 deg
          rotYRef.current = Math.max(-1.3, Math.min(1.3, rotYRef.current));

          if (Math.abs(velocityRef.current.x) < 0.0001 && Math.abs(velocityRef.current.y) < 0.0001) {
            autoRotateRef.current = true;
          }
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Globe Geometry: Full centered 3D sphere
      const cx = width / 2;
      const cy = height / 2 + 14;
      const R = Math.min(width * 0.44, (height - 60) * 0.46);

      // ─── 1. Outer Atmospheric Halo ───
      const haloGrad = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.18);
      if (isLight) {
        haloGrad.addColorStop(0, 'rgba(0, 0, 0, 0.06)');
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
        haloGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
      ctx.fillStyle = haloGrad;
      ctx.fill();

      // ─── 2. Spherical Planet Body ───
      const sphereGrad = ctx.createRadialGradient(
        cx - R * 0.28,
        cy - R * 0.28,
        R * 0.1,
        cx,
        cy,
        R
      );
      if (isLight) {
        sphereGrad.addColorStop(0, '#ffffff');
        sphereGrad.addColorStop(0.55, '#f4f4f6');
        sphereGrad.addColorStop(0.9, '#e4e4e9');
        sphereGrad.addColorStop(1, '#d4d4d8');
      } else {
        sphereGrad.addColorStop(0, '#15151c');
        sphereGrad.addColorStop(0.5, '#0c0c10');
        sphereGrad.addColorStop(0.85, '#060608');
        sphereGrad.addColorStop(1, '#020204');
      }
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // ─── 3. Subtle Latitude & Longitude Graticule Rings (Realistic Globe) ───
      ctx.save();
      const gridColor = isLight ? 'rgba(0, 0, 0, 0.045)' : 'rgba(255, 255, 255, 0.055)';
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      // Parallels (Latitude lines at 0, ±30, ±60)
      [-60, -30, 0, 30, 60].forEach((lat) => {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 5) {
          const pt = projectPoint(lat, lon, rotXRef.current, rotYRef.current, cx, cy, R);
          if (pt.z > 0) {
            if (first) {
              ctx.moveTo(pt.screenX, pt.screenY);
              first = false;
            } else {
              ctx.lineTo(pt.screenX, pt.screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      });

      // Meridians (Longitude lines every 45 degrees)
      for (let lon = -180; lon < 180; lon += 45) {
        ctx.beginPath();
        let first = true;
        for (let lat = -80; lat <= 80; lat += 4) {
          const pt = projectPoint(lat, lon, rotXRef.current, rotYRef.current, cx, cy, R);
          if (pt.z > 0) {
            if (first) {
              ctx.moveTo(pt.screenX, pt.screenY);
              first = false;
            } else {
              ctx.lineTo(pt.screenX, pt.screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }
      ctx.restore();

      // ─── 4. Render Dotted Countries (4,604 High-Density Geographic Points) ───
      const dotColor = isLight ? '#18181b' : '#ffffff';
      ctx.beginPath();
      ctx.fillStyle = dotColor;

      const rotX = rotXRef.current;
      const rotY = rotYRef.current;
      const totalPoints = globePointsData.length;

      for (let i = 0; i < totalPoints; i += 1) {
        const pt = globePointsData[i];
        const p = projectPoint(pt[0], pt[1], rotX, rotY, cx, cy, R);

        // Only draw points on the visible facing hemisphere
        if (p.z > 0.01) {
          const depth = Math.min(1, Math.max(0.15, p.z));
          const dotRadius = (isLight ? 0.7 : 0.8) + depth * 0.85;

          ctx.moveTo(p.screenX + dotRadius, p.screenY);
          ctx.arc(p.screenX, p.screenY, dotRadius, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // ─── 5. Luminous Spherical Edge Rim ───
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 1.6;
      ctx.shadowBlur = isLight ? 6 : 14;
      ctx.shadowColor = isLight ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.6)';
      ctx.stroke();
      ctx.restore();

      // ─── 6. India / Delhi Target Pinpoint & Pulse ───
      const targetPoint = projectPoint(TARGET_LAT, TARGET_LON, rotX, rotY, cx, cy, R);
      const isTargetVisible = targetPoint.z > 0.12;

      if (isTargetVisible) {
        setPinState({
          x: targetPoint.screenX,
          y: targetPoint.screenY,
          visible: true,
        });

        // Pulsing radar ripple ring
        const rippleFactor = (pulseTime % 1.5) / 1.5;
        const rippleR = 3.5 + rippleFactor * 13;
        const rippleAlpha = Math.max(0, 1 - rippleFactor);

        ctx.save();
        ctx.beginPath();
        ctx.arc(targetPoint.screenX, targetPoint.screenY, rippleR, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? `rgba(9, 9, 11, ${rippleAlpha * 0.7})`
          : `rgba(255, 255, 255, ${rippleAlpha * 0.9})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Solid central glowing pinpoint dot
        ctx.beginPath();
        ctx.arc(targetPoint.screenX, targetPoint.screenY, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#09090b' : '#ffffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = isLight ? 'rgba(0, 0, 0, 0.5)' : '#ffffff';
        ctx.fill();
        ctx.restore();
      } else {
        setPinState((prev) => (prev.visible ? { ...prev, visible: false } : prev));
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [projectPoint, isLight]);

  // Pointer drag event handlers for 360 degree 2-axis interactive rotation
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    autoRotateRef.current = false;
    pointerPosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - pointerPosRef.current.x;
    const deltaY = e.clientY - pointerPosRef.current.y;

    pointerPosRef.current = { x: e.clientX, y: e.clientY };

    // Update rotation directly with drag sensitivity
    const sensitivity = 0.0055;
    rotXRef.current -= deltaX * sensitivity;
    rotYRef.current += deltaY * sensitivity;

    // Clamp vertical pitch
    rotYRef.current = Math.max(-1.3, Math.min(1.3, rotYRef.current));

    // Record velocity for release inertia
    velocityRef.current = {
      x: -deltaX * 0.0035,
      y: deltaY * 0.0035,
    };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Wheel scroll interaction: scrolling over the globe spins it horizontally & vertically
  const handleWheel = (e) => {
    e.stopPropagation();
    autoRotateRef.current = false;
    const deltaX = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    rotXRef.current += deltaX * 0.003;
    rotYRef.current = Math.max(-1.3, Math.min(1.3, rotYRef.current + (e.deltaY * 0.001)));

    // Resume gentle auto-rotation after 1.5s idle
    clearTimeout(containerRef.current?._wheelTimeout);
    if (containerRef.current) {
      containerRef.current._wheelTimeout = setTimeout(() => {
        autoRotateRef.current = true;
      }, 1500);
    }
  };

  return (
    <div
      ref={containerRef}
      className="ilian-globe-card"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      title="Click and drag or scroll to rotate the globe in all directions"
    >
      {/* Header Tag matching reference image */}
      <div className="ilian-globe-header">
        <svg className="ilian-globe-pin-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="ilian-globe-title">
          Where <span className="ilian-globe-title-bold">I live</span>
        </span>
      </div>

      {/* Subtle interaction indicator */}
      <div className="ilian-globe-rotate-hint">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
        <span>Drag to rotate</span>
      </div>

      {/* 3D Dotted Canvas */}
      <canvas ref={canvasRef} className="ilian-globe-canvas" />

      {/* Floating Pill Badge over India (Matching ID Indonesia in Reference Image) */}
      {pinState.visible && (
        <div
          className="ilian-globe-pill"
          style={{
            left: `${pinState.x}px`,
            top: `${pinState.y - 18}px`,
          }}
        >
          <span className="globe-pill-code">IN</span>
          <span className="globe-pill-country">India</span>
        </div>
      )}
    </div>
  );
}

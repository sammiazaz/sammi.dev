import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import globePointsData from '../../data/globePoints.json';
import './IlianGlobe.css';

const TARGET_LAT = 28.6139; // Delhi, India
const TARGET_LON = 77.2090;
const PITCH = 24 * (Math.PI / 180); // 24 degree forward tilt

export default function IlianGlobe() {
  const { colorMode } = useTheme();
  const isLight = colorMode === 'light';

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartRotRef = useRef(0);
  const rotXRef = useRef(TARGET_LON * (Math.PI / 180));
  const autoRotateRef = useRef(true);
  const animFrameRef = useRef(null);

  const [pinPosition, setPinPosition] = useState({ x: 0, y: 0, visible: true });

  const projectPoint = useCallback((lat, lon, currentRot, cx, cy, R) => {
    const phi = lat * (Math.PI / 180);
    const lambda = lon * (Math.PI / 180);

    const x = Math.cos(phi) * Math.sin(lambda - currentRot);
    const y = -Math.sin(phi);
    const z = Math.cos(phi) * Math.cos(lambda - currentRot);

    // Apply pitch tilt
    const y2 = y * Math.cos(PITCH) - z * Math.sin(PITCH);
    const z2 = y * Math.sin(PITCH) + z * Math.cos(PITCH);
    const x2 = x;

    return {
      screenX: cx + x2 * R,
      screenY: cy + y2 * R,
      z: z2,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const ctx = canvas.getContext('2d');
    let width = container.clientWidth;
    let height = container.clientHeight;

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

    const render = () => {
      pulseTime += 0.035;

      if (autoRotateRef.current && !isDraggingRef.current) {
        rotXRef.current += 0.0022; // gentle auto-rotation
      }

      ctx.clearRect(0, 0, width, height);

      // Globe sphere geometry
      // Position the globe center below the bottom so the top hemisphere rises majestically
      const cx = width / 2;
      const R = Math.max(width * 0.58, height * 0.95);
      const cy = height + R * 0.28;

      // ─── 1. Deep Spherical Core Mask ───
      const sphereGrad = ctx.createRadialGradient(cx, cy - R * 0.7, R * 0.1, cx, cy, R);
      if (isLight) {
        sphereGrad.addColorStop(0, '#f4f4f5');
        sphereGrad.addColorStop(0.85, '#e4e4e7');
        sphereGrad.addColorStop(1, '#d4d4d8');
      } else {
        sphereGrad.addColorStop(0, '#09090c');
        sphereGrad.addColorStop(0.7, '#070709');
        sphereGrad.addColorStop(1, '#020203');
      }
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // ─── 2. Luminous Atmospheric Horizon Rim Glow (Matching User Reference) ───
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, Math.PI * 1.05, Math.PI * 1.95);
      ctx.shadowBlur = isLight ? 14 : 26;
      ctx.shadowColor = isLight ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.95)';
      ctx.strokeStyle = isLight ? 'rgba(30, 30, 35, 0.85)' : 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = isLight ? 2 : 2.5;
      ctx.stroke();

      // Secondary soft outer rim halo
      ctx.beginPath();
      ctx.arc(cx, cy, R + 1.5, Math.PI * 1.08, Math.PI * 1.92);
      ctx.shadowBlur = isLight ? 20 : 38;
      ctx.shadowColor = isLight ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.6)';
      ctx.strokeStyle = isLight ? 'rgba(60, 60, 70, 0.4)' : 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // ─── 3. Render Dotted Landmass (Pre-computed Geographic Fibonacci Points) ───
      const dotFill = isLight ? '#18181b' : '#ffffff';
      const rot = rotXRef.current;

      // Batch rendering for dots to ensure 60/120 FPS
      ctx.beginPath();
      ctx.fillStyle = dotFill;

      const len = globePointsData.length;
      for (let i = 0; i < len; i += 1) {
        const pt = globePointsData[i];
        const p = projectPoint(pt[0], pt[1], rot, cx, cy, R);

        // Only draw visible front-facing dots
        if (p.z > 0.02) {
          const depthScale = Math.min(1, Math.max(0.2, p.z));
          const dotRadius = (isLight ? 0.75 : 0.85) + depthScale * 0.85;

          ctx.moveTo(p.screenX + dotRadius, p.screenY);
          ctx.arc(p.screenX, p.screenY, dotRadius, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // ─── 4. India / Delhi Target Pinpoint & Pulse ───
      const targetPoint = projectPoint(TARGET_LAT, TARGET_LON, rot, cx, cy, R);
      const isTargetVisible = targetPoint.z > 0.12;

      if (isTargetVisible) {
        setPinPosition({
          x: targetPoint.screenX,
          y: targetPoint.screenY,
          visible: true,
        });

        // Pulsing radar ripple ring
        const rippleFactor = (pulseTime % 1.6) / 1.6;
        const rippleR = 4 + rippleFactor * 14;
        const rippleAlpha = Math.max(0, 1 - rippleFactor);

        ctx.save();
        ctx.beginPath();
        ctx.arc(targetPoint.screenX, targetPoint.screenY, rippleR, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? `rgba(0, 0, 0, ${rippleAlpha * 0.7})` : `rgba(255, 255, 255, ${rippleAlpha * 0.9})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Solid central glowing white dot
        ctx.beginPath();
        ctx.arc(targetPoint.screenX, targetPoint.screenY, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#09090b' : '#ffffff';
        ctx.shadowBlur = 12;
        ctx.shadowColor = isLight ? 'rgba(0, 0, 0, 0.6)' : '#ffffff';
        ctx.fill();
        ctx.restore();
      } else {
        setPinPosition((prev) => (prev.visible ? { ...prev, visible: false } : prev));
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [projectPoint, isLight]);

  // Pointer drag event handlers for rotating the globe
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    autoRotateRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartRotRef.current = rotXRef.current;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    rotXRef.current = dragStartRotRef.current - deltaX * 0.005;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    // Resume auto-rotation after release
    setTimeout(() => {
      autoRotateRef.current = true;
    }, 1200);
  };

  return (
    <div
      ref={containerRef}
      className="ilian-globe-card"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
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

      {/* 3D Dotted Canvas */}
      <canvas ref={canvasRef} className="ilian-globe-canvas" />

      {/* Floating Pill Badge over India (Matching ID Indonesia in Reference Image) */}
      {pinPosition.visible && (
        <div
          className="ilian-globe-pill"
          style={{
            left: `${pinPosition.x}px`,
            top: `${pinPosition.y - 18}px`,
          }}
        >
          <span className="globe-pill-code">IN</span>
          <span className="globe-pill-country">India</span>
        </div>
      )}
    </div>
  );
}

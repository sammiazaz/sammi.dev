import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import globePointsData from '../../data/globePoints.json';
import './IlianGlobe.css';

const TARGET_LAT = 28.6139; // Delhi, India
const TARGET_LON = 77.2090;

const FIXED_ROT_X = (TARGET_LON * Math.PI) / 180;
const FIXED_ROT_Y = 0.35; // Forward pitch so India is centered beautifully

/**
 * Calculates Earth's real-time subsolar position (where the Sun is shining right now)
 * based on UTC time & day of the year.
 */
function getRealTimeSolarCoordinates() {
  const now = new Date();
  const utcHours =
    now.getUTCHours() +
    now.getUTCMinutes() / 60 +
    now.getUTCSeconds() / 3600 +
    now.getUTCMilliseconds() / 3600000;

  // Real-time subsolar longitude (12:00 UTC = 0° Greenwich meridian)
  const sunLonDeg = (12 - utcHours) * 15;
  const sunLonRad = (sunLonDeg * Math.PI) / 180;

  // Earth's seasonal solar declination (-23.44° to +23.44°)
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
  const sunLatDeg = -23.44 * Math.cos(((dayOfYear + 10) / 365) * 2 * Math.PI);
  const sunLatRad = (sunLatDeg * Math.PI) / 180;

  return {
    sunLonRad,
    sunLatRad,
    sinSunLat: Math.sin(sunLatRad),
    cosSunLat: Math.cos(sunLatRad),
  };
}

export default function IlianGlobe() {
  const { colorMode } = useTheme();
  const isLight = colorMode === 'light';

  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Initial rotation: Fixed precisely on India (Delhi: 77.2°E, 28.6°N)
  const rotXRef = useRef(FIXED_ROT_X);
  const rotYRef = useRef(FIXED_ROT_Y);

  // Flight animation states
  const isFlyingRef = useRef(false);
  const flyAnimRef = useRef(null);
  const flyTimeoutRef = useRef(null);

  // Hover state (ONLY rotate when hovered!)
  const isHoveredRef = useRef(false);

  // Drag interaction states with velocity/inertia
  const isDraggingRef = useRef(false);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  const [pinState, setPinState] = useState({ x: 0, y: 0, visible: true });
  const [isFocusedOnIndia, setIsFocusedOnIndia] = useState(false);

  // Live real-time clock (hours, minutes, seconds)
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  // Smooth cinematic flight to Delhi, India
  const flyToIndia = useCallback((e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    isDraggingRef.current = false;
    isFlyingRef.current = true;
    setIsFocusedOnIndia(true);

    if (flyAnimRef.current) cancelAnimationFrame(flyAnimRef.current);
    clearTimeout(flyTimeoutRef.current);

    const startX = rotXRef.current;
    const startY = rotYRef.current;

    const targetX = (TARGET_LON * Math.PI) / 180;
    const targetY = 0.35; // 20° tilt so India is centered beautifully

    // Calculate shortest angular distance for cyclic longitude angle
    let diffX = (targetX - startX) % (2 * Math.PI);
    if (diffX < -Math.PI) diffX += 2 * Math.PI;
    if (diffX > Math.PI) diffX -= 2 * Math.PI;
    const finalTargetX = startX + diffX;

    const duration = 1200; // 1.2s smooth cinematic transition
    const startTime = performance.now();

    const animateFlight = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth cubic bezier easing
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      rotXRef.current = startX + (finalTargetX - startX) * ease;
      rotYRef.current = startY + (targetY - startY) * ease;

      if (progress < 1 && isFlyingRef.current) {
        flyAnimRef.current = requestAnimationFrame(animateFlight);
      } else {
        isFlyingRef.current = false;
        rotXRef.current = finalTargetX;
        rotYRef.current = targetY;

        flyTimeoutRef.current = setTimeout(() => {
          setIsFocusedOnIndia(false);
        }, 3000);
      }
    };

    flyAnimRef.current = requestAnimationFrame(animateFlight);
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

    const render = () => {
      pulseTime += 0.04;

      // Position is fixed on India; smoothly damp any residual drag inertia
      if (!isDraggingRef.current && !isFlyingRef.current) {
        if (Math.abs(velocityRef.current.x) > 0.00001 || Math.abs(velocityRef.current.y) > 0.00001) {
          velocityRef.current.x *= 0.88;
          velocityRef.current.y *= 0.88;
          rotXRef.current += velocityRef.current.x;
          rotYRef.current += velocityRef.current.y;
          rotYRef.current = Math.max(-1.3, Math.min(1.3, rotYRef.current));
          if (Math.abs(velocityRef.current.x) < 0.00005) velocityRef.current.x = 0;
          if (Math.abs(velocityRef.current.y) < 0.00005) velocityRef.current.y = 0;
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Globe Geometry: Full centered 3D sphere
      const cx = width / 2;
      const cy = height / 2 + 14;
      const R = Math.min(width * 0.44, (height - 60) * 0.46);

      const rotX = rotXRef.current;
      const rotY = rotYRef.current;

      // Real-time astronomical solar position to calculate sunlight vs night
      const { sunLonRad, sunLatRad, sinSunLat, cosSunLat } = getRealTimeSolarCoordinates();

      // ─── 1. Spherical Planet Body: Deep Pitch Black Space ───
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? '#f4f4f7' : '#000000';
      ctx.fill();

      // ─── 3. Subtle Latitude & Longitude Graticule Rings ───
      ctx.save();
      const gridColor = isLight ? 'rgba(0, 0, 0, 0.045)' : 'rgba(255, 255, 255, 0.055)';
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      // Parallels (Latitude lines at 0, ±30, ±60)
      [-60, -30, 0, 30, 60].forEach((lat) => {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 5) {
          const pt = projectPoint(lat, lon, rotX, rotY, cx, cy, R);
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
          const pt = projectPoint(lat, lon, rotX, rotY, cx, cy, R);
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

      // ─── 4. Render Dotted Countries with Real-Time Day / Night Illumination ───
      const totalPoints = globePointsData.length;
      const dayPath = new Path2D();
      const nightPath = new Path2D();

      for (let i = 0; i < totalPoints; i += 1) {
        const pt = globePointsData[i];
        const p = projectPoint(pt[0], pt[1], rotX, rotY, cx, cy, R);

        // Only draw points on the visible facing hemisphere
        if (p.z > 0.01) {
          const depth = Math.min(1, Math.max(0.12, p.z));

          // Calculate solar zenith angle to determine real-time sunlight
          const phi = pt[0] * (Math.PI / 180);
          const lambda = pt[1] * (Math.PI / 180);
          const cosZenith =
            sinSunLat * Math.sin(phi) +
            cosSunLat * Math.cos(phi) * Math.cos(lambda - sunLonRad);

          if (cosZenith > 0) {
            // Day Side: Sunlight is falling! Crisp, bright, solid dots (no gray dots)
            const r = (isLight ? 0.74 : 0.84) + depth * 0.88;
            dayPath.moveTo(p.screenX + r, p.screenY);
            dayPath.arc(p.screenX, p.screenY, r, 0, Math.PI * 2);
          } else {
            // Night Side: Nighttime! Uniform dull, dimmed dots
            const r = (isLight ? 0.60 : 0.66) + depth * 0.70;
            nightPath.moveTo(p.screenX + r, p.screenY);
            nightPath.arc(p.screenX, p.screenY, r, 0, Math.PI * 2);
          }
        }
      }

      ctx.save();
      // 1. Draw Night dots (Uniformly dull across the entire night area - no glowing or gray dots)
      ctx.fillStyle = isLight ? 'rgba(9, 9, 11, 0.18)' : 'rgba(255, 255, 255, 0.18)';
      ctx.fill(nightPath);

      // 2. Draw Day dots (Bright, brilliant where sunlight is falling)
      ctx.fillStyle = isLight ? '#09090b' : '#ffffff';
      ctx.fill(dayPath);
      ctx.restore();

      // ─── 5. Smooth Spherical Edge Rim (Glows ONLY on the Day Side where the Sun is) ───
      // Calculate 3D direction vector pointing to the Sun in camera frame
      const diffSun = sunLonRad - rotX;
      const Sx = cosSunLat * Math.sin(diffSun);
      const Sy0 = sinSunLat;
      const Sz0 = cosSunLat * Math.cos(diffSun);
      const Sy = Sy0 * Math.cos(rotY) - Sz0 * Math.sin(rotY);

      // 2D direction of the Sun on screen (normalized)
      const sunHypot = Math.hypot(Sx, Sy) || 1;
      const sunDirX = Sx / sunHypot;
      const sunDirY = -Sy / sunHypot; // Inverted because canvas Y increases downwards

      // Day-side edge point (facing the Sun) and Night-side edge point (opposite)
      const dayEdgeX = cx + sunDirX * R;
      const dayEdgeY = cy + sunDirY * R;
      const nightEdgeX = cx - sunDirX * R;
      const nightEdgeY = cy - sunDirY * R;

      // Directional gradient: bright and glowing on Day side, seamlessly fading to 0 on Night side
      const rimStrokeGrad = ctx.createLinearGradient(dayEdgeX, dayEdgeY, nightEdgeX, nightEdgeY);
      if (isLight) {
        rimStrokeGrad.addColorStop(0, 'rgba(9, 9, 11, 0.40)');
        rimStrokeGrad.addColorStop(0.35, 'rgba(9, 9, 11, 0.18)');
        rimStrokeGrad.addColorStop(0.65, 'rgba(9, 9, 11, 0.04)');
        rimStrokeGrad.addColorStop(1, 'rgba(9, 9, 11, 0)');
      } else {
        rimStrokeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        rimStrokeGrad.addColorStop(0.30, 'rgba(255, 255, 255, 0.70)');
        rimStrokeGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.25)');
        rimStrokeGrad.addColorStop(0.80, 'rgba(255, 255, 255, 0.05)');
        rimStrokeGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }

      ctx.save();
      // Pass 1: Soft, silky smooth atmospheric glow hugging the day-side circular edge
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = rimStrokeGrad;
      ctx.lineWidth = 3.2;
      ctx.shadowBlur = isLight ? 8 : 18;
      ctx.shadowColor = isLight ? 'rgba(0, 0, 0, 0.22)' : 'rgba(255, 255, 255, 0.65)';
      ctx.stroke();

      // Pass 2: Sharp, elegant edge definition on the day side
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = rimStrokeGrad;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = isLight ? 4 : 8;
      ctx.shadowColor = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.8)';
      ctx.stroke();
      ctx.restore();

      // ─── 6. India / Delhi Target Pinpoint & Beacon ───
      const targetPoint = projectPoint(TARGET_LAT, TARGET_LON, rotX, rotY, cx, cy, R);
      const isTargetVisible = targetPoint.z > 0.12;

      if (isTargetVisible) {
        setPinState({
          x: targetPoint.screenX,
          y: targetPoint.screenY,
          visible: true,
        });

        // Dual expanding radar ripple rings
        const rippleFactor1 = (pulseTime % 1.6) / 1.6;
        const rippleR1 = 3.5 + rippleFactor1 * 14;
        const rippleAlpha1 = Math.max(0, 1 - rippleFactor1);

        const rippleFactor2 = ((pulseTime + 0.8) % 1.6) / 1.6;
        const rippleR2 = 3.5 + rippleFactor2 * 14;
        const rippleAlpha2 = Math.max(0, 1 - rippleFactor2);

        ctx.save();
        // Ring 1
        ctx.beginPath();
        ctx.arc(targetPoint.screenX, targetPoint.screenY, rippleR1, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? `rgba(9, 9, 11, ${rippleAlpha1 * 0.75})`
          : `rgba(255, 255, 255, ${rippleAlpha1 * 0.95})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Ring 2 (continuous sweep)
        ctx.beginPath();
        ctx.arc(targetPoint.screenX, targetPoint.screenY, rippleR2, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? `rgba(9, 9, 11, ${rippleAlpha2 * 0.5})`
          : `rgba(255, 255, 255, ${rippleAlpha2 * 0.65})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Glowing pinpoint dot (bright beacon stands out even in night!)
        ctx.beginPath();
        ctx.arc(targetPoint.screenX, targetPoint.screenY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#09090b' : '#ffffff';
        ctx.shadowBlur = 12;
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
      if (flyAnimRef.current) cancelAnimationFrame(flyAnimRef.current);
      clearTimeout(flyTimeoutRef.current);
    };
  }, [projectPoint, isLight]);

  // Pointer drag event handlers for 360 degree 2-axis interactive rotation
  const handlePointerDown = (e) => {
    // If user interacts manually, cancel active flight
    isFlyingRef.current = false;
    if (flyAnimRef.current) cancelAnimationFrame(flyAnimRef.current);
    clearTimeout(flyTimeoutRef.current);

    isDraggingRef.current = true;
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
    isFlyingRef.current = false;
    if (flyAnimRef.current) cancelAnimationFrame(flyAnimRef.current);
    clearTimeout(flyTimeoutRef.current);

    const deltaX = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    rotXRef.current += deltaX * 0.003;
    rotYRef.current = Math.max(-1.3, Math.min(1.3, rotYRef.current + e.deltaY * 0.001));
  };

  return (
    <div
      ref={containerRef}
      className="ilian-globe-card"
      onPointerEnter={() => {
        isHoveredRef.current = true;
      }}
      onPointerLeave={() => {
        isHoveredRef.current = false;
        isDraggingRef.current = false;
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      title="Drag to rotate in 3D. Click 'Delhi, India' to reset."
    >
      {/* ─── Interactive Location Header Button: "Delhi, India" ─── */}
      <button
        type="button"
        className={`ilian-globe-header-btn ${isFocusedOnIndia ? 'is-focused' : ''}`}
        onClick={flyToIndia}
        onPointerDown={(e) => e.stopPropagation()}
        title="Click to focus directly on Delhi, India"
      >
        <span className="ilian-globe-live-dot" aria-hidden="true" />
        <svg
          className="ilian-globe-pin-icon"
          viewBox="0 0 24 24"
          width="15"
          height="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="ilian-globe-title">
          Delhi, <span className="ilian-globe-title-bold">India</span>
        </span>
        <span className="ilian-globe-focus-badge">Focus</span>
      </button>

      {/* ─── Real-Time Live Clock: Hour, Minute, Second (Right Side) ─── */}
      <div
        className="ilian-globe-time-pill"
        title="Live Time in Delhi (Asia/Kolkata, GMT+5:30)"
      >
        <svg
          className="ilian-globe-clock-icon"
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="ilian-globe-time-digits">{currentTime}</span>
        <span className="ilian-globe-time-tz">IST</span>
      </div>

      {/* Subtle interaction indicator */}
      <div className="ilian-globe-rotate-hint">
        <svg
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
        <span>Drag to rotate</span>
      </div>

      {/* 3D Dotted Canvas */}
      <canvas ref={canvasRef} className="ilian-globe-canvas" />

      {/* Floating Pill Badge over India */}
      {pinState.visible && (
        <button
          type="button"
          className="ilian-globe-pill"
          style={{
            left: `${pinState.x}px`,
            top: `${pinState.y - 18}px`,
          }}
          onClick={flyToIndia}
          onPointerDown={(e) => e.stopPropagation()}
          title="Delhi, India (Click to center)"
        >
          <span className="globe-pill-code">IN</span>
          <span className="globe-pill-country">India</span>
        </button>
      )}
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import './dotfield.css';

export default function DotfieldBackground({ theme = 'dark' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (REDUCED) { canvas.style.display = 'none'; return; }
        
        const ctx = canvas.getContext('2d');
        const IS_MOBILE = window.innerWidth < 700;
        const SPACING = IS_MOBILE ? 11 : 9;
        const DOT_R = 0.5;
        const PLUS_SIZE = 1.0;
        const EFFECT_RADIUS = 150;
        const REPEL_FORCE = 5;
        const HEAL_FACTOR = 0.04;
        const DAMPING = 0.92;

        let MESSAGES = [
            { text: 'ILAN LENZNER', scale: 0.9 },
            { video: '/videos/dnc4.mp4', bgFilter: 147 },
            { text: 'AI + DESIGN', scale: 0.9 },
            { video: '/videos/ilans-talk.mp4', bgFilter: 'grey' },
            { image: '/images/rhino-dots.webp' },
            { video: '/videos/bg_video.mp4', bgFilter: 'grey' },
            { video: '/videos/portrait-anim.mp4' },
            { text: '45+ TOOLS', scale: 0.9 },
            { text: 'CREATIVE TECH', scale: 0.9 },
        ];
        if (IS_MOBILE) {
            MESSAGES = MESSAGES.filter(m => !m.video);
        }
        const MSG_DURATION = 200;
        const FADE_FRAMES = 50;

        const imageCache = {};
        const videoCache = {};
        let activeVideo = null;

        MESSAGES.forEach(msg => {
            if (msg.image && !imageCache[msg.image]) {
                const img = new Image();
                img.src = msg.image;
                imageCache[msg.image] = img;
            }
        });

        function ensureVideo(src) {
            if (!src || videoCache[src]) return videoCache[src];
            const vid = document.createElement('video');
            vid.src = src;
            vid.muted = true;
            vid.loop = true;
            vid.playsInline = true;
            vid.preload = 'auto';
            vid.load();
            videoCache[src] = vid;
            return vid;
        }

        let W, H, cols, rows, particles;
        let mouseX = -9999, mouseY = -9999;
        let frame = 0, prevCycle = -1, lastT = 0;
        let msgIndex = 0;
        let litMap = null;
        let offCanvas, offCtx;
        let running = false;
        let rafId = null;

        function init() {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            canvas.style.width = W + 'px';
            canvas.style.height = H + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const spacing = Math.max(SPACING, Math.sqrt(W * H / 18000));
            cols = Math.ceil(W / spacing) + 2;
            rows = Math.ceil(H / spacing) + 2;
            particles = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const hx = c * spacing;
                    const hy = r * spacing;
                    particles.push({
                        hx: hx, hy: hy,
                        x: hx, y: hy,
                        vx: 0, vy: 0,
                        col: c, row: r,
                        baseShape: (r + c) % 2 === 0 ? 'dot' : 'plus',
                        lit: 0
                    });
                }
            }

            offCanvas = document.createElement('canvas');
            offCanvas.width = cols;
            offCanvas.height = rows;
            offCtx = offCanvas.getContext('2d', { willReadFrequently: true });

            sampleMessage(MESSAGES[0]);
        }

        let litPixels = [];
        let currentIsImage = false;
        let currentIsVideo = false;
        let currentBgFilter = null;

        function sampleMessage(msg) {
            if (activeVideo) {
                activeVideo.pause();
                activeVideo = null;
            }

            if (msg.video) {
                currentIsImage = true;
                currentIsVideo = true;
                currentBgFilter = msg.bgFilter || null;
                const vid = ensureVideo(msg.video);
                if (vid) {
                    vid.currentTime = 0;
                    vid.play().catch(() => {});
                    activeVideo = vid;
                    sampleVideoFrame(vid);
                }
                return;
            }

            currentIsVideo = false;
            offCtx.clearRect(0, 0, cols, rows);
            const cx = Math.floor(cols / 2);
            const cy = Math.floor(rows / 2);

            if (msg.image) {
                currentIsImage = true;
                const img = imageCache[msg.image];
                if (img && img.complete && img.naturalWidth > 0) {
                    const aspect = img.naturalWidth / img.naturalHeight;
                    let maxH = Math.floor(rows * 0.85);
                    let maxW = Math.floor(cols * 0.5);
                    let drawH = maxH;
                    let drawW = Math.floor(drawH * aspect);
                    if (drawW > maxW) { drawW = maxW; drawH = Math.floor(drawW / aspect); }
                    offCtx.drawImage(img, cx - Math.floor(drawW/2), cy - Math.floor(drawH/2), drawW, drawH);
                }
            } else {
                currentIsImage = false;
                offCtx.fillStyle = '#fff';
                offCtx.textAlign = 'center';
                offCtx.textBaseline = 'middle';
                const text = msg.text;
                const scale = msg.scale || 0.9;
                let fontSize = Math.floor(cols * scale / Math.max(text.length, 1) * 1.6);
                fontSize = Math.max(6, Math.min(fontSize, Math.floor(rows * 0.8)));
                offCtx.font = '900 ' + fontSize + 'px sans-serif';
                offCtx.fillText(text, cx, cy);
            }

            extractLitPixels(msg);
        }

        function sampleVideoFrame(vid) {
            if (!vid || vid.readyState < 2) return;
            offCtx.clearRect(0, 0, cols, rows);
            const cx = Math.floor(cols / 2);
            const cy = Math.floor(rows / 2);
            const aspect = vid.videoWidth / vid.videoHeight;
            let maxH = Math.floor(rows * 0.85);
            let maxW = Math.floor(cols * 0.5);
            let drawH = maxH;
            let drawW = Math.floor(drawH * aspect);
            if (drawW > maxW) { drawW = maxW; drawH = Math.floor(drawW / aspect); }
            offCtx.drawImage(vid, cx - Math.floor(drawW/2), cy - Math.floor(drawH/2), drawW, drawH);
            extractLitPixels({ video: true, bgFilter: currentBgFilter });
        }

        function extractLitPixels(msg) {
            const cx = Math.floor(cols / 2);
            const cy = Math.floor(rows / 2);
            const isVisual = msg.image || msg.video;
            let imgData;
            try {
                imgData = offCtx.getImageData(0, 0, cols, rows).data;
            } catch (e) {
                offCanvas = document.createElement('canvas');
                offCanvas.width = cols;
                offCanvas.height = rows;
                offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
                return;
            }
            litPixels = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const idx = (r * cols + c) * 4;
                    const R = imgData[idx], G = imgData[idx+1], B = imgData[idx+2], A = imgData[idx+3];
                    if (A < 60) continue;
                    if (isVisual) {
                        const lum = R * 0.299 + G * 0.587 + B * 0.114;
                        if (lum > 235) continue;
                        if (G > 80 && G > R * 1.3 && G > B * 1.3) continue;
                        if (msg.bgFilter === 'grey') {
                            const maxC = Math.max(R, G, B), minC = Math.min(R, G, B);
                            if (maxC - minC < 35) continue;
                        } else if (typeof msg.bgFilter === 'number') {
                            if (Math.abs(lum - msg.bgFilter) < 18) continue;
                        }
                    }
                    litPixels.push({ dc: c - cx, dr: r - cy, r: R, g: G, b: B });
                }
            }
            updateLitMap();
        }

        let litColorMap = {};

        function updateLitMap() {
            const fx = Math.floor(cols / 2 + Math.sin(frame / 180) * cols * 0.3);
            const fy = Math.floor(rows / 2 + Math.cos(frame / 130) * rows * 0.25);
            litMap = new Set();
            litColorMap = {};
            for (let i = 0; i < litPixels.length; i++) {
                const lp = litPixels[i];
                const c = fx + lp.dc;
                const r = fy + lp.dr;
                if (c >= 0 && c < cols && r >= 0 && r < rows) {
                    const key = c + ',' + r;
                    litMap.add(key);
                    if (lp.r !== undefined) {
                        litColorMap[key] = { r: lp.r, g: lp.g, b: lp.b };
                    }
                }
            }
        }

        function animate(now) {
            if (!running) { rafId = null; return; }
            ctx.clearRect(0, 0, W, H);

            const fAdv = lastT ? Math.max(1, Math.min(4, Math.round((now - lastT) / 16.7))) : 1;
            lastT = now;
            frame += fAdv;

            const cycleFrame = frame % (MSG_DURATION + FADE_FRAMES * 2);
            if (cycleFrame < prevCycle) {
                msgIndex = (msgIndex + 1) % MESSAGES.length;
                sampleMessage(MESSAGES[msgIndex]);
            } else if (prevCycle < MSG_DURATION && cycleFrame >= MSG_DURATION) {
                const next = MESSAGES[(msgIndex + 1) % MESSAGES.length];
                if (next.video) ensureVideo(next.video);
            }
            prevCycle = cycleFrame;

            if (currentIsVideo && activeVideo && activeVideo.readyState >= 2 && (fAdv > 1 || frame % 3 === 0)) {
                sampleVideoFrame(activeVideo);
            }

            if (fAdv > 1 || frame % 2 === 0) updateLitMap();

            let bannerAlpha = 1;
            if (cycleFrame < FADE_FRAMES) {
                bannerAlpha = cycleFrame / FADE_FRAMES;
            } else if (cycleFrame > MSG_DURATION + FADE_FRAMES) {
                bannerAlpha = 1 - (cycleFrame - MSG_DURATION - FADE_FRAMES) / FADE_FRAMES;
            }

            const radius = EFFECT_RADIUS + Math.sin(frame / 15) * 30;
            const radiusSq = radius * radius;

            const themeLight = theme === 'light';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                const key = p.col + ',' + p.row;
                const isLit = litMap && litMap.has(key);
                const pixelColor = litColorMap[key] || null;

                const targetLit = isLit ? bannerAlpha : 0;
                p.lit += (targetLit - p.lit) * 0.12;

                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const distSq = dx * dx + dy * dy;
                if (distSq < radiusSq && distSq > 0) {
                    const dist = Math.sqrt(distSq);
                    const strength = (1 - dist / radius) * REPEL_FORCE;
                    p.vx += (dx / dist) * strength;
                    p.vy += (dy / dist) * strength;
                }

                p.vx += (p.hx - p.x) * HEAL_FACTOR;
                p.vy += (p.hy - p.y) * HEAL_FACTOR;
                p.vx *= DAMPING;
                p.vy *= DAMPING;
                p.x += p.vx;
                p.y += p.vy;

                const glow = p.lit;
                const baseAlpha = themeLight
                    ? ((p.col + p.row) % 3 === 0 ? 0.32 : 0.22)
                    : ((p.col + p.row) % 3 === 0 ? 0.18 : 0.12);
                let alpha = baseAlpha + glow * 0.65;
                let r_c, g_c, b_c;

                if (pixelColor && currentIsImage && glow > 0.05) {
                    if (themeLight) {
                        const lum2 = 0.299 * pixelColor.r + 0.587 * pixelColor.g + 0.114 * pixelColor.b;
                        r_c = Math.round(60 * (1 - glow) + lum2 * glow);
                        g_c = Math.round(60 * (1 - glow) + lum2 * glow);
                        b_c = Math.round(70 * (1 - glow) + Math.min(255, lum2 * 1.04) * glow);
                    } else {
                        r_c = Math.round(255 * (1 - glow) + pixelColor.r * glow);
                        g_c = Math.round(255 * (1 - glow) + pixelColor.g * glow);
                        b_c = Math.round(255 * (1 - glow) + pixelColor.b * glow);
                    }
                    alpha = baseAlpha + glow * 0.82;
                } else if (themeLight) {
                    r_c = Math.round(70 + glow * 21);
                    g_c = Math.round(70 + glow * 7);
                    b_c = Math.round(80 + glow * 144);
                } else {
                    r_c = Math.round(237 - glow * 99);
                    g_c = Math.round(237 - glow * 114);
                    b_c = Math.round(234 + glow * 21);
                }
                const color = 'rgba(' + r_c + ',' + g_c + ',' + b_c + ',' + alpha + ')';

                let shape = p.baseShape;
                if (glow > 0.3) {
                    shape = shape === 'dot' ? 'plus' : 'dot';
                }

                if (shape === 'dot') {
                    const dotR = (themeLight ? 0.7 : DOT_R) + glow * (pixelColor && currentIsImage ? 1.8 : 1.2);
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
                    ctx.fillStyle = color;
                    ctx.fill();
                } else {
                    const s = PLUS_SIZE + glow * (pixelColor && currentIsImage ? 2.2 : 1.5);
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 1 + glow * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x - s, p.y);
                    ctx.lineTo(p.x + s, p.y);
                    ctx.moveTo(p.x, p.y - s);
                    ctx.lineTo(p.x, p.y + s);
                    ctx.stroke();
                }
            }

            rafId = requestAnimationFrame(animate);
        }

        function start() {
            if (running) return;
            running = true;
            if (activeVideo) activeVideo.play().catch(() => {});
            if (!rafId) rafId = requestAnimationFrame(animate);
        }
        function stop() {
            running = false;
            if (activeVideo) activeVideo.pause();
        }

        function onScroll() {
            const h = window.innerHeight;
            const p = Math.min(window.scrollY / h, 1);
            canvas.style.opacity = (1 - p).toFixed(3);
            if (p >= 0.99) stop();
            else start();
        }
        
        window.addEventListener('scroll', onScroll, { passive: true });

        const handleVisibilityChange = () => {
            if (document.hidden) stop();
            else if (window.scrollY < window.innerHeight) start();
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        document.addEventListener('mousemove', handleMouseMove);
        
        const handleMouseLeave = () => {
            mouseX = -9999;
            mouseY = -9999;
        };
        document.addEventListener('mouseleave', handleMouseLeave);
        
        const handleTouchMove = (e) => {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        };
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        
        const handleTouchEnd = () => {
            mouseX = -9999;
            mouseY = -9999;
        };
        document.addEventListener('touchend', handleTouchEnd);

        let resizeT;
        const handleResize = () => {
            clearTimeout(resizeT);
            resizeT = setTimeout(init, 150);
        };
        window.addEventListener('resize', handleResize);
        
        init();
        onScroll();
        start();

        return () => {
            stop();
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('resize', handleResize);
        };
    }, [theme]);

    return (
        <canvas id="dotfield" ref={canvasRef} aria-hidden="true"></canvas>
    );
}

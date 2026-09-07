import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './ilian-background.css';

import dnc4 from './assets/dnc4.mp4';
import ilansTalk from './assets/ilans-talk.mp4';
import backgroundVideo from './assets/bg_video.mp4';
import portraitAnimation from './assets/portrait-anim.mp4';
import rhinoDots from './assets/rhino-dots.webp';

const messages = [
  { text: 'SAMMI AZAZ', scale: 0.9 },
  { video: dnc4, bgFilter: 147 },
  { text: 'SOFTWARE ENGINEER', scale: 0.9 },
  { video: ilansTalk, bgFilter: 'grey' },
  { image: rhinoDots },
  { video: backgroundVideo, bgFilter: 'grey' },
  { video: portraitAnimation },
  { text: 'SYSTEMS & AI', scale: 0.9 },
  { text: 'CREATIVE TECH', scale: 0.9 },
];

export default function IlanBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      canvas.style.display = 'none';
      return undefined;
    }

    const context = canvas.getContext('2d');
    const isMobile = window.innerWidth < 700;
    const activeMessages = isMobile ? messages.filter((message) => !message.video) : messages;
    const spacing = isMobile ? 11 : 9;
    const dotRadius = 0.5;
    const plusSize = 1;
    const effectRadius = 150;
    const repelForce = 5;
    const healFactor = 0.04;
    const damping = 0.92;
    const messageDuration = 200;
    const fadeFrames = 50;
    const imageCache = new Map();
    const videoCache = new Map();
    const offscreen = document.createElement('canvas');
    const offscreenContext = offscreen.getContext('2d', { willReadFrequently: true });

    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let particles = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let frame = 0;
    let previousCycle = -1;
    let lastTime = 0;
    let messageIndex = 0;
    let litPixels = [];
    let litMap = null;
    let litColorMap = {};
    let currentIsImage = false;
    let currentIsVideo = false;
    let currentBackgroundFilter = null;
    let activeVideo = null;
    let running = false;
    let animationFrame = null;
    let resizeTimer = null;
    let themeLight = document.documentElement.getAttribute('data-theme') === 'light';

    activeMessages.forEach((message) => {
      if (message.image) {
        const image = new Image();
        image.src = message.image;
        imageCache.set(message.image, image);
      }
    });

    function ensureVideo(source) {
      if (!source || videoCache.has(source)) return videoCache.get(source);
      const video = document.createElement('video');
      video.src = source;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.load();
      videoCache.set(source, video);
      return video;
    }

    function updateLitMap() {
      const fieldX = Math.floor(columns / 2 + Math.sin(frame / 180) * columns * 0.3);
      const fieldY = Math.floor(rows / 2 + Math.cos(frame / 130) * rows * 0.25);
      litMap = new Set();
      litColorMap = {};
      litPixels.forEach((pixel) => {
        const column = fieldX + pixel.columnOffset;
        const row = fieldY + pixel.rowOffset;
        if (column >= 0 && column < columns && row >= 0 && row < rows) {
          const key = `${column},${row}`;
          litMap.add(key);
          if (pixel.red !== undefined) litColorMap[key] = pixel;
        }
      });
    }

    function extractLitPixels(message) {
      const centerColumn = Math.floor(columns / 2);
      const centerRow = Math.floor(rows / 2);
      const isVisual = message.image || message.video;
      let data;
      try {
        data = offscreenContext.getImageData(0, 0, columns, rows).data;
      } catch {
        return;
      }
      litPixels = [];
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const index = (row * columns + column) * 4;
          const red = data[index];
          const green = data[index + 1];
          const blue = data[index + 2];
          const alpha = data[index + 3];
          if (alpha < 60) continue;
          if (isVisual) {
            const luminance = red * 0.299 + green * 0.587 + blue * 0.114;
            if (luminance > 235) continue;
            if (green > 80 && green > red * 1.3 && green > blue * 1.3) continue;
            if (message.bgFilter === 'grey') {
              if (Math.max(red, green, blue) - Math.min(red, green, blue) < 35) continue;
            } else if (typeof message.bgFilter === 'number' && Math.abs(luminance - message.bgFilter) < 18) {
              continue;
            }
          }
          litPixels.push({ columnOffset: column - centerColumn, rowOffset: row - centerRow, red, green, blue });
        }
      }
      updateLitMap();
    }

    function drawImageMessage(message, image) {
      const centerColumn = Math.floor(columns / 2);
      const centerRow = Math.floor(rows / 2);
      const aspect = image.naturalWidth / image.naturalHeight;
      const maxHeight = Math.floor(rows * 0.85);
      const maxWidth = Math.floor(columns * 0.5);
      let drawHeight = maxHeight;
      let drawWidth = Math.floor(drawHeight * aspect);
      if (drawWidth > maxWidth) {
        drawWidth = maxWidth;
        drawHeight = Math.floor(drawWidth / aspect);
      }
      offscreenContext.drawImage(image, centerColumn - Math.floor(drawWidth / 2), centerRow - Math.floor(drawHeight / 2), drawWidth, drawHeight);
    }

    function sampleVideoFrame(video) {
      if (!video || video.readyState < 2) return;
      offscreenContext.clearRect(0, 0, columns, rows);
      const centerColumn = Math.floor(columns / 2);
      const centerRow = Math.floor(rows / 2);
      const aspect = video.videoWidth / video.videoHeight;
      const maxHeight = Math.floor(rows * 0.85);
      const maxWidth = Math.floor(columns * 0.5);
      let drawHeight = maxHeight;
      let drawWidth = Math.floor(drawHeight * aspect);
      if (drawWidth > maxWidth) {
        drawWidth = maxWidth;
        drawHeight = Math.floor(drawWidth / aspect);
      }
      offscreenContext.drawImage(video, centerColumn - Math.floor(drawWidth / 2), centerRow - Math.floor(drawHeight / 2), drawWidth, drawHeight);
      extractLitPixels({ video: true, bgFilter: currentBackgroundFilter });
    }

    function sampleMessage(message) {
      if (activeVideo) {
        activeVideo.pause();
        activeVideo = null;
      }
      currentIsImage = Boolean(message.image || message.video);
      currentIsVideo = Boolean(message.video);
      currentBackgroundFilter = message.bgFilter || null;
      if (message.video) {
        const video = ensureVideo(message.video);
        activeVideo = video;
        video.currentTime = 0;
        video.play().catch(() => {});
        sampleVideoFrame(video);
        return;
      }
      offscreenContext.clearRect(0, 0, columns, rows);
      const centerColumn = Math.floor(columns / 2);
      const centerRow = Math.floor(rows / 2);
      if (message.image) {
        const image = imageCache.get(message.image);
        if (image?.complete && image.naturalWidth > 0) drawImageMessage(message, image);
      } else {
        offscreenContext.fillStyle = '#fff';
        offscreenContext.textAlign = 'center';
        offscreenContext.textBaseline = 'middle';
        const fontSize = Math.max(6, Math.min(Math.floor(columns * (message.scale || 0.9) / message.text.length * 1.6), Math.floor(rows * 0.8)));
        offscreenContext.font = `900 ${fontSize}px sans-serif`;
        offscreenContext.fillText(message.text, centerColumn, centerRow);
      }
      extractLitPixels(message);
    }

    function initialize() {
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.ceil(width * devicePixelRatio);
      canvas.height = Math.ceil(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      const dotSpacing = Math.max(spacing, Math.sqrt((width * height) / 18000));
      columns = Math.ceil(width / dotSpacing) + 4;
      rows = Math.ceil(height / dotSpacing) + 4;
      particles = [];
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const homeX = column * dotSpacing;
          const homeY = row * dotSpacing;
          particles.push({ homeX, homeY, x: homeX, y: homeY, velocityX: 0, velocityY: 0, column, row, baseShape: (row + column) % 2 === 0 ? 'dot' : 'plus', lit: 0 });
        }
      }
      offscreen.width = columns;
      offscreen.height = rows;
      sampleMessage(activeMessages[0]);
    }

    function animate(now) {
      if (!running) {
        animationFrame = null;
        return;
      }
      context.clearRect(0, 0, width, height);
      const frameAdvance = lastTime ? Math.max(1, Math.min(4, Math.round((now - lastTime) / 16.7))) : 1;
      lastTime = now;
      frame += frameAdvance;
      const cycleFrame = frame % (messageDuration + fadeFrames * 2);
      if (cycleFrame < previousCycle) {
        messageIndex = (messageIndex + 1) % activeMessages.length;
        sampleMessage(activeMessages[messageIndex]);
      } else if (previousCycle < messageDuration && cycleFrame >= messageDuration) {
        const nextMessage = activeMessages[(messageIndex + 1) % activeMessages.length];
        if (nextMessage.video) ensureVideo(nextMessage.video);
      }
      previousCycle = cycleFrame;
      if (currentIsVideo && activeVideo && activeVideo.readyState >= 2 && (frameAdvance > 1 || frame % 3 === 0)) sampleVideoFrame(activeVideo);
      if (frameAdvance > 1 || frame % 2 === 0) updateLitMap();
      let bannerAlpha = 1;
      if (cycleFrame < fadeFrames) bannerAlpha = cycleFrame / fadeFrames;
      else if (cycleFrame > messageDuration + fadeFrames) bannerAlpha = 1 - (cycleFrame - messageDuration - fadeFrames) / fadeFrames;
      const radius = effectRadius + Math.sin(frame / 15) * 30;
      const radiusSquared = radius * radius;
      particles.forEach((particle) => {
        const key = `${particle.column},${particle.row}`;
        const isLit = litMap?.has(key);
        const pixelColor = litColorMap[key];
        const targetLit = isLit ? bannerAlpha : 0;
        particle.lit += (targetLit - particle.lit) * 0.12;
        const distanceX = particle.x - mouseX;
        const distanceY = particle.y - mouseY;
        const distanceSquared = distanceX * distanceX + distanceY * distanceY;
        if (distanceSquared < radiusSquared && distanceSquared > 0) {
          const distance = Math.sqrt(distanceSquared);
          const strength = (1 - distance / radius) * repelForce;
          particle.velocityX += (distanceX / distance) * strength;
          particle.velocityY += (distanceY / distance) * strength;
        }
        particle.velocityX += (particle.homeX - particle.x) * healFactor;
        particle.velocityY += (particle.homeY - particle.y) * healFactor;
        particle.velocityX *= damping;
        particle.velocityY *= damping;
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        const glow = particle.lit;
        const baseAlpha = themeLight ? ((particle.column + particle.row) % 3 === 0 ? 0.32 : 0.22) : ((particle.column + particle.row) % 3 === 0 ? 0.18 : 0.12);
        let red;
        let green;
        let blue;
        let alpha = baseAlpha + glow * 0.65;
        if (pixelColor && currentIsImage && glow > 0.05) {
          const luminance = 0.299 * pixelColor.red + 0.587 * pixelColor.green + 0.114 * pixelColor.blue;
          if (themeLight) {
            red = Math.round(60 * (1 - glow) + luminance * glow);
            green = Math.round(60 * (1 - glow) + luminance * glow);
            blue = Math.round(70 * (1 - glow) + Math.min(255, luminance * 1.04) * glow);
          } else {
            red = Math.round(255 * (1 - glow) + pixelColor.red * glow);
            green = Math.round(255 * (1 - glow) + pixelColor.green * glow);
            blue = Math.round(255 * (1 - glow) + pixelColor.blue * glow);
          }
          alpha = baseAlpha + glow * 0.82;
        } else if (themeLight) {
          red = Math.round(70 + glow * 21);
          green = Math.round(70 + glow * 7);
          blue = Math.round(80 + glow * 144);
        } else {
          red = Math.round(237 - glow * 99);
          green = Math.round(237 - glow * 114);
          blue = Math.round(234 + glow * 21);
        }
        const color = `rgba(${red},${green},${blue},${alpha})`;
        const shape = glow > 0.3 ? (particle.baseShape === 'dot' ? 'plus' : 'dot') : particle.baseShape;
        if (shape === 'dot') {
          context.beginPath();
          context.arc(particle.x, particle.y, (themeLight ? 0.7 : dotRadius) + glow * (pixelColor && currentIsImage ? 1.8 : 1.2), 0, Math.PI * 2);
          context.fillStyle = color;
          context.fill();
        } else {
          const size = plusSize + glow * (pixelColor && currentIsImage ? 2.2 : 1.5);
          context.strokeStyle = color;
          context.lineWidth = 1 + glow * 0.5;
          context.beginPath();
          context.moveTo(particle.x - size, particle.y);
          context.lineTo(particle.x + size, particle.y);
          context.moveTo(particle.x, particle.y - size);
          context.lineTo(particle.x, particle.y + size);
          context.stroke();
        }
      });
      animationFrame = requestAnimationFrame(animate);
    }

    function start() {
      if (running) return;
      running = true;
      activeVideo?.play().catch(() => {});
      if (!animationFrame) animationFrame = requestAnimationFrame(animate);
    }

    function stop() {
      running = false;
      activeVideo?.pause();
    }

    function updateScroll() {
      // Keep background fully visible across the entire website
      canvas.style.opacity = '1';
      start();
    }

    const onMouseMove = (event) => { mouseX = event.clientX; mouseY = event.clientY; };
    const onTouchMove = (event) => { mouseX = event.touches[0].clientX; mouseY = event.touches[0].clientY; };
    const resetPointer = () => { mouseX = -9999; mouseY = -9999; };
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initialize, 150);
    };
    const themeObserver = new MutationObserver(() => {
      themeLight = document.documentElement.getAttribute('data-theme') === 'light';
    });

    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', resetPointer);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', resetPointer);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibilityChange);
    initialize();
    updateScroll();
    start();

    return () => {
      stop();
      if (animationFrame) cancelAnimationFrame(animationFrame);
      clearTimeout(resizeTimer);
      themeObserver.disconnect();
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', resetPointer);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', resetPointer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      videoCache.forEach((video) => { video.pause(); video.removeAttribute('src'); video.load(); });
    };
  }, []);

  if (typeof document === 'undefined' || !document.body) {
    return null;
  }

  return createPortal(
    <>
      <canvas ref={canvasRef} className="ilian-background" aria-hidden="true" />
      <div className="ilian-background-noise" aria-hidden="true" />
    </>,
    document.body
  );
}

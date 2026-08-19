import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/logo.png';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING ENVIRONMENT...');

  useEffect(() => {
    // Lock Lenis scroll while preloader is active
    if (window.__lenis) {
      window.__lenis.stop();
    }

    const duration = 1800; // 1.8s
    const startTime = performance.now();
    let animationFrameId;

    // Lenis exponential easing
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const linearProgress = Math.min(1, elapsed / duration);
      const easedProgress = easeOutExpo(linearProgress);
      const currentPct = Math.min(100, Math.round(easedProgress * 100));

      setProgress(currentPct);

      if (currentPct < 35) {
        setStatusText('INITIALIZING SYSTEMS...');
      } else if (currentPct < 75) {
        setStatusText('LOADING NEURAL INTERFACES...');
      } else if (currentPct < 100) {
        setStatusText('FINALIZING EXPERIENCE...');
      } else {
        setStatusText('WELCOME TO SAMMI.DEV');
      }

      if (linearProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          // Unlock and reset Lenis scroll to top upon reveal
          if (window.__lenis) {
            window.__lenis.start();
            window.__lenis.scrollTo(0, { immediate: true });
          }
          if (onComplete) onComplete();
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [onComplete]);

  return (
    <motion.div
      className="preloader-overlay"
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        opacity: 0.95,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Background Ambient Glow */}
      <div className="preloader-glow-orb" />
      <div className="preloader-grid-bg" />

      <div className="preloader-content">
        {/* Animated Logo Container */}
        <motion.div
          className="preloader-logo-wrapper"
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Pulsing Aura */}
          <div className="logo-pulse-ring" />
          
          <img src={logoImg} alt="Sammi Azaz Logo" className="preloader-logo-img" />
        </motion.div>

        {/* Status Tag */}
        <motion.div
          className="preloader-status-tag"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="preloader-status-dot" />
          <span className="preloader-status-text">{statusText}</span>
        </motion.div>

        {/* Progress Bar Container */}
        <motion.div
          className="preloader-progress-track"
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div
            className="preloader-progress-fill"
            style={{ width: `${progress}%` }}
          >
            <div className="progress-glow-head" />
          </div>
        </motion.div>

        {/* Percentage Counter */}
        <motion.div
          className="preloader-counter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <span className="counter-val">{progress}</span>
          <span className="counter-pct">%</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

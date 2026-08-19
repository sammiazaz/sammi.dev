import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    // Lock Lenis scroll while preloader is active
    if (window.__lenis) {
      window.__lenis.stop();
    }

    const totalDuration = mq.matches ? 400 : 2200;

    const timer = setTimeout(() => {
      if (window.__lenis) {
        window.__lenis.start();
        window.__lenis.scrollTo(0, { immediate: true });
      }
      if (onComplete) onComplete();
    }, totalDuration);

    return () => {
      clearTimeout(timer);
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [onComplete]);

  // Letters definition for "SAMMI" and "AZAZ"
  const firstName = ['S', 'A', 'M', 'M', 'I'];
  const lastName = ['A', 'Z', 'A', 'Z'];

  return (
    <motion.div
      className="minimal-preloader-overlay"
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      <div className="preloader-assembly-stage">
        {/* Subtle geometric framing lines */}
        <motion.div
          className="assembly-frame-line top"
          initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />

        {/* Core Brand Assembly Container */}
        <div className="brand-assembly-wrapper">
          {/* First Name: SAMMI */}
          <div className="word-cluster">
            {firstName.map((char, i) => (
              <div key={`fn-${i}`} className="char-mask-cell">
                <motion.span
                  className="assembly-char primary-char"
                  initial={
                    reducedMotion
                      ? { y: 0, opacity: 1 }
                      : { y: 48, opacity: 0, scale: 0.95 }
                  }
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {char}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Accent Divider Dot */}
          <div className="char-mask-cell divider-cell">
            <motion.span
              className="assembly-accent-dot"
              initial={reducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </div>

          {/* Last Name: AZAZ */}
          <div className="word-cluster">
            {lastName.map((char, i) => (
              <div key={`ln-${i}`} className="char-mask-cell">
                <motion.span
                  className="assembly-char accent-char"
                  initial={
                    reducedMotion
                      ? { y: 0, opacity: 1 }
                      : { y: -48, opacity: 0, scale: 0.95 }
                  }
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.35 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {char}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle geometric bottom line */}
        <motion.div
          className="assembly-frame-line bottom"
          initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        />

        {/* Secondary Subtitle Mark: 21st. ARCHITECTURE */}
        <div className="secondary-mark-wrapper">
          <motion.div
            className="secondary-mark-track"
            initial={
              reducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10, letterSpacing: '4px' }
            }
            animate={{ opacity: 1, y: 0, letterSpacing: '3px' }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mark-badge">21st.</span>
            <span className="mark-label">ENGINEERING & AI</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

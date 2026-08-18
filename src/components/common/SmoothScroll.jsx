import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Root-level smooth scroll provider powered by Lenis.
 * Features:
 * - Single instance created at app root.
 * - Duration: 1.2 with smoothWheel: true & smoothTouch: false (native mobile scroll).
 * - Instant scroll reset to (0, 0) on route transitions.
 * - Full prefers-reduced-motion accessibility support.
 * - Clean lifecycle management with requestAnimationFrame.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    // Respect prefers-reduced-motion preference
    const motionQuery = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;
    const prefersReducedMotion = motionQuery ? motionQuery.matches : false;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Listen for real-time changes to motion preferences
    const handleMotionChange = (e) => {
      if (e.matches) {
        lenis.options.smoothWheel = false;
        lenis.options.duration = 0;
      } else {
        lenis.options.smoothWheel = true;
        lenis.options.duration = 1.2;
      }
    };

    if (motionQuery) {
      motionQuery.addEventListener('change', handleMotionChange);
    }

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      if (motionQuery) {
        motionQuery.removeEventListener('change', handleMotionChange);
      }
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll to top on every route change immediately
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}

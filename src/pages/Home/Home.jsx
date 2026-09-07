import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import About from '../About/About';
import { SKILLS_DATA } from '../../data/skills';
import './Home.css';

let hasPlayedEntrance = false;

// Featured skills for compact mobile chip showcase
const MOBILE_FEATURED_SKILLS = [
  'Python', 'React', 'TypeScript', 'Docker', 'AWS',
  'PostgreSQL', 'MongoDB', 'AI', 'CI/CD', 'Git'
];

function Pill({ skill, smoothMouseX, smoothMouseY, windowSize, onClick, index, skipAnimation }) {
  const moveMax = skill.depth * 70;
  const offsetX = useTransform(smoothMouseX, [0, windowSize.width], [moveMax, -moveMax]);
  const offsetY = useTransform(smoothMouseY, [0, windowSize.height], [moveMax, -moveMax]);

  return (
    <motion.div
      initial={!skipAnimation ? { left: '50%', top: '50%', opacity: 0, scale: 0.2 } : false}
      animate={{ left: `${skill.x}%`, top: `${skill.y}%`, opacity: 1, scale: 1 }}
      transition={!skipAnimation ? {
        duration: 1.6,
        delay: 0.4 + (index * 0.04),
        ease: [0.16, 1, 0.3, 1]
      } : { duration: 0 }}
      style={{
        position: 'absolute',
        x: '-50%',
        y: '-50%'
      }}
      className="pill-anchor"
    >
      <motion.div style={{ x: offsetX, y: offsetY }}>
        <motion.button
          type="button"
          layoutId={`skill-${skill.label}`}
          className={`pill ${skill.style || ''}`}
          onClick={() => onClick(skill)}
          whileHover={{ scale: 1.18, zIndex: 60 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          title={`Click to learn about ${skill.label}`}
        >
          <span className="pill-dot" />
          <span className="pill-text">{skill.label}</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const { siteTheme } = useTheme();
  const isClient = typeof window !== 'undefined';
  const mouseX = useMotionValue(isClient ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(isClient ? window.innerHeight / 2 : 0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.9 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.9 });

  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : 1200,
    height: isClient ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    hasPlayedEntrance = true;
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const heroX = useTransform(smoothMouseX, [0, windowSize.width], [12, -12]);
  const heroY = useTransform(smoothMouseY, [0, windowSize.height], [12, -12]);

  const [selectedSkill, setSelectedSkill] = useState(null);

  const isMobile = windowSize.width < 820;

  const scrollToAbout = () => {
    const aboutElem = document.getElementById('about-section');
    if (aboutElem) {
      aboutElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      <section
        id="hero"
        className={siteTheme === 'ilian' ? 'ilian-hero-section' : 'sammi-hero-section'}
        style={{ perspective: '1000px' }}
      >
        {siteTheme === 'sammi' ? (
          /* ─── SAMMI THEME HERO (DEVELOPER SHOWCASE & PARALLAX ORBIT) ─── */
          <>
            <motion.div
              className="sammi-hero-card"
              initial={!hasPlayedEntrance ? { opacity: 0, scale: 0.88, y: 24 } : false}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={!hasPlayedEntrance ? { duration: 0.9, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
              style={!isMobile ? { x: heroX, y: heroY } : undefined}
            >
              {/* Terminal & Availability Top Bar */}
              <div className="hero-top-status-bar">
                <div className="hero-avail-badge">
                  <span className="status-dot-pulse" />
                  <span className="avail-text">Available for Opportunities</span>
                  <span className="dot-sep">•</span>
                  <span className="loc-text">Delhi, India</span>
                </div>

                <div className="terminal-header-tag">
                  <span className="terminal-tag-prompt">~/sammi.dev</span>
                  <span className="terminal-tag-cmd">$ whoami</span>
                  <span className="terminal-cursor-blink">_</span>
                </div>
              </div>

              {/* Main Headline & Identity */}
              <div className="hero-name-block">
                <div className="hero-eyebrow">
                  <span className="eyebrow-bracket">&lt;</span>
                  <span className="eyebrow-title">SOFTWARE ENGINEER &amp; ML BUILDER</span>
                  <span className="eyebrow-bracket">&gt;</span>
                </div>
                <h1 className="sammi-hero-name">
                  SAMMI <span className="name-highlight">AZAZ</span>
                </h1>
                <div className="hero-tagline-box">
                  <span className="tagline-lead">Building</span>
                  <span className="tagline-chip highlight-chip">Intelligent Systems</span>
                  <span className="tagline-and">&amp;</span>
                  <span className="tagline-chip">Resilient Software</span>
                </div>
              </div>

              {/* Narrative Bio */}
              <p className="sammi-hero-bio">
                B.Tech Computer Science student at <strong className="bio-highlight">IILM University</strong> crafting production-grade full-stack architectures, low-latency backends, and applied machine learning pipelines.
              </p>

              {/* Action Buttons */}
              <div className="sammi-hero-actions">
                <Link to="/projects" className="hero-btn-primary">
                  <span>Explore Projects</span>
                  <svg className="cta-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>

                <Link to="/resume" className="hero-btn-secondary">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  <span>Curriculum Vitae</span>
                </Link>

                <Link to="/contact" className="hero-btn-outline">
                  <span>Get in Touch</span>
                </Link>
              </div>

              {/* Quick Metrics Bar */}
              <div className="hero-metrics-strip">
                <div className="metric-cell">
                  <span className="metric-number">400+</span>
                  <span className="metric-caption">DSA Problems</span>
                </div>
                <div className="metric-sep" />
                <div className="metric-cell">
                  <span className="metric-number">7.19</span>
                  <span className="metric-caption">B.Tech CGPA</span>
                </div>
                <div className="metric-sep" />
                <div className="metric-cell">
                  <span className="metric-number">AWS &amp; NVIDIA</span>
                  <span className="metric-caption">Certifications</span>
                </div>
              </div>

              {/* Compact Mobile Skill Cloud (shown only on mobile screens) */}
              {isMobile && (
                <div className="mobile-skills-section">
                  <span className="mobile-skills-label">Core Technologies</span>
                  <div className="mobile-skills-chips">
                    {MOBILE_FEATURED_SKILLS.map((skillName) => {
                      const skillObj = SKILLS_DATA.find(s => s.label.toLowerCase().includes(skillName.toLowerCase())) || { label: skillName, info: `${skillName} development` };
                      return (
                        <button
                          key={skillName}
                          type="button"
                          className="mobile-skill-chip"
                          onClick={() => setSelectedSkill(skillObj)}
                        >
                          {skillName}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Desktop Parallax Floating Skill Orbit */}
            {!isMobile && SKILLS_DATA.map((skill, index) => {
              if (selectedSkill?.label === skill.label) {
                return null;
              }

              return (
                <Pill
                  key={skill.label}
                  skill={skill}
                  smoothMouseX={smoothMouseX}
                  smoothMouseY={smoothMouseY}
                  windowSize={windowSize}
                  onClick={setSelectedSkill}
                  index={index}
                  skipAnimation={hasPlayedEntrance}
                />
              );
            })}
          </>
        ) : (
          /* ─── ILIAN THEME HERO (MONOCHROME EDITORIAL SHOWCASE) ─── */
          <div className="ilian-showcase-wrapper">
            <motion.div
              className="ilian-showcase-content"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Status Pill */}
              <div className="ilian-showcase-status">
                <span className="ilian-showcase-dot" />
                <span className="ilian-showcase-avail">Available for Opportunities</span>
                <span className="ilian-showcase-sep">•</span>
                <span className="ilian-showcase-loc">Delhi, India</span>
              </div>

              {/* Main Headline */}
              <h1 className="ilian-showcase-title">
                Building <span className="text-highlight">intelligent</span><br />
                <span className="text-highlight">systems</span> &amp; resilient<br />
                software.
              </h1>

              {/* Kicker */}
              <div className="ilian-showcase-kicker">
                <span className="ilian-showcase-kicker-text">SOFTWARE ENGINEER &amp; ML BUILDER</span>
                <span className="ilian-showcase-kicker-line" />
              </div>

              {/* Bio Narrative */}
              <p className="ilian-showcase-bio">
                CS student at <strong className="ilian-bio-bold">IILM University</strong> crafting full-stack architectures, machine learning pipelines, and security-centric digital experiences with clean engineering.
              </p>

              {/* Action Buttons */}
              <div className="ilian-showcase-buttons">
                <Link to="/projects" className="ilian-btn-explore">
                  <span>Explore Projects</span>
                  <span className="ilian-arrow">→</span>
                </Link>
                <Link to="/resume" className="ilian-btn-resume">
                  Resume
                </Link>
                <Link to="/contact" className="ilian-btn-contact">
                  Contact
                </Link>
              </div>

              {/* Ilian Metrics Strip */}
              <div className="ilian-metrics-strip">
                <div className="ilian-metric-item">
                  <span className="ilian-metric-val">400+</span>
                  <span className="ilian-metric-label">DSA Solved</span>
                </div>
                <div className="ilian-metric-divider" />
                <div className="ilian-metric-item">
                  <span className="ilian-metric-val">7.19</span>
                  <span className="ilian-metric-label">CGPA</span>
                </div>
                <div className="ilian-metric-divider" />
                <div className="ilian-metric-item">
                  <span className="ilian-metric-val">NVIDIA &amp; AWS</span>
                  <span className="ilian-metric-label">Certified</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Scroll Cue Indicator */}
        <button
          type="button"
          className="hero-scroll-cue"
          onClick={scrollToAbout}
          aria-label="Scroll down to About section"
        >
          <span className="scroll-mouse-icon">
            <span className="scroll-mouse-wheel" />
          </span>
          <span className="scroll-cue-label">Scroll to explore</span>
          <svg className="scroll-chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </section>

      {/* Interactive Skill Modal Dialog */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              layoutId={`skill-${selectedSkill.label}`}
              className="modal-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-badge">&lt;skill /&gt;</div>
                <h2>{selectedSkill.label}</h2>
              </div>
              <p>{selectedSkill.info}</p>
              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setSelectedSkill(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded About Section */}
      <div id="about-section">
        <About />
      </div>

      <div className="persona-link-container">
        <Link to="/persona" className="persona-btn">
          Persona
        </Link>
      </div>
    </div>
  );
}

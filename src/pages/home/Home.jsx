import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import About from '../About/About';
import { SKILLS_DATA } from '../../data/skills';
import './Home.css';

let hasPlayedEntrance = false;

function Pill({ skill, smoothMouseX, smoothMouseY, windowSize, onClick, index, skipAnimation }) {
  const moveMax = skill.depth * 80;
  const offsetX = useTransform(smoothMouseX, [0, windowSize.width], [moveMax, -moveMax]);
  const offsetY = useTransform(smoothMouseY, [0, windowSize.height], [moveMax, -moveMax]);

  return (
    <motion.div
      initial={!skipAnimation ? { left: '50%', top: '50%', opacity: 0, scale: 0.2 } : false}
      animate={{ left: `${skill.x}%`, top: `${skill.y}%`, opacity: 1, scale: 1 }}
      transition={!skipAnimation ? {
        duration: 1.8,
        delay: 0.6 + (index * 0.05),
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
        <motion.div
          layoutId={skill.label}
          className={`pill ${skill.style || ''}`}
          onClick={() => onClick(skill)}
          whileHover={{ scale: 2, zIndex: 50 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {skill.label}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const isClient = typeof window !== 'undefined';
  const mouseX = useMotionValue(isClient ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(isClient ? window.innerHeight / 2 : 0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 1 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 1 });

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

  const heroX = useTransform(smoothMouseX, [0, windowSize.width], [15, -15]);
  const heroY = useTransform(smoothMouseY, [0, windowSize.height], [15, -15]);

  const [selectedSkill, setSelectedSkill] = useState(null);

  const selectedMoveMax = selectedSkill ? selectedSkill.depth * 80 : 0;
  const selectedOffsetX = useTransform(smoothMouseX, [0, windowSize.width], [selectedMoveMax, -selectedMoveMax]);
  const selectedOffsetY = useTransform(smoothMouseY, [0, windowSize.height], [selectedMoveMax, -selectedMoveMax]);

  return (
    <div className="home-page">
      <section id="hero" style={{ perspective: '1000px' }}>

        <motion.div
          className="hero-content"
          initial={!hasPlayedEntrance ? { opacity: 0, scale: 0.7, y: 30 } : false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={!hasPlayedEntrance ? { duration: 0.8, ease: 'easeOut' } : { duration: 0 }}
          style={{ x: heroX, y: heroY }}
        >
          <div className="hero-box">
            <h1><span className="terminal-logo">&gt;<span className="mono-dot">_</span></span> Software Engineer</h1>
          </div>
        </motion.div>

        {SKILLS_DATA.map((skill, index) => {
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
      </section>

      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="modal-overlay"
            onClick={() => setSelectedSkill(null)}
          >
            <div
              style={{
                position: 'absolute',
                left: `${selectedSkill.x}%`,
                top: `${selectedSkill.y}%`,
                transform: `translate(-${selectedSkill.x}%, -${selectedSkill.y}%)`
              }}
              className="modal-anchor"
            >
              <motion.div style={{ x: selectedOffsetX, y: selectedOffsetY }}>
                <motion.div
                  layoutId={selectedSkill.label}
                  className="modal-content"
                  onClick={(event) => event.stopPropagation()}
                >
                  <h2>{selectedSkill.label}</h2>
                  <p>{selectedSkill.info}</p>
                  <button className="modal-close" onClick={() => setSelectedSkill(null)}>Close</button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className="scroll-hint"
        onClick={() => {
          document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        move your cursor around | click to explore about
      </button>

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

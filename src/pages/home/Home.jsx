import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

let hasPlayedEntrance = false;

const SKILLS_DATA = [
  { label: 'Full Stack Developers', x: 22.6287, y: 25.7954, depth: 1.8411, style: '', info: 'Engineers proficient in both front-end user interfaces and back-end database architecture.' },
  { label: 'Front End Developers', x: 19.7462, y: 54.484, depth: 1.4741, style: '', info: 'Specialists who build the visible parts of applications using HTML, CSS, and JavaScript.' },
  { label: 'iOS Developers', x: 25.042, y: 87.2959, depth: 0.6032, style: '', info: 'Mobile developers focused on Apple’s ecosystem using Swift and Objective-C.' },
  { label: 'Android Developers', x: 30.5485, y: 49.6791, depth: 1.6770, style: '', info: 'Mobile developers building for the Android platform using Kotlin and Java.' },
  { label: 'React Developers', x: 57.0656, y: 84.6367, depth: 0.5114, style: '', info: 'Experts in building dynamic user interfaces using the React.js library.' },
  { label: 'Node JS Developers', x: 15.4858, y: 13.3935, depth: 1.9040, style: '', info: 'Backend developers utilizing JavaScript server-side with Node.js.' },
  { label: 'Vue JS Developers', x: 49.8603, y: 42.2736, depth: 0.5858, style: '', info: 'Frontend engineers specializing in the progressive Vue.js framework.' },
  { label: 'Flutter Developers', x: 61.8935, y: 71.8816, depth: 0.7918, style: '', info: 'Cross-platform mobile developers using Dart and the Flutter SDK.' },
  { label: 'Blockchain Developers', x: 20.5389, y: 28.5018, depth: 1.7389, style: '', info: 'Engineers building decentralized applications and smart contracts.' },
  { label: 'PostgreSQL', x: 15.9412, y: 44.8008, depth: 0.8221, style: '', info: 'A powerful, open source object-relational database system.' },
  { label: 'MongoDB', x: 30.3332, y: 16.2993, depth: 1.7859, style: '', info: 'A popular NoSQL database known for its flexibility and scalability.' },
  { label: 'Next.js', x: 66.0158, y: 35.9919, depth: 1.0232, style: '', info: 'A React framework providing hybrid static & server rendering.' },
  { label: 'Tailwind CSS', x: 23.2702, y: 36.9939, depth: 1.8705, style: '', info: 'A utility-first CSS framework for rapidly building custom designs.' },
  { label: 'TypeScript', x: 34.2144, y: 74.5856, depth: 1.9644, style: '', info: 'A strongly typed programming language that builds on JavaScript.' },
  { label: 'JavaScript', x: 11.0619, y: 26.3897, depth: 1.5873, style: '', info: 'The core programming language of the Web.' },
  { label: 'Python', x: 64.427, y: 73.655, depth: 0.6620, style: '', info: 'A versatile language popular for AI, data science, and web backends.' },
  { label: 'Artificial Intelligence', x: 87.1582, y: 64.8886, depth: 1.9099, style: '', info: 'Developing systems capable of performing tasks that require human intelligence.' },
  { label: 'Web3', x: 86.121, y: 73.1735, depth: 1.1948, style: '', info: 'The decentralized web utilizing blockchain technologies.' },
  { label: 'GraphQL', x: 41.2808, y: 47.8279, depth: 1.4169, style: '', info: 'A query language for your API, offering clients exactly what they request.' },
  { label: 'Docker', x: 11.9695, y: 40.2946, depth: 0.7558, style: '', info: 'A platform designed to help developers build, share, and run container applications.' },
  { label: 'AWS', x: 62.4024, y: 17.8178, depth: 1.6079, style: '', info: 'Amazon Web Services, providing comprehensive cloud infrastructure.' },
  { label: 'CI/CD', x: 73.4798, y: 72.5322, depth: 0.8471, style: '', info: 'Continuous Integration and Continuous Deployment practices.' },
  { label: 'Git', x: 59.3356, y: 50.5171, depth: 0.7757, style: '', info: 'A distributed version control system for tracking changes in code.' },
  { label: 'Linux', x: 52.0868, y: 22.0058, depth: 1.6272, style: '', info: 'A widely used open-source operating system kernel.' },
  { label: 'Cyber Security', x: 62.7918, y: 66.4909, depth: 1.7575, style: '', info: 'Protecting systems, networks, and programs from digital attacks.' },
  { label: 'Databases', x: 76.1326, y: 35.7881, depth: 1.1109, style: '', info: 'Organized collections of structured data.' }
];

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
          className={`pill ${skill.style}`}
          onClick={() => onClick(skill)}
          whileHover={{ scale: 1.8, zIndex: 50 }}
          transition={{ duration: 0.2 }}
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

    // Mark that the animation has played so it doesn't repeat on route change
    hasPlayedEntrance = true;

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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
    <>
      <section id="hero" style={{ perspective: '1000px' }}>
        <motion.div
          className="hero-content"
          initial={!hasPlayedEntrance ? { opacity: 0, scale: 0.7, y: 30 } : false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={!hasPlayedEntrance ? { duration: 0.8, ease: "easeOut" } : { duration: 0 }}
          style={{ x: heroX, y: heroY }}
        >
          <div className="hero-monogram">s<span className="mono-dot">:</span></div>
          <div className="hero-box">
            <h1>Software Developer</h1>
          </div>
        </motion.div>

        {SKILLS_DATA.map((skill, i) => {
          if (selectedSkill?.label === skill.label) return null;
          return (
            <Pill
              key={skill.label}
              skill={skill}
              smoothMouseX={smoothMouseX}
              smoothMouseY={smoothMouseY}
              windowSize={windowSize}
              onClick={setSelectedSkill}
              index={i}
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
                  onClick={(e) => e.stopPropagation()}
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

      <p className="scroll-hint">move your cursor around &nbsp;·&nbsp; explore skills</p>
    </>
  );
}

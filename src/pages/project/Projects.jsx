import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, GRID_PROJECTS } from '../../data/projects';
import './Projects.css';

const TiltCard = ({ project, layout = "vertical" }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(project.tabs)[0]);

  const description = project.tabs[activeTab];

  return (
    <div className={`tilt-wrapper tilt-${layout}`}>
      <motion.article
        className="tilt-glass-card"
      >
        
        {/* The inner content translates forward in 3D space for a parallax pop effect */}
        <div className="tilt-inner">
          <div className="tilt-image-wrapper">
            <img src={project.image} alt={project.title} className="tilt-image" draggable="false" />
            <div className="tilt-image-overlay" />
          </div>

          <div className="tilt-content">
            <div className="tilt-header">
              <h2 className="tilt-title">{project.title}</h2>
              {project.subtitle && <p className="tilt-subtitle">{project.subtitle}</p>}
            </div>

            {/* Tabs */}
            <div className="tilt-tabs">
              {Object.keys(project.tabs).map(tab => (
                <button 
                  key={tab} 
                  className={`tilt-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <p className="tilt-desc">{description}</p>
            
            <div className="tilt-tech">
              {project.tech.map(t => <span key={t} className="tilt-pill">{t}</span>)}
            </div>

            <div className="tilt-actions-stack">
              <div className="tilt-actions-row">
                <a className="tilt-btn tilt-btn-outline half-width" href={project.github} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                    <circle cx="12" cy="18" r="3" />
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="18" cy="6" r="3" />
                    <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
                    <path d="M12 12v3" />
                  </svg>
                  Code
                </a>
                <a className="tilt-btn tilt-btn-solid half-width" href={project.link} target="_blank" rel="noopener noreferrer">
                  Live
                </a>
              </div>
              <a className="tilt-btn tilt-btn-outline full-width" href={`/project/${project.id}`}>
                View Details
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const featuredProject = PROJECTS[currentIndex];

  const goTo = (idx) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -400 : 400,
      opacity: 0,
      scale: 0.95
    }),
  };

  return (
    <div className="projects-page">
      <main className="projects-container">
        
        {/* ─── SECTION 1: Header & Featured Carousel ─── */}
        <section className="project-snap-section" id="projects-section-1">
          <header className="persona-page-header">
            <h1 className="persona-main-title">
              Selected <span className="title-work-muted">Work</span>
            </h1>
            <p className="section-description">
              A collection of digital experiences focusing on security, transparency, and community driven innovation.
            </p>
          </header>

          <div className="pw-carousel-wrapper">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={featuredProject.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard project={featuredProject} layout="horizontal" />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── SECTION 2: 3-Card Grid ─── */}
        <section className="project-snap-section" id="projects-section-2">
          <div className="pw-grid-3">
            {GRID_PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard project={project} layout="vertical" />
              </motion.div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';
import idImage from '../../assets/images/project_id.png';
import { FEATURED_PROJECT, PROJECTS } from '../../data/projects';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const CATEGORY_MAP = {
    1: 'HEALTHCARE · ML',
    2: 'CYBERSECURITY · AI',
    3: 'NLP · RECOMMENDER',
  };

  // Map real projects to include local high-res asset where available
  const allProjects = [
    {
      ...FEATURED_PROJECT,
      number: '01',
      category: 'FULL STACK · WEB PLATFORM',
    },
    ...PROJECTS.map((p, idx) => ({
      ...p,
      number: `0${idx + 2}`,
      category: CATEGORY_MAP[p.id] || 'MACHINE LEARNING',
      image: p.id === 2 ? idImage : p.image,
    }))
  ];

  const featured = allProjects[0];
  const secondaryProjects = allProjects.slice(1);

  return (
    <section className="projects-editorial-page">
      <div className="projects-editorial-container">

        {/* ─── Header Section (Matches About Page) ─── */}
        <motion.div
          className="projects-editorial-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="projects-hud-eyebrow">
            <span className="hud-badge">PROJECTS // 02</span>
            <span className="hud-eyebrow-tag">ENGINEERING & SYSTEMS</span>
          </div>
          <h1 className="projects-main-title">Selected Work</h1>
          <p className="projects-lead-desc">
            A selection of systems, products and experiments I've built across full-stack development, AI/ML and software engineering.
          </p>
        </motion.div>

        {/* ─── Featured Project (Hero 2-Column Card) ─── */}
        <motion.div
          className="featured-project-editorial"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="featured-meta-bar">
            <span className="project-index-num">{featured.number}</span>
            <span className="featured-category-tag">{featured.category}</span>
          </div>

          <div className="featured-inner-grid">
            {/* Left Column: Details & Technical Scope */}
            <div className="featured-content-col">
              <h2 className="featured-title">{featured.title}</h2>
              <p className="featured-subtitle-desc">{featured.subtitle}</p>
              <p className="featured-main-text">{featured.description}</p>

              {/* Tech Stack Tags */}
              <div className="project-tech-tags">
                {featured.tech.map((t) => (
                  <span key={t} className="tech-tag-item">{t}</span>
                ))}
              </div>

              {/* Links & Case Study */}
              <div className="project-actions-row">
                <a
                  href={featured.link && featured.link !== '#' ? featured.link : featured.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-action-btn btn-primary-action"
                >
                  <span>View Project</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>

                <a
                  href={featured.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-action-btn btn-outline-action"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>Source</span>
                </a>

                {featured.details && (
                  <button
                    type="button"
                    className="project-action-btn btn-text-action"
                    onClick={() => setSelectedProject(featured)}
                  >
                    <span>Case Study</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Visual Preview Banner */}
            <div className="featured-visual-col">
              <div className="featured-visual-frame">
                <img src={featured.image} alt={featured.title} className="featured-img" />
                <div className="featured-img-vignette" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Secondary Projects Editorial Grid ─── */}
        <div className="secondary-projects-grid">
          {secondaryProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="project-card-editorial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Card Header Tag */}
              <div className="project-card-topbar">
                <span className="project-index-num">{project.number}</span>
                <span className="project-category-tag">{project.category}</span>
              </div>

              {/* Visual Preview */}
              <div className="project-card-thumbnail">
                <img src={project.image} alt={project.title} className="thumbnail-img" />
                <div className="thumbnail-vignette" />
              </div>

              {/* Content Body */}
              <div className="project-card-body">
                <h3 className="project-card-title">{project.title}</h3>
                {project.subtitle && (
                  <span className="project-card-subtitle">{project.subtitle}</span>
                )}
                <p className="project-card-desc">{project.description}</p>

                {/* Tech Pills */}
                <div className="project-tech-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag-item">{t}</span>
                  ))}
                </div>

                {/* Footer Action Links */}
                <div className="project-actions-row">
                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="project-action-btn btn-primary-action"
                    >
                      <span>Live Demo</span>
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  )}

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-action-btn btn-outline-action"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>Code</span>
                  </a>

                  {project.details && (
                    <button
                      type="button"
                      className="project-action-btn btn-text-action"
                      onClick={() => setSelectedProject(project)}
                    >
                      <span>Case Study</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ─── Interactive Details Modal (Preserved for Deep Dives) ─── */}
      <AnimatePresence>
        {selectedProject && selectedProject.details && (
          <motion.div
            className="editorial-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="editorial-modal-box"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.2" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="modal-header-area">
                <span className="modal-category-tag">{selectedProject.category}</span>
                <h2 className="modal-headline">{selectedProject.details.headerTitle || selectedProject.title}</h2>
                <p className="modal-subheadline">{selectedProject.details.headerSubtitle}</p>
              </div>

              {/* Live Demo Banner if applicable */}
              {selectedProject.details.liveDemo && (
                <div className="modal-demo-strip">
                  <span className="demo-strip-label">LIVE DEPLOYMENT</span>
                  <a
                    href={selectedProject.details.liveDemo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="demo-strip-link"
                  >
                    {selectedProject.details.liveDemo.url} ↗
                  </a>
                  {selectedProject.details.liveDemo.note && (
                    <span className="demo-strip-note">{selectedProject.details.liveDemo.note}</span>
                  )}
                </div>
              )}

              {/* Features List */}
              {selectedProject.details.features && (
                <div className="modal-section-group">
                  <h4 className="modal-section-label">KEY ARCHITECTURAL FEATURES</h4>
                  <div className="modal-features-grid">
                    {selectedProject.details.features.map((feat, idx) => (
                      <div key={idx} className="feature-block">
                        <strong className="feature-title">{feat.title}:</strong>
                        <span className="feature-desc"> {feat.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Breakdown */}
              {selectedProject.details.techStack && (
                <div className="modal-section-group">
                  <h4 className="modal-section-label">STACK BREAKDOWN</h4>
                  <div className="modal-stack-list">
                    {selectedProject.details.techStack.map((item, idx) => (
                      <div key={idx} className="stack-row">
                        <span className="stack-cat">{item.category}</span>
                        <span className="stack-items">{item.items}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';
import idImage from '../../assets/images/project_id.png';

const FEATURED_PROJECT = {
  id: 'featured-1',
  title: 'TripNest',
  subtitle: 'AI-Powered Travel Planning Platform',
  description: 'Built a full-stack travel platform enabling users to discover destinations, create and manage multiple trips, and collaborate with friends. Implemented an AI-assisted trip planning experience and a memories feature for organizing travel photos, improving overall usability.',
  objective: 'Developed and integrated REST APIs with a Node.js/Express.js backend to power dynamic itinerary content, and optimized client-side routing for faster page transitions.',
  tech: ['React.js', 'Vite', 'Node.js', 'Express.js', 'REST APIs'],
  link: 'https://github.com/sammiazaz',
  github: 'https://github.com/sammiazaz',
  image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200',
};

const PROJECTS = [
  {
    id: 1,
    title: 'Human Heart Disease Prediction System',
    subtitle: 'Machine Learning Classification Pipeline',
    description: 'Built a classification pipeline using Logistic Regression and Random Forest models to predict heart disease risk from multiple health indicators. Applied SMOTE to correct class imbalance across the training data, improving detection reliability for high-risk patients.',
    objective: 'Performed end-to-end data preprocessing and feature selection with Pandas and NumPy to support early medical intervention.',
    tech: ['Python', 'Scikit-learn', 'SMOTE', 'Pandas', 'NumPy'],
    link: 'https://github.com/sammiazaz',
    github: 'https://github.com/sammiazaz/heart-disease-pridiction-system-using-machine-learning',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    title: 'Network Intrusion Detection System',
    subtitle: 'Cybersecurity Anomaly Detection Pipeline',
    description: 'Designed a real-time network intrusion detection system using supervised machine learning algorithms to identify malicious network traffic and anomaly patterns. Processed high-dimensional packet data and evaluated performance using precision-recall metrics.',
    objective: 'Trained XGBoost and Random Forest classifiers on network packet datasets to detect zero-day exploits and DDoS attacks with high accuracy.',
    tech: ['Python', 'FastAPI', 'Scikit-learn', 'Pandas', 'NumPy', 'HTML5/CSS3', 'JavaScript'],
    link: 'https://ai-intrusion-detection-system.onrender.com',
    github: 'https://github.com/sammiazaz/AI-Intrusion-Detection-System',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    details: {
      headerTitle: '🛡️ AI-Powered Network Intrusion Detection System (NIDS)',
      headerSubtitle: 'An intelligent, web-based Network Intrusion Detection System designed to monitor, analyze, and detect malicious network traffic using Machine Learning.',
      liveDemo: {
        url: 'https://ai-intrusion-detection-system.onrender.com',
        note: "(Note: May take ~50s to load if it's sleeping)"
      },
      features: [
        { title: 'Real-time Traffic Overview', text: 'Visual dashboard showing the distribution of network traffic categories.' },
        { title: 'Flexible Data Sources', text: 'Supports both simulated traffic generation and custom CSV dataset uploads for training.' },
        { title: 'Machine Learning Engine', text: 'Uses a Random Forest Classifier to identify patterns in network behavior.' },
        { title: 'Performance Analytics', text: 'Provides detailed classification reports (Accuracy, Precision, Recall, F1-Score).' },
        { title: 'Live Simulation', text: 'An interactive simulation mode that predicts whether incoming traffic packets are "Normal" or potential threats (DDoS, Brute Force, Malware).' },
        { title: 'Modern UI', text: 'A clean, professional, and responsive dashboard built with modern web standards.' }
      ],
      techStack: [
        { category: 'Backend', items: 'FastAPI (Python)' },
        { category: 'Machine Learning', items: 'Scikit-learn, Pandas, NumPy' },
        { category: 'Frontend', items: 'HTML5, CSS3 (Vanilla), JavaScript (ES6+)' },
        { category: 'Server/Hosting', items: 'Render' },
        { category: 'Version Control', items: 'Git & GitHub' }
      ],
      installation: [
        { step: '1. Clone the repository:', code: 'git clone https://github.com/sammiazaz/AI-Intrusion-Detection-System.git\ncd AI-Intrusion-Detection-System' },
        { step: '2. Install dependencies:', code: 'pip install -r requirements.txt' },
        { step: '3. Run the server:', code: 'uvicorn api:app --reload' },
        { step: '4. Open your browser:', text: 'Go to http://127.0.0.1:8000' }
      ],
      license: 'This project was developed as a Major Project for academic purposes.',
      author: 'Developed by Sammi Azaz'
    }
  },
  {
    id: 3,
    title: 'Movie Recommendation Engine',
    subtitle: 'Content-Based Filtering & NLP System',
    description: 'Developed a personalized movie recommendation engine leveraging TF-IDF vectorization and Cosine Similarity to recommend movies based on genre, plot summaries, cast, and director metadata.',
    objective: 'Integrated a Streamlit web interface and TMDB API to fetch live poster graphics and trailer links for top-matched recommendations in real-time.',
    tech: ['Python', 'NLP', 'TF-IDF', 'Streamlit', 'TMDB API'],
    link: 'https://github.com/sammiazaz',
    github: 'https://github.com/sammiazaz',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
  }
];

function FeaturedProjectCard({ project, onOpenModal }) {
  const [activeTab, setActiveTab] = useState('scope');

  return (
    <motion.div
      className="featured-project-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Left Screenshot Column */}
      <div className="featured-card-image-wrapper">
        <img src={project.image} alt={project.title} className="featured-card-image" />
      </div>

      {/* Right Details Column */}
      <div className="featured-card-content">
        <div className="project-accent-bar" />
        <h2 className="featured-card-title">{project.title}</h2>

        {/* Tab Toggle */}
        <div className="project-tab-toggle featured-tab-toggle">
          <button
            type="button"
            className={`tab-toggle-btn ${activeTab === 'scope' ? 'active' : ''}`}
            onClick={() => setActiveTab('scope')}
          >
            Scope & Overview
          </button>
          <button
            type="button"
            className={`tab-toggle-btn ${activeTab === 'tech' ? 'active' : ''}`}
            onClick={() => setActiveTab('tech')}
          >
            Tech Architecture
          </button>
        </div>

        {/* Tab Text Content */}
        <div className="featured-tab-content">
          <p className="featured-description-text">
            {activeTab === 'scope' ? project.description : project.objective}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="project-tech-pills">
          {project.tech.map((tech) => (
            <span key={tech} className="project-tech-pill">{tech}</span>
          ))}
        </div>

        {/* Footer Actions matching normal cards */}
        <div className="project-card-footer">
          <div className="project-action-row">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-btn project-btn-code"
            >
              <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Code
            </a>

            <a
              href={project.link && project.link !== '#' ? project.link : project.github}
              target="_blank"
              rel="noreferrer"
              className="project-btn project-btn-live"
            >
              Live
            </a>
          </div>

          <button
            type="button"
            className="project-btn project-btn-details"
            onClick={() => onOpenModal(project)}
          >
            View More
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onOpenModal }) {
  const [activeTab, setActiveTab] = useState('scope');

  return (
    <motion.div
      className="project-card"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Image Screenshot Banner */}
      <div className="project-card-image-wrapper">
        <img src={project.image} alt={project.title} className="project-card-image" />
      </div>

      {/* Card Main Body */}
      <div className="project-card-body">
        {/* Accent Indicator Line */}
        <div className="project-accent-bar" />

        <h2 className="project-card-title">{project.title}</h2>

        {/* Tab Toggle Switch (Scope | Tech) */}
        <div className="project-tab-toggle">
          <button
            type="button"
            className={`tab-toggle-btn ${activeTab === 'scope' ? 'active' : ''}`}
            onClick={() => setActiveTab('scope')}
          >
            Scope
          </button>
          <button
            type="button"
            className={`tab-toggle-btn ${activeTab === 'tech' ? 'active' : ''}`}
            onClick={() => setActiveTab('tech')}
          >
            Tech
          </button>
        </div>

        {/* Tab Text Content */}
        <div className="project-tab-content">
          <p className="project-description-text">
            {activeTab === 'scope' ? project.description : project.objective}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="project-tech-pills">
          {project.tech.map((tech) => (
            <span key={tech} className="project-tech-pill">{tech}</span>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="project-card-footer">
          <div className="project-action-row">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-btn project-btn-code"
            >
              <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Code
            </a>

            <a
              href={project.link && project.link !== '#' ? project.link : project.github}
              target="_blank"
              rel="noreferrer"
              className="project-btn project-btn-live"
            >
              Live
            </a>
          </div>

          <button
            type="button"
            className="project-btn project-btn-details"
            onClick={() => onOpenModal(project)}
          >
            View More
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="projects-page">
      <div className="projects-container">
        <div className="persona-page-header">
          <h1 className="persona-main-title">
            Selected <span className="title-work-muted">Work</span>
          </h1>
          <p className="section-description">
            A collection of digital experiences focusing on security, transparency, and community driven innovation.
          </p>
        </div>

        {/* Featured Hero Project Banner */}
        <FeaturedProjectCard
          project={FEATURED_PROJECT}
          onOpenModal={setSelectedProject}
        />

        {/* Grid of Other Projects */}
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Interactive Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className={`modal-content-container ${selectedProject.description.length > 200 ? 'modal-wide' : ''}`}
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="modal-close-button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="modal-body">
                {selectedProject.details ? (
                  <div className="modal-rich-details">
                    <h2 className="modal-title" style={{ color: 'var(--primary)' }}>
                      {selectedProject.details.headerTitle}
                    </h2>
                    <p className="modal-description" style={{ fontSize: '0.92rem', marginTop: '8px' }}>
                      {selectedProject.details.headerSubtitle}
                    </p>

                    {/* Live Demo Banner */}
                    {selectedProject.details.liveDemo && (
                      <div className="modal-demo-box">
                        <span className="demo-box-label">🚀 Live Demo</span>
                        <p>
                          The project is deployed and accessible at:{' '}
                          <a
                            href={selectedProject.details.liveDemo.url}
                            target="_blank"
                            rel="noreferrer"
                            className="highlight-cyan"
                          >
                            {selectedProject.details.liveDemo.url}
                          </a>
                        </p>
                        <span className="demo-box-note">{selectedProject.details.liveDemo.note}</span>
                      </div>
                    )}

                    {/* Features List */}
                    {selectedProject.details.features && (
                      <div className="modal-section-block">
                        <h4 className="modal-section-title">✨ Features</h4>
                        <div className="modal-features-list">
                          {selectedProject.details.features.map((feat, idx) => (
                            <div key={idx} className="modal-feature-item">
                              <strong className="highlight-gold">{feat.title}:</strong> {feat.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack Breakdown */}
                    {selectedProject.details.techStack && (
                      <div className="modal-section-block">
                        <h4 className="modal-section-title">🛠️ Tech Stack</h4>
                        <div className="modal-tech-breakdown">
                          {selectedProject.details.techStack.map((item, idx) => (
                            <div key={idx} className="tech-breakdown-row">
                              <span className="tech-cat-label">{item.category}:</span>
                              <span className="tech-cat-val">{item.items}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Local Installation */}
                    {selectedProject.details.installation && (
                      <div className="modal-section-block">
                        <h4 className="modal-section-title">💻 Local Installation</h4>
                        <p className="modal-subtext">To run this project on your own computer:</p>
                        <div className="modal-install-steps">
                          {selectedProject.details.installation.map((inst, idx) => (
                            <div key={idx} className="install-step-item">
                              <span className="step-label">{inst.step}</span>
                              {inst.code && (
                                <pre className="install-code-block">
                                  <code>{inst.code}</code>
                                </pre>
                              )}
                              {inst.text && <span className="step-text">{inst.text}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* License & Author Footer */}
                    <div className="modal-license-footer">
                      <p>📝 {selectedProject.details.license}</p>
                      <p><strong>{selectedProject.details.author}</strong></p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Title and Subtitle */}
                    <h2 className="modal-title" style={{ color: 'var(--primary)' }}>{selectedProject.title}</h2>
                    <h3 className="modal-subtitle">{selectedProject.subtitle}</h3>

                    {/* Description */}
                    <p className="modal-description">{selectedProject.description}</p>

                    {/* Objective */}
                    <h4 className="modal-section-title">Objective</h4>
                    <p className="modal-objective" style={{ borderLeftColor: 'var(--primary)', background: 'var(--accent-glow)' }}>
                      {selectedProject.objective}
                    </p>

                    {/* Tech Stack */}
                    <h4 className="modal-section-title">Technologies Used</h4>
                    <div className="modal-tech-tags">
                      {selectedProject.tech.map((tech) => (
                        <span
                          key={tech}
                          className="modal-tech-tag"
                          style={{
                            color: 'var(--primary)',
                            borderColor: 'var(--accent-glow)',
                            background: 'transparent',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {/* Action Links */}
                <div className="modal-actions">
                  {selectedProject.link && selectedProject.link !== '#' && (
                    <a
                      href={selectedProject.link}
                      className="btn btn-primary"
                      target="_blank"
                      rel="noreferrer"
                      style={{ background: 'var(--primary)', borderColor: 'var(--primary)' }}
                    >
                      View Live Project
                    </a>
                  )}
                  {selectedProject.github && (
                    <a href={selectedProject.github} className="btn btn-secondary" target="_blank" rel="noreferrer">
                      <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub Repo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

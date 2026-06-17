import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';
import idImage from './cf00f5b9-a5a9-456f-90c5-bfb5c90a4196.png';

const PROJECTS = [
  {
    id: 1,
    title: 'AI-Based IDS',
    subtitle: 'Intelligent Network Traffic & Threat Analysis',
    description: 'Developed an intelligent cybersecurity system that analyzes network traffic and detects suspicious activities using Machine Learning algorithms. The system classifies normal and malicious network behavior, helping identify potential cyber attacks in real time. It provides accurate threat detection and improves network security through automated analysis.',
    objective: 'Create an automated, high-accuracy model to detect and classify intrusion attempts in network logs, providing visual real-time insights and reducing false-positive alerts for system administrators.',
    tech: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'Machine Learning', 'Cyber Security'],
    link: 'https://ai-intrusion-detection-system-s55e.onrender.com/',
    github: 'https://github.com/sammiazaz/AI-based-Intrusion-Detection-Systems-IDS-',
    image: idImage,
    color: 'blue',
    iconName: 'security'
  },
  {
    id: 2,
    title: 'Human heart disease pridiction system',
    subtitle: 'Predictive Analytics & User Engagent Tracking',
    description: 'Real-time analytics dashboard powered by machine learning models to track user engagement, user behavior mapping, and predict trends. The platform processes live telemetry data and provides visual forecasts for metric growth.',
    objective: 'Integrate predictive ML pipelines with a responsive front-end dashboard to enable businesses to make proactive data-driven decisions based on live forecasting.',
    tech: ['React', 'Python', 'TensorFlow', 'WebSockets', 'Chart.js', 'Tailwind'],
    link: '#',
    github: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    color: 'orange',
    iconName: 'dashboard'
  },
  {
    id: 3,
    title: 'DeFi Swap App',
    subtitle: 'Secure Web3 Peer-to-Peer Token Swapping',
    description: 'Decentralized exchange interface allowing users to swap ERC-20 tokens directly from their Web3 wallets with optimized gas fees and liquidity pooling mechanisms.',
    objective: 'Build a highly reliable and secure user interface connecting directly with Ethereum smart contracts to execute slippage-controlled token exchanges.',
    tech: ['Web3', 'React', 'Solidity', 'Ethers.js', 'Hardhat', 'Tailwind'],
    link: '#',
    github: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80&w=800',
    color: 'green',
    iconName: 'swap'
  },
  {
    id: 4,
    title: 'Social Media App',
    subtitle: 'Real-Time Mobile Messaging & Algorithmic Feed',
    description: 'Mobile-first social application featuring real-time messaging, instant stories, push notifications, and a content recommendations feed built with Firebase and Node.js.',
    objective: 'Deliver a responsive and interactive social network interface with instant message delivery, multimedia sharing, and optimized feed performance.',
    tech: ['React Native', 'Firebase', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    link: '#',
    github: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    color: 'red',
    iconName: 'social'
  }
];

function renderIcon(iconName) {
  switch (iconName) {
    case 'security':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="2" y1="20" x2="22" y2="20" />
          <line x1="12" y1="17" x2="12" y2="20" />
          <path d="M12 6a2.5 2.5 0 0 1 2.5 2.5v2h-5v-2A2.5 2.5 0 0 1 12 6z" />
          <rect x="9" y="10.5" width="6" height="4" rx="1" />
        </svg>
      );
    case 'dashboard':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16" />
          <line x1="16" y1="16" x2="16" y2="16" />
        </svg>
      );
    case 'swap':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" rx="2" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case 'social':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="projects-page">
      <div className="projects-container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Featured <span>Projects</span></h1>
          <p>A showcase of the problem statements, challenges, and solutions I have built.</p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Background Image */}
              <div className="project-card-image-wrapper">
                <img src={project.image} alt={project.title} className="project-card-image" />
              </div>

              {/* Hover Trigger Overlay */}
              <div className="project-hover-trigger">
                <span className="project-hover-text">Click to read more...</span>
              </div>

              {/* Overlay Badge (Icon + Title) */}
              <div className="project-card-overlay">
                <div className="project-card-icon">
                  {renderIcon(project.iconName)}
                </div>
                <h2 className="project-card-title">{project.title}</h2>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
                {/* Title and Subtitle */}
                <h2 className="modal-title">{selectedProject.title}</h2>
                <h3 className="modal-subtitle">{selectedProject.subtitle}</h3>

                {/* Description */}
                <p className="modal-description">{selectedProject.description}</p>

                {/* Objective */}
                <h4 className="modal-section-title">Objective</h4>
                <p className="modal-objective">{selectedProject.objective}</p>

                {/* Tech Stack */}
                <h4 className="modal-section-title">Technologies Used</h4>
                <div className="modal-tech-tags">
                  {selectedProject.tech.map((tech) => (
                    <span key={tech} className="modal-tech-tag">{tech}</span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="modal-actions">
                  {selectedProject.link && selectedProject.link !== '#' && (
                    <a href={selectedProject.link} className="btn btn-primary" target="_blank" rel="noreferrer">
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

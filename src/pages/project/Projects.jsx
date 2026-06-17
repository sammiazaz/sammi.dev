import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack modern e-commerce platform built with Next.js, Stripe, and PostgreSQL. Features seamless checkout and inventory management.',
    tech: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind'],
    link: '#',
    github: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'AI Dashboard',
    description: 'Real-time analytics dashboard powered by machine learning models to track user engagement and predict trends.',
    tech: ['React', 'Python', 'TensorFlow', 'WebSockets'],
    link: '#',
    github: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'DeFi Swap App',
    description: 'Decentralized exchange interface allowing users to swap ERC-20 tokens directly from their wallets.',
    tech: ['Web3', 'React', 'Solidity', 'Ethers.js'],
    link: '#',
    github: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Social Media App',
    description: 'Mobile-first social application with real-time messaging, stories, and algorithmic feed generation.',
    tech: ['React Native', 'Firebase', 'Redux', 'Node.js'],
    link: '#',
    github: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800'
  }
];

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
  return (
    <section className="projects-page">
      <div className="projects-container">
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Featured Projects</h1>
          <p>A comprehensive showcase of the real-world applications, platforms, and solutions I have built.</p>
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
              className="gallery-item"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img src={project.image} alt={project.title} className="gallery-image" />
              <div className="gallery-overlay">
                <div className="gallery-content">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <div className="tech-stack">
                    {project.tech.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <a href={project.link} className="view-btn">View Project</a>
                    <a href={project.github} className="github-btn" target="_blank" rel="noreferrer">
                      <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

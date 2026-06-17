import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const DOING_DATA = [
  {
    title: 'ML / AI Development',
    desc: 'Building intelligent models using TensorFlow, PyTorch, Scikit-learn and deploying them at scale.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z"/>
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z"/>
      </svg>
    )
  },
  {
    title: 'Web Development',
    desc: 'Crafting responsive web apps with React, Node.js, Flask, and Spring Boot.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    )
  },
  {
    title: 'Cloud & DevOps',
    desc: 'Deploying scalable solutions on AWS (EC2, S3, Lambda, SageMaker) with Docker and Git.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    )
  },
  {
    title: 'Database Engineering',
    desc: 'Working with MySQL, PostgreSQL, MongoDB, and Firebase for robust data management.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
      </svg>
    )
  }
];

const SKILLS = [
  { name: 'Java', color: '#f89820', iconClass: 'java' },
  { name: 'Python', color: '#3776ab', iconClass: 'python' },
  { name: 'JavaScript', color: '#f7df1e', iconClass: 'javascript' },
  { name: 'React', color: '#61dafb', iconClass: 'react' },
  { name: 'Node.js', color: '#339933', iconClass: 'nodejs' },
  { name: 'MongoDB', color: '#47a248', iconClass: 'mongodb' },
  { name: 'AWS', color: '#ff9900', iconClass: 'aws' },
  { name: 'Docker', color: '#2496ed', iconClass: 'docker' }
];

export default function About() {
  return (
    <section className="about-page">
      <div className="about-container">
        
        <div className="about-header-section">
          <motion.h1 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="about-title"
          >
            About <span>Me</span>
          </motion.h1>
          <div className="about-title-underline"></div>
        </div>

        <motion.div 
          className="about-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p>
            A passionate Computer Science student and developer with strong expertise in full-stack web development, machine learning, and cloud technologies. Proven track record in building intelligent applications using Python, React, and AWS — from AI-powered recommendation systems to predictive healthcare models.
          </p>
          <p>
            If you're looking for a driven developer who blends solid engineering fundamentals with a curiosity for AI/ML, I'm here to collaborate and turn ideas into impactful products. Let's build something great together!
          </p>
        </motion.div>

        <div className="doing-section">
          <motion.h2 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            What I'm Doing
          </motion.h2>

          <div className="doing-grid">
            {DOING_DATA.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="doing-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 + idx * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="doing-icon-wrapper">
                  {item.icon}
                </div>
                <div className="doing-info">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="skills-section">
          <motion.h2 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Skills
          </motion.h2>
          
          <motion.div 
            className="skills-flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {SKILLS.map((skill, idx) => (
              <div 
                key={idx} 
                className={`skill-pill ${skill.iconClass}`}
                style={{ 
                  '--skill-color': skill.color,
                  '--skill-bg-alpha': `${skill.color}15`,
                  '--skill-border-alpha': `${skill.color}35`
                }}
              >
                <span className="skill-pill-dot" style={{ backgroundColor: skill.color }}></span>
                {skill.name}
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

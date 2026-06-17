import React from 'react';
import { motion } from 'framer-motion';
import avatarImg from '../../assets/developer_avatar.png';
import './About.css';

const VALUES = [
  {
    title: 'Clean Architecture',
    desc: 'Writing scalable, maintainable, and well-structured code that stands the test of time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  {
    title: 'Modern Experience',
    desc: 'Focusing on responsive user interfaces, fluid animations, and polished micro-interactions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    )
  },
  {
    title: 'Adaptive Learning',
    desc: 'Constantly picking up new technologies, libraries, and best practices in frontend & backend.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    )
  }
];

export default function About() {
  return (
    <section className="about-page">
      <div className="about-container">
        
        <motion.div 
          className="about-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>About Me</h1>
          <p>A look into who I am, what drives me, and the core philosophies I follow.</p>
        </motion.div>

        <div className="about-hero">
          <motion.div 
            className="avatar-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={avatarImg} alt="Developer Avatar" className="about-avatar" />
            <div className="avatar-glow"></div>
          </motion.div>

          <motion.div 
            className="about-bio"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2>Hey there, I'm <span>Sammi</span></h2>
            <p className="bio-lead">
              I am a passionate software developer specializing in building modern web applications, intelligent backend systems, and responsive user experiences.
            </p>
            <p className="bio-text">
              Currently pursuing my B.Tech in Computer Science & Engineering at IILM University, Greater Noida, I am always seeking ways to bridge the gap between complex software designs and elegant user interfaces. I love building systems with React, Node.js, and Python.
            </p>
            <p className="bio-text">
              Beyond standard application development, I have a deep interest in Machine Learning, AI integrations, and Web3 technologies. I believe in writing code that is not only functional but clean, robust, and delightful to interact with.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="values-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>My Philosophy</h3>
          <div className="values-grid">
            {VALUES.map((val, idx) => (
              <motion.div 
                key={idx} 
                className="value-card"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="value-icon">{val.icon}</div>
                <h4>{val.title}</h4>
                <p>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

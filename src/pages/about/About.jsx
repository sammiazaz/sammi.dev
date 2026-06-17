import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import '../Skills.css';

const DOING_DATA = [
  {
    title: 'ML / AI Development',
    desc: 'Building intelligent models using TensorFlow, PyTorch, Scikit-learn and deploying them at scale.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
      </svg>
    )
  },
  {
    title: 'Web Development',
    desc: 'Crafting responsive web apps with React, Node.js, Flask, and Spring Boot.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  },
  {
    title: 'Cloud & DevOps',
    desc: 'Deploying scalable solutions on AWS (EC2, S3, Lambda, SageMaker) with Docker and Git.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    title: 'Database Engineering',
    desc: 'Working with MySQL, PostgreSQL, MongoDB, and Firebase for robust data management.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    )
  }
];

const SKILLS_CATEGORIES = [
  {
    title: 'Frontend Development',
    description: 'Building responsive, accessible, and performant user interfaces.',
    skills: ['React', 'Next.js', 'Vue.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'Framer Motion']
  },
  {
    title: 'Backend Development',
    description: 'Architecting scalable server-side applications and APIs.',
    skills: ['Node.js', 'Python', 'Express.js', 'GraphQL', 'RESTful APIs']
  },
  {
    title: 'Database Management',
    description: 'Designing robust data structures and optimizing queries.',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Prisma']
  },
  {
    title: 'AI & Machine Learning',
    description: 'Integrating intelligent features and working with data models.',
    skills: ['TensorFlow', 'PyTorch', 'OpenAI API', 'Data Science', 'Pandas']
  },
  {
    title: 'DevOps & Other',
    description: 'Deploying, monitoring, and maintaining robust infrastructure.',
    skills: ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux', 'Web3', 'Blockchain']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function About() {
  return (
    <section className="about-page">
      <div className="about-container">

        <motion.div
          className="about-header-section"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="about-title">
            About <span>Me</span>
          </h1>
          <div className="about-title-underline"></div>
        </motion.div>

        <motion.div
          className="about-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p>
            Hello, everyone! My name is Sammi azazsh. I am a Final-year undergraduate student at IILM UNIVERSITY. I have a strong interest in systems programming and software engineering. I have been programming using Java, JS/TS, Python, and C++. While I have most experiences in web development, I have made Java my main focus in my software engineering career, focusing on systems development.
          </p>
          <p>
            I have experience working with TypeScript, React, Python, and more. I'm passionate about clean code, system design, and open source contributions.
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

          <motion.p 
            className="section-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Here is a breakdown of my core areas of interest, systems engineering, and development focus.
          </motion.p>

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

        <div className="skills-section" style={{ marginTop: '60px' }}>
          <motion.h2 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Technical Expertise
          </motion.h2>

          <motion.p 
            className="section-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            A comprehensive overview of the tools, languages, and technologies I use to build modern applications.
          </motion.p>

          <motion.div 
            className="skills-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {SKILLS_CATEGORIES.map((category, index) => (
              <motion.div 
                key={category.title} 
                className="skill-category-card"
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="card-header">
                  <h2>{category.title}</h2>
                  <p>{category.description}</p>
                </div>
                <div className="skills-tags">
                  {category.skills.map(skill => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

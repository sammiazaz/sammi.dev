import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css'; 

const INTERNSHIPS_DATA = [
  {
    role: "Web Developer Intern",
    company: "Prodigy Infotech",
    location: "Remote",
    date: "June 2025 – July 2025",
    bullets: [
      "Developed multiple responsive web applications using HTML, CSS, and JavaScript, improving usability across devices.",
      "Optimized application performance, accessibility, and cross-browser compatibility, enhancing user experience.",
      "Managed source code with Git/GitHub and communicated progress with the team while deploying to cloud platforms."
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git", "GitHub"]
  }
];

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="experience-page">
      <div className="experience-container">
        
        {/* Header */}
        <div className="exp-page-header">
          <p className="exp-label">MY JOURNEY</p>
          <h1 className="exp-title">Experience</h1>
        </div>

        <motion.div 
          className="experience-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {INTERNSHIPS_DATA.map((item, idx) => (
            <motion.div 
              key={idx} 
              className="experience-card"
              variants={itemVariants}
            >
              <div className="exp-card-glow"></div>
              
              <div className="exp-header">
                <div>
                  <h3 className="exp-role">{item.role}</h3>
                  <div className="exp-company-location">
                    <span className="exp-company">{item.company}</span>
                    <span>&bull;</span>
                    <span>{item.location}</span>
                  </div>
                </div>
                <div className="exp-date-badge">
                  {item.date}
                </div>
              </div>

              <ul className="exp-bullets">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>

              <div className="exp-tech-stack">
                {item.tech.map((tech, tIdx) => (
                  <span key={tIdx} className="exp-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

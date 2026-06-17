import React from 'react';
import { motion } from 'framer-motion';
import '../resume/Resume.css'; // Reusing the perfect timeline styles!

const INTERNSHIPS_DATA = [
  {
    role: "Python Developer Intern",
    company: "Shadowfox",
    location: "Remote",
    date: "July 2025 – Aug 2025",
    bullets: [
      "Assisted in developing and testing Python scripts and applications with guidance from senior developers.",
      "Supported data collection, cleaning, and basic analysis using Python libraries such as Pandas and NumPy.",
      "Collaborated with team to fix code issues and learned software development best practices and debugging techniques."
    ]
  },
  {
    role: "Web Developer Intern",
    company: "Prodigy Infotech",
    location: "Remote",
    date: "June 2025 – July 2025",
    bullets: [
      "Developed responsive web applications using HTML, CSS, and JavaScript with focus on user experience.",
      "Optimized web applications for performance, accessibility, and cross-browser compatibility.",
      "Utilized Git/GitHub for version control and deployed projects on cloud platforms."
    ]
  }
];

export default function Experience() {
  return (
    <div className="resume-page">
      <div className="timeline-container">
        
        <div className="page-title">
          <h1>Work <span>Experience</span></h1>
          <p>My professional journey and internships in software development.</p>
        </div>

        <div className="timeline-section">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-icon">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
              </svg>
            </div>
            <h2>Internships</h2>
          </motion.div>

          <div className="section-body">
            {INTERNSHIPS_DATA.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="timeline-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="date-pill">{item.date}</div>
                  <h3>{item.role}</h3>
                  <h4>{item.company} &middot; {item.location}</h4>
                  
                  <ul className="timeline-bullets">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

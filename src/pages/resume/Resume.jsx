import React from 'react';
import { motion } from 'framer-motion';
import './Resume.css';

const TIMELINE_DATA = [
  {
    category: "Education",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    items: [
      {
        title: "B.Tech – Computer Science & Engineering",
        subtitle: "IILM University, Greater Noida, India",
        date: "July 2023 – Aug 2027",
        bullets: [
          "Relevant Coursework: Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks"
        ]
      }
    ]
  },
  {
    category: "Technical Skills",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    items: [
      {
        isGrid: true,
        gridData: [
          { label: "Languages", value: "Java, Python, C++, JavaScript, SQL, HTML/CSS" },
          { label: "ML / AI", value: "TensorFlow, PyTorch, Scikit-learn, Keras, NLP, Computer Vision, Model Optimization" },
          { label: "Web & Cloud", value: "React, Node.js, Spring Boot, Flask, AWS (EC2, S3, Lambda, SageMaker), Docker, Git" },
          { label: "Databases", value: "MySQL, PostgreSQL, MongoDB, Firebase" }
        ]
      }
    ]
  },
  {
    category: "Projects",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13.5 2.5a4.5 4.5 0 0 1 6 6l-10 10-5 1 1-5 10-10z"></path>
        <path d="M11.5 4.5l6 6"></path>
      </svg>
    ),
    items: [
      {
        title: "AI-Powered Movie Recommendation System",
        subtitle: "Python, Streamlit, Scikit-learn, TMDB API",
        date: "March 2025",
        bullets: [
          "Developed recommendation system suggesting movies based on user preferences using cosine similarity with movie metadata including genre, cast, and keywords.",
          "Deployed interactive web application with Streamlit featuring dynamic filtering options to enhance user experience.",
          "Processed TMDB dataset from Kaggle using Pandas and NumPy for efficient data handling and feature engineering."
        ]
      },
      {
        title: "Human Heart Disease Prediction",
        subtitle: "Python, Scikit-learn, SMOTE",
        date: "Dec 2025",
        bullets: [
          "Developed ML model to predict likelihood of heart disease based on health indicators using Logistic Regression and Random Forest.",
          "Implemented SMOTE technique to handle class imbalance and improve model accuracy for identifying high-risk individuals.",
          "Performed comprehensive data preprocessing and feature selection using Pandas and NumPy for early medical intervention."
        ]
      }
    ]
  },
  {
    category: "Work Experience",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    items: [
      {
        title: "Python Developer Intern",
        subtitle: "Shadowfox • Remote",
        date: "July 2025 – Aug 2025 · 2 mo",
        bullets: [
          "Assisted in developing and testing Python scripts and applications with guidance from senior developers.",
          "Supported data collection, cleaning, and basic analysis using Python libraries such as Pandas and NumPy.",
          "Collaborated with team to fix code issues and learned software development best practices and debugging techniques."
        ]
      },
      {
        title: "Web Developer Intern",
        subtitle: "Prodigy InfoTech • Remote",
        date: "June 2025 – July 2025 · 2 mo",
        bullets: [
          "Developed responsive web applications using HTML, CSS, and JavaScript with focus on user experience.",
          "Optimized web applications for performance, accessibility, and cross-browser compatibility.",
          "Utilized Git/GitHub for version control and deployed projects on cloud platforms."
        ]
      }
    ]
  },
  {
    category: "Certifications",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
    ),
    items: [
      {
        title: "AWS Academy Machine Learning Foundations",
        subtitle: "AWS Academy Graduate",
        date: "",
        bullets: []
      },
      {
        title: "Web Development - Java Programming Beginner to Master",
        subtitle: "Udemy",
        date: "",
        bullets: []
      }
    ]
  },
  {
    category: "Hackathons & Participation",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
      </svg>
    ),
    items: [
      {
        title: "Google Cloud Agentic AI Day",
        subtitle: "Hack2Skill",
        date: "Feb 2025",
        bullets: []
      },
      {
        title: "Bharatiya Antariksh Hackathon 2025",
        subtitle: "National Level Participation",
        date: "",
        bullets: []
      }
    ]
  }
];

export default function Resume() {
  return (
    <div className="resume-page">
      <div className="timeline-container">
        
        <div className="page-title">
          <h1>My <span>Resume</span></h1>
        </div>

        {TIMELINE_DATA.map((section, secIdx) => (
          <div key={secIdx} className="timeline-section">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="section-icon">{section.icon}</div>
              <h2>{section.category}</h2>
            </motion.div>
            
            <div className="section-body">
              {section.items.map((item, itemIdx) => (
                <motion.div 
                  key={itemIdx} 
                  className="timeline-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: itemIdx * 0.15 }}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    
                    {item.isGrid ? (
                      <div className="tl-skills-grid">
                        {item.gridData.map((gridItem, gIdx) => (
                          <div className="tl-skill-row" key={gIdx}>
                            <div className="tl-skill-label">{gridItem.label}</div>
                            <div className="tl-skill-value">{gridItem.value}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        {item.date && <div className="date-pill">{item.date}</div>}
                        <h3>{item.title}</h3>
                        {item.subtitle && <h4>{item.subtitle}</h4>}
                        
                        {item.bullets.length > 0 && (
                          <ul className="timeline-bullets">
                            {item.bullets.map((bullet, bIdx) => (
                              <li key={bIdx}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}

                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

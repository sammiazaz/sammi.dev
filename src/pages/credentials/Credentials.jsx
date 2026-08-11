import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './Credentials.css';
import oracleCert from '../../assets/images/oracle_cert_mockup.png';
import nvidiaCert from '../../assets/images/nvidia_cert_mockup.png';
import deeplearningCert from '../../assets/images/deeplearning_cert_mockup.png';

const CERTIFICATIONS = [
  {
    title: "AWS Academy Machine Learning Foundations",
    issuer: "AWS Academy",
    date: "2025",
    credentialId: "AWS-ML-FND",
    image: oracleCert,
    skills: ["AWS", "Machine Learning", "Cloud"],
    description: "AWS Academy Graduate - Machine Learning Foundations.",
    verifyUrl: "#",
    brandColor: "#ff9900",
    brandColorRgb: "255, 153, 0"
  },
  {
    title: "Introduction to Social Media",
    issuer: "Coursera",
    date: "Jul 2026",
    credentialId: "SM-INTRO-26",
    image: nvidiaCert,
    skills: ["Social Media Marketing", "Content Strategy"],
    description: "Comprehensive introduction to social media management and marketing strategies.",
    verifyUrl: "#",
    brandColor: "#0056D2",
    brandColorRgb: "0, 86, 210"
  },
  {
    title: "Web Development",
    issuer: "Udemy",
    date: "2025",
    credentialId: "UDEMY-WEB-DEV",
    image: deeplearningCert,
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js"],
    description: "Complete full-stack web development bootcamp covering frontend and backend technologies.",
    verifyUrl: "#",
    brandColor: "#a435f0",
    brandColorRgb: "164, 53, 240"
  },
  {
    title: "Java Programming: Beginner to Master",
    issuer: "Udemy",
    date: "2025",
    credentialId: "UDEMY-JAVA",
    image: oracleCert,
    skills: ["Java", "OOP", "Data Structures"],
    description: "Comprehensive Java programming course covering core concepts to advanced features.",
    verifyUrl: "#",
    brandColor: "#a435f0",
    brandColorRgb: "164, 53, 240"
  }
];

const ACADEMIC_HONORS = [
  {
    title: "B.Tech in Computer Science and Engineering",
    institution: "IILM University, Greater Noida",
    detail: "Expected Graduation: Aug 2027",
    year: "2023 – 2027"
  }
];

const SKILL_BADGES = [
  { name: "Full-Stack Web Development", level: "Advanced", icon: "🌐" },
  { name: "Machine Learning (Python)", level: "Proficient", icon: "🤖" },
  { name: "Java & OOP", level: "Expert", icon: "☕" },
  { name: "Database Management", level: "Proficient", icon: "🗄️" },
];

export default function Credentials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, clientHeight } = scrollRef.current;
      const index = Math.round(scrollTop / clientHeight);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="credentials-page">
      <div className="credentials-container">
        
        {/* Page Title */}
        <div className="persona-page-header">
          <h1 className="persona-main-title">
            Verified <span className="title-work-muted">Credentials</span>
          </h1>
          <p className="section-description">
            A verified record of certifications, academic honors, and technical achievements.
          </p>
        </div>

        <motion.div 
          className="credentials-bento-layout"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Section: Industry Certifications Scrollable Showcase */}
          <motion.div variants={itemVariants} className="certs-section-wrapper">
            {/* Dynamic Ambient Background Glow */}
            <div 
              className="certs-bg-glow"
              style={{ '--brand-color-rgb': CERTIFICATIONS[activeIndex]?.brandColorRgb || '0, 243, 255' }}
            />

            <div className="certs-section-header-row">
              <h2 className="certs-section-title">Verified Certifications</h2>
              <div className="certs-section-header-right">
                <span className="certs-scroll-hint">
                  {CERTIFICATIONS.length} certificates • scroll to explore
                </span>
                <span className="certs-page-indicator">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(CERTIFICATIONS.length).padStart(2, '0')}
                </span>
              </div>
            </div>
            
            <div 
              className="certs-showcase-container"
              style={{ 
                '--brand-color': CERTIFICATIONS[activeIndex]?.brandColor || 'var(--primary)',
                '--brand-color-rgb': CERTIFICATIONS[activeIndex]?.brandColorRgb || '0, 243, 255'
              }}
            >
              {/* Scrollable Container */}
              <div 
                className="certs-scroll-window" 
                ref={scrollRef}
                onScroll={handleScroll}
              >
                {CERTIFICATIONS.map((cert, index) => (
                  <div key={index} className="cert-slide">
                    {/* Left Column: Certificate Image */}
                    <div className="cert-image-side-wrapper">
                      <div className="cert-image-side">
                        <img src={cert.image} alt={cert.title} />
                      </div>
                    </div>
                    
                    {/* Right Column: Metadata & Details */}
                    <div className="cert-info-side">
                      <div className="cert-skills-tags">
                        {cert.skills.map((skill, idx) => (
                          <span key={idx} className="cert-skill-pill">{skill}</span>
                        ))}
                      </div>
                      
                      <h3 className="cert-main-title">{cert.title}</h3>
                      
                      <p className="cert-meta-subtitle">
                        <span className="cert-meta-issuer">{cert.issuer}</span> — <span className="cert-meta-date">{cert.date}</span>
                      </p>
                      
                      <p className="cert-desc-paragraph">{cert.description}</p>
                      
                      <div className="cert-footer-row">
                        <span className="cert-verified-id">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="verified-badge-icon">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {cert.credentialId}
                        </span>
                        
                        <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="cert-verify-button">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="external-link-icon">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          Verify Certificate
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Far Right: Vertical Dots Navigation */}
              <div className="certs-dots-indicator">
                {CERTIFICATIONS.map((_, index) => (
                  <button
                    key={index}
                    className={`cert-dot-btn ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => {
                      if (scrollRef.current) {
                        scrollRef.current.scrollTo({
                          top: index * scrollRef.current.clientHeight,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    aria-label={`Go to certification ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Middle Row */}
          <div className="cred-middle-row">
            {/* Academic Honors */}
            <motion.div variants={itemVariants} className="cred-card academic-card">
              <h2 className="cred-card-title">Academic Distinction</h2>
              <div className="academic-list">
                {ACADEMIC_HONORS.map((item, index) => (
                  <div key={index} className="academic-item">
                    <div className="academic-top">
                      <h3>{item.title}</h3>
                      <span className="academic-year">{item.year}</span>
                    </div>
                    <p className="academic-inst">{item.institution}</p>
                    <p className="academic-detail">{item.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skill Verifications */}
            <motion.div variants={itemVariants} className="cred-card skills-badge-card">
              <h2 className="cred-card-title">Verified Competencies</h2>
              <div className="badges-list">
                {SKILL_BADGES.map((badge, index) => (
                  <div key={index} className="badge-row">
                    <span className="badge-icon">{badge.icon}</span>
                    <div className="badge-info">
                      <span className="badge-name">{badge.name}</span>
                      <span className="badge-level">{badge.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

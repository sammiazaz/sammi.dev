import { useState } from 'react';
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

const VaultCard = ({ cert }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    // Tilt amounts
    const rx = ((y - centerY) / centerY) * -5;
    const ry = ((x - centerX) / centerX) * 5;
    
    setRotateX(rx);
    setRotateY(ry);

    setGlare({
      x: (x / box.width) * 100,
      y: (y / box.height) * 100,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="vault-card-wrapper" style={{ perspective: 1200 }}>
      <motion.article
        className="vault-glass-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 350, damping: 30, mass: 0.5 }}
        style={{ 
          transformStyle: "preserve-3d",
          '--brand-color': cert.brandColor,
          '--brand-color-rgb': cert.brandColorRgb
        }}
      >
        <div 
          className="vault-glare" 
          style={{ 
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            opacity: glare.opacity
          }} 
        />
        
        <div className="vault-glow-border" />

        <div className="vault-inner" style={{ transform: "translateZ(40px)" }}>
          <div className="vault-image-container">
            <img src={cert.image} alt={cert.title} draggable="false" />
            <div className="vault-image-overlay" />
          </div>

          <div className="vault-content">
            <div className="vault-skills-tags">
              {cert.skills.map((skill, idx) => (
                <span key={idx} className="vault-skill-pill">{skill}</span>
              ))}
            </div>
            
            <h3 className="vault-title">{cert.title}</h3>
            
            <p className="vault-meta">
              <span className="vault-issuer">{cert.issuer}</span> — <span className="vault-date">{cert.date}</span>
            </p>
            
            <p className="vault-desc">{cert.description}</p>
            
            <div className="vault-footer">
              <span className="vault-id">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="verified-icon">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {cert.credentialId}
              </span>
              
              <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="vault-verify-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Verify
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default function Credentials() {
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
          {/* Digital Vault Grid */}
          <motion.div variants={itemVariants} className="vault-section">
            <h2 className="vault-section-title">Digital Asset Vault</h2>
            <div className="vault-grid">
              {CERTIFICATIONS.map((cert, index) => (
                <VaultCard key={index} cert={cert} />
              ))}
            </div>
          </motion.div>

          {/* Middle Row */}
          <div className="cred-middle-row">
            {/* Academic Honors */}
            <motion.div variants={itemVariants} className="cred-bento-card academic-card">
              <div className="bento-glow" />
              <h2 className="cred-card-title">Academic Distinction</h2>
              <div className="academic-timeline">
                {ACADEMIC_HONORS.map((item, index) => (
                  <div key={index} className="timeline-node">
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <h3>{item.title}</h3>
                        <span className="timeline-year">{item.year}</span>
                      </div>
                      <p className="timeline-inst">{item.institution}</p>
                      <p className="timeline-detail">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skill Verifications */}
            <motion.div variants={itemVariants} className="cred-bento-card skills-badge-card">
              <div className="bento-glow" />
              <h2 className="cred-card-title">Verified Competencies</h2>
              <div className="badges-cloud">
                {SKILL_BADGES.map((badge, index) => (
                  <div key={index} className="floating-badge">
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

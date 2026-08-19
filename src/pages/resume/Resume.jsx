import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Resume.css';

const RESUME_DATA = [
  {
    id: "education",
    category: "Education",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    items: [
      {
        title: "B.Tech – Computer Science & Engineering",
        subtitle: "IILM University, Greater Noida, India",
        date: "July 2023 – Aug 2027",
        bullets: [
          "Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks"
        ]
      }
    ]
  },
  {
    id: "skills",
    category: "Technical Skills",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    items: [
      {
        isGrid: true,
        gridData: [
          { label: "Languages", value: "Java, Python, JavaScript, SQL" },
          { label: "Frontend", value: "HTML5, CSS3, React.js, Vite, Responsive Design" },
          { label: "Backend", value: "Node.js, Express.js, REST APIs" },
          { label: "Databases", value: "MySQL, MongoDB" },
          { label: "Tools", value: "Git, GitHub, VS Code, Postman, Vercel" },
          { label: "Core CS", value: "DSA, OOP, DBMS, OS, Computer Networks" },
          { label: "Other", value: "Social Media Marketing, Content Strategy" }
        ]
      }
    ]
  },
  {
    id: "projects",
    category: "Projects",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13.5 2.5a4.5 4.5 0 0 1 6 6l-10 10-5 1 1-5 10-10z"></path>
        <path d="M11.5 4.5l6 6"></path>
      </svg>
    ),
    items: [
      {
        title: "TripNest – AI-Powered Travel Planning Platform",
        subtitle: "React.js, Vite, Node.js, Express.js, REST APIs",
        date: "2025",
        bullets: [
          "Built a full-stack travel platform enabling users to discover destinations, create and manage trips, and collaborate with friends.",
          "Implemented an AI-assisted trip planning experience and a memories feature for organizing travel photos.",
          "Developed and integrated REST APIs with a Node.js/Express.js backend, and deployed the application on Vercel."
        ]
      },
      {
        title: "Human Heart Disease Prediction System",
        subtitle: "Python, Scikit-learn, SMOTE",
        date: "Dec 2025",
        bullets: [
          "Built a classification pipeline using Logistic Regression and Random Forest models to predict heart disease risk.",
          "Applied SMOTE to correct class imbalance across the training data, improving detection reliability.",
          "Performed end-to-end data preprocessing and feature selection with Pandas and NumPy."
        ]
      }
    ]
  },
  {
    id: "experience",
    category: "Work Experience",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    items: [
      {
        title: "Web Developer Intern",
        subtitle: "Prodigy InfoTech • Remote",
        date: "June 2025 – July 2025",
        bullets: [
          "Developed multiple responsive web applications using HTML, CSS, and JavaScript, improving usability.",
          "Optimized application performance, accessibility, and cross-browser compatibility.",
          "Managed source code with Git/GitHub and communicated progress with the team while deploying to cloud platforms."
        ]
      }
    ]
  },
  {
    id: "certifications",
    category: "Certifications & Hackathons",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
    ),
    items: [
      {
        isCompactList: true,
        listData: [
          { title: "Google Cloud Agentic AI Day", subtitle: "Hack2Skill - Feb 2025" },
          { title: "Bharatiya Antariksh Hackathon 2025", subtitle: "Space-tech innovation" },
          { title: "AWS Academy Machine Learning Foundations", subtitle: "AWS Academy - 2025" },
          { title: "Web Development Bootcamp", subtitle: "Udemy - 2025" },
          { title: "Java Programming: Beginner to Master", subtitle: "Udemy - 2025" },
          { title: "Introduction to Social Media", subtitle: "Coursera - Jul 2026" },
        ]
      }
    ]
  }
];

export default function Resume() {
  const [activeSection, setActiveSection] = useState(RESUME_DATA[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sections = RESUME_DATA.map(s => document.getElementById(s.id));
      let current = activeSection;

      for (let section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section.id;
          }
        }
      }
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="resume-page">
      <div className="resume-layout">
        
        {/* Left Sidebar */}
        <aside className="resume-sidebar">
          <div className="sidebar-sticky">
            <h1 className="resume-page-title">Curriculum <span className="text-primary">Vitae</span></h1>
            <p className="resume-page-subtitle">A comprehensive overview of my academic journey, technical expertise, and professional experience.</p>
            
            <nav className="resume-nav">
              {RESUME_DATA.map((section) => (
                <button 
                  key={section.id} 
                  className={`resume-nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  <span className="nav-icon">{section.icon}</span>
                  {section.category}
                </button>
              ))}
            </nav>

            <a href="/docs/Sammi_Resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-download-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download PDF
            </a>
          </div>
        </aside>

        {/* Right Content */}
        <main className="resume-content">
          {RESUME_DATA.map((section, secIdx) => (
            <section id={section.id} key={secIdx} className="resume-section">
              <div className="resume-section-header">
                <div className="section-icon-large">{section.icon}</div>
                <h2>{section.category}</h2>
              </div>

              <div className="resume-cards-container">
                {section.items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    className="resume-bento-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: itemIdx * 0.1 }}
                  >
                    {item.isGrid ? (
                      <div className="resume-skills-grid">
                        {item.gridData.map((gridItem, gIdx) => (
                          <div className="resume-skill-row" key={gIdx}>
                            <div className="resume-skill-label">{gridItem.label}</div>
                            <div className="resume-skill-value">{gridItem.value}</div>
                          </div>
                        ))}
                      </div>
                    ) : item.isCompactList ? (
                      <div className="resume-compact-list">
                        {item.listData.map((listItem, lIdx) => (
                          <div className="resume-compact-item" key={lIdx}>
                            <div className="compact-bullet"></div>
                            <div>
                              <div className="compact-title">{listItem.title}</div>
                              <div className="compact-subtitle">{listItem.subtitle}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="resume-card-standard">
                        <div className="card-header-flex">
                          <div>
                            <h3 className="resume-card-title">{item.title}</h3>
                            {item.subtitle && <h4 className="resume-card-subtitle">{item.subtitle}</h4>}
                          </div>
                          {item.date && <div className="resume-date-pill">{item.date}</div>}
                        </div>
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="resume-bullets">
                            {item.bullets.map((bullet, bIdx) => (
                              <li key={bIdx}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </main>
        
      </div>
    </div>
  );
}


import { motion } from 'framer-motion';
import './Resume.css';

const TIMELINE_DATA = [
  {
    category: "Education",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          { label: "Programming Languages", value: "Java, Python, JavaScript, SQL" },
          { label: "Frontend", value: "HTML5, CSS3, React.js, Vite, Responsive Design" },
          { label: "Backend", value: "Node.js, Express.js, REST APIs" },
          { label: "Databases", value: "MySQL, MongoDB" },
          { label: "Developer Tools", value: "Git, GitHub, VS Code, Postman, Vercel" },
          { label: "Core CS", value: "Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks" },
          { label: "Social Media", value: "Social Media Marketing, Content Strategy, Audience Engagement, Platform Management" }
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
        title: "TripNest – AI-Powered Travel Planning Platform",
        subtitle: "React.js, Vite, Node.js, Express.js, REST APIs",
        date: "2025",
        bullets: [
          "Built a full-stack travel platform enabling users to discover destinations, create and manage multiple trips, and collaborate with friends, using a reusable, component-based React.js architecture",
          "Implemented an AI-assisted trip planning experience and a memories feature for organizing travel photos, improving overall usability",
          "Developed and integrated REST APIs with a Node.js/Express.js backend to power dynamic itinerary content, and optimized client-side routing for faster page transitions",
          "Designed a fully responsive, cross-browser compatible UI, managed source code with Git/GitHub, and deployed the application on Vercel"
        ]
      },
      {
        title: "Human Heart Disease Prediction System",
        subtitle: "Python, Scikit-learn, SMOTE",
        date: "Dec 2025",
        bullets: [
          "Built a classification pipeline using Logistic Regression and Random Forest models to predict heart disease risk from multiple health indicators",
          "Applied SMOTE to correct class imbalance across the training data, improving detection reliability for high-risk patients",
          "Performed end-to-end data preprocessing and feature selection with Pandas and NumPy to support early medical intervention"
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
        title: "Web Developer Intern",
        subtitle: "Prodigy InfoTech • Remote",
        date: "June 2025 – July 2025",
        bullets: [
          "Developed multiple responsive web applications using HTML, CSS, and JavaScript, improving usability across devices",
          "Optimized application performance, accessibility, and cross-browser compatibility, enhancing user experience",
          "Managed source code with Git/GitHub and communicated progress with the team while deploying to cloud platforms"
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
        title: "Introduction to Social Media",
        subtitle: "Coursera",
        date: "Jul 2026",
        bullets: []
      },
      {
        title: "AWS Academy Machine Learning Foundations",
        subtitle: "AWS Academy Graduate",
        date: "2025",
        bullets: []
      },
      {
        title: "Web Development",
        subtitle: "Udemy",
        date: "2025",
        bullets: []
      },
      {
        title: "Java Programming: Beginner to Master",
        subtitle: "Udemy",
        date: "2025",
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
        subtitle: "Focused on space-tech innovation",
        date: "2025",
        bullets: []
      }
    ]
  }
];

export default function Resume() {
  return (
    <div className="resume-page">
      <div className="timeline-container">

        <div className="persona-page-header">
          <h1 className="persona-main-title">
            Curriculum <span className="title-work-muted">Vitae</span>
          </h1>
          <p className="section-description">
            Academic timeline, core competencies, project milestones, and technical certifications.
          </p>
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

import React from 'react';

export const TIMELINE_DATA = [
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
          "Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks, System Design Basics"
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
          { label: "Programming Languages", value: "JavaScript, Python, Java, SQL" },
          { label: "Frontend", value: "HTML5, CSS3, React.js, Vite, Responsive Design, Cross-browser Compatibility" },
          { label: "Backend", value: "Node.js, Express.js, REST API Development, Authentication & Authorization (JWT, OAuth)" },
          { label: "Databases", value: "MongoDB, MySQL" },
          { label: "Developer Tools", value: "Git, GitHub, VS Code, Postman, Vercel, AWS" },
          { label: "Core CS", value: "Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, System Design Basics" },
          { label: "Currently Learning", value: "Next.js, TypeScript" }
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
        title: "TripNest – Full Stack AI Travel Planning Platform",
        subtitle: "React.js, Node.js, Express.js, MongoDB, REST APIs",
        date: "2026",
        bullets: [
          "Built a full-stack travel platform with component-based React.js frontend and scalable Node.js/Express.js backend, enabling users to discover destinations and manage trips",
          "Designed secure REST APIs with authentication flows and applied basic system design principles; integrated MongoDB for data storage and deployed on Vercel with Git/GitHub",
          "Developed a fully responsive, cross-browser compatible UI for consistent experience across desktop and mobile"
        ]
      },
      {
        title: "Human Heart Disease Prediction System",
        subtitle: "Python, Scikit-learn, SMOTE",
        date: "Dec 2025",
        bullets: [
          "Built a classification pipeline using Logistic Regression and Random Forest to predict heart disease risk from multiple health indicators, demonstrating Python and data analysis proficiency",
          "Applied SMOTE to correct class imbalance and performed end-to-end data preprocessing with Pandas and NumPy"
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
          "Developed 3+ responsive web applications using HTML, CSS, and JavaScript with consistent, cross-browser compatible UI",
          "Optimized application performance, accessibility, and cross-browser compatibility, improving user experience",
          "Managed source code with Git/GitHub and deployed projects to cloud platforms in collaboration with the team"
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
      },
      {
        title: "Introduction to Social Media",
        subtitle: "Coursera",
        date: "Jul 2026",
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

import './Experience.css';

export default function Experience() {
  const experiences = [
    {
      role: "Lead Design Engineer",
      company: "TechNova Studio",
      period: "2024 - Present",
      description: "Leading the bridge between design and engineering to build scalable design systems and AI-integrated products.",
      tags: ["React", "TypeScript", "Figma", "Tailwind"]
    },
    {
      role: "Senior Frontend Developer",
      company: "Creative Labs",
      period: "2022 - 2024",
      description: "Architected modern web applications with a focus on buttery-smooth animations and 60fps performance.",
      tags: ["Next.js", "Framer Motion", "WebGL"]
    },
    {
      role: "UI/UX Designer",
      company: "Pixel Perfect",
      period: "2020 - 2022",
      description: "Designed user-centric interfaces and conducted usability research for fintech startups.",
      tags: ["UI Design", "User Research", "Prototyping"]
    }
  ];

  return (
    <div id="experience" className="page-container section-container experience-page">
      <div className="section-content">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">My professional journey</p>
        </div>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-dot"></div>
              <div className="timeline-content bento-card">
                <div className="exp-header">
                  <h3>{exp.role}</h3>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <h4 className="exp-company">{exp.company}</h4>
                <p className="exp-desc">{exp.description}</p>
                <div className="skills-tags">
                  {exp.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

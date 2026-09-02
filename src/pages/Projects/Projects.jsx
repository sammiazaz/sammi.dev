import './Projects.css';

export default function Projects() {
  const projects = [
    {
      title: "Neon Nexus",
      desc: "A cyber-punk inspired e-commerce platform built with Next.js and Three.js.",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "AI Canvas",
      desc: "An intelligent generative art tool powered by stable diffusion APIs.",
      img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "Minimal Tasks",
      desc: "A beautiful, distraction-free productivity app built with React Native.",
      img: "https://images.unsplash.com/photo-1484480974693-6ca0a78f11ec?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "Crypto Dashboard",
      desc: "Real-time cryptocurrency tracking dashboard with WebSockets and D3.js.",
      img: "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ];

  return (
    <div id="projects" className="page-container section-container projects-page">
      <div className="section-content">
        <div className="section-header">
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-subtitle">Things I've built</p>
        </div>
        
        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <a href={proj.link} className="project-card" key={idx}>
              <div className="project-img-wrapper">
                <img src={proj.img} alt={proj.title} className="project-img" loading="lazy" />
                <div className="project-overlay">
                  <span>View Project</span>
                </div>
              </div>
              <div className="project-info">
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

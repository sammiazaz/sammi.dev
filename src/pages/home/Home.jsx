import './Home.css';

export default function Home() {
  return (
    <div className="page-container home-page">
      <section className="hero-section">
        <div className="hero-element fade-in-1">
          <div className="status-pill">
            <span className="status-dot"></span>
            <span className="status-text">Available for new projects</span>
          </div>
        </div>
        <h1 className="hero-title hero-element fade-in-2">
          Crafting digital products<br />
          that <span className="text-gradient">defy expectations</span>
        </h1>
        <p className="hero-subtitle hero-element fade-in-3">
          I am a Creative Technologist & Design Engineer bridging the gap between aesthetics and engineering to build scalable, interactive web experiences.
        </p>
        <div className="hero-cta-group hero-element fade-in-4">
          <button className="btn-primary">
            Start a Project
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          </button>
          <button className="btn-secondary">View My Work</button>
        </div>
      </section>
    </div>
  );
}

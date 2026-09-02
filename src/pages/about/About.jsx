import './About.css';

export default function About() {
  return (
    <div id="about" className="page-container about-page">
      <div className="about-content">
        <h1 className="about-title">About Me</h1>

        <div className="bento-grid">

          {/* Row 1: Location & About */}
          <div className="bento-card card-location">
            <div className="map-bg">
              <svg width="100%" height="100%" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Abstract stylized map lines */}
                <path d="M -50 80 C 50 120, 120 40, 200 110 C 280 180, 320 140, 450 100" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 200 110 L 160 240" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M 350 0 L 320 80 L 350 120" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <path d="M 50 0 L 70 50 L 20 90" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              </svg>
            </div>

            <div className="map-pin">
              <div className="pin-shadow"></div>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.5C17 17 20 13 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9C4 13 9 17 12 21.5Z" fill="#3ecf8e" stroke="#18181b" strokeWidth="1.5" />
                <circle cx="12" cy="9" r="3.5" fill="#18181b" />
              </svg>
            </div>

            <div className="card-content-bottom">
              <div className="location-subtitle">📍 BASED IN</div>
              <h2>Delhi, India</h2>
              <p className="coordinates">28.6139° N, 77.2090° E • GMT+5:30</p>
            </div>
          </div>

          <div className="bento-card card-about">
            <div className="card-header">
              <span className="slash">/</span>
              <span>ABOUT</span>
            </div>
            <div className="card-body">
              <p>
                I'm Sammi — a Creative Technologist and Design Engineer building at the intersection of design and engineering. I care deeply about clean architecture, meaningful digital products, and creating experiences that defy expectations.
              </p>
              <p className="quote">"Where aesthetics meet performance."</p>
            </div>
          </div>

          {/* Row 2: Full Width Chart / Trend */}
          <div className="bento-card card-trend">
            <div className="card-header">
              <span>PERFORMANCE METRICS</span>
              <div className="badges">
                <span className="badge">UI/UX</span>
                <span className="badge warning">ENGINEERING</span>
              </div>
            </div>
            <div className="trend-content">
              <div className="trend-stats">
                <h3>99.9%</h3>
                <p>Uptime & Reliability</p>
                <div className="trend-legend">
                  <span className="legend-item"><span className="dot blue"></span> DESIGN</span>
                  <span className="legend-item"><span className="dot orange"></span> CODE</span>
                </div>
              </div>
              <div className="trend-chart">
                <svg viewBox="0 0 400 100" className="chart-svg">
                  <path d="M0,80 L80,60 L160,70 L240,40 L320,50 L400,20" fill="none" stroke="#3ecf8e" strokeWidth="2" />
                  <path d="M0,90 L80,80 L160,85 L240,60 L320,80 L400,40" fill="none" stroke="#f97316" strokeWidth="2" />
                  <circle cx="80" cy="60" r="3" fill="#3ecf8e" />
                  <circle cx="160" cy="70" r="3" fill="#3ecf8e" />
                  <circle cx="240" cy="40" r="3" fill="#3ecf8e" />
                  <circle cx="320" cy="50" r="3" fill="#3ecf8e" />
                  <circle cx="400" cy="20" r="3" fill="#3ecf8e" />
                  <circle cx="80" cy="80" r="3" fill="#f97316" />
                  <circle cx="160" cy="85" r="3" fill="#f97316" />
                  <circle cx="240" cy="60" r="3" fill="#f97316" />
                  <circle cx="320" cy="80" r="3" fill="#f97316" />
                  <circle cx="400" cy="40" r="3" fill="#f97316" />
                </svg>
                <div className="chart-labels">
                  <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Growth, Focus, Craft */}
          <div className="bento-card card-growth">
            <h4 className="card-title purple">GROWTH</h4>
            <p>An explorer of systems, driven by curiosity and understanding.</p>
          </div>

          <div className="bento-card card-focus">
            <h4 className="card-title blue">FOCUS</h4>
            <p>Deep work on efficiency and precision in every layer built.</p>
          </div>

          <div className="bento-card card-craft">
            <h4 className="card-title orange">CRAFT</h4>
            <p>Discipline and dedication in every single line of code.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

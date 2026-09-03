import { useState } from 'react';
import { motion } from 'framer-motion';
import './About.css';
import { MAP_DIMENSIONS, COUNTRIES_DATA } from '../../data/mapData';

export default function About() {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const handleCountryHover = (country) => {
    setHoveredCountry(country);
  };

  const handleCountryLeave = () => {
    setHoveredCountry(null);
  };
  return (
    <section className="about-editorial-page">
      <div className="about-editorial-container">
        
        {/* 2-Column Composition with 2-Row Grid Alignment */}
        <div className="about-editorial-grid">

          {/* ROW 1, COL 1: Eyebrow + Heading */}
          <motion.div
            className="about-left-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-hud-eyebrow">
              <span className="hud-badge">PROFILE // 01</span>
              <span className="hud-eyebrow-tag">ENGINEERING & RESEARCH</span>
            </div>
            <h1 className="about-heading">About Me</h1>
          </motion.div>

          {/* ROW 2, COL 1: Editorial Bio starting with 'I am Sammi' */}
          <motion.div
            className="about-left-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Lead Intro Paragraph */}
            <p className="about-lead">
              I'm <strong className="lead-name">Sammi</strong> — a Full Stack Developer and 4th-year CS student at <span className="lead-highlight-amber">IILM University</span>, with hands-on experience building responsive React.js applications and scalable Node.js/Express.js REST APIs.
            </p>

            {/* Editorial Body Paragraphs */}
            <div className="about-paragraphs">
              <p>
                Skilled in MongoDB, MySQL, Git/GitHub, and deploying applications on cloud platforms. I enjoy taking ideas from first principles to production — crafting applications with clean architectural patterns, robust backends, and responsive user interfaces.
              </p>
              <p>
                Currently expanding expertise in Next.js, TypeScript, and authentication systems (JWT, OAuth). Strong collaborator with a problem-solving mindset and a passion for building impactful tools.
              </p>
              <p>
                I care deeply about engineering discipline: building maintainable code, eliminating friction, and delivering impactful tools that solve tangible problems with speed and precision.
              </p>
            </div>
          </motion.div>

          {/* ROW 2, COL 2: Signature Delhi Map + Metadata Row below it */}
          <motion.div
            className="about-editorial-right"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="editorial-map-viewport">
              
              {/* Technical Viewfinder Corner Accents */}
              <div className="viewfinder-corner top-left">+</div>
              <div className="viewfinder-corner top-right">+</div>
              <div className="viewfinder-corner bottom-left">+</div>
              <div className="viewfinder-corner bottom-right">+</div>

              {/* Technical Header HUD */}
              <div className="map-hud-header">
                <div className="hud-target">
                  <span className="hud-badge">GEOLOCATION</span>
                  <span className="hud-coords">
                    {hoveredCountry ? hoveredCountry.coords : '28.6139° N, 77.2090° E'}
                  </span>
                </div>
                <div className="hud-location-tag">
                  {hoveredCountry ? `${hoveredCountry.name.toUpperCase()} [${hoveredCountry.code}]` : 'NEW DELHI, IN'}
                </div>
              </div>

              {/* Interactive SVG Map Canvas */}
              <div className="interactive-svg-map-wrapper">
                <svg
                  viewBox={`0 0 ${MAP_DIMENSIONS.width} ${MAP_DIMENSIONS.height}`}
                  className="interactive-svg-canvas"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <g className="map-countries-group">
                    {COUNTRIES_DATA.map((country) => {
                      const isHovered = hoveredCountry?.id === country.id;
                      return (
                        <path
                          key={country.id}
                          d={country.path}
                          className={`country-vector-path ${country.isHome ? 'home-country' : ''} ${isHovered ? 'hovered-country' : ''}`}
                          onMouseEnter={() => handleCountryHover(country)}
                          onMouseLeave={handleCountryLeave}
                        />
                      );
                    })}
                  </g>

                  {/* Geographically precise Delhi Location Pin */}
                  <g
                    className="delhi-map-pin"
                    transform={`translate(${MAP_DIMENSIONS.delhiPoint.x}, ${MAP_DIMENSIONS.delhiPoint.y})`}
                  >
                    <circle r="14" className="delhi-pin-wave" />
                    <circle r="8" className="delhi-pin-wave wave-delay" />
                    <circle r="4" fill="#ff4b33" stroke="#ffffff" strokeWidth="1.5" />
                    <path
                      d="M0 -18 C -5 -18 -8 -15 -8 -10 C -8 -4 0 0 0 0 C 0 0 8 -4 8 -10 C 8 -15 5 -18 0 -18 Z"
                      fill="#ff4b33"
                      stroke="#ffffff"
                      strokeWidth="1.2"
                    />
                    <circle cx="0" cy="-10" r="2.5" fill="#ffffff" />
                  </g>
                </svg>
              </div>

              {/* Thin Glowing Orange/Coral-Red Vertical Laser Line */}
              <div className="editorial-laser-line" />

              {/* Vignette Overlay for Technical Contrast */}
              <div className="editorial-map-vignette" />

              {/* Technical Footer HUD */}
              <div className="map-hud-footer">
                <div className="hud-timezone">
                  <span className="hud-label">TIMEZONE</span>
                  <span className="hud-val">GMT+5:30 [IST]</span>
                </div>
                <div className="hud-radar-status">
                  <span className="radar-blip"></span>
                  <span className="radar-text">{hoveredCountry ? `TRACKING ${hoveredCountry.code}` : 'ACTIVE RADAR'}</span>
                </div>
              </div>

            </div>

            {/* 2. Dedicated Country Telemetry & Fact Strip (Outside map — 100% unobstructed map) */}
            {(() => {
              const activeCountry = hoveredCountry || COUNTRIES_DATA.find(c => c.isHome) || COUNTRIES_DATA[0];
              return (
                <div className={`about-fact-strip ${hoveredCountry ? 'active-hover' : ''}`}>
                  <div className="fact-strip-header">
                    <div className="fact-strip-left">
                      <span className="fact-country-flag">{activeCountry.flag}</span>
                      <span className="fact-country-name">{activeCountry.name}</span>
                      <span className="fact-country-badge">{activeCountry.code}</span>
                      <span className="fact-country-coords">{activeCountry.coords}</span>
                    </div>
                    <div className="fact-strip-right">
                      <span className="fact-capital-tag">CAPITAL:</span>
                      <span className="fact-capital-name">{activeCountry.capital}</span>
                    </div>
                  </div>
                  <div className="fact-strip-body">
                    <span className="fact-bulb-icon">💡</span>
                    <p className="fact-strip-desc">{activeCountry.fact}</p>
                  </div>
                </div>
              );
            })()}

            {/* 3. Technical Metadata Row */}
            <div className="about-metadata-row">
              <div className="about-meta-col">
                <span className="about-meta-label">BASED IN</span>
                <span className="about-meta-value">Delhi, India</span>
                <span className="about-meta-sub">28.61° N · GMT+5:30</span>
              </div>
              <div className="about-meta-col">
                <span className="about-meta-label">FOCUS</span>
                <span className="about-meta-value">Software Eng.</span>
                <span className="about-meta-sub">Full-Stack · AI/ML</span>
              </div>
              <div className="about-meta-col">
                <span className="about-meta-label">STATUS</span>
                <span className="about-meta-value status-open">
                  <span className="status-indicator"></span>
                  Available
                </span>
                <span className="about-meta-sub">Open to Roles</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

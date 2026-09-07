import { motion } from 'framer-motion';
import { TIMELINE_DATA } from '../../data/resume';
import './Resume.css';

export default function Resume() {

  return (
    <section className="resume-editorial-page">
      <div className="resume-editorial-container">

        {/* ─── Header Section (Matches Portfolio System) ─── */}
        <motion.div
          className="resume-editorial-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="resume-header-top">
            <div>
              <h1 className="resume-main-title">Curriculum Vitae</h1>
              <p className="resume-lead-desc">
                A chronological breakdown of my technical trajectory, software engineering experience, applied machine learning systems, and academic milestones.
              </p>
            </div>

            <div className="resume-header-actions">
              <a
                href={`${import.meta.env.BASE_URL}Sammi_Azaz_Resume.pdf`}
                download="Sammi_Azaz_Resume.pdf"
                className="resume-download-btn resume-btn-primary"
                title="Download Official Sammi Azaz Resume (PDF)"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download PDF</span>
                <span className="btn-arrow">↓</span>
              </a>

              <a
                href={`${import.meta.env.BASE_URL}Sammi_Azaz_Resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-download-btn resume-btn-secondary"
                title="Open Official Resume in New Tab"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span>View PDF</span>
                <span className="btn-arrow">↗</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ─── Editorial Resume Timeline ─── */}
        <div className="resume-timeline-wrapper">
          {TIMELINE_DATA.map((section, secIdx) => (
            <motion.div
              key={section.category}
              className="editorial-timeline-section"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: secIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Section Header */}
              <div className="editorial-sec-header">
                <span className="sec-num-badge">0{secIdx + 1}</span>
                <div className="sec-icon-badge">{section.icon}</div>
                <h2 className="sec-category-title">{section.category}</h2>
                <div className="sec-header-rule"></div>
              </div>

              {/* Section Items */}
              <div className="editorial-sec-items">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="editorial-resume-card">
                    {item.isGrid ? (
                      /* Skills Grid Layout */
                      <div className="resume-skills-grid">
                        {item.gridData.map((gridItem, gIdx) => (
                          <div className="resume-skill-row" key={gIdx}>
                            <span className="skill-cat-label">{gridItem.label}</span>
                            <span className="skill-cat-value">{gridItem.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Standard Experience / Education / Project Card */
                      <>
                        <div className="resume-card-topbar">
                          <div className="resume-card-title-group">
                            <h3 className="resume-item-title">{item.title}</h3>
                            {item.subtitle && (
                              <p className="resume-item-subtitle">{item.subtitle}</p>
                            )}
                          </div>
                          {item.date && (
                            <span className="resume-date-badge">{item.date}</span>
                          )}
                        </div>

                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="resume-bullets-list">
                            {item.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="resume-bullet-item">
                                <span className="bullet-dash">―</span>
                                <span className="bullet-text">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

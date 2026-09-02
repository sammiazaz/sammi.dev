import './Credentials.css';

export default function Credentials() {
  const credentials = [
    {
      title: "B.Sc. Computer Science",
      org: "Tech University",
      year: "2020",
      type: "degree"
    },
    {
      title: "AWS Certified Solutions Architect",
      org: "Amazon Web Services",
      year: "2022",
      type: "cert"
    },
    {
      title: "Advanced UI/UX Design",
      org: "Design Institute",
      year: "2021",
      type: "cert"
    }
  ];

  return (
    <div id="credentials" className="page-container section-container credentials-page">
      <div className="section-content">
        <div className="section-header">
          <h2 className="section-title">Credentials</h2>
          <p className="section-subtitle">Education & Certifications</p>
        </div>
        
        <div className="credentials-bento">
          <div className="cred-list bento-card">
            {credentials.map((cred, idx) => (
              <div className="cred-item" key={idx}>
                <div className="cred-icon">
                  {cred.type === 'degree' ? '🎓' : '🏆'}
                </div>
                <div className="cred-info">
                  <h3>{cred.title}</h3>
                  <p>{cred.org}</p>
                </div>
                <div className="cred-year">{cred.year}</div>
              </div>
            ))}
          </div>

          <div className="resume-card bento-card">
            <div className="resume-content">
              <h3>Full Resume</h3>
              <p>Get a detailed overview of my experience, skills, and education.</p>
              <button className="download-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import './Persona.css';

export default function Persona() {
  return (
    <div id="persona" className="page-container section-container persona-page">
      <div className="section-content">
        <div className="section-header">
          <h2 className="section-title">Persona</h2>
          <p className="section-subtitle">Beyond the code</p>
        </div>
        
        <div className="persona-content bento-card">
          <div className="persona-text">
            <h3>Philosophy</h3>
            <p>
              I believe that the best digital products are born at the intersection of rigorous engineering and empathetic design. Technology should feel invisible, while the experience should feel inevitable.
            </p>
            <p>
              When I'm not writing code or pushing pixels, you can find me exploring typography, brewing the perfect pour-over coffee, or experimenting with generative AI models.
            </p>
            
            <div className="interests">
              <span className="interest-tag">Photography</span>
              <span className="interest-tag">Mechanical Keyboards</span>
              <span className="interest-tag">Sci-Fi Literature</span>
              <span className="interest-tag">Coffee Brewing</span>
            </div>
          </div>
          
          <div className="persona-gallery">
            <div className="gallery-item img-1"></div>
            <div className="gallery-item img-2"></div>
            <div className="gallery-item img-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

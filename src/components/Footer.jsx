const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-decoration">
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
      </div>

      <div className="container">
        <div className="footer-grid">
          <div className="footer-section footer-brand">
            <h3>Khalifa</h3>
            <p>Luxury Hotels</p>
            <div className="social-links">
              <a href="#facebook" title="Facebook" className="social-icon">
                <span>f</span>
              </a>
              <a href="#twitter" title="Twitter" className="social-icon">
                <span>𝕏</span>
              </a>
              <a href="#instagram" title="Instagram" className="social-icon">
                <span>📷</span>
              </a>
              <a href="#linkedin" title="LinkedIn" className="social-icon">
                <span>in</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/booking">Book</a></li>
            </ul>
          </div>

          <div className="footer-section footer-contact">
            <h4>Contact</h4>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <p>+92 310 711 4425</p>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <p>bloghuzefa@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-credit">
            <p>&copy; {currentYear} <span className="brand-highlight">Khalifa</span></p>
          </div>
          <div className="footer-legal">
            <a href="#privacy" className="legal-link">Privacy</a>
            <a href="#terms" className="legal-link">Terms</a>
            <a href="#cookies" className="legal-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="about-hero">
        <div className="container">
          <h1>About Khalifa</h1>
          <p className="lead">
            Your destination for luxury, comfort, and unforgettable experiences
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2010, Khalifa  has been a beacon of luxury hospitality
                for over a decade. Our journey began with a simple vision: to create
                spaces where guests feel more than welcomed – they feel like home.
              </p>
              <p>
                From our humble beginnings as a boutique hotel, we've grown into a
                prestigious chain known for exceptional service, stunning
                architecture, and unforgettable experiences. Today, we operate
                properties in 15 countries, each reflecting our commitment to
                excellence.
              </p>
              <p>
                We believe luxury isn't just about opulence; it's about creating
                meaningful moments, offering personalized service, and ensuring every
                guest leaves with cherished memories.
              </p>
            </div>
            <div className="about-image">
              <img src="/src/assets/about.jpg" alt="LuxStay Hotel" className="about-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Excellence</h3>
              <p>
                We strive for perfection in every detail, from the thread count of
                our sheets to the warmth of our welcome.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Hospitality</h3>
              <p>
                Genuine care and attention to our guests' needs is at the heart of
                everything we do.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>
                We're committed to protecting our planet through eco-friendly
                practices and sustainable operations.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Innovation</h3>
              <p>
                We continuously innovate to enhance guest experiences and embrace
                modern technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="achievements-section">
        <div className="container">
          <h2>Our Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement">
              <h3>50,000+</h3>
              <p>Happy Guests</p>
            </div>
            <div className="achievement">
              <h3>15</h3>
              <p>Countries</p>
            </div>
            <div className="achievement">
              <h3>25</h3>
              <p>Properties</p>
            </div>
            <div className="achievement">
              <h3>4.8/5</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2>Our Leadership Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h4>David Martinez</h4>
              <p className="role">Chief Executive Officer</p>
              <p className="bio">With 20+ years in hospitality, David leads our vision for global excellence.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h4>Jennifer Lee</h4>
              <p className="role">Chief Operations Officer</p>
              <p className="bio">Jennifer ensures seamless operations across all our properties worldwide.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h4>Robert Thompson</h4>
              <p className="role">Director of Guest Services</p>
              <p className="bio">Robert's passion for hospitality makes our guests feel truly valued.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h4>Sofia Rodriguez</h4>
              <p className="role">Head of Sustainability</p>
              <p className="bio">Sofia drives our commitment to environmental responsibility and innovation.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

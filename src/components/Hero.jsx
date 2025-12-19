import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/booking');
  };

  return (
    <section className="hero">
      <div className="hero-wrapper">
        <div className="hero-left">
          <h1>Khalifa<br />Hotel</h1>
          <p>
            Experience luxury like never before. Our premium hotel offers world-class amenities,
            exceptional service, and unforgettable moments in every corner. Book now and discover your perfect stay.
          </p>
          <div className="hero-rating">
            <span className="stars">⭐⭐⭐⭐⭐</span>
            <span className="rating-text">5.0 Rating</span>
          </div>
          <button className="read-more-btn" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
        
        <div className="hero-right">
          <div className="hero-illustration">
            <img src="/src/assets/hotel.jpg" alt="Khalifa Hotel" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

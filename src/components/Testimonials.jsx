import { useState } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Traveler",
      image: "👩‍💼",
      text: "Absolutely amazing stay! The hospitality was exceptional and the room was luxuriously appointed. I'll definitely be back!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Honeymooner",
      image: "👨‍🤝‍👨",
      text: "Our honeymoon was unforgettable. The attention to detail and romantic ambiance made it truly special. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Williams",
      role: "Family Vacation",
      image: "👩‍👧‍👦",
      text: "Perfect for families! Great amenities, friendly staff, and the kids had an amazing time. Worth every penny!",
      rating: 5,
    },
    {
      id: 4,
      name: "James Brown",
      role: "Corporate Guest",
      image: "👨‍💼",
      text: "World-class facilities and impeccable service. This is my go-to hotel for all business trips. Never disappointed!",
      rating: 5,
    },
    {
      id: 5,
      name: "Lisa Garcia",
      role: "Adventure Seeker",
      image: "👩",
      text: "Stunning views, wonderful staff, and excellent cuisine. Made my solo trip memorable and comfortable.",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2>What Our Guests Say</h2>
        <p className="section-subtitle">
          Join thousands of satisfied guests who have experienced luxury at its finest
        </p>

        <div className="testimonials-carousel">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-card ${
                index === currentIndex ? "active" : ""
              }`}
              style={{
                opacity: index === currentIndex ? 1 : 0,
                visibility: index === currentIndex ? "visible" : "hidden",
                position: index === currentIndex ? "static" : "absolute",
              }}
            >
              <div className="testimonial-header">
                <div className="testimonial-avatar">{testimonial.image}</div>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                  <div className="stars">
                    {"⭐".repeat(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
            </div>
          ))}
        </div>

        <div className="carousel-controls">
          <button
            className="carousel-btn prev"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            ❮
          </button>
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <button
            className="carousel-btn next"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

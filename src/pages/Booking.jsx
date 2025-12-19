import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Booking = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    roomType: "standard",
    specialRequests: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/register");
      return;
    }
    setCurrentUser(user);
    setFormData((prev) => ({
      ...prev,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    }));
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div style={{ marginTop: "150px", textAlign: "center" }}>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    const roomPrices = {
      standard: 12000,
      deluxe: 18000,
      suite: 25000,
      presidential: 50000,
    };

    const roomPrice = roomPrices[formData.roomType] || 120;
    const totalPrice = roomPrice * nights;
    const tax = totalPrice * 0.1;
    const grandTotal = totalPrice + tax;

    const bookingId = `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const completeBooking = {
      id: bookingId,
      userId: currentUser.id,
      ...formData,
      totalAmount: grandTotal,
      bookedDate: new Date().toISOString(),
      status: "pending",
    };

    localStorage.setItem("bookingData", JSON.stringify(formData));

    const existingBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
    existingBookings.push(completeBooking);
    localStorage.setItem("allBookings", JSON.stringify(existingBookings));

    // Store user booking
    const userBookings = JSON.parse(localStorage.getItem(`bookings_${currentUser.id}`)) || [];
    userBookings.push(completeBooking);
    localStorage.setItem(`bookings_${currentUser.id}`, JSON.stringify(userBookings));

    setSubmitted(true);
    
    setTimeout(() => {
      navigate("/my-bookings");
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="booking-page">
        <section className="booking-hero">
          <div className="container">
            <h1>Book Your Luxury Stay</h1>
            <p>Experience comfort, elegance, and exceptional service</p>
          </div>
        </section>

        <section className="booking-form-section">
          <div className="container">
            <div className="booking-container">
              <div className="booking-info">
                <h2>Why Book With Us?</h2>
                <div className="info-card">
                  <span className="info-icon">✓</span>
                  <div>
                    <h4>Best Price Guarantee</h4>
                    <p>Get the lowest rates available online</p>
                  </div>
                </div>
                <div className="info-card">
                  <span className="info-icon">✓</span>
                  <div>
                    <h4>24/7 Customer Support</h4>
                    <p>We're here to help you anytime, anywhere</p>
                  </div>
                </div>
                <div className="info-card">
                  <span className="info-icon">✓</span>
                  <div>
                    <h4>Free Cancellation</h4>
                    <p>Cancel up to 48 hours before check-in</p>
                  </div>
                </div>
                <div className="info-card">
                  <span className="info-icon">✓</span>
                  <div>
                    <h4>Secure Payment</h4>
                    <p>Safe and encrypted payment processing</p>
                  </div>
                </div>
              </div>

              <form className="booking-form" onSubmit={handleSubmit}>
                {submitted && (
                  <div className="success-banner">
                    ✓ Booking confirmed! Redirecting to dashboard...
                  </div>
                )}

                <h2>Enter Your Details</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="John"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="checkIn">Check-In Date *</label>
                    <input
                      type="date"
                      id="checkIn"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkOut">Check-Out Date *</label>
                    <input
                      type="date"
                      id="checkOut"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="guests">Number of Guests *</label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="roomType">Room Type *</label>
                    <select
                      id="roomType"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      required
                    >
                      <option value="standard">Standard Room - ₨12,000/night</option>
                      <option value="deluxe">Deluxe Room - ₨18,000/night</option>
                      <option value="suite">Suite - ₨25,000/night</option>
                      <option value="presidential">Presidential Suite - ₨50,000/night</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="specialRequests">Special Requests</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="Any special requests? Let us know..."
                    rows="4"
                  ></textarea>
                </div>

                <button type="submit" className="booking-submit-btn">
                  Complete Booking
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Booking;

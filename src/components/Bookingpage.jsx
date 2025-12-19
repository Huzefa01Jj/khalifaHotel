import { useState } from 'react';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkin: '',
    checkout: '',
    guests: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/book', { // your backend endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.text();
      alert(data); // show success/failure
    } catch (error) {
      alert('Booking failed');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Book Your Reservation</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="checkin"
          value={formData.checkin}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="checkout"
          value={formData.checkout}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="guests"
          min="1"
          value={formData.guests}
          onChange={handleChange}
          required
        />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingPage;

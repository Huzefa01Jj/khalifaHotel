import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminNotifications = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Get all bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
    setBookings(storedBookings);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin-login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#27ae60";
      case "pending":
        return "#f39c12";
      case "cancelled":
        return "#e74c3c";
      default:
        return "#3498db";
    }
  };

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filterStatus);

  const handleDeleteBooking = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    localStorage.setItem("allBookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const handleCancelBooking = (id) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: "cancelled" } : booking
    );
    localStorage.setItem("allBookings", JSON.stringify(updatedBookings));
    
    // Update user's bookings
    const booking = updatedBookings.find((b) => b.id === id);
    if (booking?.userId) {
      const userBookings = JSON.parse(localStorage.getItem(`bookings_${booking.userId}`)) || [];
      const updatedUserBookings = userBookings.map((b) =>
        b.id === id ? { ...b, status: "cancelled" } : b
      );
      localStorage.setItem(`bookings_${booking.userId}`, JSON.stringify(updatedUserBookings));
    }
    
    setBookings(updatedBookings);
  };

  const handleConfirmBooking = (id) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: "confirmed" } : booking
    );
    localStorage.setItem("allBookings", JSON.stringify(updatedBookings));
    
    // Update user's bookings
    const booking = updatedBookings.find((b) => b.id === id);
    if (booking?.userId) {
      const userBookings = JSON.parse(localStorage.getItem(`bookings_${booking.userId}`)) || [];
      const updatedUserBookings = userBookings.map((b) =>
        b.id === id ? { ...b, status: "confirmed" } : b
      );
      localStorage.setItem(`bookings_${booking.userId}`, JSON.stringify(updatedUserBookings));
    }
    
    setBookings(updatedBookings);
  };

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (booking.totalAmount || 0),
    0
  );

  const confirmedBookings = bookings.filter(
    (b) => b.status === "confirmed"
  ).length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  return (
    <>
      <Navbar />
      <div className="admin-page">
        <section className="admin-hero">
          <div className="container">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <h1>📊 Admin Dashboard</h1>
                <p>Manage all customer reservations</p>
              </div>
              <button 
                onClick={handleLogout}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        <section className="admin-content">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <h4>Total Bookings</h4>
                  <p className="stat-number">{bookings.length}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">✓</div>
                <div className="stat-info">
                  <h4>Confirmed</h4>
                  <p className="stat-number">{confirmedBookings}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div className="stat-info">
                  <h4>Pending</h4>
                  <p className="stat-number">{pendingBookings}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h4>Total Revenue</h4>
                  <p className="stat-number">${totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bookings-section">
              <div className="section-header">
                <h2>All Reservations</h2>
                <div className="filter-buttons">
                  <button
                    className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
                    onClick={() => setFilterStatus("all")}
                  >
                    All
                  </button>
                  <button
                    className={`filter-btn ${filterStatus === "confirmed" ? "active" : ""}`}
                    onClick={() => setFilterStatus("confirmed")}
                  >
                    Confirmed
                  </button>
                  <button
                    className={`filter-btn ${filterStatus === "pending" ? "active" : ""}`}
                    onClick={() => setFilterStatus("pending")}
                  >
                    Pending
                  </button>
                  <button
                    className={`filter-btn ${filterStatus === "cancelled" ? "active" : ""}`}
                    onClick={() => setFilterStatus("cancelled")}
                  >
                    Cancelled
                  </button>
                </div>
              </div>

              {filteredBookings.length === 0 ? (
                <div className="empty-state">
                  <p>No bookings found</p>
                </div>
              ) : (
                <div className="bookings-list">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="booking-item">
                      <div className="booking-header">
                        <div className="booking-title">
                          <h4>{booking.firstName} {booking.lastName}</h4>
                          <p className="booking-id">ID: {booking.id}</p>
                        </div>
                        <span
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(booking.status) }}
                        >
                          {booking.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="booking-grid">
                        <div className="booking-detail">
                          <label>Email</label>
                          <p>{booking.email}</p>
                        </div>
                        <div className="booking-detail">
                          <label>Phone</label>
                          <p>{booking.phone}</p>
                        </div>
                        <div className="booking-detail">
                          <label>Check-In</label>
                          <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
                        </div>
                        <div className="booking-detail">
                          <label>Check-Out</label>
                          <p>{new Date(booking.checkOut).toLocaleDateString()}</p>
                        </div>
                        <div className="booking-detail">
                          <label>Room Type</label>
                          <p>{booking.roomType.toUpperCase()}</p>
                        </div>
                        <div className="booking-detail">
                          <label>Guests</label>
                          <p>{booking.guests} Guest{booking.guests > 1 ? "s" : ""}</p>
                        </div>
                        <div className="booking-detail">
                          <label>Total Amount</label>
                          <p className="amount">${booking.totalAmount?.toFixed(2)}</p>
                        </div>
                        <div className="booking-detail">
                          <label>Booked Date</label>
                          <p>{new Date(booking.bookedDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {booking.specialRequests && (
                        <div className="booking-notes">
                          <label>Special Requests:</label>
                          <p>{booking.specialRequests}</p>
                        </div>
                      )}

                      <div className="booking-actions">
                        {booking.status === "pending" && (
                          <button
                            className="btn-confirm"
                            onClick={() => handleConfirmBooking(booking.id)}
                          >
                            ✓ Confirm Booking
                          </button>
                        )}
                        {booking.status !== "cancelled" && (
                          <button
                            className="btn-cancel"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </button>
                        )}
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteBooking(booking.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AdminNotifications;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyBookings = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/login");
      return;
    }

    setCurrentUser(user);

    // Get all bookings and filter by current user
    const allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
    const userSpecificBookings = allBookings.filter((b) => b.userId === user.id);
    
    // Also check for user-specific bookings storage
    const storedUserBookings = JSON.parse(localStorage.getItem(`bookings_${user.id}`)) || [];
    
    // Merge and deduplicate
    const mergedBookings = [...userSpecificBookings, ...storedUserBookings];
    const uniqueBookings = Array.from(
      new Map(mergedBookings.map((item) => [item.id, item])).values()
    );
    
    setUserBookings(uniqueBookings);
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleDownloadReceipt = (booking) => {
    const confirmationNo = booking.id;

    // Calculate numbers
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    const roomPrices = {
      standard: 12000,
      deluxe: 18000,
      suite: 25000,
      presidential: 50000,
    };

    const roomPrice = roomPrices[booking.roomType] || 120;
    const totalPrice = roomPrice * nights;
    const tax = totalPrice * 0.1;
    const grandTotal = totalPrice + tax;

    // Create receipt content
    const receiptContent = `
================================
         LUXSTAY HOTELS
      BOOKING CONFIRMATION
================================

Confirmation Number: ${confirmationNo}
Date Issued: ${new Date().toLocaleDateString()}
Booking Status: ${booking.status.toUpperCase()}

--------------------------------
GUEST INFORMATION
--------------------------------
Name: ${booking.firstName} ${booking.lastName}
Email: ${booking.email}
Phone: ${booking.phone}
Guests: ${booking.guests}

--------------------------------
STAY DETAILS
--------------------------------
Check-In: ${checkIn.toLocaleDateString()}
Check-Out: ${checkOut.toLocaleDateString()}
Number of Nights: ${nights}
Room Type: ${booking.roomType.charAt(0).toUpperCase() + booking.roomType.slice(1)}

${booking.specialRequests ? `Special Requests:\n${booking.specialRequests}\n` : ""}

--------------------------------
BILLING SUMMARY
--------------------------------
Room Rate per Night: ₨${roomPrice.toFixed(2)}
Subtotal (${nights} nights): ₨${totalPrice.toFixed(2)}
Taxes & Fees (10%): ₨${tax.toFixed(2)}
--------------------------------
TOTAL AMOUNT DUE: ₨${grandTotal.toFixed(2)}
================================

Payment Status: PAID ✓
Booking Status: ${booking.status.toUpperCase()}

Cancellation Policy:
- Free cancellation up to 48 hours before check-in
- 50% refund if cancelled 24-48 hours before
- No refund if cancelled less than 24 hours

Contact Information:
Phone: +1 (555) 123-4567
Email: info@luxstay.com
Website: www.luxstay.com

Thank you for choosing LuxStay Hotels!
We look forward to your visit.

================================
This is a computer generated receipt
No signature required
================================
    `;

    // Create blob and download
    const element = document.createElement("a");
    const file = new Blob([receiptContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `LuxStay_Receipt_${confirmationNo}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return "✓";
      case "pending":
        return "⏳";
      case "cancelled":
        return "✕";
      default:
        return "•";
    }
  };

  const handleDeleteBooking = (bookingId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this booking? This action cannot be undone."
      )
    ) {
      // Delete from allBookings
      const allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
      const updatedAllBookings = allBookings.filter((b) => b.id !== bookingId);
      localStorage.setItem("allBookings", JSON.stringify(updatedAllBookings));

      // Delete from user-specific storage
      const userBookings = JSON.parse(
        localStorage.getItem(`bookings_${currentUser.id}`)
      ) || [];
      const updatedUserBookings = userBookings.filter(
        (b) => b.id !== bookingId
      );
      localStorage.setItem(
        `bookings_${currentUser.id}`,
        JSON.stringify(updatedUserBookings)
      );

      // Update state to reflect deletion
      setUserBookings(
        userBookings.filter((b) => b.id !== bookingId)
      );
    }
  };

  if (loading) {
    return <div style={{ marginTop: "150px", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="mybookings-page">
        <section className="mybookings-hero">
          <div className="container">
            <div className="hero-content">
              <div>
                <h1>👋 Welcome, {currentUser.firstName}!</h1>
                <p>Manage your hotel reservations</p>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </section>

        <section className="mybookings-content">
          <div className="container">
            <div className="mybookings-stats">
              <div className="stat-box">
                <h4>Total Bookings</h4>
                <p className="stat-value">{userBookings.length}</p>
              </div>
              <div className="stat-box">
                <h4>Confirmed</h4>
                <p className="stat-value">
                  {userBookings.filter((b) => b.status === "confirmed").length}
                </p>
              </div>
              <div className="stat-box">
                <h4>Pending</h4>
                <p className="stat-value">
                  {userBookings.filter((b) => b.status === "pending").length}
                </p>
              </div>
              <div className="stat-box">
                <h4>Total Spent</h4>
                <p className="stat-value">
                  ${userBookings
                    .reduce((sum, b) => sum + (b.totalAmount || 0), 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>

            {userBookings.length === 0 ? (
              <div className="empty-bookings">
                <p>No bookings yet. Let's make your first reservation!</p>
                <button
                  className="new-booking-btn"
                  onClick={() => navigate("/booking")}
                >
                  Book Now
                </button>
              </div>
            ) : (
              <div className="bookings-container">
                <h2>Your Reservations</h2>
                {userBookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-card-header">
                      <div className="booking-title">
                        <h3>{booking.roomType.toUpperCase()} Room</h3>
                        <p className="booking-id">Booking ID: {booking.id}</p>
                      </div>
                      <div className="booking-status" style={{ backgroundColor: getStatusColor(booking.status) }}>
                        {getStatusIcon(booking.status)} {booking.status.toUpperCase()}
                      </div>
                    </div>

                    <div className="booking-card-body">
                      <div className="booking-row">
                        <div className="booking-col">
                          <label>Check-In</label>
                          <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
                        </div>
                        <div className="booking-col">
                          <label>Check-Out</label>
                          <p>{new Date(booking.checkOut).toLocaleDateString()}</p>
                        </div>
                        <div className="booking-col">
                          <label>Guests</label>
                          <p>{booking.guests}</p>
                        </div>
                        <div className="booking-col">
                          <label>Total Price</label>
                          <p className="price">₨{booking.totalAmount?.toFixed(2)}</p>
                        </div>
                      </div>

                      {booking.specialRequests && (
                        <div className="booking-requests">
                          <label>Special Requests:</label>
                          <p>{booking.specialRequests}</p>
                        </div>
                      )}

                      {booking.status === "pending" && (
                        <div className="pending-notice">
                          <p>
                            ⏳ Your booking is waiting for admin confirmation. You'll receive a notification once approved.
                          </p>
                        </div>
                      )}

                      {booking.status === "confirmed" && (
                        <div className="confirmed-notice">
                          <p>
                            ✓ Your booking is confirmed! A confirmation email has been sent to your account.
                          </p>
                        </div>
                      )}

                      <div className="booking-card-actions">
                        <button
                          className="download-receipt-btn"
                          onClick={() => handleDownloadReceipt(booking)}
                        >
                          📥 Download Receipt
                        </button>
                        <button
                          className="delete-booking-btn"
                          onClick={() => handleDeleteBooking(booking.id)}
                        >
                          🗑️ Delete Booking
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="booking-actions-footer">
              <button
                className="new-booking-btn"
                onClick={() => navigate("/booking")}
              >
                ➕ New Booking
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default MyBookings;

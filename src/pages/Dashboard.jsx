import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get booking data from location state or localStorage
  const bookingData = location.state?.bookingData || 
                      JSON.parse(localStorage.getItem("bookingData")) || {};

  const handleNewBooking = () => {
    navigate("/booking");
  };

  const handleDownloadReceipt = () => {
    // Generate confirmation number
    const confirmationNo = `LUX${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Calculate numbers
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    const roomPrices = {
      standard: 120,
      deluxe: 180,
      suite: 250,
      presidential: 500,
    };

    const roomPrice = roomPrices[bookingData.roomType] || 120;
    const totalPrice = roomPrice * nights;
    const tax = totalPrice * 0.1;
    const grandTotal = totalPrice + tax;

    // Create receipt content
    const receiptContent = `
================================
         KHALIFA HOTELS
      BOOKING CONFIRMATION
================================

Confirmation Number: ${confirmationNo}
Date Issued: ${new Date().toLocaleDateString()}

--------------------------------
GUEST INFORMATION
--------------------------------
Name: ${bookingData.firstName} ${bookingData.lastName}
Email: ${bookingData.email}
Phone: ${bookingData.phone}
Guests: ${bookingData.guests}

--------------------------------
STAY DETAILS
--------------------------------
Check-In: ${checkIn.toLocaleDateString()}
Check-Out: ${checkOut.toLocaleDateString()}
Number of Nights: ${nights}
Room Type: ${bookingData.roomType.charAt(0).toUpperCase() + bookingData.roomType.slice(1)}

${bookingData.specialRequests ? `Special Requests:\n${bookingData.specialRequests}\n` : ""}

--------------------------------
BILLING SUMMARY
--------------------------------
Room Rate per Night: $${roomPrice.toFixed(2)}
Subtotal (${nights} nights): $${totalPrice.toFixed(2)}
Taxes & Fees (10%): $${tax.toFixed(2)}
--------------------------------
TOTAL AMOUNT DUE: $${grandTotal.toFixed(2)}
================================

Payment Status: PAID ✓
Booking Status: CONFIRMED ✓

Cancellation Policy:
- Free cancellation up to 48 hours before check-in
- 50% refund if cancelled 24-48 hours before
- No refund if cancelled less than 24 hours

Contact Information:
Phone: +1 (555) 123-4567
Email: info@khalifa.com
Website: www.khalifa.com

Thank you for choosing Khalifa Hotels!
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

  // Calculate number of nights
  const checkIn = new Date(bookingData.checkIn);
  const checkOut = new Date(bookingData.checkOut);
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

  // Room pricing
  const roomPrices = {
    standard: 120,
    deluxe: 180,
    suite: 250,
    presidential: 500,
  };

  const roomPrice = roomPrices[bookingData.roomType] || 120;
  const totalPrice = roomPrice * nights;
  const tax = totalPrice * 0.1;
  const grandTotal = totalPrice + tax;

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <section className="dashboard-hero">
          <div className="container">
            <h1>✓ Booking Confirmed!</h1>
            <p>Your luxury stay is reserved. Details below:</p>
          </div>
        </section>

        <section className="dashboard-content">
          <div className="container">
            <div className="dashboard-grid">
              <div className="confirmation-card">
                <h2>Booking Confirmation</h2>
                <div className="confirmation-header">
                  <div className="confirmation-number">
                    <label>Confirmation #</label>
                    <h3>LUX{Math.random().toString(36).substr(2, 9).toUpperCase()}</h3>
                  </div>
                  <div className="booking-status">
                    <span className="status-badge confirmed">✓ CONFIRMED</span>
                  </div>
                </div>

                <div className="booking-details">
                  <h3>Guest Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Name</label>
                      <p>{bookingData.firstName} {bookingData.lastName}</p>
                    </div>
                    <div className="detail-item">
                      <label>Email</label>
                      <p>{bookingData.email}</p>
                    </div>
                    <div className="detail-item">
                      <label>Phone</label>
                      <p>{bookingData.phone}</p>
                    </div>
                    <div className="detail-item">
                      <label>Number of Guests</label>
                      <p>{bookingData.guests} Guest{bookingData.guests > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>

                <div className="booking-details">
                  <h3>Stay Details</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Check-In</label>
                      <p>{new Date(bookingData.checkIn).toLocaleDateString()}</p>
                    </div>
                    <div className="detail-item">
                      <label>Check-Out</label>
                      <p>{new Date(bookingData.checkOut).toLocaleDateString()}</p>
                    </div>
                    <div className="detail-item">
                      <label>Number of Nights</label>
                      <p>{nights} Night{nights > 1 ? 's' : ''}</p>
                    </div>
                    <div className="detail-item">
                      <label>Room Type</label>
                      <p className="room-type">
                        {bookingData.roomType.charAt(0).toUpperCase() + bookingData.roomType.slice(1)} Room
                      </p>
                    </div>
                  </div>
                </div>

                {bookingData.specialRequests && (
                  <div className="booking-details">
                    <h3>Special Requests</h3>
                    <p className="special-requests">{bookingData.specialRequests}</p>
                  </div>
                )}
              </div>

              <div className="billing-card">
                <h2>Billing Summary</h2>
                
                <div className="billing-item">
                  <span>Room Rate per Night</span>
                  <p>${roomPrice.toFixed(2)}</p>
                </div>
                
                <div className="billing-item">
                  <span>{nights} Night{nights > 1 ? 's' : ''}</span>
                  <p>${totalPrice.toFixed(2)}</p>
                </div>

                <div className="billing-item">
                  <span>Taxes & Fees (10%)</span>
                  <p>${tax.toFixed(2)}</p>
                </div>

                <div className="billing-divider"></div>

                <div className="billing-total">
                  <span>Total Amount Due</span>
                  <h3>${grandTotal.toFixed(2)}</h3>
                </div>

                <div className="payment-status">
                  <span className="paid-badge">💳 Payment Processed</span>
                </div>

                <div className="billing-note">
                  <p>✓ A confirmation email has been sent to <strong>{bookingData.email}</strong></p>
                  <p>✓ You can modify or cancel your booking up to 48 hours before check-in</p>
                </div>

                <div className="dashboard-buttons">
                  <button className="btn btn-primary" onClick={handleDownloadReceipt}>
                    📄 Download Receipt
                  </button>
                  <button className="btn btn-secondary" onClick={handleNewBooking}>
                    ➕ New Booking
                  </button>
                </div>
              </div>
            </div>

            <div className="next-steps">
              <h2>What's Next?</h2>
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <h4>Confirmation Email</h4>
                  <p>Check your email for booking details and receipt</p>
                </div>
                <div className="step-card">
                  <div className="step-number">2</div>
                  <h4>Prepare for Your Stay</h4>
                  <p>Pack your bags and prepare for an amazing experience</p>
                </div>
                <div className="step-card">
                  <div className="step-number">3</div>
                  <h4>Arrival</h4>
                  <p>Check in on {new Date(bookingData.checkIn).toLocaleDateString()} and enjoy luxury</p>
                </div>
                <div className="step-card">
                  <div className="step-number">4</div>
                  <h4>Share Your Experience</h4>
                  <p>Rate your stay and share your feedback with us</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

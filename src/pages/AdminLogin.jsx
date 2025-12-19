import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Hardcoded admin credentials (in production, use backend authentication)
  const ADMIN_EMAIL = "admin@khalifahotels.com";
  const ADMIN_PASSWORD = "AdminSecure123"; // Change this to something secure

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }
    if (!formData.password) {
      setErrors({ password: "Password is required" });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (
        formData.email === ADMIN_EMAIL &&
        formData.password === ADMIN_PASSWORD
      ) {
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            email: ADMIN_EMAIL,
            isAdmin: true,
            loginTime: new Date().toISOString(),
          })
        );
        setLoading(false);
        navigate("/admin");
      } else {
        setErrors({ general: "Invalid admin credentials" });
        setLoading(false);
      }
    }, 500);
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <section className="auth-hero">
          <div className="container">
            <h1>Admin Login</h1>
            <p>Sign in to access the admin dashboard</p>
          </div>
        </section>

        <section className="auth-content">
          <div className="container">
            <div className="auth-form-wrapper">
              <form onSubmit={handleSubmit} className="auth-form">
                <h2>Admin Access</h2>

                {errors.general && (
                  <div className="error-message">{errors.general}</div>
                )}

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login to Admin Dashboard"}
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

export default AdminLogin;

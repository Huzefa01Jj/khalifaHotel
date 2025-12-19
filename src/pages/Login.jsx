import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        setErrors({ general: "Invalid email or password" });
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        })
      );

      setLoading(false);
      navigate("/my-bookings");
    }, 500);
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <section className="auth-hero">
          <div className="container">
            <h1>Welcome Back</h1>
            <p>Sign in to your account to manage your bookings</p>
          </div>
        </section>

        <section className="auth-content">
          <div className="container">
            <div className="auth-form-wrapper">
              <form className="auth-form login-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>

                {errors.general && (
                  <div className="error-banner">{errors.general}</div>
                )}

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
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
                    placeholder="••••••••"
                    className={errors.password ? "error" : ""}
                  />
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="auth-submit-btn"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>

                <p className="auth-footer">
                  Don't have an account?{" "}
                  <Link to="/register">Create Account</Link>
                </p>
              </form>

              <div className="auth-benefits">
                <h3>Quick Login Tips</h3>
                <div className="benefit-item">
                  <span className="benefit-icon">🔑</span>
                  <p>Use your registered email and password</p>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">📧</span>
                  <p>Can't remember your password?</p>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🛡️</span>
                  <p>Your account is secure and protected</p>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🎯</span>
                  <p>Access all your bookings</p>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🚀</span>
                  <p>Quick booking process</p>
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

export default Login;

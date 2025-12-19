import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      if (existingUsers.some((user) => user.email === formData.email)) {
        setErrors({ email: "Email already registered" });
        setLoading(false);
        return;
      }

      const newUser = {
        id: `USER${Date.now()}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
      };

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
        })
      );

      setLoading(false);
      navigate("/booking");
    }, 500);
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <section className="auth-hero">
          <div className="container">
            <h1>Join LuxStay</h1>
            <p>Create your account to start booking luxury accommodations</p>
          </div>
        </section>

        <section className="auth-content">
          <div className="container">
            <div className="auth-form-wrapper">
              <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className={errors.firstName ? "error" : ""}
                    />
                    {errors.firstName && (
                      <span className="error-message">{errors.firstName}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className={errors.lastName ? "error" : ""}
                    />
                    {errors.lastName && (
                      <span className="error-message">{errors.lastName}</span>
                    )}
                  </div>
                </div>

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
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className={errors.phone ? "error" : ""}
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
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

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={errors.confirmPassword ? "error" : ""}
                  />
                  {errors.confirmPassword && (
                    <span className="error-message">{errors.confirmPassword}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="auth-submit-btn"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="auth-footer">
                  Already have an account?{" "}
                  <Link to="/login">Sign In</Link>
                </p>
              </form>

              <div className="auth-benefits">
                <h3>Why Sign Up?</h3>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <p>Save your favorite hotels and rooms</p>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <p>Exclusive discounts and special offers</p>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <p>Easy booking management</p>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <p>24/7 customer support</p>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <p>Loyalty rewards program</p>
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

export default Register;

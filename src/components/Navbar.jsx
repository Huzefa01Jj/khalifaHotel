import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="logo">ҠƑ</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/booking">Book Now</Link>
        <a href="#contact">Contact</a>
        <Link to="/login" className="nav-btn">Login</Link>
      </nav>
    </header>
  );
};

export default Navbar;

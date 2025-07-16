import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">F1 App</Link>
        
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/escuderia">Escuderías</Link>
          </li>
          <li>
            <Link to="/pilotos">Pilotos</Link>
          </li>
          <li>
            <Link to="/coches">Coches F1</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
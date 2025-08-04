// src/components/NavbarRefactored.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import "./Navbar.css";

const navigation = [
  // { name: "Escuderias", href: "/escuderia" },
  { name: "Pilotos", href: "/pilotos" },
  { name: "Circuitos", href: "/circuitos" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioActual");
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioActual");
    setUser(null);
    navigate("/");
  };

  const isClient = user && user.tipo_usuario === "CLIENTE";
  const isAdmin = user && user.tipo_usuario === "ADMIN";
  const isAuthenticated = user !== null;

  return (
    <header className="navbar-refactored">
      <div className="navbar-container-refactored">
        <Link to="/" className="navbar-logo-refactored">
          <img
            alt="F1 Logo"
            src="https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg"
            className="navbar-logo-img-refactored"
          />
        </Link>
        
        <button
          className="mobile-menu-button-refactored"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
        
        <nav className={`nav-links-refactored ${mobileMenuOpen ? "active" : ""}`}>
          <div className="nav-group-refactored">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} onClick={() => setMobileMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
            {isClient && (
              <Link to="/mi_cuenta" onClick={() => setMobileMenuOpen(false)}>
                Perfil
              </Link>
            )}
            {isAdmin && (
              <Link to="/gestion" onClick={() => setMobileMenuOpen(false)}>
                Gestión
              </Link>
            )}
          </div>

          <div className="auth-buttons-refactored">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="btn-logout-refactored">
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn-login-refactored">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
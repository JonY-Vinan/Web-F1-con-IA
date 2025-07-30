// src/components/Navbar.jsx
"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Escuderias", href: "/escuderia" },
  { name: "Pilotos", href: "/pilotos" },
  { name: "Circuitos", href: "/circuitos" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // Bootstrap: Navbar con fondo oscuro, fijo en la parte superior
    <header className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <span className="visually-hidden">F1 Project</span>
          <img
            alt="F1 Logo"
            src="https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg"
            className="d-inline-block align-text-top"
            style={{ height: "32px" }} // Altura para el logo
          />
        </Link>

        {/* Botón para menú móvil (toggler) */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-controls="navbarSupportedContent"
          aria-expanded={mobileMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
          {/* O si prefieres el icono de Heroicons: */}
          {/* <Bars3Icon aria-hidden="true" className="h-6 w-6" /> */}
        </button>

        {/* Contenido del menú para pantallas grandes */}
        <div
          className="collapse navbar-collapse d-none d-lg-block"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navigation.map((item) => (
              <li className="nav-item" key={item.name}>
                <Link
                  to={item.href}
                  className="nav-link text-light" // text-light para el texto claro
                  aria-current={
                    window.location.pathname === item.href ? "page" : undefined
                  }
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex">
            <Link
              to="/signin"
              className="btn btn-outline-light" // Botón con borde claro
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Dialog para menú móvil (headlessui) */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="d-lg-none" // Ocultar en pantallas lg y superiores
      >
        <div className="fixed inset-0 bg-dark bg-opacity-75 z-50" />{" "}
        {/* Overlay oscuro */}
        <DialogPanel className="fixed inset-y-0 right-0 w-75 bg-dark p-3 shadow-lg z-50">
          {" "}
          {/* Panel lateral oscuro */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Link to="/" className="navbar-brand">
              <span className="visually-hidden">F1 Project</span>
              <img
                alt="F1 Logo"
                src="https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg"
                className="d-inline-block align-text-top"
                style={{ height: "32px" }}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-close btn-close-white" // Botón de cerrar blanco para fondo oscuro
              aria-label="Close menu"
            >
              {/* O si prefieres el icono de Heroicons: */}
              {/* <XMarkIcon aria-hidden="true" className="h-6 w-6 text-light" /> */}
            </button>
          </div>
          <div className="d-flex flex-column">
            <ul className="nav flex-column mb-auto">
              {navigation.map((item) => (
                <li className="nav-item" key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="nav-link text-light py-2" // Texto claro, padding
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <hr className="text-white-50 my-3" /> {/* Separador */}
            <Link
              to="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary w-100" // Botón primario de Bootstrap, ancho completo
            >
              Log in
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

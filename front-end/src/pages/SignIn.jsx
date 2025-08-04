import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignIn.css"; // Importa los estilos CSS

// Datos de equipos y pilotos de F1
const F1_TEAMS = {
  Mercedes: ["Lewis Hamilton", "George Russell"],
  RedBull: ["Max Verstappen", "Sergio Pérez"],
  Ferrari: ["Charles Leclerc", "Carlos Sainz"],
  McLaren: ["Lando Norris", "Oscar Piastri"],
  AstonMartin: ["Fernando Alonso", "Lance Stroll"],
  Alpine: ["Esteban Ocon", "Pierre Gasly"],
  // Añade más equipos si lo deseas
};

const SignIn = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    contraseña: "",
    f1Team: "",
    favoriteDriver: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "f1Team") {
      setFormData((prev) => ({ ...prev, favoriteDriver: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email,
          password: formData.contraseña,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }

      const result = await response.json();
      console.log("Usuario registrado con éxito:", result);

      // Guardar el objeto de usuario completo en localStorage
      localStorage.setItem('usuarioActual', JSON.stringify(result.user));
      // Redirigir al usuario pasando el objeto 'user' completo
      navigate("/mi_cuenta", { state: { user: result.user } });

    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-wrapper">
        <div className="signin-form-container">
          <h1 className="signin-title">Únete a la Comunidad F1</h1>
          <p className="signin-subtitle">Crea tu cuenta y comparte tu pasión por el automovilismo</p>

          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ej: Carlos"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellidos" className="form-label">Apellidos</label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ej: Sainz"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contraseña" className="form-label">Contraseña</label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                className="form-input"
                placeholder="Mínimo 8 caracteres"
                required
                minLength="8"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="f1Team" className="form-label">Equipo Favorito</label>
                <select
                  id="f1Team"
                  name="f1Team"
                  value={formData.f1Team}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Selecciona un equipo</option>
                  {Object.keys(F1_TEAMS).map((team) => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="favoriteDriver" className="form-label">Piloto Favorito</label>
                <select
                  id="favoriteDriver"
                  name="favoriteDriver"
                  value={formData.favoriteDriver}
                  onChange={handleChange}
                  className="form-select"
                  required
                  disabled={!formData.f1Team}
                >
                  <option value="">
                    {formData.f1Team ? "Selecciona un piloto" : "Primero elige equipo"}
                  </option>
                  {formData.f1Team &&
                    F1_TEAMS[formData.f1Team].map((driver) => (
                      <option key={driver} value={driver}>{driver}</option>
                    ))}
                </select>
              </div>
            </div>

            <button type="submit" className="signin-button">
              Crear Cuenta
              <span className="button-icon">→</span>
            </button>

            <p className="login-link">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </p>
          </form>
        </div>

        <div className="signin-image-container">
          <img
                src="/images/piloto.png"
                alt="Bienvenido a la comunidad F1"
               className="signin-image"
              />
          <div className="image-caption">
            <h3>Comparte tu pasión</h3>
            <p>Únete a miles de fans de Fórmula 1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
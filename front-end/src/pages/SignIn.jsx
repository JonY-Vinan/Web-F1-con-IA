import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const F1_TEAMS = {
  Mercedes: ["Lewis Hamilton", "George Russell"],
  RedBull: ["Max Verstappen", "Sergio Pérez"],
  Ferrari: ["Charles Leclerc", "Carlos Sainz"],
  McLaren: ["Lando Norris", "Oscar Piastri"],
  AstonMartin: ["Fernando Alonso", "Lance Stroll"],
  Alpine: ["Esteban Ocon", "Pierre Gasly"],
};

const Registro = ({ agregarUsuario }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear objeto de usuario
    const nuevoUsuario = {
      username: `${formData.nombre} ${formData.apellidos}`,
      email: formData.email,
      f1Team: formData.f1Team,
      favoriteDriver: formData.favoriteDriver,
      joinDate: new Date().toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric",
      }),
      location: "Madrid, España", // Puedes agregar un campo para esto en el formulario si lo deseas
    };

    // Agregar usuario al estado global
    agregarUsuario(nuevoUsuario);

    // Guardar usuario actual en localStorage para la sesión
    localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario));

    // Redirigir a MiCuenta
    navigate("/mi_cuenta", { state: nuevoUsuario });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="registro-wrapper">
        <div className="registro-form-container">
          <h1 className="registro-title">Únete a la Comunidad F1</h1>
          <p className="registro-subtitle">
            Crea tu cuenta y comparte tu pasión por el automovilismo
          </p>

          <form className="registro-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
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
                <label htmlFor="apellidos" className="form-label">
                  Apellidos
                </label>
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
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
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
              <label htmlFor="contraseña" className="form-label">
                Contraseña
              </label>
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
                <label htmlFor="f1Team" className="form-label">
                  Equipo Favorito
                </label>
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
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="favoriteDriver" className="form-label">
                  Piloto Favorito
                </label>
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
                    {formData.f1Team
                      ? "Selecciona un piloto"
                      : "Primero elige equipo"}
                  </option>
                  {formData.f1Team &&
                    F1_TEAMS[formData.f1Team].map((driver) => (
                      <option key={driver} value={driver}>
                        {driver}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <button type="submit" className="registro-button">
              Crear Cuenta
              <span className="button-icon">→</span>
            </button>

            <p className="login-link">
              ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
            </p>
          </form>
        </div>

        <div className="registro-image-container">
          <img
            src="https://images.squarespace-cdn.com/content/v1/68245ffd9f73984bc78ca002/1726020718.808429-WUVJNELAWWECOBRGWTKI/imgg-od3-vodtycug.png"
            alt="Bienvenido a la comunidad F1"
            className="registro-image"
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

export default Registro;

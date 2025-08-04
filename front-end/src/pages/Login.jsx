import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css"; // Importa los estilos CSS

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        // Manejar errores como credenciales incorrectas
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const result = await response.json();
      console.log("Inicio de sesión exitoso:", result);

      // Guardar el objeto de usuario completo en localStorage
      localStorage.setItem('usuarioActual', JSON.stringify(result.user));

      // Redirigir al usuario a su perfil
      navigate("/mi_cuenta", { state: { user: result.user } });

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-form-container">
          <h1 className="login-title">Inicia Sesión</h1>
          <p className="login-subtitle">
            Accede a tu cuenta y no te pierdas nada
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
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
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <button type="submit" className="login-button">
              Iniciar Sesión
              <span className="button-icon">→</span>
            </button>

            <p className="signup-link">
              ¿No tienes cuenta? <Link to="/signin">Regístrate aquí</Link>
            </p>
          </form>
        </div>

        <div className="login-image-container">
          <img
            src="/images/piloto.png" // Puedes usar la misma imagen o una diferente
            alt="Bienvenido a la comunidad F1"
            className="login-image"
          />
          <div className="image-caption">
            <h3>Bienvenido de nuevo</h3>
            <p>La velocidad te espera</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
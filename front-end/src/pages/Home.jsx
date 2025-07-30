import React from "react";
import "./Home.css"; // Asegúrate de que este import está presente

export default function Home() {
  return (
    <div className="bg-dark min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden">
      {/* Fondo borroso personalizado */}
      <div className="custom-background-blur-1"></div>
      <div className="custom-background-blur-2"></div>

      <div className="container px-4 py-5 position-relative z-1">
        <div className="row align-items-center">
          {" "}
          {/* Fila para el layout de dos columnas */}
          {/* Columna Izquierda: Contenido de texto y botones */}
          <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
            <h1 className="display-4 fw-bold text-white">
              <span className="gradient-text">
                Powerful digital solution for your business
              </span>
            </h1>

            <p className="lead text-secondary mt-3 mb-4">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
            </p>

            <div className="d-grid gap-2 d-sm-flex justify-content-center justify-content-lg-start">
              <a
                href="#"
                className="btn btn-lg px-4 rounded-pill me-sm-3 custom-btn-gradient"
              >
                Get started
              </a>
              <a
                href="#"
                className="btn btn-outline-light btn-lg rounded-pill px-4"
              >
                Learn more
              </a>
            </div>
          </div>
          {/* Columna Derecha: Imagen */}
          <div className="col-lg-6 d-flex justify-content-center justify-content-lg-end">
            {/* Ejemplo 1: Imagen con un tamaño vertical (no cuadrada) */}
            {/* <img
              src="../assests/images/car.apng" // 400px de ancho por 600px de alto
              alt="An abstract visual"
              className="img-fluid rounded-4 shadow-lg custom-image-style-1"
            /> */}

            {/* Ejemplo 2: Imagen más ancha que alta, con bordes redondeados y sombra */}
            {/* <img
              src="https://picsum.photos/600/400?blur=5" // 600px de ancho por 400px de alto
              alt="An abstract visual"
              className="img-fluid rounded-4 shadow-lg custom-image-style-2"
            /> */}

            {/* Ejemplo 3: Un diseño de imagen irregular con CSS clip-path */}
            <img
              src="../images/car.apng"
              alt="An abstract visual"
              className="img-fluid rounded-4 shadow-lg custom-image-style-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

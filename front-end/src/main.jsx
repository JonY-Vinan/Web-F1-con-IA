import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Podemos mantenerlo para estilos mínimos o variables si es necesario.
import "./App.css"; // Puedes seguir usándolo para estilos de layout específicos.
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el CSS de Bootstrap
// Si planeas usar componentes de Bootstrap que requieren JS (como popovers, tooltips, etc.),
// podrías necesitar importar el JS aquí. Para el navbar simple, no es estrictamente necesario
// si usas headlessui para la lógica del menú móvil.
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

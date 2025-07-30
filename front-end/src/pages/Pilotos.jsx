// src/pages/Pilotos.jsx
import { FaUser } from "react-icons/fa";

function Pilotos() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="page-title">
        <FaUser className="title-icon" /> Pilotos de F1
      </h1>
      <p>Información sobre todos los pilotos de la temporada</p>
    </div>
  );
}

export default Pilotos;

// src/pages/Circuitos.jsx
import { FaFlagCheckered } from "react-icons/fa";

function Circuitos() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="page-title">
        <FaFlagCheckered className="title-icon" /> Circuitos de F1
      </h1>
      <p>Información sobre todos los circuitos de la temporada</p>
    </div>
  );
}

export default Circuitos;

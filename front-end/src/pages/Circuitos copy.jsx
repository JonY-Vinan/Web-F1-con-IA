import { useState } from "react";
import "./Circuitos.css"; // Importamos el CSS personalizado
import CircuitMap from "../pages/carrera/CircuitMap";
// import CountrySlider from "../pages/carrera/CountrySlider";
import PointsConstructors from "../pages/carrera/PointsConstructors";
import PointsDrivers from "./carrera/PointsDrivers";
import ResultRacer from "./carrera/ResultRacer";
// import CarsData from "./carrera/CarsData";

function Circuito() {
  const [activeTab, setActiveTab] = useState("drivers");
  const [mapView, setMapView] = useState(null);
  const [mapSceneView, setMapSceneView] = useState(null);
  const [circuitName, setCircuitName] = useState("");
  const [idCircuito, setIdCircuito] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [piloto_name, setPiloto_name] = useState("");

  return (
      <div className="circuito-container p-4 bg-dark min-vh-100 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">

      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card h-100 bg-darker-card text-white border-0 shadow">
            <div className="tab-container">
              <div className="tab-buttons">
                <button
                  className={`tab-button ${activeTab === "drivers" ? "active" : ""}`}
                  onClick={() => setActiveTab("drivers")}
                >
                  Puntos de Pilotos
                </button>
                <button
                  className={`tab-button ${activeTab === "constructors" ? "active" : ""}`}
                  onClick={() => setActiveTab("constructors")}
                >
                  Puntos de Constructores
                </button>
              </div>

              <div className="tab-content">
                {activeTab === "drivers" && <PointsDrivers />}
                {activeTab === "constructors" && <PointsConstructors />}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div
            className="map-container"
            style={{ height: "55vh", width: "100%" }}
          >
            <CircuitMap
              setMapView={setMapView}
              setMapSceneView={setMapSceneView}
              nameCircuito={circuitName}
              setIdCircuito={setIdCircuito}
              lat={setLat}
              long={setLong}
            />
          </div>
        </div>

        {/* Tarjeta 3 - Mentality Hub */}
        <div className="col-md-4">
          <div className="card h-100 bg-darker-card text-white border-0 shadow">

             <ResultRacer idCircuito={idCircuito}/>
          </div>
        </div>
      </div>

      {/* Fila inferior de tarjetas */}
      <div className="row g-4">
        {/* Tarjeta 4 - Posiciones */}
        <div className="col-md-4">           
        </div>

        {/* Tarjeta 5 - Próximo evento */}
        <div className="col-md-4"></div>

        {/* Tarjeta 6 - Eventos futuros */}
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}

export default Circuito;

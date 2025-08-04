import { useState } from "react";
import "./Circuitos.css";
import CircuitMap from "../pages/carrera/CircuitMap";
import PointsConstructors from "../pages/carrera/PointsConstructors";
import PointsDrivers from "./carrera/PointsDrivers";
import ResultRacer from "./carrera/ResultRacer";
import CountrySlider from "./carrera/CountrySlider";
function Circuito() {
  const [activeTab, setActiveTab] = useState("drivers");
  const [mapView, setMapView] = useState(null);
  const [mapSceneView, setMapSceneView] = useState(null);
  const [circuitName, setCircuitName] = useState("");
  const [idCircuito, setIdCircuito] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [piloto_name, setPiloto_name] = useState("");
  const [selectedYear, setSelectedYear] = useState(2025);

  const years = Array.from({ length: 8 }, (_, i) => 2025 - i); // Genera años de 2025 a 2018

  return (
    <div className="circuito-container bg-dark text-white min-vh-100 container-fluid">
      {/* Fila del selector de año */}
      <div className="row g-4 mt-3 mb-4">
        <div className="col-12 text-center">
          <label htmlFor="year-select" className="form-label h5 text-white">
            Selecciona el Año:
          </label>
          <select
            id="year-select"
            className="form-select w-auto mx-auto bg-dark text-white border-secondary"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Fila superior de tarjetas */}
      <div className="row g-4">
        {/* Tarjeta 1: Puntos de Pilotos y Constructores */}
        <div className="col-md-4">
          <div className="card h-100 bg-dark text-white shadow-sm border-0">
            <div className="card-header border-0 bg-dark">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "drivers" ? "active" : ""
                    }`}
                    aria-current={activeTab === "drivers" ? "page" : null}
                    onClick={() => setActiveTab("drivers")}
                  >
                    Puntos de Pilotos
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "constructors" ? "active" : ""
                    }`}
                    aria-current={activeTab === "constructors" ? "page" : null}
                    onClick={() => setActiveTab("constructors")}
                  >
                    Puntos de Constructores
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content">
                {activeTab === "drivers" && (
                  <PointsDrivers selectedYear={selectedYear} />
                )}
                {activeTab === "constructors" && (
                  <PointsConstructors selectedYear={selectedYear} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Mapa del Circuito */}
        <div className="col-md-4">
          <div className="card h-100 bg-dark text-white shadow-sm border-0">
            <div className="card-body p-0">
              <div className="map-container">
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
          </div>
        </div>

        {/* Tarjeta 3: Resultados de la Carrera */}
        <div className="col-md-4">
          <div className="card h-100 bg-dark text-white shadow-sm border-0">
            <div className="card-body">
              <ResultRacer
                idCircuito={idCircuito}
                selectedYear={selectedYear}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fila inferior de tarjetas (vacía, mantenida por la estructura) */}
      <div className="row g-4 mt-4">
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}

export default Circuito;

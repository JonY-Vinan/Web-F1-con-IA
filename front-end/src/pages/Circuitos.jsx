import { useState } from "react";
import "./Circuitos.css"; // Importamos el CSS personalizado
import CircuitMap from "../pages/carrera/CircuitMap";
import CountrySlider from "../pages/carrera/CountrySlider";
// Datos de ejemplo para las listas
const standingsData = [
  { team: "Red Bull Racing", points: 19 },
  { team: "Mercedes", points: 17 },
  { team: "Ferrari", points: 15 },
  { team: "McLaren", points: 12 },
  { team: "Alpine", points: 10 },
  { team: "Aston Martin", points: 8 },
  { team: "AlphaTauri", points: 6 },
  { team: "Haas", points: 4 },
  { team: "Williams", points: 2 },
  { team: "Sauber", points: 1 },
];

const upcomingEventsData = [
  "Bahrain Grand Prix 2024",
  "Saudi Arabian Grand Prix 2024",
  "Australian Grand Prix 2024",
];

function Circuito() {
  const [mapView, setMapView] = useState(null);
  const [mapSceneView, setMapSceneView] = useState(null);
  const [circuitName, setCircuitName] = useState("");
  const [idCircuito, setIdCircuito] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [piloto_name, setPiloto_name] = useState("");
  const handleDriverSelect = (driverName) => {
    setPiloto_name(driverName);
  };

  return (
    <div className="circuito-container p-4 bg-dark min-vh-100 text-white">
      {/* Encabezado del Dashboard */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 text-secondary">// HOME</h1>
        <div className="text-end">
          <small className="text-white-50">Sponsor Activity Schedule</small>
        </div>
      </div>

      {/* Fila superior de tarjetas */}
      <div className="row g-4 mb-4">
        {/* Tarjeta 1 - Equipo */}
        <div className="col-md-4">
          <div className="card h-100 bg-darker-card text-white border-0 shadow">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="team-logo-placeholder me-3"></div>
                <div>
                  <h5 className="card-title fw-bold">ULTZA RACING</h5>
                  <p className="card-text text-white-50 small">
                    <span className="d-block">Season Objective</span>
                    <span className="d-block">Long-Term Objective</span>
                  </p>
                </div>
              </div>
              <p className="card-text text-white-50 small">
                <span className="d-block">Driver of Above</span>
                <span className="d-block">Constructors Champion</span>
              </p>
              <div className="mt-3">
                <h6 className="mb-0">The Board</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta 2 - Pilotos */}
        <div className="col-md-4">
          <div className="card h-100 bg-darker-card text-white border-0 shadow">
            <div className="card-body">
              <div className="row g-2">
                <div className="col-6 text-center">
                  <div className="driver-card p-2 rounded">
                    <img
                      src="https://via.placeholder.com/150x200"
                      className="img-fluid rounded-top"
                      alt="Theo Pourchaire"
                    />
                    <p className="mb-0 fw-bold small">THEO</p>
                    <p className="mb-0 fw-bold small">POURCHAIRE</p>
                    <p
                      className="mb-0 text-white-50"
                      style={{ fontSize: "0.7rem" }}
                    >
                      19TH
                    </p>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="driver-card p-2 rounded">
                    <img
                      src="https://via.placeholder.com/150x200"
                      className="img-fluid rounded-top"
                      alt="Liam Lawson"
                    />
                    <p className="mb-0 fw-bold small">LIAM</p>
                    <p className="mb-0 fw-bold small">LAWSON</p>
                    <p
                      className="mb-0 text-white-50"
                      style={{ fontSize: "0.7rem" }}
                    >
                      17TH
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta 3 - Mentality Hub */}
        <div className="col-md-4">
          <div className="card h-100 bg-darker-card text-white border-0 shadow">
            <div className="card-body text-center">
              <div className="circular-progress-container mb-3">
                <div className="circular-progress"></div>
                <div className="progress-content">
                  <p className="mb-0 fw-bold">MENTALITY HUB</p>
                  <p className="mb-0 text-white-50 small">(Driver Positive)</p>
                </div>
              </div>
              <p className="small text-white-50">
                <span className="text-success">&darr;</span> Lower Mentality
              </p>
              <p className="small text-white-50">
                <span className="text-danger">&uarr;</span> Biggest Issue
              </p>
              <p className="small fw-bold">Mentality Hub</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fila inferior de tarjetas */}
      <div className="row g-4">
        {/* Tarjeta 4 - Posiciones */}
        <div className="col-md-4">
          <div className="card h-100 bg-darker-card text-white border-0 shadow">
            <div className="card-body">
              <h5 className="card-title fw-bold">Standings</h5>
              <ul className="list-unstyled mt-3">
                {standingsData.map((item, index) => (
                  <li
                    key={index}
                    className="d-flex justify-content-between align-items-center text-white-50 mb-2"
                  >
                    <span>{item.team}</span>
                    <span className="badge bg-secondary rounded-pill">
                      {item.points}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tarjeta 5 - Próximo evento */}
        <div className="col-md-4">
          <div
            className="map-container"
            style={{ height: "60vh", width: "100%" }}
          >
            <CircuitMap
              setMapView={setMapView}
              setMapSceneView={setMapSceneView}
              nameCircuito={circuitName}
              lat={setLat}
              long={setLong}
            />
          </div>
          {/* <div className="card h-100 bg-darker-card text-white border-0 shadow">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-3">UP NEXT</h5>
              <img
                src="https://via.placeholder.com/300x200"
                className="img-fluid mb-3"
                alt="Bahrain Circuit"
              />
              <div className="text-center">
                <h6 className="mb-0">BAHRAIN</h6>
                <small className="text-white-50">
                  01 FEBRUARY 29 - MARCH 03
                </small>
              </div>
            </div>
          </div> */}
        </div>

        {/* Tarjeta 6 - Eventos futuros */}
        <div className="col-md-4">
          <CountrySlider
            mapView={mapView}
            circuitName={setCircuitName}
            idCircuito={setIdCircuito}
          />
          {/* <div className="card h-100 bg-darker-card text-white border-0 shadow">
            <div className="card-body">
              <h5 className="card-title fw-bold">UPCOMING EVENTS</h5>
              <ul className="list-unstyled mt-3">
                {upcomingEventsData.map((event, index) => (
                  <li
                    key={index}
                    className="d-flex justify-content-between align-items-center text-white-50 mb-2"
                  >
                    <span>{event}</span>
                    <span className="badge bg-secondary rounded-pill">
                      Tomorrow
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Circuito;

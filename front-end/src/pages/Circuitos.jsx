import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Form,
  Spinner,
  Nav,
} from "react-bootstrap";
import "./Circuitos.css";

// Importa tus componentes
import CircuitMap from "../pages/carrera/CircuitMap";
import PointsConstructors from "../pages/carrera/PointsConstructors";
import PointsDrivers from "./carrera/PointsDrivers";
import ResultRacer from "./carrera/ResultRacer";
import CountrySlider from "./carrera/CountrySlider";
import CarreraIA from "./carrera/carrera_IA";

function Circuito() {
  const [mapView, setMapView] = useState(null);
  const [mapSceneView, setMapSceneView] = useState(null);
  const [circuitName, setCircuitName] = useState("");
  const [idCircuito, setIdCircuito] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("drivers");
  const [rightActiveTab, setRightActiveTab] = useState("results");

  const years = Array.from({ length: 8 }, (_, i) => 2025 - i);

  const handleYearChange = e => {
    setLoading(true);
    setSelectedYear(parseInt(e.target.value));
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <Container
      fluid
      className="circuito-container min-vh-100 py-4 bg-dark text-white"
    >
      <Row className="g-4">
        {/* Columna Izquierda: Menús Plegables */}
        <Col lg={3}>
          <div className="menu-panel p-3 rounded shadow-sm">
            <Accordion alwaysOpen defaultActiveKey={["0", "1"]}>
              {/* Sección de Año y Circuito */}
              <Accordion.Item
                eventKey="0"
                className="bg-dark text-white border-secondary"
              >
                <Accordion.Header className="bg-dark text-white">
                  Selección de Año y Circuito
                </Accordion.Header>
                <Accordion.Body className="bg-dark text-white">
                  <Row className="g-3 align-items-center">
                    <Col xs={12} md={4}>
                      <Form.Group>
                        <Form.Select
                          value={selectedYear}
                          onChange={handleYearChange}
                          className="bg-secondary text-white border-secondary"
                        >
                          {years.map(year => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={8}>
                      <CountrySlider
                        mapView={mapView}
                        circuitName={setCircuitName}
                        idCircuito={setIdCircuito}
                      />
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>

              {/* Sección de Puntos (con pestañas) */}
              <Accordion.Item
                eventKey="1"
                className="bg-dark text-white border-secondary"
              >
                <Accordion.Header>Puntos del Campeonato</Accordion.Header>
                <Accordion.Body className="bg-dark text-white">
                  <Nav variant="pills" defaultActiveKey="drivers" onSelect={(selectedKey) => setActiveTab(selectedKey)} className="mb-3">
                    <Nav.Item>
                      <Nav.Link eventKey="drivers" className="bg-secondary text-white">Pilotos</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="constructors" className="bg-secondary text-white">Constructores</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <div className="tab-content">
                    {activeTab === "drivers" && (
                      <PointsDrivers selectedYear={selectedYear} />
                    )}
                    {activeTab === "constructors" && (
                      <PointsConstructors selectedYear={selectedYear} />
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Col>

        {/* Columna Central: Mapa del Circuito */}
        <Col lg={5}>
          <div className="center-panel p-3 rounded shadow-sm">
            <h3 className="text-white text-center mb-3">
              {circuitName || "Selecciona un Circuito"}
            </h3>
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "400px" }}
              >
                <Spinner animation="border" variant="light" />
              </div>
            ) : (
              <>
                <div className="map-container mb-4 rounded">
                  <CircuitMap
                    setMapView={setMapView}
                    setMapSceneView={setMapSceneView}
                    nameCircuito={circuitName}
                    setIdCircuito={setIdCircuito}
                    lat={setLat}
                    long={setLong}
                  />
                </div>
              </>
            )}
          </div>
        </Col>

        {/* Columna Derecha: Herramientas de Carrera (sin Accordion) */}
        <Col lg={4}>
          <div className="right-panel p-3 rounded shadow-sm">
            <Nav variant="pills" defaultActiveKey="results" onSelect={(selectedKey) => setRightActiveTab(selectedKey)} className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="simulator" className="bg-secondary text-white">Simulador de Adelantamiento</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="results" className="bg-secondary text-white">Resultados de la Carrera</Nav.Link>
              </Nav.Item>
            </Nav>
            <div className="tab-content">
              {rightActiveTab === "simulator" && <CarreraIA selectedYear={selectedYear} />}
              {rightActiveTab === "results" && (
                <ResultRacer
                  idCircuito={idCircuito}
                  selectedYear={selectedYear}
                />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Circuito;
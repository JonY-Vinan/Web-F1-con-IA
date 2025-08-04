import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Carrera_IA.css";

// Mapeo de colores para los equipos de F1
const TEAM_COLORS = {
  "Red Bull": "#00008B",
  Ferrari: "#DC0000",
  McLaren: "#FF8700",
  Mercedes: "#00A99D",
  Alpine: "#00489C",
  "Aston Martin": "#006F62",
  "Kick Sauber": "#52E252",
  "Haas F1 Team": "#B6B6B6",
  RB: "#6692FF",
  Williams: "#005AFF",
};

// Mapeo de URLs de imágenes para cada piloto
const DRIVER_IMAGES = {
  "Max Verstappen":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS92ZXIucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Sergio Pérez":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9wZXIucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Charles Leclerc":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9sZWMucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Lando Norris":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9ub3IucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Carlos Sainz":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9zYWkucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Oscar Piastri":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9waWEucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Lewis Hamilton":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9oYW0ucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "George Russell":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9ydXNzLm5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMH19fQ==",
  "Fernando Alonso":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9hbG8ucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Lance Stroll":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9zdHIucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Alexander Albon":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9hbGIucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Yuki Tsunoda":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS90c3UucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Daniel Ricciardo":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9yaWkuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Esteban Ocon":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9vY28ucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Pierre Gasly":
    "https://static.motor.es/f1/fichas/contenido/pierre-gasly/pierre-gasly2025_1741589705.jpg",
  "Valtteri Bottas":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9ib3QucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Guanyu Zhou":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS96aG91LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwfX19",
  "Nico Hülkenberg":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9odWwucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Kevin Magnussen":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9tYWcucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Oliver Bearman":
    "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9iZWFyLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwfX19",
  // Pilotos adicionales del campeonato F1 2024
  "Logan Sargeant": "", // URL no encontrada
  "Franco Colapinto": "", // URL no encontrada
  "Liam Lawson": "", // URL no encontrada
  "Jack Doohan": "", // URL no encontrada
};

const API_URL = "http://127.0.0.1:5000";

const CarreraIA = ({ selectedYear }) => {
  const [races, setRaces] = useState([]);
  const [pilots, setPilots] = useState([]);
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedDriverA, setSelectedDriverA] = useState(null);
  const [selectedDriverB, setSelectedDriverB] = useState(null);
  const [result, setResult] = useState("Esperando selección...");
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (selectedYear) {
      const fetchDataByYear = async () => {
        setResult("Cargando datos...");
        try {
          const response = await fetch(`${API_URL}/data/${selectedYear}`);
          const data = await response.json();
          setRaces(data.races);
          setPilots(data.pilots);
          setSelectedRace("");
          setSelectedDriverA(null);
          setSelectedDriverB(null);
          setResult("Selecciona una carrera y dos pilotos.");
        } catch (error) {
          setResult(
            "Error al cargar los datos. Asegúrate de que la API está corriendo."
          );
          console.error("Error fetching data:", error);
        }
      };
      fetchDataByYear();
    }
  }, [selectedYear]);

  const handlePrediction = async () => {
    if (!selectedRace || !selectedDriverA || !selectedDriverB) {
      setResult("Por favor, selecciona una carrera y dos pilotos.");
      return;
    }

    if (selectedDriverA.driverId === selectedDriverB.driverId) {
      setResult("Por favor, selecciona dos pilotos diferentes.");
      return;
    }

    setLoadingPrediction(true);
    setResult("Calculando predicción...");

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raceId: parseInt(selectedRace),
          driverId_A: selectedDriverA.driverId,
          driverId_B: selectedDriverB.driverId,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setResult(`Error: ${data.error}`);
      } else {
        const probability = data.probability;
        setResult(
          `Probabilidad de que ${selectedDriverB.forename} ${selectedDriverB.surname} adelante a ${selectedDriverA.forename} ${selectedDriverA.surname}: ${(
            probability * 100
          ).toFixed(2)}%`
        );
      }
    } catch (error) {
      setResult("Error al conectar con la API.");
      console.error("Error:", error);
    } finally {
      setLoadingPrediction(false);
    }
  };

  const handleDriverSelect = driver => {
    if (selectedDriverA?.driverId === driver.driverId) {
      setSelectedDriverA(null);
    } else if (selectedDriverB?.driverId === driver.driverId) {
      setSelectedDriverB(null);
    } else if (!selectedDriverA) {
      setSelectedDriverA(driver);
    } else if (!selectedDriverB) {
      setSelectedDriverB(driver);
    } else {
      setSelectedDriverA(driver);
      setSelectedDriverB(null);
    }
  };

  const scrollCarousel = direction => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Container className="carrera-ia-container py-4">
      <Card className="bg-dark text-white shadow-lg">
        <Card.Body>
          <Row className="mb-1">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Selecciona una Carrera:</Form.Label>

                <Form.Select
                  value={selectedRace}
                  onChange={e => setSelectedRace(e.target.value)}
                  className="bg-secondary text-white border-secondary"
                  disabled={!selectedYear}
                >
                  <option value="">-- Selecciona una carrera --</option>

                  {races.map(race => (
                    <option key={race.raceId} value={race.raceId}>
                      {race.year} - {race.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          {/* Carrusel de pilotos */}
          <div className="carousel-container mb-4">
            <Button
              className="carousel-nav-btn left"
              onClick={() => scrollCarousel("left")}
            >
              <FaChevronLeft />
            </Button>

            <div
              className="driver-cards-container d-flex flex-nowrap gap-3 py-2"
              ref={carouselRef}
            >
              {pilots.map(driver => (
                <Card
                  className={`driver-card bg-secondary text-white shadow-sm ${
                    (selectedDriverA &&
                      selectedDriverA.driverId === driver.driverId) ||
                    (selectedDriverB &&
                      selectedDriverB.driverId === driver.driverId)
                      ? "selected-driver"
                      : ""
                  }`}
                  key={driver.driverId}
                  onClick={() => handleDriverSelect(driver)}
                  style={{
                    minWidth: "150px",
                    background: `linear-gradient(to bottom, ${
                      TEAM_COLORS[driver.constructor_name]
                    }, #000000)`,
                    cursor: "pointer",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={DRIVER_IMAGES[`${driver.forename} ${driver.surname}`]}
                    alt={`${driver.forename} ${driver.surname}`}
                    className="driver-image-carousel"
                  />

                  <Card.Body className="p-2 text-center">
                    <Card.Text className="driver-name-text">
                      {`${driver.forename} ${driver.surname}`}
                    </Card.Text>

                    <Card.Text className="driver-team-text">
                      {driver.constructor_name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>

            <Button
              className="carousel-nav-btn right"
              onClick={() => scrollCarousel("right")}
            >
              <FaChevronRight />
            </Button>
          </div>

          <Row className="piloto-selection g-3 mb-4">
            <Col md={6}>
              <Card className="bg-secondary text-white text-center h-100">
                <Card.Header as="h5">Piloto A</Card.Header>

                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  {selectedDriverA ? (
                    <>
                      <img
                        src={
                          DRIVER_IMAGES[
                            `${selectedDriverA.forename} ${selectedDriverA.surname}`
                          ]
                        }
                        alt={`${selectedDriverA.forename} ${selectedDriverA.surname}`}
                        className="selected-driver-image mb-2"
                      />

                      <Card.Text className="lead">{`${selectedDriverA.forename} ${selectedDriverA.surname}`}</Card.Text>
                    </>
                  ) : (
                    <Card.Text>Selecciona un Piloto A</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="bg-secondary text-white text-center h-100">
                <Card.Header as="h5">Piloto B</Card.Header>

                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  {selectedDriverB ? (
                    <>
                      <img
                        src={
                          DRIVER_IMAGES[
                            `${selectedDriverB.forename} ${selectedDriverB.surname}`
                          ]
                        }
                        alt={`${selectedDriverB.forename} ${selectedDriverB.surname}`}
                        className="selected-driver-image mb-2"
                      />

                      <Card.Text className="lead">{`${selectedDriverB.forename} ${selectedDriverB.surname}`}</Card.Text>
                    </>
                  ) : (
                    <Card.Text>Selecciona un Piloto B</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Button
            onClick={handlePrediction}
            variant="danger"
            className="w-100 mb-4"
            disabled={loadingPrediction}
          >
            {loadingPrediction ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Predecir Adelantamiento"
            )}
          </Button>

          {result && (
            <Alert
              variant={
                result.includes("Error")
                  ? "danger"
                  : result.includes("Probabilidad") &&
                    parseFloat(result.split(":")[1]) > 50
                  ? "success"
                  : "info"
              }
              className="text-center"
            >
              <p className="lead m-0">{result}</p>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CarreraIA;
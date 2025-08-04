import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Pilotos.css"; // Mantenemos el archivo para las animaciones y estilos específicos
import { Container, Row, Col, Spinner } from "react-bootstrap"; // Importamos componentes de Bootstrap

// Datos de los pilotos (simulados, estos se cargarían de la API)
const f1PilotsOriginal = [
  {
    firstName: "Charles",
    lastName: "Leclerc",
    team: "Scuderia Ferrari",
    wins: 5,
    races: 125,
    points: 1042,
    driverImage: "/Pilotos/leclerc.png",
    carImage: "/cars/2025ferraricarright.webp",
    primaryColor: "#E10600",
    logo: "/Pilotos/2025ferrarilogowhite.png",
  },
  {
    firstName: "Lewis",
    lastName: "Hamilton",
    team: "Mercedes-AMG F1",
    wins: 103,
    races: 332,
    points: 4639.5,
    driverImage: "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9oYW0ucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
    carImage: "/cars/2025mercedescarright.webp",
    primaryColor: "#00A99D",
    logo: "/Pilotos/2025mercedeslogowhite.webp",
  },
  {
    firstName: "Max",
    lastName: "Verstappen",
    team: "Oracle Red Bull Racing",
    wins: 61,
    races: 195,
    points: 2901,
    driverImage: "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS92ZXIucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
    carImage: "/cars/2025redbullracingcarright.webp",
    primaryColor: "#0600EF",
    logo: "/Pilotos/2025racingbullslogowhite.png",
  },
  {
    firstName: "Lando",
    lastName: "Norris",
    team: "McLaren F1 Team",
    wins: 1,
    races: 115,
    points: 846,
    driverImage: "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9ub3IucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
    carImage: "/cars/2025mclarencarright.webp",
    primaryColor: "#FF8700",
    logo: "/Pilotos/2025mclarenlogowhite.webp",
  },
  {
    firstName: "Fernando",
    lastName: "Alonso",
    team: "Aston Martin F1 Team",
    wins: 32,
    races: 390,
    points: 2307,
    driverImage: "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9hbG8ucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
    carImage: "/cars/2025astonmartincarright.webp",
    primaryColor: "#006F62",
    logo: "/Pilotos/2025astonmartinlogowhite.webp",
  },
];


function Pilotos() {
    const [pilots, setPilots] = useState(f1PilotsOriginal);
    const [currentPilotIndex, setCurrentPilotIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transitioning, setTransitioning] = useState(false);

  // Lógica para cargar datos desde la API
  useEffect(() => {
    // La API de Ergast proporciona datos históricos.
    // Usaremos un endpoint para obtener los datos de los conductores.
    // URL de ejemplo para la temporada 2024: http://ergast.com/api/f1/2024/drivers.json
    // La API de Ergast proporciona datos de pilotos, equipos y resultados.
    // Para obtener todos los pilotos de una temporada, se puede usar `GET /{year}/drivers.json`.
    // También se puede obtener información de un piloto específico con `GET /drivers/{driverId}.json`.
    const fetchPilots = async () => {
      try {
        const response = await fetch("http://ergast.com/api/f1/2024/drivers.json");
        if (!response.ok) {
          throw new Error("No se pudo cargar los datos de los pilotos.");
        }
        const data = await response.json();
        const drivers = data.MRData.DriverTable.Drivers.map(driver => ({
          firstName: driver.givenName,
          lastName: driver.familyName,
          driverId: driver.driverId,
          // Aquí puedes agregar más campos si la API los proporciona
          // o mapearlos a tus datos hardcodeados
        }));
        setPilots(drivers);
        setError(null);
      } catch (e) {
        console.error("Error al cargar pilotos:", e);
        setError("Error al cargar los pilotos. Mostrando datos locales.");
        setPilots(f1PilotsOriginal); // Fallback a los datos locales
      } finally {
        setLoading(false);
      }
    };
    // fetchPilots();
    // Por ahora, solo usaremos los datos hardcodeados para que el componente funcione
    // Si quieres usar la API, descomenta la línea fetchPilots() y borra la siguiente
    setPilots(f1PilotsOriginal);
    setLoading(false);
  }, []);

  const handleNext = () => {
    if (transitioning || pilots.length === 0) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPilotIndex((prevIndex) => (prevIndex + 1) % pilots.length);
      setTransitioning(false);
    }, 900);
  };

  const handlePrev = () => {
    if (transitioning || pilots.length === 0) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPilotIndex((prevIndex) => (prevIndex - 1 + pilots.length) % pilots.length);
      setTransitioning(false);
    }, 900);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  if (error) {
    // Manejo de error simple, se puede mejorar
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100 text-white">
        <p>{error}</p>
      </Container>
    );
  }

  const pilot = pilots[currentPilotIndex];

  return (
    <Container
      fluid
      className="pilotos-ejemplo-1 d-flex justify-content-center align-items-center"
      style={{ '--primary-color': pilot.primaryColor }}
    >
      <div 
        className={`pilotos-content ${transitioning ? 'pilotos-exit' : ''}`}
        style={{
          backgroundImage: `url(${pilot.logo})`,
        }}
      >
        <div className={`left-content ${transitioning ? 'content-exit' : 'content-enter'}`}>
          <p className="team-name">{pilot.team}</p>
          <h1 className="pilot-name">{pilot.firstName} {pilot.lastName}</h1>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{pilot.wins}</span>
              <span className="stat-label">Victorias</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{pilot.races}</span>
              <span className="stat-label">Carreras</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{pilot.points}</span>
              <span className="stat-label">Puntos</span>
            </div>
          </div>
        </div>
        <div className={`right-content ${transitioning ? 'content-exit' : 'content-enter'}`}>
          <img 
            src={pilot.driverImage} 
            alt={pilot.name} 
            className={`driver-image ${transitioning ? 'pilot-exit-active' : 'pilot-enter-active'}`} 
          />
          <img 
            src={pilot.carImage} 
            alt={`${pilot.team} car`} 
            className={`car-image ${transitioning ? 'car-exit-active' : 'car-enter-active'}`} 
          />
        </div>
      </div>
      <button className="nav-button prev-button" onClick={handlePrev}>
        <FaChevronLeft />
      </button>
      <button className="nav-button next-button" onClick={handleNext}>
        <FaChevronRight />
      </button>
    </Container>
  );
}

export default Pilotos;
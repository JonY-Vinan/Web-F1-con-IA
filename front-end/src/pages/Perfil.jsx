// Perfil.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Perfil.css";

const Perfil = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    username: "Usuario",
    email: "correo@example.com",
    f1Team: "Red Bull",
    favoriteDriver: "Max Verstappen",
    joinDate: "Enero 2020",
    location: "Madrid, España"
  });

  const [drivers, setDrivers] = useState([]);

  // URL para la API de los resultados de clasificación
  const API_PILOTO = `https://api.jolpi.ca/ergast/f1/2024/qualifying.json`;
  
  useEffect(() => {
    const cargarPosiciones = async () => {
      try {
        const response = await fetch(API_PILOTO);
        const data = await response.json();
        const driversData = data.MRData.RaceTable.Races[0].QualifyingResults.map(
          (result) => ({
            full_name: `${result.Driver.givenName} ${result.Driver.familyName}`,
            team_name: result.Constructor.name,
            nacionalidad: result.Driver.nationality,
            position: result.position,
            q1: result.Q1,
            q2: result.Q2,
            q3: result.Q3,
            number: result.Driver.permanentNumber,
            dateOfBirth: result.Driver.dateOfBirth
          })
        );
        setDrivers(driversData || []);
      } catch (error) {
        console.error("Error al cargar posiciones:", error);
      }
    };
  
    cargarPosiciones();
  }, [API_PILOTO]);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    if (location.state && location.state.user) {
      const user = location.state.user;
      setUserData({
        username: user.nombre || user.username,
        email: user.email,
        f1Team: "Red Bull",
        favoriteDriver: "Max Verstappen",
        joinDate: "Enero 2020",
        location: "Madrid, España"
      });
      localStorage.setItem('usuarioActual', JSON.stringify(user));
    } else {
      const usuarioGuardado = localStorage.getItem('usuarioActual');
      if (usuarioGuardado) {
        const user = JSON.parse(usuarioGuardado);
        setUserData({
          username: user.nombre || user.username,
          email: user.email,
          f1Team: "Red Bull",
          favoriteDriver: "Max Verstappen",
          joinDate: "Enero 2020",
          location: "Madrid, España"
        });
      }
    }
  }, [location.state]);

  const teamStats = {
    position: 1,
    points: 512,
    wins: 8,
    podiums: 20,
    poles: 6,
    fastestLaps: 8,
    dnf: 2
  };

  const driverStats = {
    position: 1,
    points: 345,
    wins: 7,
    podiums: 12,
    fastestLaps: 5,
    qualifyingBattles: "10-2"
  };

  const nextRaces = [
    { name: "GP de España", date: "23 Jun 2024", circuit: "Barcelona-Catalunya" },
    { name: "GP de Austria", date: "30 Jun 2024", circuit: "Red Bull Ring" },
    { name: "GP de Gran Bretaña", date: "07 Jul 2024", circuit: "Silverstone" }
  ];

  const newsItems = [
    { title: "Red Bull presenta RB20", excerpt: "El equipo revela su nuevo monoplaza para 2024.", date: "15 Feb 2024" },
    { title: "Verstappen habla sobre la pretemporada", excerpt: "El campeón mundial comparte sus impresiones.", date: "20 Feb 2024" }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="profile-content">
            <div className="user-card">
              <div className="user-header">
                {userData && userData.f1Team && (
                  <div className={`team-logo ${userData.f1Team.toLowerCase().replace(/\s/g, '')}`}></div>
                )}
                <h2>{userData.username}</h2>
                <p>Fan de {userData.f1Team}</p>
              </div>
              <div className="user-details">
                <div className="detail-item">
                  <span>Email</span>
                  <p>{userData.email}</p>
                </div>
                <div className="detail-item">
                  <span>Miembro desde</span>
                  <p>{userData.joinDate}</p>
                </div>
                <div className="detail-item">
                  <span>Ubicación</span>
                  <p>{userData.location}</p>
                </div>
                <div className="detail-item">
                  <span>Piloto favorito</span>
                  <p>{userData.favoriteDriver}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="team-content">
            <div className="stats-grid">
              {Object.entries(teamStats).map(([key, value]) => (
                <div key={key} className="stat-card">
                  <div className="stat-value">{value}</div>
                  <div className="stat-label">{key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>
            <div className="team-news">
              <h3>Últimas noticias del equipo</h3>
              {newsItems.map((news, index) => (
                <div key={index} className="news-item">
                  <span className="news-date">{news.date}</span>
                  <h4>{news.title}</h4>
                  <p>{news.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'driver':
        return (
          <div className="driver-content">
            <div className="driver-profile">
              <div className="driver-image-perfil"></div>
              <div className="driver-info">
                <h3>{userData.favoriteDriver}</h3>
                <p>Piloto de {userData.f1Team}</p>
              </div>
            </div>
            <div className="stats-grid">
              {Object.entries(driverStats).map(([key, value]) => (
                <div key={key} className="stat-card">
                  <div className="stat-value">{value}</div>
                  <div className="stat-label">{key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'pilotos':
        return (
          <div className="pilotos-content">
            <h3>Resultados de Clasificación 2024</h3>
            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover mt-3">
                <thead>
                  <tr>
                    <th>Posición</th>
                    <th>Piloto</th>
                    <th>Equipo</th>
                    <th>Q1</th>
                    <th>Q2</th>
                    <th>Q3</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((driver, index) => (
                    <tr key={index}>
                      <td>{driver.position}</td>
                      <td>{driver.full_name}</td>
                      <td>{driver.team_name}</td>
                      <td>{driver.q1}</td>
                      <td>{driver.q2}</td>
                      <td>{driver.q3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="calendar-content">
            <div className="race-list">
              {nextRaces.map((race, index) => (
                <div key={index} className="race-card">
                  <div className="race-date">{race.date}</div>
                  <div className="race-info">
                    <h4>{race.name}</h4>
                    <p>{race.circuit}</p>
                  </div>
                  <button className="reminder-btn">+ Recordatorio</button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="cards-container">
      <header className="cards-header">
        <h1>Mi Cuenta F1</h1>
        <p>Bienvenido a tu centro de control personalizado</p>
      </header>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Perfil
        </button>
        <button
          className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          Mi Equipo
        </button>
        <button
          className={`tab-btn ${activeTab === 'driver' ? 'active' : ''}`}
          onClick={() => setActiveTab('driver')}
        >
          Mi Piloto
        </button>
        <button
          className={`tab-btn ${activeTab === 'pilotos' ? 'active' : ''}`}
          onClick={() => setActiveTab('pilotos')}
        >
          Pilotos
        </button>
        <button
          className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          Calendario
        </button>
      </div>
      
      <main className="main-content">
        {renderTabContent()}
      </main>

      <h3 className="mt-5">Próximas Carreras</h3>
      <div id="raceCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          {nextRaces.map((race, idx) => (
            <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
              <div className="d-block w-100 p-4 bg-light text-center rounded">
                <h4>{race.name}</h4>
                <p>{race.date} - {race.circuit}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#raceCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#raceCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
};

export default Perfil;
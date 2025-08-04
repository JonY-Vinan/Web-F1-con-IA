import React, { useState, useEffect } from 'react';
import './PointsConstructorsSelector.css';

const API_URL = 'https://api.jolpi.ca/ergast/f1/2024/constructorstandings.json';
const F1_LOGO_URL = "https://www.formula1.com/content/dam/fom-website/2024/homepage-2024/Homepage-Global-F1-Logo.png.transform/1col/image.png";

// Lista de logos de los equipos, ya que la API no los proporciona.
// Se asocian por el 'constructorId' de la API.
const teamLogos = {
  'mercedes': 'https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9iZWFyLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwfX19',
  'red_bull': 'https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9iZWFyLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwfX19',
  'ferrari': 'https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9iZWFyLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwfX19',
  'mclaren': 'https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9iZWFyLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwfX19',
  'aston_martin': 'https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9iZWFyLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwfX19',
  'haas': 'https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9iZWFyLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwfX19',
  'rb': 'https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9iZWFyLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwfX19',
  'sauber': 'https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9iZWFyLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwfX19',
  'williams': 'https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9iZWFyLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwfX19'
};

const PointsConstructorsSelector = ({onTeamSelect } ) => {
  const [standings, setStandings] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const standingsData = data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
        setStandings(standingsData);
        // Selecciona el primer equipo por defecto y lo notifica al padre
        if (standingsData.length > 0) {
          setSelectedTeam(standingsData[0]);
          onTeamSelect(standingsData[0].Constructor.constructorId);
        }
      } catch (error) {
        console.error("Error fetching constructor standings:", error);
      }
    };
    fetchStandings();
  }, [onTeamSelect]);

  
  const handleTeamChange = (event) => {
    const teamId = event.target.value;
    const team = standings.find(s => s.Constructor.constructorId === teamId);
    setSelectedTeam(team);
    onTeamSelect(teamId); // Llama a la función del padre para actualizar el estado
  };

  const currentLogoSrc = selectedTeam?.Constructor.constructorId
    ? teamLogos[selectedTeam.Constructor.constructorId]
    : F1_LOGO_URL;

  return (
    <div className="constructor-container">
      <div className="image-section">
        <img
          src={currentLogoSrc}
          alt={selectedTeam ? `${selectedTeam.Constructor.name} Logo` : 'Formula 1 Logo'}
          className="dynamic-logo"
        />
      </div>

      <div className="stats-section">
        <div className="stats-item">
          <p className="stats-label">Posición de constructores:</p>
          <span className="stats-value">{selectedTeam?.position || '--'}</span>
        </div>
        <hr className="separator" />
        <div className="stats-item">
          <p className="stats-label">Puntos en total de constructores:</p>
          <span className="stats-value">{selectedTeam?.points || '--'}</span>
        </div>
      </div>

      <div className="team-selector-container">
        <label htmlFor="team-select" className="visually-hidden">Selecciona un equipo:</label>
        <select
          id="team-select"
          className="team-select"
          value={selectedTeam?.Constructor.constructorId || ''}
          onChange={handleTeamChange}
        >
          {standings.map(s => (
            <option key={s.Constructor.constructorId} value={s.Constructor.constructorId}>
              {s.Constructor.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PointsConstructorsSelector;
import React, { useState } from "react";
import "./Escuderia.css";

const f1Teams = [
  {
    name: "Scuderia Ferrari",
    carModel: "SF-25",
    drivers: ["Charles Leclerc", "Carlos Sainz"],
    logo: "https://www.klipartz.com/es/sticker-png-rywcs",
    carImage: "/cars/ferrari25.jpg",
    primaryColor: "#E10600",
    secondaryColor: "#7c0000",
  },
  {
    name: "Mercedes-AMG F1",
    carModel: "W15 E Performance",
    drivers: ["Lewis Hamilton", "George Russell"],
    logo: "/cars/mercedes25.png",
    carImage: "/cars/mercedes25.png",
    primaryColor: "#00A99D",
    secondaryColor: "#005a5a",
  },
  {
    name: "Oracle Red Bull Racing",
    carModel: "RB20",
    drivers: ["Max Verstappen", "Sergio Pérez"],
    logo: "https://www.formula1.com/content/dam/fom-website/teams/red-bull-racing.png",
    carImage: "/cars/redbull25.webp",
    primaryColor: "#0600EF",
    secondaryColor: "#00008b",
  },
  {
    name: "McLaren F1 Team",
    carModel: "MCL38",
    drivers: ["Lando Norris", "Oscar Piastri"],
    logo: "https://www.formula1.com/content/dam/fom-website/teams/mclaren.png",
    carImage: "/cars/mclaren25.jpg",
    primaryColor: "#FF8700",
    secondaryColor: "#cc6600",
  },
  {
    name: "Aston Martin F1 Team",
    carModel: "AMR24",
    drivers: ["Fernando Alonso", "Lance Stroll"],
    logo: "https://www.formula1.com/content/dam/fom-website/teams/aston-martin.png",
    carImage: "https://www.formula1.com/content/dam/fom-website/teams/2024/aston-martin/car-launch-fom/AMR24-car-launch.jpg",
    primaryColor: "#006F62",
    secondaryColor: "#004d41",
  },
  {
    name: "Alpine F1 Team",
    carModel: "A524",
    drivers: ["Pierre Gasly", "Esteban Ocon"],
    logo: "https://www.formula1.com/content/dam/fom-website/teams/alpine.png",
    carImage: "https://www.formula1.com/content/dam/fom-website/teams/2024/alpine/car-launch-fom/A524-car-launch.jpg",
    primaryColor: "#005BA9",
    secondaryColor: "#003a72",
  },
  {
    name: "Haas F1 Team",
    carModel: "VF-24",
    drivers: ["Kevin Magnussen", "Nico Hülkenberg"],
    logo: "https://www.formula1.com/content/dam/fom-website/teams/haas-f1-team.png",
    carImage: "https://www.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team/car-launch-fom/VF-24-car-launch.jpg",
    primaryColor: "#B6BABD",
    secondaryColor: "#8d8d8d",
  },
  {
    name: "Visa Cash App RB F1 Team",
    carModel: "VCARB 01",
    drivers: ["Yuki Tsunoda", "Daniel Ricciardo"],
    logo: "https://www.formula1.com/content/dam/fom-website/teams/visa-cash-app-rb.png",
    carImage: "https://www.formula1.com/content/dam/fom-website/teams/2024/visa-cash-app-rb/car-launch-fom/VCARB01-car-launch.jpg",
    primaryColor: "#003666",
    secondaryColor: "#001e3b",
  },
  {
    name: "Stake F1 Team Kick Sauber",
    carModel: "C44",
    drivers: ["Valtteri Bottas", "Zhou Guanyu"],
    logo: "https://www.formula1.com/content/dam/fom-website/teams/sauber.png",
    carImage: "https://www.formula1.com/content/dam/fom-website/teams/2024/kick-sauber/car-launch-fom/C44-car-launch.jpg",
    primaryColor: "#52E252",
    secondaryColor: "#359635",
  },
  {
    name: "Williams Racing",
    carModel: "FW46",
    drivers: ["Alex Albon", "Logan Sargeant"],
    logo: "https://www.formula1.com/content/dam/fom-website/teams/williams.png",
    carImage: "https://www.formula1.com/content/dam/fom-website/teams/2024/williams/car-launch-fom/FW46-car-launch.jpg",
    primaryColor: "#005A92",
    secondaryColor: "#00385e",
  },
];

function Escuderia() {
  const [selectedTeam, setSelectedTeam] = useState(f1Teams[0]);

  return (
    <>
      <div
        className="escuderia-container"
        style={{
          '--primary-color': selectedTeam.primaryColor,
          '--secondary-color': selectedTeam.secondaryColor,
          '--background-image': `url(${selectedTeam.carImage})`,
        }}
      >
        <div className="left-side-content">
          <div className="team-info">
            <div className="logo-section">
              <img
                src={selectedTeam.logo}
                alt={`${selectedTeam.name} Logo`}
                className="team-logo"
              />
              <h2 className="team-name">{selectedTeam.name}</h2>
              <p className="car-model">{selectedTeam.carModel}</p>
            </div>
            <div className="drivers-section">
              <h3 className="drivers-title">Pilotos</h3>
              <ul className="drivers-list">
                {selectedTeam.drivers.map((driver, index) => (
                  <li key={index}>
                    <span className="driver-icon"></span> {driver}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div 
          className="right-side-image" 
        >
          {/* Aquí se eliminó la etiqueta <img> para usarla como fondo */}
        </div>
      </div>
      <div className="team-buttons-container">
        {f1Teams.map((team, index) => (
          <button
            key={index}
            className={`team-button ${selectedTeam.name === team.name ? 'active' : ''}`}
            onClick={() => setSelectedTeam(team)}
            style={{ '--team-color': team.primaryColor, backgroundImage: `url(${team.logo})` }}
            title={team.name}
          ></button>
        ))}
      </div>
    </>
  );
}

export default Escuderia;
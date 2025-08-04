import React, { useEffect, useState } from "react";
import "./ResultRacer.css";

// Mapeo de colores para los equipos de F1
const TEAM_COLORS = {
  "Red Bull": "#00008B",
  "Ferrari": "#DC0000",
  "McLaren": "#FF8700",
  "Mercedes": "#00A99D",
  "Alpine": "#00489C",
  "Aston Martin": "#006F62",
  "Kick Sauber": "#52E252",
  "Haas F1 Team": "#B6B6B6",
  "RB": "#6692FF",
  "Williams": "#005AFF",
};

// Mapeo de URLs de imágenes para cada piloto
const DRIVER_IMAGES = {
  "Max Verstappen": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS92ZXIucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Sergio Pérez": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9wZXIucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Charles Leclerc": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9sZWMucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Lando Norris": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9ub3IucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Carlos Sainz": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9zYWkucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Oscar Piastri": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9waWEucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Lewis Hamilton": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9oYW0ucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "George Russell": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9ydXNzLm5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMH19fQ==",
  "Fernando Alonso": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9hbG8ucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Lance Stroll": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9zdHIucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Alexander Albon": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9hbGIucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Yuki Tsunoda": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS90c3UucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Daniel Ricciardo": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9yaWkuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Esteban Ocon": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9vY28ucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Pierre Gasly": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9nYXMuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Valtteri Bottas": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9ib3QucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Guanyu Zhou": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS96aG91LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwfX19",
  "Nico Hülkenberg": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9odWwucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Kevin Magnussen": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9tYWcucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDB9fX0=",
  "Oliver Bearman": "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiJmMW1hbmFnZXIvMjAyNC9kcml2ZXJzL2hlYWRzaG90cy9mMS9iZWFyLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwfX19",
};


const ResultRacer = ({ idCircuito, selectedYear, onDriverClick }) => {
  const [drivers, setDrivers] = useState([]);
  const [id, setId] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (idCircuito) {
      setId(idCircuito);
    } else {
      console.log("No hay idCircuito, usando valor por defecto (1)");
    }
  }, [idCircuito]);

  useEffect(() => {
    const cargarResultados = async () => {
      setLoading(true);
      if (!id) {
        setDrivers([]);
        setLoading(false);
        return;
      }
      
      const API_URL = `https://api.jolpi.ca/ergast/f1/${selectedYear}/${id}/results.json`;

      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const driversData = data.MRData.RaceTable.Races[0]?.Results.map(
          (result) => ({
            id: result.Driver.driverId,
            full_name: `${result.Driver.givenName} ${result.Driver.familyName}`,
            team_name: result.Constructor.name,
            position: result.position,
            points: result.points,
          })
        );
        setDrivers(driversData || []);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar posiciones:", error);
        setDrivers([]);
        setLoading(false);
      }
    };

    cargarResultados();
  }, [id]);

  const p1 = drivers.find(d => d.position === "1");
  const p2 = drivers.find(d => d.position === "2");
  const p3 = drivers.find(d => d.position === "3");
  const top3Drivers = [p2, p1, p3].filter(Boolean);
  const remainingDrivers = drivers.slice(3);

 return (
    <div className="container-fluid py-3">
      {loading ? (
        <p className="text-center text-secondary">Cargando resultados...</p>
      ) : drivers.length > 0 ? (
        <>
          {/* Top 3 drivers section */}
          <div className="top3-grid mb-4">
            {top3Drivers.map((driver) => (
              <div
                className={`top-driver-card card-pos-${driver.position} mx-auto`}
                key={driver.id}
                onClick={() => onDriverClick(driver.full_name)}
                style={{
                  background: `linear-gradient(to bottom, ${TEAM_COLORS[driver.team_name]}, #000000)`,
                }}
              >
                <div className="top-driver-info">
                  <span className="top-driver-pos">{driver.position}</span>
                  <p className="top-driver-name">{driver.full_name}</p>
                  <p className="top-driver-team">{driver.team_name}</p>
                </div>
                <img
                  src={DRIVER_IMAGES[driver.full_name]}
                  alt={driver.full_name}
                  className="top-driver-image"
                />
              </div>
            ))}
          </div>

          {/* Remaining drivers list with scroll */}
          <div className="remaining-drivers-list-scrollable mt-4">
            {remainingDrivers.map((driver) => (
              <div
                className="remaining-driver-card"
                key={driver.id}
                onClick={() => onDriverClick(driver.full_name)}
                style={{ borderLeftColor: TEAM_COLORS[driver.team_name] }}
              >
                <span className="remaining-pos">{driver.position}</span>
                <div className="remaining-driver-info">
                  <p className="remaining-name">{driver.full_name}</p>
                  <span className="remaining-team">{driver.team_name}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-secondary">No se encontraron resultados para esta carrera.</p>
      )}
    </div>
  );
};

export default ResultRacer;
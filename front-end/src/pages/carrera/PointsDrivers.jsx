import React, { useEffect, useState } from "react";
import "./PointsDrivers.css";

const PointsDrivers = ({ idCircuito, selectedYear }) => {
  const [drivers, setDrivers] = useState([]);
  const [id, setId] = useState(1);
  const [loading, setLoading] = useState(true);

  // Actualiza `id` solo cuando `idCircuito` cambie
  useEffect(() => {
    if (idCircuito) {
      setId(idCircuito);
    } else {
      console.log("No hay idCircuito, usando valor por defecto (1)");
    }
  }, [idCircuito]);

  useEffect(() => {
    const cargarPosiciones = async () => {
      setLoading(true);
      if (!id) {
        setDrivers([]);
        setLoading(false);
        return;
      }
      
      const API_URL = `https://api.jolpi.ca/ergast/f1/${selectedYear}/driverstandings.json`;

      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const driversData =
          data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings?.map(
            (result) => ({
              full_name: `${result?.Driver?.givenName} ${result?.Driver?.familyName}`,
              team_name: result?.Constructors[0]?.name,
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

    cargarPosiciones();
  }, [id]);

  return (
    <div className="f1-card points-table">
      <div className="card-header-f1">
        <h6 className="card-title-f1">Clasificación de Pilotos</h6>
      </div>
      <div className="card-body-f1">
        {loading ? (
          <p className="loading-message">Cargando posiciones...</p>
        ) : drivers.length > 0 ? (
          <div className="table-responsive-scroll">
            <table className="f1-table">
              <thead>
                <tr>
                  <th className="table-header position-col">Pos</th>
                  <th className="table-header driver-col">Piloto</th>
                  <th className="table-header team-col">Equipo</th>
                  <th className="table-header points-col">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver, index) => (
                  <tr key={index} className="f1-row">
                    <td className="position-col">{driver.position}</td>
                    <td className="driver-col">
                      <span className="driver-name-f1">{driver.full_name}</span>
                    </td>
                    <td className="team-col">{driver.team_name}</td>
                    <td className="points-col">{driver.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data-message">No se encontraron datos de clasificación.</p>
        )}
      </div>
    </div>
  );
};

export default PointsDrivers;
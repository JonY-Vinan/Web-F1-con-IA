import React, { useEffect, useState } from "react";
import "./PointsConstructors.css";

const PointsConstructors = ({ idCircuito, selectedYear}) => {
  const [constructors, setConstructors] = useState([]);
  const [id, setId] = useState(1); // Valor inicial 1
  const [loading, setLoading] = useState(true);

  // Actualiza `id` solo cuando `idCircuito` cambie
  useEffect(() => {
    if (idCircuito) {
      setId(idCircuito);
    } else {
      console.log("No hay idCircuito, usando valor por defecto (1)");
    }
  }, [idCircuito]);

  const API_URL = `https://api.jolpi.ca/ergast/f1/${selectedYear}/constructorstandings.json`;

  useEffect(() => {
    const cargarPosiciones = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const constructorsData =
          data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings?.map(
            (result) => ({
              name: result?.Constructor.name,
              position: result.position,
              points: result.points,
            })
          );
        setConstructors(constructorsData || []);
      } catch (error) {
        console.error("Error al cargar posiciones:", error);
        setConstructors([]);
      } finally {
        setLoading(false);
      }
    };

    cargarPosiciones();
  }, [API_URL]);

  return (
    <div className="f1-card constructors-table">
      <div className="card-header-f1">
        <h6 className="card-title-f1">Clasificación de Constructores</h6>
      </div>
      <div className="card-body-f1">
        {loading ? (
          <p className="loading-message">Cargando posiciones...</p>
        ) : constructors.length > 0 ? (
          <div className="table-responsive-scroll">
            <table className="f1-table">
              <thead>
                <tr>
                  <th className="table-header position-col">Pos</th>
                  <th className="table-header team-name-col">Equipo</th>
                  <th className="table-header points-col">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {constructors.map((team, index) => (
                  <tr key={index} className="f1-row">
                    <td className="position-col">{team.position}</td>
                    <td className="team-name-col">{team.name}</td>
                    <td className="points-col">{team.points}</td>
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

export default PointsConstructors;
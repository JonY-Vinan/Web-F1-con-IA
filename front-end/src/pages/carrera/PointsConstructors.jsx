import React, { useEffect, useState } from "react";

const PointsConstructors = ({ idCircuito }) => {
  const [constructors, setConstructors] = useState([]);
  const [id, setId] = useState(1); // Valor inicial 1

  // Actualiza `id` solo cuando `idCircuito` cambie
  useEffect(() => {
    if (idCircuito) {
      setId(idCircuito);
    } else {
      console.log("No hay idCircuito, usando valor por defecto (1)");
    }
  }, [idCircuito]);

  const API_URL = `https://api.jolpi.ca/ergast/f1/2024/constructorstandings.json`;

  useEffect(() => {
    const cargarPosiciones = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // Asegúrate de mapear correctamente los datos de la API
        const driversData =
          data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings?.map(
            (result) => ({
              name: result?.Constructor.name,
              // team_name: result.Constructor.name,
              position: result.position,
              points: result.points,
            })
          );
        setConstructors(driversData || []);
      } catch (error) {
        console.error("Error al cargar posiciones:", error);
      }
    };

    cargarPosiciones();
  }, [API_URL]); // Dependencia: `API_URL` (que depende de `id`)

  return (
    <div className="data-card constructors-table">
      <h2>Puntos de Constructores</h2>
      <table>
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {constructors.map((team, index) => (
            <tr key={index}>
              <td>{team.name}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointsConstructors;

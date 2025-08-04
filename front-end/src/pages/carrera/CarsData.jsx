import React, { useState, useEffect } from "react";
import carsData from "./Cars.json";

const CarsData = ({idCircuito, piloto_name }) => {
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [activeSpecTab, setActiveSpecTab] = useState("engine");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedTeamData, setSelectedTeamData] = useState(null);

  const [drivers, setDrivers] = useState([]);
  const [driversTime, setDriversTime] = useState([]);
  const [id, setId] = useState(1); // Valor inicial 1       

  //https://api.jolpi.ca/ergast/f1/2025
    
    useEffect(() => {
      if (idCircuito) {
        setId(idCircuito);
      }
    }, [idCircuito]);

  const urlTiemposPiloto = `https://api.jolpi.ca/ergast/f1/2024/qualifying.json`;
  const urlQualifyingPiloto = `https://api.jolpi.ca/ergast/f1/2024/qualifying.json`;    

  useEffect(() =>{
    const cargarDatos = async ( ) =>{
       try {
        const response = await fetch(urlTiemposPiloto);
        const data = await response.json();
        // Asegúrate de mapear correctamente los datos de la API
        const driversTime =
          data.MRData.RaceTable.Race[0].Results?.map(
            (result) => ({
              full_name: `${result?.Driver?.givenName} ${result?.Driver?.familyName}`,
              team_name: result?.Constructors[0]?.name,
              position: result.position,
              points: result.points,
            })
          );
         const responseQ = await fetch(urlQualifyingPiloto);
        const dataQ = await responseQ.json();
        const driversQualify =
        dataQ.MRData.RaceTable.Race[0]?.QualifyingResults?.map(
            (result) => ({
            full_name: `${result?.Driver?.givenName} ${result?.Driver?.familyName}`,
            team_name: result?.Constructors[0]?.name,
            position: result.position,
            points: result.points,
            })
        );
        setDrivers(driversTime || []);
        setDriversTime(driversQualify || []);
      } catch (error) {
        console.error("Error al cargar posiciones:", error);
        setDrivers([]);
      }


    }
    cargarDatos();
  },[id])

  useEffect(() => {
    if (piloto_name) {
      // Buscar el piloto en todos los equipos
      for (const team of carsData.teams) {
        const driver = team.drivers.find((d) => {
          const fullName = `${d.givenName || ""} ${d.familyName || ""}`.trim();
          return fullName === piloto_name || d.name === piloto_name;
        });

        if (driver) {
          setSelectedDriver(driver);
          setSelectedTeamData(team);
          setSelectedTeam(carsData.teams.indexOf(team));
          break;
        }
      }
    }
  }, [piloto_name]);

  // Si no hay piloto seleccionado, usar el primer piloto del equipo seleccionado
  const team = selectedTeamData || carsData.teams[selectedTeam];
  const car = team?.car;
  const driverToShow =
    selectedDriver || (team?.drivers?.length > 0 ? team.drivers[0] : null);

  if (!team || !car || !driverToShow) {
    return <div className="container mt-4">Cargando datos del coche...</div>;
  }

  return (
    <div className="container">
      {/* Selector de equipo */}
      {/* <div className="mb-4">
        <label htmlFor="team-select" className="form-label">Selecciona un equipo:</label>
        <select 
          id="team-select" 
          className="form-select"
          value={selectedTeam}
          onChange={(e) => {
            const newIndex = parseInt(e.target.value);
            setSelectedTeam(newIndex);
            setSelectedTeamData(null);
            setSelectedDriver(null);
          }}
        >
          {carsData.teams.map((team, index) => (
            <option key={index} value={index}>
              {team.name}
            </option>
          ))}
        </select>
      </div> */}

      {/* Tarjeta del coche */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-danger text-white">
          <h3 className="m-0">
            {car.model} - {team.name}
          </h3>
          <p className="m-0">
            <small>
              Base: {team.base} | Jefe de equipo: {team.team_principal}
            </small>
          </p>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <div className="text-center mb-3">
                <img
                  src={car.image_url}
                  alt={`${car.model} de ${team.name}`}
                  className="img-fluid rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "./Cars/2025alpinecarright.webp";
                  }}
                />
                {/* <div className="mt-2">
                  <span className="fw-bold me-2">Color:</span>
                  <span
                    className="d-inline-block rounded-circle me-2"
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: car.color_code,
                      verticalAlign: "middle",
                    }}
                  ></span>
                  <span>{car.color}</span>
                </div> */}
              </div>
            </div>
            {/* Pilotos */}
            {/* <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="m-0">Pilotos</h5>
              </div>
              <div className="list-group list-group-flush">
                <div className="list-group-item">
                  <div className="fw-bold">
                    #{driverToShow.number} {driverToShow.givenName}{" "}
                    {driverToShow.familyName}
                  </div>
                  <div className="small">
                    Nacionalidad: {driverToShow.nationality}
                    <br />
                    Fecha de nacimiento: {driverToShow.date_of_birth}
                    <br />
                    Campeonatos: {driverToShow.world_championships}
                    <br />
                    Podios: {driverToShow.podiums}
                    <br />
                    Puntos: {driverToShow.points}
                    <br />
                    Carreras: {driverToShow.grands_prix_entered}
                    <br />
                    Mejor resultado: {driverToShow.highest_race_finish}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        
          {/* Mejores vueltas */}
          {car.best_laps?.length > 0 && (
            <div className="mt-4">
              <h4>Mejores Tiempos</h4>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Circuito</th>
                      <th>Longitud</th>
                      <th>Mejor tiempo</th>
                      <th>Velocidad máxima</th>
                    </tr>
                  </thead>
                  <tbody>
                    {car.best_laps.map((lap, index) => (
                      <tr key={index}>
                        <td>{lap.circuit}</td>
                        <td>{lap.circuit_length}</td>
                        <td>{lap.best_lap_time}</td>
                        <td>{lap.top_speed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarsData;
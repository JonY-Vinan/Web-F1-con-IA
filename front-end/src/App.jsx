// front-end/src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamCountry, setNewTeamCountry] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = 'http://localhost:5000'; // URL de tu backend Flask

  // Función para obtener las escuderías
  const fetchTeams = async () => {
    try {
      const response = await fetch(`${API_URL}/teams`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Error al obtener las escuderías:", error);
      setError("No se pudieron cargar las escuderías. Asegúrate de que el backend esté funcionando.");
    }
  };

  // Cargar las escuderías al montar el componente
  useEffect(() => {
    fetchTeams();
  }, []);

  // Función para añadir una nueva escudería
  const handleAddTeam = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!newTeamName || !newTeamCountry) {
      setError('Por favor, ingresa el nombre y el país de la escudería.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTeamName, country: newTeamCountry }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const addedTeam = await response.json();
      setTeams([...teams, addedTeam]);
      setNewTeamName('');
      setNewTeamCountry('');
      setMessage('Escudería añadida con éxito!');
    } catch (error) {
      console.error("Error al añadir la escudería:", error);
      setError(`Error al añadir la escudería: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Gestión de Escuderías de Fórmula 1</h1>

      <div className="form-section">
        <h2>Añadir Nueva Escudería</h2>
        <form onSubmit={handleAddTeam}>
          <input
            type="text"
            placeholder="Nombre de la escudería"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
          <input
            type="text"
            placeholder="País de origen"
            value={newTeamCountry}
            onChange={(e) => setNewTeamCountry(e.target.value)}
          />
          <button type="submit">Añadir Escudería</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </div>

      <div className="teams-list-section">
        <h2>Lista de Escuderías</h2>
        {teams.length === 0 && !error ? (
          <p>Cargando escuderías o no hay ninguna todavía...</p>
        ) : (
          <ul>
            {teams.map((team) => (
              <li key={team.id}>
                <strong>{team.name}</strong> ({team.country})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
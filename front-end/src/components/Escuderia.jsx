// front-end/src/Escuderia.jsx
import { useState, useEffect } from 'react';
import '../components/Escuderia.css'; // Importa el nuevo CSS

function Escuderia() { // Cambia el nombre de la función a Escuderia
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
    <div className="container mx-auto p-4"> 
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Gestión de Escuderías de Fórmula 1</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">  
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Añadir Nueva Escudería</h2>
        <form onSubmit={handleAddTeam} className="flex flex-col items-center space-y-4"> 
          <input
            type="text"
            placeholder="Nombre de la escudería"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full max-w-sm"  
          />
          <input
            type="text"
            placeholder="País de origen"
            value={newTeamCountry}
            onChange={(e) => setNewTeamCountry(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full max-w-sm" 
          />
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"> 
            Añadir Escudería
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}  
        {message && <p className="text-green-600 mt-4">{message}</p>} 
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md"> 
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lista de Escuderías</h2>
        {teams.length === 0 && !error ? (
          <p className="text-gray-500">Cargando escuderías o no hay ninguna todavía...</p>  
        ) : (
          <ul className="space-y-3">  
            {teams.map((team) => (
              <li key={team.id} className="bg-blue-50 border border-blue-200 rounded-md p-3 flex justify-center items-center text-lg">  
                <strong className="text-blue-800">{team.name}</strong> <span className="ml-2 text-gray-600">({team.country})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Escuderia;
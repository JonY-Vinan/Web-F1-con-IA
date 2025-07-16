import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa los componentes necesarios
import Escuderia from './components/Escuderia';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar"; // Asegúrate de importar Navbar

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/escuderia" element={<Escuderia />} />
        {/* 
        <Route path="/pilotos" element={<Pilotos />} />
        <Route path="/coches" element={<Coches />} />
        <Route path="/circuitos" element={<Circuitos />} />
        <Route path="/perfil" element={<Perfil />} /> 
        */}
      </Routes>
    </Router>
    
    // <div className="app-container">
    //   {/* Navbar */}
    //   <nav className="navbar">
    //     <div className="navbar-container">
    //       <a href="#" className="navbar-logo">Formula 1 App</a>
          
    //       {/* Menú principal */}
    //       <div className="navbar-menu">
    //         <a href="#" className="menu-item">Home</a>
    //         <a href="#" className="menu-item">Pilotos</a>
    //         <a href="#" className="menu-item">Escuderias</a>
    //         <a href="#" className="menu-item">Temporada</a>
    //       </div>
          
    //       {/* Lado derecho - Acciones */}
    //       <div className="navbar-actions">
    //         <a href="#" className="action-link">Log in</a>
    //         <a href="#" className="action-button">Sign up</a>
           
    //       </div>
    //     </div>
    //   </nav>

    //   {/* Contenido de la aplicación */}
    //   <main className="main-content">
    //     <Escuderia />
    //   </main>
    // </div>
  );
}

export default App;
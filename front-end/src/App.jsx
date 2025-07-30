// App.jsx
import "./App.css"; // Se mantiene, aunque su impacto es menor con Bootstrap
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Escuderia from "./pages/Escuderia";
import Pilotos from "./pages/Pilotos";
import Circuitos from "./pages/Circuitos";

function App() {
  return (
    <Router>
      {/* El Navbar ahora es fijo/absolute, por lo que el contenido debe estar debajo.
          Home.jsx ahora incluye sus propios paddings para centrar el contenido. */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Descomenta estas rutas a medida que vayas creando los componentes/páginas */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/escuderia" element={<Escuderia />} />
        <Route path="/pilotos" element={<Pilotos />} />
        <Route path="/circuitos" element={<Circuitos />} />
      </Routes>
    </Router>
  );
}

export default App;

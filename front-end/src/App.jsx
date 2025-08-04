import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Pilotos from "./pages/Pilotos";
import Circuitos from "./pages/Circuitos";

// Puedes mantener el import de App.css si lo necesitas para estilos globales no cubiertos por Bootstrap
// import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mi_cuenta" element={<Perfil />} />
          {/* <Route path="/escuderia" element={<Escuderia />} /> */}
          <Route path="/pilotos" element={<Pilotos />} />
          <Route path="/circuitos" element={<Circuitos />} />
        </Routes>
    </Router>
  );
}

export default App;
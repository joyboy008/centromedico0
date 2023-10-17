import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/App.css";

//                                  npm start
// npm install --save react-router-dom ---> este comando es para instalar los routers
// Importar Componentes

// import Header from "./components/Header";
// import Slider from "./components/Slider";
// import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";
// import SeccionPruebas from "./components/SeccionPruebas";
// import Peliculas from "./components/Peliculas";
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <Router />
      {/* <Peliculas /> */}
    </div>
  );
}

export default App;

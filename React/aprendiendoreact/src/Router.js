import React, { Component } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import SeccionPruebas from "./components/SeccionPruebas";
import MiComponente from "./components/MiComponente";
import Peliculas from "./components/Peliculas";
import Error from "./components/error";
import Header from "./components/Header";
//import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Slider from "./components/Slider";
import Sidebar from "./components/Sidebar";
import Blog from "./components/Blog";
import Agendar from "./components/Agendar";
import Pacientes from "./components/Pacientes";
import Formulario from "./components/Formulario";
import Contacto from "./components/Contacto";
import FormularioPacienteAdicional from "./components/FormularioPacienteAdicional";

// CONFIGURAR RUTAS Y PAGINAS
class Router extends Component {
  render() {
    var buttonString = "Ver más";

    function PruebaParametros() {
      let params = useParams();
      let { apellido } = useParams();
      let siApellidos = null;

      if (apellido) {
        siApellidos = (
          <h2 className="subheader">Prueba obtener apellidos: {apellido}</h2>
        );
      }
      return (
        <React.Fragment>
          <Slider title="Nuestros Servicios" btn={buttonString} />
          <div className="center">
            <div id="content">
              <h2 className="subheader">
                Prueba obtener nombre: {params.nombre}
              </h2>
              {siApellidos}
            </div>
            <Sidebar />
          </div>
        </React.Fragment>
      );
    }

    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/home" Component={Home} />
          <Route exact path="/agendar-citas" Component={Agendar} />
          <Route exact path="/contacto" Component={Contacto} />
          <Route exact path="/blog" Component={Blog} />
          <Route exact path="/pacientes" Component={Pacientes} />
          <Route exact path="/login" Component={Formulario} />
          <Route
            exact
            path="/datos_adicionales"
            Component={FormularioPacienteAdicional}
          />
          <Route path="error" />
          <Route
            exact
            path="/pagina-1"
            element={
              <React.Fragment>
                <h1>Hola mundo desde la ruta /pagina-1</h1>
                <p>
                  Esta ruta tiene desarrollado <code>Javascript</code> dentro
                  del element
                </p>
                <MiComponente saludo="Dale Torero"></MiComponente>
              </React.Fragment>
            }
          />
          <Route
            exact
            path="/pruebas:id"
            element={
              <div id="content">
                <h1 className="subheader">Pagina de Pruebas</h1>
              </div>
            }
          />

          <Route
            exact
            path="/agendar-citas/:nombre"
            element={<PruebaParametros />}
          />
          <Route
            exact
            path="/agendar-citas/:nombre/:apellido"
            element={<PruebaParametros />}
          />
          <Route path="/*" element={<Error />} />
        </Routes>
        <div className="clearfix"></div>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default Router;

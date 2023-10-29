import React, { Component } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import SeccionPruebas from "./components/SeccionPruebas";
import MiComponente from "./components/MiComponente";
import Peliculas from "./components/Peliculas";
import Error from "./components/error";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Slider from "./components/Slider";
import Sidebar from "./components/Buscador";
import Blog from "./components/Blog";
import Agendar from "./pages/Agendar";
import Pacientes from "./pages/pacientes/PacientesCrear";
import Formulario from "./components/Formulario";
import Contacto from "./pages/Contacto";
import FormularioPacienteAdicional from "./components/FormularioPacienteAdicional";
import Login from "./pages/Login";
import ResponsiveExample from "./components/TablaPacientes";
import PacientesListar from "./pages/pacientes/PacientesListar";
import UsuariosListar from "./pages/usuarios/UsuariosListar";
import Usuarios from "./pages/usuarios/UsuariosCrear";
import PacientesActualizar from "./pages/pacientes/PacientesActualizar";
import UsuariosActualizar from "./pages/usuarios/UsuariosActualizar";
import ConsultaCrear from "./pages/consultas/ConsultaCrear";
import ConsultaActualizar from "./pages/consultas/ConsultaActualizar";
import api from "./utils/api";
import { json } from "react-router-dom";
import CitaCrear from "./pages/citas/CitaCrear";
import CitaListar from "./pages/citas/CitaListar";
import CitaActualizar from "./pages/citas/CitaActualizar";
import Buscador from "./components/Buscador";

var buttonString = "Ver más";
// CONFIGURAR RUTAS Y PAGINAS

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/agendar-citas",
    element: <Agendar />,
  },
  {
    path: "/contacto",
    element: <Contacto />,
  },
  {
    path: "/pacientes",
    element: <Pacientes />,
  },
  {
    path: "/pacientes-listado",
    element: <PacientesListar />,
  },
  {
    path: "/pacientes/:pacienteId",
    element: <PacientesActualizar />,

    loader: async ({ params }) => {
      const response = await api.getPaciente(params.pacienteId);
      return json(response.data, { status: 200 });
    },
  },
  {
    path: "/pacientes/:pacienteId/consulta",
    element: <ConsultaCrear />,

    loader: async ({ params }) => {
      const response = await api.getPaciente(params.pacienteId);
      return json(response.data, { status: 200 });
    },
  },
  {
    path: "/citas",
    element: <CitaCrear />,
  },
  {
    path: "/citas-listado",
    element: <CitaListar />,
  },
  {
    path: "/citas/:citaId",
    element: <CitaActualizar />,
    loader: async ({ params }) => {
      const response = await api.getCita(params.citaId);
      return json(response.data, { status: 200 });
    },
  },
  {
    path: "/pacientes/:pacienteId/consulta/:consultaId",
    element: <ConsultaActualizar />,

    loader: async ({ params }) => {
      const pacienteResponse = await api.getPaciente(params.pacienteId);
      const consultaResponse = await api.getConsulta(params.consultaId);
      return json(
        {
          paciente: pacienteResponse.data.paciente,
          consulta: consultaResponse.data.consulta,
        },
        { status: 200 }
      );
    },
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Tabla",
    element: <ResponsiveExample />,
  },
  {
    path: "/datos_adicionales",
    element: <FormularioPacienteAdicional />,
  },

  {
    path: "/usuarios",
    element: <Usuarios />,
  },
  {
    path: "/usuarios-listado",
    element: <UsuariosListar />,
  },
  {
    path: "/usuarios/:usuarioId",
    element: <UsuariosActualizar />,
    loader: async ({ params }) => {
      const response = await api.getUsuario(params.usuarioId);
      return json(response.data, { status: 200 });
    },
  },
]);
class Router extends Component {
  render() {
    return (
      // <BrowserRouter>
      //   <Header />
      //   <Routes>
      //     <Route exact path="/" Component={Home} />
      //     <Route exact path="/home" Component={Home} />
      //     <Route exact path="/agendar-citas" Component={Agendar} />
      //     <Route exact path="/contacto" Component={Contacto} />
      //     <Route exact path="/blog" Component={Blog} />
      //     <PrivateRoute exact path="/pacientes" Component={Pacientes} />
      //     <Route exact path="/login" Component={Formulario} />
      //     <Route
      //       exact
      //       path="/datos_adicionales"
      //       Component={FormularioPacienteAdicional}
      //     />
      //     <Route path="error" />
      //     <Route
      //       exact
      //       path="/pagina-1"
      //       element={
      //         <React.Fragment>
      //           <h1>Hola mundo desde la ruta /pagina-1</h1>
      //           <p>
      //             Esta ruta tiene desarrollado <code>Javascript</code> dentro
      //             del element
      //           </p>
      //           <MiComponente saludo="Dale Torero"></MiComponente>
      //         </React.Fragment>
      //       }
      //     />
      //     <Route
      //       exact
      //       path="/pruebas:id"
      //       element={
      //         <div id="content">
      //           <h1 className="subheader">Pagina de Pruebas</h1>
      //         </div>
      //       }
      //     />

      //     <Route
      //       exact
      //       path="/agendar-citas/:nombre"
      //       element={<PruebaParametros />}
      //     />
      //     <Route
      //       exact
      //       path="/agendar-citas/:nombre/:apellido"
      //       element={<PruebaParametros />}
      //     />
      //     <Route path="/*" element={<Error />} />
      //   </Routes>
      //   <div className="clearfix"></div>
      //   <Footer />
      // </BrowserRouter>
      <RouterProvider router={router} />
    );
  }
}

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
          <h2 className="subheader">Prueba obtener nombre: {params.nombre}</h2>
          {siApellidos}
        </div>
        <Buscador />
      </div>
    </React.Fragment>
  );
}

export default Router;

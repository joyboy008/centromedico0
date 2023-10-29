import React, { Component } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import TablaPacientes from "../../components/TablaPacientes";
import { NavLink, useNavigate } from "react-router-dom";
import Formulario from "../../components/Formulario";
import api from "../../utils/api";
import authProvider from "../../utils/AuthProvider";
import { Roles, EstadoCivil } from "../../utils/constants";
import Swal from "sweetalert2";

class Pacientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      telefono: "",
      dpi: "",
      igss: "",
      genero: 1,
      fechaNacimiento: "",
      email: "",
      direccion: "",
      municipio: "",
      departamento: "",
      nacionalidad: "",
      numeroExpediente: null,
      etnia: "",
      ocupacion: "",
      estadoCivil: EstadoCivil.SOLTERO_A,
      autopsia: "",
      causaDeMuerte: "",
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event, { generarConsulta }) => {
    event.preventDefault();
    const usuario = authProvider.getUsuario();

    const data = {
      ...this.state,
      validado: !(
        usuario.rol === Roles.ENFERMERO || usuario.rol === Roles.SECRETARIA
      ),

      numero_expediente: this.state.numeroExpediente,
      causaDeMuerte: this.state.causaDeMuerte,
      estadoCivil: this.state.estadoCivil,

      usuario_encargado: {
        email: usuario.email,
        rol: usuario.rol,
      },
    };
    api
      .crearPaciente(data)
      .then((response) => {
        const { id: pacienteId } = response.data;
        Swal.fire({
          title: "Paciente creado con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          if (generarConsulta) {
            this.props.navigate(`/pacientes/${pacienteId}/consulta`);
          }
          this.setState({
            nombre: "",
            telefono: "",
            dpi: "",
            igss: "",
            genero: 1,
            fechaNacimiento: "",
            email: "",
            direccion: "",
            municipio: "",
            departamento: "",
            nacionalidad: "",
            numeroExpediente: null,
            etnia: "",
            ocupacion: "",
            estadoCivil: EstadoCivil.SOLTERO_A,
            autopsia: "",
            causaDeMuerte: "",
          });
        });
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <DefaultLayout title="Pacientes" size="slider-small">
        <Formulario
          title={"Registrar"}
          data={this.state}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <br />
        {/* <TablaPacientes /> */}
      </DefaultLayout>
    );
  }
}

const PacienteCrearWithRouter = (props) => {
  const navigate = useNavigate();
  return <Pacientes {...props} navigate={navigate} />;
};

export default PacienteCrearWithRouter;

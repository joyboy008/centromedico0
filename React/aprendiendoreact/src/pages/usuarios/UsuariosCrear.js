import React, { Component } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import TablaPacientes from "../../components/TablaPacientes";
import { NavLink } from "react-router-dom";
import FormularioUsuario from "../../components/FormularioUsuario";
import api from "../../utils/api";
import authProvider from "../../utils/AuthProvider";
import { Roles, EstadoCivil } from "../../utils/constants";
import Swal from "sweetalert2";

class Usuarios extends Component {
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

  handleSubmit = (event) => {
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
      .crearUsuario(data)
      .then((response) => {
        Swal.fire({
          title: "Usuario creado con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
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
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <DefaulLayout title="Usuarios" size="slider-small">
        <FormularioUsuario
          data={this.state}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <br />
        {/* <TablaPacientes /> */}
      </DefaulLayout>
    );
  }
}

export default Usuarios;

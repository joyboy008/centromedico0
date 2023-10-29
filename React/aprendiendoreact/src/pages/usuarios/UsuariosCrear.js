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
      estadoCivil: EstadoCivil.SOLTERO_A,
      password: "",
      rol: Roles.SECRETARIA,
      especialidad: "",
      emergenciaNombre: "",
      emergenciaParentesco: "",
      emergenciaTelefono: "",
      bonos: "",
      salarios: "",
      descuentos: "",
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      ...this.state,
      emergencia_nombre: this.state.emergenciaNombre,
      emergencia_telefono: this.state.emergenciaTelefono,
      emergencia_parentesco: this.state.emergenciaParentesco,
      estado_civil: this.state.estadoCivil,
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
          genero: 2,
          fechaNacimiento: "",
          email: "",
          direccion: "",
          municipio: "",
          departamento: "",
          nacionalidad: "",
          estadoCivil: EstadoCivil.SOLTERO_A,
          password: "",
          rol: Roles.SECRETARIA,
          especialidad: "",
          emergenciaNombre: "",
          emergenciaParentesco: "",
          emergenciaTelefono: "",
          bonos: "",
          salarios: "",
          descuentos: "",
        });
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <DefaulLayout title="Usuarios" size="slider-small">
        <FormularioUsuario
          title={"Registrar"}
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

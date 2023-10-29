import React, { Component } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import FormularioCita from "../../components/FormularioCita";
import api from "../../utils/api";
import Swal from "sweetalert2";

class CitaCrear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      telefono: "",
      descripcion: "",
      fecha: "",
      validado: true,
    };
  }
  handleChange = (event) => {
    console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    api
      .crearCita(this.state)
      .then((response) => {
        Swal.fire({
          title: "Cita creada con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <DefaultLayout title="Agendar Cita">
        <FormularioCita
          data={this.state}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        ></FormularioCita>
      </DefaultLayout>
    );
  }
}

export default CitaCrear;

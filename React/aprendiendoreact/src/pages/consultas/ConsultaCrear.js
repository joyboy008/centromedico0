import React, { Component } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import FormularioConsulta from "../../components/FormularioConsulta";
import { useLoaderData } from "react-router-dom";
import api from "../../utils/api";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";

class ConsultaCrear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      consultaMotivo: "",
      consultaDia: "",
      diagnoscito: "",
      tratamiento: "",
      paciente: null,
      activo: true,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { consultaMotivo, consultaDia, ...consulta } = this.state;
    consulta.consulta_motivo = consultaMotivo;
    consulta.consulta_dia = consultaDia;
    api
      .crearConsulta(consulta)
      .then((response) => {
        Swal.fire({
          title: "Consulta creada con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        // console.log(err);
        if (err?.response?.data?.detail?.mensaje) {
          Swal.fire({
            title: "No se pudo crear consulta",
            icon: "danger",
            text: err.response.data.detail.mensaje,
            confirmButtonText: "Ok",
          });
        }
      });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    this.setState(
      {
        paciente: {
          id: this.props.paciente._id,
          nombre: this.props.paciente.nombre,
        },
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }
  render() {
    return (
      <DefaultLayout title="Crear Consulta">
        <div className="py-4">
          {this.state.loading ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            <FormularioConsulta
              title={"Crear Consulta"}
              data={this.state}
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
            />
          )}
        </div>
      </DefaultLayout>
    );
  }
}

const ConsultaCrearWithLoader = (props) => {
  const data = useLoaderData();
  return <ConsultaCrear paciente={data.paciente} />;
};

export default ConsultaCrearWithLoader;

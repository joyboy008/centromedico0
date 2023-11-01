import React, { Component } from "react";
import { Form, useLoaderData } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import FormularioHospitalizacion from "../../components/FormularioHospitalizacion";
import moment from "moment";
import api from "../../utils/api";

class HospitalizacionCrear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      emergenciaNombre: "",
      emergenciaTelefono: "",
      emergenciaParentesco: "",
      diagnosticoEgreso: "",
      fechaInicio: moment().format("YYYY-MM-DDTHH:mm"),
      complicaciones: [
        {
          descripcion: "",
        },
      ],
      operaciones: [
        {
          descripcion: "",
        },
      ],
      diasEstancia: 0,
      activo: true,
      paciente: {},
    };
  }
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
  handleChange = (event) => {
    const fieldName = event.target.name;
    if (
      fieldName.includes("operaciones") ||
      fieldName.includes("complicaciones")
    ) {
      const [field, index] = fieldName.split("-");
      const fieldCopy = this.state[field].slice();
      fieldCopy[index] = { descripcion: event.target.value };
      this.setState({ [field]: fieldCopy });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      emergenciaNombre,
      emergenciaTelefono,
      emergenciaParentesco,
      diagnosticoEgreso,
      fechaInicio,
      diasEstancia,
      loading,
      ...hospitalizacion
    } = this.state;
    hospitalizacion.emergencia_nombre = emergenciaNombre;
    hospitalizacion.emergencia_telefono = emergenciaTelefono;
    hospitalizacion.emergencia_parentesco = emergenciaParentesco;
    hospitalizacion.diagnostico_egreso = diagnosticoEgreso;
    hospitalizacion.fecha_inicio = fechaInicio;
    hospitalizacion.dias_estancia = diasEstancia;

    api
      .crearHospitalizacion(hospitalizacion)
      .then((response) => {
        Swal.fire({
          title: "Hospitalizacion creada con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => console.log(err));
  };
  handleAgregarField = (field) => {
    const newField = { descripcion: "" };
    const fieldCopy = this.state[field].slice();
    fieldCopy.push(newField);
    this.setState({ [field]: fieldCopy });
  };
  render() {
    return (
      <DefaultLayout title="Crear Hospitalizacion">
        <div className="pt-4 pb-5">
          {this.state.loading ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            <FormularioHospitalizacion
              onAgregarField={this.handleAgregarField}
              title="Crear Hospitalizacion"
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

function HospitalizacionCrearWithLoader(props) {
  const data = useLoaderData();
  return <HospitalizacionCrear {...props} paciente={data.paciente} />;
}

export default HospitalizacionCrearWithLoader;

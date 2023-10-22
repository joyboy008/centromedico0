import React, { Component, useState, useEffect } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import TablaPacientes from "../../components/TablaPacientes";
import { NavLink, useLoaderData } from "react-router-dom";
import Formulario from "../../components/Formulario";
import api from "../../utils/api";
import authProvider from "../../utils/AuthProvider";
import { Roles, EstadoCivil } from "../../utils/constants";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";

function PacientesActualizar() {
  const data = useLoaderData();
  const [pacienteData, setPacienteData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    const pacienteCopy = { ...pacienteData };
    pacienteCopy[event.target.name] = event.target.value;
    setPacienteData(pacienteCopy);
  };

  const handleSubmit = () => {
    setLoading(true);
    const { _id, numeroExpediente, estadoCivil, ...paciente } = pacienteData;
    paciente.numero_expediente = numeroExpediente;
    paciente.estado_civil = estadoCivil;
    api
      .actualizarPaciente(paciente, _id)
      .then((response) => {
        setLoading(false);
        Swal.fire({
          title: "Paciente modificado con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLoading(true);
    const { estado_civil, numero_expediente, ...paciente } = data.paciente;
    paciente.estadoCivil = estado_civil;
    paciente.numeroExpediente = numero_expediente;
    setPacienteData(paciente);
    setLoading(false);
  }, []);
  console.log(pacienteData);
  return (
    <DefaulLayout title="Actualizar Paciente" size="slider-small">
      {loading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <Formulario
          data={pacienteData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </DefaulLayout>
  );
}

export default PacientesActualizar;

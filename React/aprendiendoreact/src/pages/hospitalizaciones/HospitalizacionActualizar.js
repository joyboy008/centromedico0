import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useLoaderData } from "react-router-dom";
import FormularioHospitalizacion from "../../components/FormularioHospitalizacion";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import api from "../../utils/api";

function HospitalizacionActualizar() {
  const data = useLoaderData();
  const [hospitalizacion, setHospitalizacion] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      const {
        hospitalizacion: {
          emergencia_nombre,
          emergencia_telefono,
          emergencia_parentesco,
          fecha_inicio,
          diagnostico_egreso,
          dias_estancia,
          ...hospitalizacionData
        },
        paciente: { _id, nombre },
      } = data;
      hospitalizacionData.emergenciaNombre = emergencia_nombre;
      hospitalizacionData.emergenciaTelefono = emergencia_telefono;
      hospitalizacionData.emergenciaParentesco = emergencia_parentesco;
      hospitalizacionData.fechaInicio = fecha_inicio;
      hospitalizacionData.diagnosticoEgreso = diagnostico_egreso;
      hospitalizacionData.diasEstancia = dias_estancia;
      hospitalizacionData.paciente = { id: _id, nombre: nombre };
      setHospitalizacion(hospitalizacionData);
      setLoading(false);
    }
  }, []);
  const handleChange = (event) => {
    const hospitalizacionCopy = { ...hospitalizacion };
    const fieldName = event.target.name;

    if (
      fieldName.includes("operaciones") ||
      fieldName.includes("complicaciones")
    ) {
      const [field, index] = fieldName.split("-");
      const fieldCopy = hospitalizacionCopy[field].slice();
      fieldCopy[index] = { descripcion: event.target.value };
      hospitalizacionCopy[field] = fieldCopy;
    } else {
      hospitalizacionCopy[event.target.name] = event.target.value;
    }
    setHospitalizacion(hospitalizacionCopy);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      emergenciaNombre,
      emergenciaTelefono,
      emergenciaParentesco,
      diagnosticoEgreso,
      fechaInicio,
      diasEstancia,
      loading,
      ...hospitalizacionData
    } = hospitalizacion;
    hospitalizacionData.emergencia_nombre = emergenciaNombre;
    hospitalizacionData.emergencia_telefono = emergenciaTelefono;
    hospitalizacionData.emergencia_parentesco = emergenciaParentesco;
    hospitalizacionData.diagnostico_egreso = diagnosticoEgreso;
    hospitalizacionData.fecha_inicio = fechaInicio;
    hospitalizacionData.dias_estancia = diasEstancia;
    api
      .actualizarHospitalizacion(hospitalizacionData, hospitalizacion._id)
      .then((response) => {
        Swal.fire({
          title: "Hospitalizacion modificada con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleAgregarField = (field) => {
    const hospitalizacionCopy = { ...hospitalizacion };
    const newField = { descripcion: "" };
    const fieldCopy = hospitalizacionCopy[field].slice();
    fieldCopy.push(newField);
    hospitalizacionCopy[field] = fieldCopy;
    setHospitalizacion(hospitalizacionCopy);
  };
  return (
    <DefaultLayout title={"Actualizar Hospitalización"}>
      {loading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <FormularioHospitalizacion
          title="Actualizar Hospitalización"
          esActualizacion={true}
          onAgregarField={handleAgregarField}
          data={hospitalizacion}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </DefaultLayout>
  );
}

export default HospitalizacionActualizar;

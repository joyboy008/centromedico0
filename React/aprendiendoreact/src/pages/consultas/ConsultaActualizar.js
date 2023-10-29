import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useLoaderData } from "react-router-dom";
import FormularioConsulta from "../../components/FormularioConsulta";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import api from "../../utils/api";

function ConsultaActualizar() {
  const data = useLoaderData();
  const [consulta, setConsulta] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      const {
        consulta: { consulta_motivo, consulta_dia, ...consulta },
        paciente: { _id, nombre },
      } = data;
      consulta.consultaMotivo = consulta_motivo;
      consulta.consultaDia = consulta_dia;
      consulta.paciente = { id: _id, nombre: nombre };
      setConsulta(consulta);
      setLoading(false);
    }
  }, []);
  const handleChange = (event) => {
    const { paciente, ...consultaCopy } = consulta;
    consultaCopy[event.target.name] = event.target.value;
    setConsulta({ ...consultaCopy, paciente });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { paciente, consultaMotivo, consultaDia, ...consultaCopy } = consulta;
    consultaCopy.consulta_motivo = consultaMotivo;
    consultaCopy.consulta_dia = consultaDia;
    api
      .actualizarConsulta(consultaCopy, consulta._id)
      .then((response) => {
        Swal.fire({
          title: "Consulta modificada con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <DefaultLayout>
      {loading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <FormularioConsulta
          esActualizacion={true}
          data={consulta}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </DefaultLayout>
  );
}

export default ConsultaActualizar;

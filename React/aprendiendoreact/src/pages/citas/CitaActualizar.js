import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useLoaderData } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import api from "../../utils/api";
import FormularioCita from "../../components/FormularioCita";

function CitaActualizar() {
  const data = useLoaderData();
  const [cita, setCita] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setCita(data.cita);
      setLoading(false);
    }
  }, []);
  const handleChange = (event) => {
    const citaCopy = { ...cita };
    citaCopy[event.target.name] = event.target.value;
    setCita(citaCopy);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .actualizarCita(cita, cita._id)
      .then((response) => {
        Swal.fire({
          title: "Cita modificada con exito!",
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
        <FormularioCita
          esActualizacion={true}
          data={cita}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </DefaultLayout>
  );
}

export default CitaActualizar;

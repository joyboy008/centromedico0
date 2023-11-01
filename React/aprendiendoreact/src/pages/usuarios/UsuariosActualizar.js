import React, { useEffect, useState } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import TablaPacientes from "../../components/TablaPacientes";
import { NavLink, useLoaderData } from "react-router-dom";
import FormularioUsuario from "../../components/FormularioUsuario";
import api from "../../utils/api";
import authProvider from "../../utils/AuthProvider";
import { Roles, EstadoCivil } from "../../utils/constants";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";

function UsuariosActualizar() {
  const data = useLoaderData();
  const [usuarioData, setUsuarioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!!data) {
      const {
        emergencia_nombre,
        emergencia_parentesco,
        emergencia_telefono,
        estado_civil,
        ...usuario
      } = data.usuario;

      usuario.emergenciaNombre = emergencia_nombre;
      usuario.emergenciaTelefono = emergencia_telefono;
      usuario.emergenciaParentesco = emergencia_parentesco;
      usuario.estadoCivil = estado_civil;

      setUsuarioData(usuario);
      setLoading(false);
    }
  }, [data]);

  const handleChange = (event) => {
    const usuarioCopy = { ...usuarioData };
    usuarioCopy[event.target.name] = event.target.value;
    setUsuarioData(usuarioCopy);
  };
  const handleSubmit = () => {
    setLoading(true);
    const {
      _id,
      emergenciaNombre,
      emergenciaParentesco,
      emergenciaTelefono,
      estadoCivil,
      ...usuario
    } = usuarioData;
    usuario.estado_civil = estadoCivil;
    usuario.emergencia_nombre = emergenciaNombre;
    usuario.emergencia_telefono = emergenciaTelefono;
    usuario.emergencia_parentesco = emergenciaParentesco;
    api
      .actualizarUsuario(usuario, _id)
      .then((response) => {
        setLoading(false);
        Swal.fire({
          title: "Usuario modificado con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {});
  };

  return (
    <DefaulLayout title="Usuarios" size="slider-small">
      {loading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <FormularioUsuario
          esActualizacion={true}
          title={"Actualizar Usuario"}
          data={usuarioData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}

      <br />
      {/* <TablaPacientes /> */}
    </DefaulLayout>
  );
}

export default UsuariosActualizar;

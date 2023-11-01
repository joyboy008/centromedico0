import React, { Component, useState, useEffect } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import BootstrapTable from "react-bootstrap-table-next";
import TablaPacientes from "../../components/TablaPacientes";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import Formulario from "../../components/Formulario";
import api from "../../utils/api";
import authProvider from "../../utils/AuthProvider";
import { Roles, EstadoCivil } from "../../utils/constants";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import TableActions from "../../components/TableActions";
import CustomAccordion from "../../components/Accordion";

function PacientesActualizar() {
  const data = useLoaderData();
  const [pacienteData, setPacienteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingConsultas, setLoadingConsultas] = useState(false);
  const [consultas, setConsultas] = useState([]);
  const [loadingHospitalizaciones, setLoadingHospitalizaciones] =
    useState(false);
  const [hospitalizaciones, setHospitalizaciones] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      dataField: "_id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "consulta_dia",
      text: "Fecha",
      formatter: (cell) => {
        return new Date(cell).toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          month: "long",
          year: "numeric",
        });
      },
    },
    {
      dataField: "consulta_motivo",
      text: "Motivo de la Consulta",
    },
    {
      dataField: "#",
      text: "Acciones",
      formatter: (cell, row) => {
        return (
          <TableActions
            edit={{
              url: `/pacientes/${pacienteData._id}/consulta/`,
            }}
            rowId={row._id}
          />
        );
      },
    },
  ];

  const columnsHospitalizaciones = [
    {
      dataField: "_id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "fecha_inicio",
      text: "Fecha de Inicio",
      formatter: (cell) => {
        return new Date(cell).toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          month: "long",
          year: "numeric",
        });
      },
    },
    {
      dataField: "emergencia_nombre",
      text: "Nombre de familiar de Emergencia",
    },
    {
      dataField: "emergencia_telefono",
      text: "teléfono de familiar de Emergencia",
    },
    {
      dataField: "activo",
      text: "ESTADO",
      formatter: (cell) => {
        return cell ? "ACTIVA" : "DE ALTA";
      },
    },
    {
      dataField: "#",
      text: "Acciones",
      formatter: (cell, row) => {
        return (
          <TableActions
            edit={{
              url: `/pacientes/${pacienteData._id}/hospitalizacion/`,
            }}
            rowId={row._id}
          />
        );
      },
    },
  ];

  const handleChange = (event) => {
    const pacienteCopy = { ...pacienteData };
    pacienteCopy[event.target.name] = event.target.value;
    setPacienteData(pacienteCopy);
  };

  const handleSubmit = () => {
    setLoading(true);
    const { _id, numeroExpediente, estadoCivil, causaDeMuerte, ...paciente } =
      pacienteData;
    paciente.numero_expediente = numeroExpediente;
    paciente.causa_de_muerte = causaDeMuerte;
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
    setLoadingConsultas(true);
    setLoadingHospitalizaciones(true);
    const { estado_civil, numero_expediente, causa_de_muerte, ...paciente } =
      data.paciente;
    paciente.estadoCivil = estado_civil;
    paciente.numeroExpediente = numero_expediente;
    paciente.causaDeMuerte = causa_de_muerte;
    setPacienteData(paciente);
    setLoading(false);
    api.listarPacienteConsultas(paciente._id).then((response) => {
      const consultasList = response.data?.consultas.sort((a, b) => {
        return new Date(b.consulta_dia) - new Date(a.consulta_dia);
      });
      setConsultas(consultasList);
      setLoadingConsultas(false);
    });

    api
      .listarPacienteHospitalizacion(paciente._id)
      .then((response) => {
        const hospitalizacionesList = response.data?.hospitalizaciones.sort(
          (a, b) => {
            return new Date(b.fecha_inicio) - new Date(a.fecha_inicio);
          }
        );
        setHospitalizaciones(hospitalizacionesList);
        setLoadingHospitalizaciones(false);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleGenerarConsulta = () => {
    navigate(`/pacientes/${pacienteData._id}/consulta`);
  };
  return (
    <DefaulLayout title="Actualizar Paciente" size="slider-small">
      <div className="pb-5 pt-4">
        {loading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <Formulario
            esActualizacion={true}
            onGenerarConsulta={handleGenerarConsulta}
            title={"Actualizar"}
            data={pacienteData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}
        <div className="pt-4">
          <h2>Consultas</h2>
          {loadingConsultas ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            <CustomAccordion
              openText="Ocultar"
              closeText="Mostrar"
              defaultEvent="0"
            >
              <BootstrapTable
                keyField="_id"
                data={consultas}
                columns={columns}
                pagination={paginationFactory()}
              />
            </CustomAccordion>
          )}
        </div>
        <div className="pt-4">
          <h2>Hospitalizaciones</h2>
          {loadingConsultas ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            <CustomAccordion
              openText="Ocultar"
              closeText="Mostrar"
              defaultEvent="0"
            >
              <BootstrapTable
                keyField="_id"
                data={hospitalizaciones}
                columns={columnsHospitalizaciones}
                pagination={paginationFactory()}
              />
            </CustomAccordion>
          )}
        </div>
      </div>
    </DefaulLayout>
  );
}

export default PacientesActualizar;

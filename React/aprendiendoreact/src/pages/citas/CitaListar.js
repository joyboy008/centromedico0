import React, { useState, useEffect } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import BootstrapTable from "react-bootstrap-table-next";
import Spinner from "react-bootstrap/Spinner";
import api from "../../utils/api";
import paginationFactory from "react-bootstrap-table2-paginator";
import TableActions from "../../components/TableActions";
import Buscador from "../../components/Buscador";

function CitaListar() {
  const [data, setData] = useState([]);
  const [isLoading, SetLoading] = useState(false);
  const [criteria, setCriteria] = useState("");
  const columns = [
    {
      dataField: "_id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "nombre",
      text: "Nombre",
    },
    {
      dataField: "telefono",
      text: "Teléfono",
    },
    {
      dataField: "fecha",
      text: "Fecha y Hora",
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
      dataField: "validado",
      text: "Cita validada?",
      formatter: (cell) => {
        return cell === false ? "Necesita revisión" : "VALIDADA";
      },
    },
    {
      dataField: "descripcion",
      text: "Descripción",
    },
    {
      dataField: "#",
      text: "Acciones",
      formatter: (cell, row) => {
        return <TableActions edit={{ url: "/citas/" }} rowId={row._id} />;
      },
    },
  ];

  useEffect(() => {
    api
      .listarCitas()
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const getCitasData = (data) => {
    if (criteria) {
      return data.filter((cita) => {
        return (
          cita.nombre?.toLowerCase()?.includes(criteria) ||
          cita.telefono?.toString()?.includes(criteria)
        );
      });
    }
    return data;
  };
  return (
    <DefaulLayout title="Listado de Citas">
      <Buscador
        placeholder={
          "Puedes buscar la cita por nombre o por número de teléfono del paciente 😁"
        }
        value={criteria}
        onSearchChange={(event) => {
          setCriteria(event.target.value);
        }}
      />
      <div className="py-1"></div>
      {isLoading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <BootstrapTable
          keyField="id"
          data={getCitasData(data)}
          columns={columns}
          pagination={paginationFactory()}
        />
      )}
    </DefaulLayout>
  );
}
export default CitaListar;

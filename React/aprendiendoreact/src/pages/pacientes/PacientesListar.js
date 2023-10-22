import React, { useState, useEffect } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import BootstrapTable from "react-bootstrap-table-next";
import Spinner from "react-bootstrap/Spinner";
import api from "../../utils/api";
import paginationFactory from "react-bootstrap-table2-paginator";
import TableActions from "../../components/TableActions";
import Sidebar from "../../components/Sidebar";

function PacientesListar() {
  const [data, setData] = useState([]);
  const [isLoading, SetLoading] = useState(false);
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
      dataField: "fechaNacimiento",
      text: "Fecha de Nacimiento",
    },
    {
      dataField: "#",
      text: "Acciones",
      formatter: (cell, row) => {
        return <TableActions edit={{ url: "/pacientes/" }} rowId={row._id} />;
      },
    },
  ];

  useEffect(() => {
    api
      .listarPacientes()
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <DefaulLayout title="Listado de Pacientes">
      <Sidebar />
      <div className="py-4"></div>
      {isLoading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          pagination={paginationFactory()}
        />
      )}
    </DefaulLayout>
  );
}
export default PacientesListar;

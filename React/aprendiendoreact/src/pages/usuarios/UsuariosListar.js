import React, { useState, useEffect } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import BootstrapTable from "react-bootstrap-table-next";
import Spinner from "react-bootstrap/Spinner";
import api from "../../utils/api";
import paginationFactory from "react-bootstrap-table2-paginator";
import TableActions from "../../components/TableActions";
import Buscador from "../../components/Buscador";

function PacientesListar() {
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
      dataField: "fechaNacimiento",
      text: "Fecha de Nacimiento",
    },
    {
      dataField: "#",
      text: "Acciones",
      formatter: (cell, row) => {
        return <TableActions edit={{ url: "/usuarios/" }} rowId={row._id} />;
      },
    },
  ];

  useEffect(() => {
    api
      .listarUsuarios()
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getUsuariosData = (data) => {
    if (criteria) {
      return data.filter((usuario) => {
        return (
          usuario.nombre?.toLowerCase().includes(criteria) ||
          usuario.dpi?.includes(criteria)
        );
      });
    }
    return data;
  };
  return (
    <DefaulLayout title="Listado de Usuarios">
      <Buscador
        placeholder={
          " Puedes buscar por nombre o por número de DPI al empleado 😉"
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
          data={getUsuariosData(data)}
          columns={columns}
          pagination={paginationFactory()}
        />
      )}
    </DefaulLayout>
  );
}
export default PacientesListar;

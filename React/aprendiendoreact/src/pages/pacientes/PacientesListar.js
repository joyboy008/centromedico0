import React, { useState, useEffect } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import BootstrapTable from "react-bootstrap-table-next";
import Spinner from "react-bootstrap/Spinner";
import api from "../../utils/api";
import paginationFactory from "react-bootstrap-table2-paginator";
import TableActions from "../../components/TableActions";
import Buscador from "../../components/Buscador";
import { LiaHospitalSymbolSolid } from "react-icons/lia";

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
      text: "Modificar - Hospitalizar",
      formatter: (cell, row) => {
        return (
          <TableActions
            edit={{ url: "/pacientes/" }}
            customActions={[
              {
                urlSuffix: "/hospitalizaciones",
                url: "/pacientes/",
                icon: <LiaHospitalSymbolSolid />,
              },
            ]}
            rowId={row._id}
          />
        );
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

  const getPacientesData = (data) => {
    if (criteria) {
      return data.filter((paciente) => {
        return (
          paciente.nombre?.toLowerCase()?.includes(criteria) ||
          paciente.dpi?.includes(criteria) ||
          paciente.telefono?.toString()?.includes(criteria)
        );
      });
    } else {
    }
    return data;
  };

  return (
    <DefaulLayout title="Listado de Pacientes">
      <Buscador
        placeholder={
          " Puedes buscar por nombre o por número de telefono al paciente 😉"
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
          data={getPacientesData(data)}
          columns={columns}
          pagination={paginationFactory()}
        />
      )}
    </DefaulLayout>
  );
}
export default PacientesListar;

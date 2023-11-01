import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Select from "./fields/Select";
import api from "../utils/api";
import Swal from "sweetalert2";

function FormularioHospitalizacion({
  title,
  onSubmit,
  onChange,
  data,
  esActualizacion,
  onAgregarField,
}) {
  const navigate = useNavigate();
  const options = [
    {
      value: true,
      label: "ACTIVA",
    },
    {
      value: false,
      label: "DE ALTA",
    },
  ];
  // function darDeAlta() {
  //   api
  //     .putHospitalizacion(data._id)
  //     .then((response) => {
  //       Swal.fire({
  //         title: "Dado de Alta!",
  //         icon: "success",
  //         confirmButtonText: "Ok",
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }
  return (
    <div id="formulario">
      <div className="center">
        {/* Crearemos un Formulario con React */}
        <div className="formpaciente">
          <div className="formdentro">
            <header>{title}</header>
            <form onSubmit={onSubmit}>
              <div className="form first">
                <div className="details personal">
                  <span className="title">Datos del Paciente</span>
                  <div className="fields">
                    <div className="input-field">
                      <label>Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        value={data.paciente?.nombre}
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="Nombre completo"
                        required
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="details personal">
                  <span className="title">Contacto de Emergencia</span>
                  <div className="fields">
                    <div className="input-field">
                      <label>Nombre</label>
                      <input
                        name="emergenciaNombre"
                        className="form-control"
                        type="text"
                        pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)+$"
                        placeholder="Ingresa el nombre completo"
                        title="Ej. Amilkar Herrera Cifuentes"
                        onChange={onChange}
                        value={data.emergenciaNombre}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Telefono</label>
                      <input
                        name="emergenciaTelefono"
                        className="form-control"
                        placeholder="Ingresa el teléfono"
                        pattern="[0-9]{8}"
                        title="Ej. 54342366"
                        type="text"
                        onChange={onChange}
                        value={data.emergenciaTelefono}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Parentesco</label>
                      <input
                        name="emergenciaParentesco"
                        className="form-control"
                        placeholder="Ingresa el parentesco"
                        pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$"
                        title="Ej. Primo"
                        type="text"
                        onChange={onChange}
                        value={data.emergenciaParentesco}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="details personal">
                  <span className="title">Datos de la Hospitalización</span>
                  <div className="fields">
                    <div className="input-field">
                      <label>Fecha</label>
                      <input
                        name="fechaInicio"
                        className="form-control"
                        type="datetime-local"
                        onChange={onChange}
                        value={data.fechaInicio}
                        required
                        disabled
                      />
                    </div>
                    <div className="input-field">
                      <label>Días estancia</label>
                      <input
                        name="diasEstancia"
                        className="form-control"
                        type="number"
                        onChange={onChange}
                        value={data.diasEstancia}
                        required
                      />
                    </div>
                    {esActualizacion ? (
                      <div className="input-field">
                        <label>Estado de la Hospitalización</label>
                        <Select
                          name="activo"
                          className="form-control"
                          onChange={onChange}
                          value={data.activo}
                          options={options}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="details personal">
                    <div className="input-field">
                      <label>Diagnóstico egreso</label>
                      <textarea
                        name="diagnosticoEgreso"
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="información del egreso..."
                        value={data.diagnosticoEgreso}
                        required={esActualizacion}
                        disabled={esActualizacion && !data.activo}
                      ></textarea>
                    </div>
                  </div>
                  <div className="row gx-4">
                    <div className="col-md-6 col-sm-100">
                      {data.operaciones.map((operacion, index) => (
                        <div className="col-md-12">
                          <label>Operaciones</label>
                          <textarea
                            name={`operaciones-${index}`}
                            autoComplete="none"
                            onChange={onChange}
                            placeholder="operaciones y entre () el codigo de la operación"
                            required={esActualizacion}
                            value={operacion.descripcion}
                            disabled={esActualizacion && !data.activo}
                          ></textarea>
                        </div>
                      ))}
                      <button
                        className="btn btn-primary w-100 m-0"
                        type="button"
                        onClick={() => {
                          onAgregarField("operaciones");
                        }}
                      >
                        Agregar
                      </button>
                    </div>
                    <div className="col-md-6 col-sm-100">
                      {data.complicaciones.map((complicacion, index) => (
                        <div className="col-md-12">
                          <label>Complicaciones</label>
                          <textarea
                            name={`complicaciones-${index}`}
                            autoComplete="none"
                            onChange={onChange}
                            placeholder="complicaciones y entre () el codigo de la compliación"
                            required={esActualizacion}
                            value={complicacion.descripcion}
                            disabled={esActualizacion && !data.activo}
                          ></textarea>
                        </div>
                      ))}
                      <button
                        className="btn btn-primary w-100 m-0"
                        type="button"
                        onClick={() => {
                          onAgregarField("complicaciones");
                        }}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
                <div className="buttons">
                  <button type="submit" className="saveBtn">
                    <span className="btnText">Guardar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/pacientes/${data.paciente.id}`)}
                    className="saveBtn"
                  >
                    <span className="btnText">Ver Paciente</span>
                  </button>
                  {/* <button
                    type="button"
                    onClick={darDeAlta()}
                    className="saveBtn"
                  >
                    <span className="btnText">Dar Alta</span>
                  </button> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioHospitalizacion;

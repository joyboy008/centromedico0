import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Select from "./fields/Select";

function FormularioCrear({ title, onSubmit, onChange, data, esActualizacion }) {
  const navigate = useNavigate();
  const options = [
    {
      value: true,
      label: "ACTIVA",
    },
    {
      value: false,
      label: "TERMINADA",
    },
  ];
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
                  <span className="title">Datos de la Consulta</span>
                  <div className="fields">
                    <div className="input-field">
                      <label>Fecha</label>
                      <input
                        name="consultaDia"
                        className="form-control"
                        type="datetime-local"
                        onChange={onChange}
                        value={data.consultaDia}
                        required
                        disabled={esActualizacion && !data.activo}
                      />
                    </div>
                    {esActualizacion ? (
                      <div className="input-field">
                        <label>Estado de Consulta</label>
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

                  <div className="fields">
                    <div className="input-field">
                      <label>Motivo</label>
                      <textarea
                        name="consultaMotivo"
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="información de la consulta..."
                        value={data.consultaMotivo}
                        required
                        disabled={esActualizacion && !data.activo}
                      ></textarea>
                    </div>
                    <div className="input-field">
                      <label>Diagnóstico</label>
                      <textarea
                        name="diagnostico"
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="diagnóstico..."
                        value={data.diagnostico}
                        required
                        disabled={esActualizacion && !data.activo}
                      ></textarea>
                    </div>
                    <div className="input-field">
                      <label>Tratamiento</label>
                      <textarea
                        name="tratamiento"
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="tratamiento..."
                        value={data.tratamiento}
                        required
                        disabled={esActualizacion && !data.activo}
                      ></textarea>
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioCrear;

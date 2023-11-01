import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Select from "./fields/Select";

function FormularioCita({ title, onSubmit, onChange, data, esActualizacion }) {
  const navigate = useNavigate();
  const options = [
    {
      value: true,
      label: "VALIDADA",
    },
    {
      value: false,
      label: "NO VALIDADA",
    },
  ];
  return (
    <div id="formulario">
      <div className="center py-4">
        {/* Crearemos un Formulario con React */}
        <div className="formpaciente">
          <div className="formdentro">
            <header>{title}</header>
            <form onSubmit={onSubmit}>
              <div className="form first">
                <div className="details personal">
                  <span className="title">Datos de La Cita</span>
                  <div className="fields">
                    <div className="input-field">
                      <label>Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        value={data.nombre}
                        autoComplete="none"
                        pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)+$"
                        title="Ej. Josue Alejandro Morales Castillo"
                        onChange={onChange}
                        placeholder="Nombre completo"
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Teléfono</label>
                      <input
                        type="text"
                        name="telefono"
                        title="Ej. 55443322"
                        pattern="[0-9]{8}"
                        value={data.telefono}
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="Teléfono"
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Fecha</label>
                      <input
                        type="datetime-local"
                        name="fecha"
                        value={data.fecha}
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="Fecha y hora"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="details personal">
                  <div className="fields">
                    {esActualizacion ? (
                      <div className="input-field">
                        <label>Cita Validado</label>
                        <Select
                          type="text-local"
                          name="validado"
                          value={data.validado}
                          autoComplete="none"
                          onChange={onChange}
                          options={options}
                          required
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="fields">
                    <div className="input-field">
                      <label>Descripción</label>
                      <textarea
                        name="descripcion"
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="información sobre la visita..."
                        value={data.descripcion}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="buttons">
                  <button type="submit" className="saveBtn">
                    <span className="btnText">Guardar</span>
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

export default FormularioCita;

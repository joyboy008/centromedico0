import React, { Component, useState } from "react";
import Select from "./fields/Select";
import { NavLink } from "react-router-dom";
import { EstadoCivil, Roles } from "../utils/constants";

function Formulario({ esActualizacion, title, data, onChange, onSubmit }) {
  const [open, setOpen] = useState(false);
  const estadoCivilOptions = [
    { value: EstadoCivil.SOLTERO_A, label: "Soltero(a)" },
    { value: EstadoCivil.CASADO_A, label: "Casado(a)" },
    { value: EstadoCivil.VIUDO_A, label: "Viudo(a)" },
    { value: EstadoCivil.SEPARADO_A, label: "Separado(a)" },
    { value: EstadoCivil.DIVORCIADO_A, label: "Divorciado(a)" },
  ];

  const generoOptions = [
    {
      value: 1,
      label: "Masculino",
    },
    { value: 2, label: "Femenino" },
  ];

  const rolesOptions = [
    {
      value: Roles.ADMIN,
      label: "ADMIN",
    },
    {
      value: Roles.DOCTOR,
      label: "DOCTOR",
    },
    {
      value: Roles.SECRETARIA,
      label: "SECRETARIA",
    },
    {
      value: Roles.ENFERMERO,
      label: "ENFERMERO",
    },
  ];
  const handleDatosAdicionalesClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <br />
      <div id="formulario">
        <div className="center">
          {/* Crearemos un Formulario con React */}
          <div className="formpaciente">
            <div className="formdentro">
              <header>{title} Usuario</header>
              <form onSubmit={onSubmit}>
                <div className="form first">
                  <div className="details personal">
                    <span className="title">Datos Personales</span>
                    <div className="fields">
                      <div className="input-field">
                        <label>Nombre completo</label>
                        <input
                          type="text"
                          name="nombre"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)+$"
                          value={data.nombre}
                          autoComplete="none"
                          onChange={onChange}
                          title="Ej. Josue Alejandro Morales Castillo"
                          placeholder="Nombre completo"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Teléfono</label>
                        <input
                          type="number"
                          name="telefono"
                          data-mask="0000 0000"
                          autoComplete="none"
                          value={data.telefono}
                          onChange={onChange}
                          pattern="^\d{4} \d{4}$"
                          placeholder="Número de teléfono"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>DPI</label>
                        <input
                          type="number"
                          autoComplete="none"
                          name="dpi"
                          data-mask="00 00"
                          value={data.dpi}
                          onChange={onChange}
                          pattern="0-9]{4}-[0-9]{5}-[0-9]{4}"
                          placeholder="Ingrese el DPI"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Igss</label>
                        <input
                          type="text"
                          name="igss"
                          autoComplete="none"
                          pattern="[0-9]{5}"
                          value={data.igss}
                          onChange={onChange}
                          placeholder="Ejemplo: 32234"
                        />
                        {/* <!-- Si no hay igss entonces que devuelva no en el backend --> */}
                      </div>
                      <div className="input-field">
                        <label>Género</label>
                        <Select
                          id="genero"
                          name="genero"
                          value={data.genero}
                          onChange={onChange}
                          options={generoOptions}
                        />
                        {/* <!-- <input type="text" placeholder="Ingrese el Genero" required/> --> */}
                      </div>

                      <div className="input-field">
                        <label>Fecha de Nacimiento</label>
                        <input
                          name="fechaNacimiento"
                          value={data.fechaNacimiento}
                          onChange={onChange}
                          type="date"
                          id="fechaNacimiento"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="details ID">
                    <span className="title">Datos de Identidad</span>
                    <div className="fields">
                      <div className="input-field">
                        <label>Email</label>
                        <input
                          type="text"
                          name="email"
                          value={data.email}
                          onChange={onChange}
                          autoComplete="none"
                          pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
                          title="Ej. Josue@centromedico.com"
                          placeholder="Ingrese el correo electrónico"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Password</label>
                        <input
                          type="password"
                          name="password"
                          value={data.password}
                          onChange={onChange}
                          autoComplete="none"
                          // pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$"
                          placeholder="Ingrese su password"
                          title="Contraseña requerida de 8 caracteres (debe contener al menos una letra mayúscula, una letra minúscula y un número)"
                          required={!esActualizacion}
                        />
                      </div>
                      <div className="input-field">
                        <label>Rol</label>
                        <Select
                          id="rol"
                          name="rol"
                          value={data.rol}
                          onChange={onChange}
                          options={rolesOptions}
                        />
                        {/* <!-- <input type="text" placeholder="Ingrese el Genero" required/> --> */}
                      </div>
                      <div className="input-field">
                        <label>Dirección</label>
                        <input
                          type="text"
                          name="direccion"
                          pattern="^[A-Za-z0-9\s.,-]+$" // no me funciona
                          autoComplete="none"
                          value={data.direccion}
                          onChange={onChange}
                          placeholder="Ingrese la dirección"
                          required
                        />
                      </div>

                      <div className="input-field">
                        <label>Municipio</label>
                        <input
                          type="text"
                          name="municipio"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$"
                          value={data.municipio}
                          onChange={onChange}
                          placeholder="Ingrese el Municipio"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Departamento</label>
                        <input
                          type="text"
                          name="departamento"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$"
                          value={data.departamento}
                          onChange={onChange}
                          placeholder="Ingrese el Departamento"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Nacionalidad</label>
                        <input
                          type="text"
                          name="nacionalidad"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$"
                          value={data.nacionalidad}
                          onChange={onChange}
                          placeholder="Ingrese la Nacionalidad"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="title">Datos adicionales</span>
                    <div className="fields">
                      <div className="input-field">
                        <label>Estado Civil</label>
                        <Select
                          name="estadoCivil"
                          value={data.estadoCivil}
                          onChange={onChange}
                          options={estadoCivilOptions}
                        />
                      </div>

                      <div className="input-field">
                        <label>Especialidad</label>
                        <input
                          type="text"
                          name="especialidad"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$"
                          value={data.especialidad}
                          onChange={onChange}
                          placeholder="Ingrese la especialidad"
                          title="Ej. Traumatologo"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Número de Emergencia</label>
                        <input
                          type="text"
                          name="emergenciaTelefono"
                          // pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$"
                          value={data.emergenciaTelefono}
                          onChange={onChange}
                          placeholder="Ingrese el número de emergencia"
                          title="Ej. Traumatologo"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Nombre Emergencia</label>
                        <input
                          type="text"
                          name="emergenciaNombre"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$"
                          value={data.emergenciaNombre}
                          onChange={onChange}
                          placeholder="Ingrese el nombre de Emergencia"
                          title="Ej. Fernanda Corado"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Emergencia Parenteso</label>
                        <input
                          type="text"
                          name="emergenciaParentesco"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$"
                          value={data.emergenciaParentesco}
                          onChange={onChange}
                          placeholder="Ingrese el parentesco"
                          title="Ej. Traumatologo"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Salario</label>
                        <input
                          type="number"
                          name="salario"
                          autoComplete="none"
                          value={data.salario}
                          onChange={onChange}
                          title="Ej. Maya"
                          placeholder="ingrese el salario"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Bonos</label>
                        <input
                          type="number"
                          name="bonos"
                          autoComplete="none"
                          value={data.bonos}
                          onChange={onChange}
                          placeholder="Ingrese los bonos"
                          required
                        />
                      </div>

                      <div className="input-field">
                        <label>Descuentos</label>
                        <input
                          type="number"
                          autoComplete="none"
                          name="descuentos"
                          value={data.descuentos}
                          onChange={onChange}
                          placeholder="Ingrese el total de descuentos"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="buttons">
                    <button type="submit" className="saveBtn">
                      <span className="btnText">Guardar</span>
                    </button>
                    <button
                      type="button"
                      className="nxtBtn"
                      onClick={handleDatosAdicionalesClick}
                    >
                      <span className="btnText">Datos Adicionales</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Formulario;

import React, { Component } from "react";
import Slider from "../components/Slider";
import DefaulLayout from "../components/DefaultLayout";
import TablaPacientes from "../components/TablaPacientes";
import { NavLink } from "react-router-dom";

class Pacientes extends Component {
  render() {
    return (
      <DefaulLayout title="Pacientes" size="slider-small">
        <div id="formulario">
          <div className="center">
            <br />
            {/* Crearemos un Formulario con React */}
            <div className="formpaciente">
              <div className="formdentro">
                <header>Registrar Paciente</header>
                <form action="#">
                  <div className="form first">
                    <div className="details personal">
                      <span className="title">Datos Personales</span>
                      <div className="fields">
                        <div className="input-field">
                          <label>Nombre completo</label>
                          <input
                            type="text"
                            title="Ej. Josue Alejandro Morales Castillo"
                            placeholder="Nombre completo"
                            required
                          />
                        </div>
                        <div className="input-field">
                          <label>Teléfono</label>
                          <input
                            type="number"
                            pattern="[0-9]{8}"
                            maxlength="8"
                            placeholder="Número de teléfono"
                            required
                          />
                        </div>
                        <div className="input-field">
                          <label>DPI</label>
                          <input
                            type="number"
                            pattern="[0-9]{13}"
                            maxlength="13"
                            placeholder="Ingrese el DPI"
                          />
                        </div>
                        <div className="input-field">
                          <label>Igss</label>
                          <input type="text" placeholder="Ingresa el Igss" />
                          {/* <!-- Si no hay igss entonces que devuelva no en el backend --> */}
                        </div>
                        <div className="input-field">
                          <label>Genero</label>
                          <select id="genero" name="genero">
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                          </select>
                          {/* <!-- <input type="text" placeholder="Ingrese el Genero" required/> --> */}
                        </div>

                        <div className="input-field">
                          <label>Fecha de Nacimiento</label>
                          <input
                            type="date"
                            id="fechaNacimiento"
                            name="fechaNacimiento"
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
                            title="Ej. Josue@centromedico.com"
                            placeholder="Ingrese el correo electronico"
                          />
                        </div>
                        <div className="input-field">
                          <label>Dirección</label>
                          <input
                            type="text"
                            placeholder="Ingrese la dirección"
                            required
                          />
                        </div>

                        <div className="input-field">
                          <label>Municipio</label>
                          <input
                            type="text"
                            placeholder="Ingrese el Municipio"
                            required
                          />
                        </div>
                        <div className="input-field">
                          <label>Departamento</label>
                          <input
                            type="text"
                            placeholder="Ingrese el Departamento"
                            required
                          />
                        </div>
                        <div className="input-field">
                          <label>Nacionalidad</label>
                          <input
                            type="text"
                            placeholder="Ingrese la Nacionalidad"
                            required
                          />
                        </div>
                        <div className="input-field">
                          <label>Motivo de consulta</label>
                          <input
                            type="text"
                            placeholder="Motivo de la consulta"
                          />
                        </div>
                      </div>
                      <div className="buttons">
                        <button className="saveBtn">
                          <span className="btnText">Guardar</span>
                          <i className="uil uil-navigator"></i>
                        </button>
                        <NavLink
                          to="/datos_adicionales"
                          activeClassName="active"
                        >
                          <button className="nextBtn">
                            <span className="btnText">Datos Adicionales</span>
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <br />
        <TablaPacientes />
      </DefaulLayout>
    );
  }
}

export default Pacientes;

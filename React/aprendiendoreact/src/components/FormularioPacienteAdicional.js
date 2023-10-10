import React, { Component } from "react";
import Slider from "./Slider";
import { NavLink } from "react-router-dom";

class FormularioPacienteAdicional extends Component {
  nombreRef = React.createRef();
  apellidoRef = React.createRef();
  bioRef = React.createRef();
  pequenoRef = React.createRef();
  medianoRef = React.createRef();
  grandeRef = React.createRef();

  state = {
    user: {},
  };

  recibirFormulario = (e) => {
    e.preventDefault();
    var edad = "Aun no se sabe";

    if (this.pequenoRef.current.checked) {
      edad = this.pequenoRef.current.value;
    } else if (this.medianoRef.current.checked) {
      edad = this.medianoRef.current.value;
    } else if (this.grandeRef.current.checked) {
      edad = this.grandeRef.current.value;
    } else {
      edad = "Aun no se";
    }

    var user = {
      nombre: this.nombreRef.current.value,
      apellido: this.apellidoRef.current.value,
      bio: this.bioRef.current.value,
      edad: edad,
    };

    this.setState({
      user: user,
    });
    console.log("Formulario Enviado");
    console.log(user);
  };
  render() {
    if (this.state.user.nombre) {
      var user = this.state.user;
    }
    return (
      <React.Fragment>
        <form
          className="full-form"
          onSubmit={this.recibirFormulario}
          onChange={this.recibirFormulario}
        >
          <div className="form-group">
            <label htmlFor="nombre">Nombres</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombres ej. Josué Alfredo"
              ref={this.nombreRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellidos</label>
            <input
              type="text"
              name="apellido"
              placeholder="Apellidos ej. Rodrigez Castillo"
              ref={this.apellidoRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Motivo Consulta</label>
            <textarea name="bio" ref={this.bioRef}></textarea>
          </div>
          <div className="form-group radiobtns">
            <input
              type="radio"
              name="edad"
              value="pequeno"
              ref={this.pequenoRef}
            />
            0 - 18
            <input
              type="radio"
              name="edad"
              value="mediano"
              ref={this.medianoRef}
            />
            18 - 65
            <input
              type="radio"
              name="edad"
              value="grande"
              ref={this.grandeRef}
            />
            65+
          </div>
          <div className="clearfix"></div>
          {/* Mostrar Datos del Formulario */}
          {user && (
            <div id="user-data">
              <p>
                Nombre <strong>{user.nombre}</strong>
              </p>
              <p>
                {" "}
                Apellido <strong>{user.apellido}</strong>
              </p>
              <p>
                Biografia <strong>{user.bio}</strong>
              </p>
              <p>
                Edad <strong>{user.edad}</strong>
              </p>
            </div>
          )}
          <input type="submit" value="Confirmar" className="btn btn-success" />
        </form>

        <br />
        <div id="formulario">
          <Slider title="Formulario" size="slider-small" />
          <div className="center">
            <br />
            <h1>Agregar un nuevo paciente</h1>
            {/* Crearemos un Formulario con React */}
            <div className="formpaciente">
              <div className="formdentro">
                <div id="formularioPaciente">
                  <form action="#">
                    <div className="form second">
                      <div className="details address">
                        <span className="title">Datos adicionales</span>
                        <div className="fields">
                          <div className="input-field">
                            <label>Etnia</label>
                            <input
                              type="text"
                              title="Ej. Maya"
                              placeholder="ingrese la Etnia"
                              required
                            />
                          </div>
                          <div className="input-field">
                            <label>Ocupación</label>
                            <input
                              type="text"
                              placeholder="Ingresa la Ocupación"
                              required
                            />
                          </div>
                          <div className="input-field">
                            <label>Estado Civil</label>
                            <select id="estado_civil" name="estado_civil">
                              <option value="Soltero">Soltero(a)</option>
                              <option value="Casado">Casado(a)</option>
                              <option value="Viudo">Viudo(a)</option>
                              <option value="Separo">Separado(a)</option>
                              <option value="Divorciado">Divorciado(a)</option>
                            </select>
                          </div>
                          <div className="input-field">
                            <label>Número de expediente</label>
                            <input
                              type="number"
                              placeholder="Ingresa el número de expediente"
                              required
                            />
                          </div>
                          <div className="input-field">
                            <label>Diagnóstico</label>
                            <input
                              type="text"
                              placeholder="Ingresa el diagnóstico"
                              required
                            />
                          </div>
                          <div className="input-field">
                            <label>Tratamiento</label>
                            <input
                              type="text"
                              placeholder="Ingresa el tratamiento"
                              required
                            />
                            {/* <!-- <input type="text" placeholder="Ingrese el Genero" required/> --> */}
                          </div>
                        </div>
                      </div>
                      <div className="details ID">
                        <span className="title">Datos de Hospitalización</span>
                        <div className="fields">
                          <div className="input-field">
                            <label>Contacto de Emergencia</label>
                            <input
                              type="text"
                              title="Ej. Frank Javier Molina Torres"
                              placeholder="Nombre del contacto"
                            />
                          </div>
                          <div className="input-field">
                            <label>Teléfono de emergencia</label>
                            <input
                              type="number"
                              placeholder="Teléfono de contacto"
                              required
                            />
                          </div>

                          <div className="input-field">
                            <label>Parentesco de paciente</label>
                            <input
                              type="text"
                              placeholder="Ingresa el parentesco"
                              required
                            />
                          </div>
                          <div className="input-field">
                            <input
                              type="text"
                              placeholder="Ingrese el diagnóstico hospitalario"
                              required
                            />
                            <button className="btnAgregar">Agregar</button>
                          </div>
                          <div className="input-field">
                            <input
                              type="text"
                              placeholder="Ingrese si hubieron complicaciones"
                              required
                            />
                            <button className="btnAgregar">Agregar</button>
                          </div>
                          <div className="input-field">
                            <input
                              type="text"
                              placeholder="Ingrese las operaciones"
                            />
                            <button className="btnAgregar">Agregar</button>
                          </div>

                          <div className="input-field">
                            <label>Estancia</label>
                            <input
                              type="number"
                              placeholder="Ingrese los días de estancia"
                              required
                            />
                          </div>
                          <div className="input-field">
                            <label>Autopsia</label>
                            <select id="autopsia" name="autopsia">
                              <option value="No">No</option>
                              <option value="Si">Si</option>
                            </select>
                          </div>
                          <div className="input-field">
                            <label>Fallecimiento</label>
                            <input
                              type="text"
                              placeholder="Ingrese la causa de fallecimiento"
                            />
                          </div>
                        </div>
                        <div className="buttons">
                          <NavLink to="/login" activeClassName="active">
                            <button className="nextBtn">
                              <span className="btnText">Atrás</span>
                            </button>
                          </NavLink>
                          <button className="saveBtn">
                            <span className="btnText">Guardar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default FormularioPacienteAdicional;

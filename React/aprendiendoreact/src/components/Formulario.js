import React, { Component } from "react";
import Slider from "./Slider";
import { NavLink } from "react-router-dom";

class Formulario extends Component {
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
      </React.Fragment>
    );
  }
}
export default Formulario;

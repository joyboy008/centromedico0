import React, { Component } from "react";
import MiComponente from "../components/MiComponente";
import Sidebar from "./Sidebar";
import Slider from "./Slider";

class SeccionPruebas extends Component {
  state = {
    contador: 0,
  };

  holaMundo(nombre) {
    var texto = <h4>Hola, soy {nombre}</h4>;
    return texto;
  }

  sumar = (e) => {
    this.setState({
      contador: this.state.contador + 1,
    });
  };

  restar = (e) => {
    this.setState({
      contador: this.state.contador - 1,
    });
  };

  render() {
    var buttonString = "Ver más";
    var nombre = "MrRalda";
    return (
      <React.Fragment>
        <Slider title="Nuestros Servicios" btn={buttonString} />
        <div className="center">
          <section id="content">
            <h2 className="subheader">Ultimos Articulos</h2>

            <h2 className="subheader">Funciones</h2>
            {this.holaMundo(nombre)}
            <h2 className="subheader">Componentes</h2>
            <section className="componentes">
              <MiComponente />
              <h2 className="subheader">Estados</h2>
              <p>Contando: {this.state.contador}</p>
              <p>
                <input
                  type="button"
                  value="Decrementar"
                  onClick={this.restar}
                />
                <input type="button" value="Incrementar" onClick={this.sumar} />
              </p>
            </section>
          </section>
          <Sidebar />
        </div>
      </React.Fragment>
    );
  }
}

export default SeccionPruebas;

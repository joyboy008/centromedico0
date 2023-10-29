import React, { Component } from "react";
import Buscador from "./Buscador";
import Slider from "./Slider";

// esto es para crear un nuevo componente
class MiComponente extends Component {
  render() {
    var buttonString = "Ver más";
    let receta = {
      nombre: "Pizza Deliciosa",
      ingredientes: ["Tomate", "Queso", "Jamon Virginia"],
      calorias: 400,
    };

    return (
      <React.Fragment>
        <Slider
          title="Chatea con nosotros para agendar la cita"
          size="slider-small"
        />
        <div className="center">
          <div id="content">
            <h1>{"Receta: " + receta.nombre}</h1>
            <h1>{"Calorias: " + receta.calorias}</h1>
            <ol>
              {receta.ingredientes.map((ingrediente, i) => {
                console.log(ingrediente);
                return <li key={i}>{ingrediente}</li>;
              })}
            </ol>
            {this.props.saludo && (
              <React.Fragment>
                <h1>Desde una Prop:</h1>
                <h3>{this.props.saludo}</h3>
              </React.Fragment>
            )}
            ;
          </div>
          <Buscador />
        </div>
      </React.Fragment>
    );
  }
}

export default MiComponente;

import React, { Component } from "react";
import Sidebarc from "./Sidebarc";
import Slider from "./Slider";

// esto es para crear un nuevo componente
class Agendar extends Component {
  render() {
    return (
      <React.Fragment>
        <Slider
          title="Chatea con nosotros para agendar la cita"
          size="slider-small"
        />
        <div className="center">
          <div id="content">
            <h1>Nuestro chatbot</h1>
          </div>
          <Sidebarc blog="true" />
        </div>
      </React.Fragment>
    );
  }
}

export default Agendar;

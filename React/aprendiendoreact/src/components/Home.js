import React, { Component } from "react";
import Slider from "./Slider";
import Sidebarc from "./Sidebarc";
import Servicios from "./Servicios";

class Home extends Component {
  render() {
    // var buttonString = "Nuestros Servicios";
    return (
      <React.Fragment>
        <Slider title="Nuestros Servicios" size="slider-small" />
        <div className="center">
          <div id="content">
            <h1 className="subheader">Listado de todos los servicios</h1>
            <Servicios />
          </div>
          <Sidebarc blog="true" />
        </div>
      </React.Fragment>
    );
  }
}
export default Home;

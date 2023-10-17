import React, { Component } from "react";
import Sidebarc from "../components/Sidebarc";
import Slider from "../components/Slider";
import DefaulLayout from "../components/DefaultLayout";
import Footer from "../components/Footer";

// esto es para crear un nuevo componente
class Agendar extends Component {
  render() {
    return (
      <React.Fragment>
        <DefaulLayout
          title="Chatea con nosotros para agendar la cita"
          size="slider-small"
        >
          <div className="center">
            <div id="content">
              <h1>Nuestro chatbot</h1>
            </div>
          </div>
        </DefaulLayout>
        <div className="clearfix"></div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Agendar;

import React, { Component } from "react";
import Servicios from "../components/Servicios";
import DefaulLayout from "../components/DefaultLayout";
import Footer from "../components/Footer";

class Home extends Component {
  render() {
    // var buttonString = "Nuestros Servicios";
    return (
      <React.Fragment>
        <DefaulLayout
          title="Nuestros Servicios"
          size="slider-small"
          showSidebar
        >
          <div id="content">
            <Servicios />
          </div>
        </DefaulLayout>
        <div className="clearfix"></div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Home;

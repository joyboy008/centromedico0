import React, { Component } from "react";
import Slider from "./Slider";
import Sidebarc from "./Sidebarc";
import Articles from "./Articles";
class Blog extends Component {
  // Estamos en contacto

  render() {
    return (
      <React.Fragment>
        <Slider title="Blog" size="slider-small" />
        <div className="center">
          <div id="content">
            {/* Listado de Articulos que vendran del api*/}
            <br />
            <Articles />
          </div>
          <Sidebarc blog="true" />
        </div>
      </React.Fragment>
    );
  }
}
export default Blog;

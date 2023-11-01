import React, { Component } from "react";
import InfoServicios from "./Accordion";

class Servicio extends Component {
  render() {
    const { titulo, details, image } = this.props.servicio;

    return (
      <article className="article-item" id="article-template">
        <div className="img-wrap">
          <img src={image} alt={titulo} />
        </div>
        <h2>{titulo}</h2>
        <InfoServicios>{details}</InfoServicios>
        <div className="clearfix"></div>
      </article>
    );
  }
}
export default Servicio;

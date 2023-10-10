import React, { Component } from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md"; // Importar el ícono de correo electrónico

class Sidebarc extends Component {
  render() {
    return (
      <aside id="sidebar">
        {this.props.blog === "true" && (
          <React.Fragment>
            <div id="nav-blog" className="sidebar-item">
              <h3>Dirección</h3>
              <p>5ta. Avenida 1-26 Zona 1</p>
              <p>09023 - La Esperanza, Quetzaltenango, Guatemala</p>
              <p>Telefono: 7797-1444 </p>
            </div>
            <div id="search" className="sidebar-item">
              <h3>Redes Sociales</h3>
              <a
                href="https://www.facebook.com/laesperanzacm/"
                target="_blank"
                className="facebook-link"
              >
                <FaFacebook /> {/* Icono de Facebook */}
              </a>
              <a
                href="https://wa.me/50257389579"
                target="_blank"
                className="whatsapp-link"
              >
                <FaWhatsapp /> {/* Icono de W */}
              </a>
              <a
                href="mailto:tu@email.com"
                target="_blank"
                className="email-link"
              >
                <MdEmail /> {/* Icono de Instagram */}
              </a>
            </div>
          </React.Fragment>
        )}
      </aside>
    );
  }
}

export default Sidebarc;

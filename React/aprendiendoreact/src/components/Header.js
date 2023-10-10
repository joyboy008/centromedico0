import React, { Component } from "react";
import logo from "../assets/images/01-logo.png";
import logo1 from "../assets/images/02-logo.png";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="center">
          <div id="logo">
            <img src={logo} className="app-logo" alt="Logotipo" />
          </div>
          <div id="logo1">
            <img src={logo1} className="app-logo1" alt="Logotipo" />
          </div>

          <nav id="menu">
            <ul>
              <li>
                <NavLink to="/" activeClassName="active">
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink to="/agendar-citas" activeClassName="active">
                  Agendar Citas
                </NavLink>
              </li>
              <li>
                <NavLink to="/contacto" activeClassName="active">
                  Contacto
                </NavLink>
              </li>
              <li>
                <NavLink to="/pacientes" activeClassName="active">
                  Pacientes
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" activeClassName="active">
                  Login
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="clearfix"></div>
        </div>
      </header>
    );
  }
}

export default Header;

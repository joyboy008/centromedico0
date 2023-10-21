import React, { Component } from "react";
import logo from "../assets/images/01-logo.png";
import logo1 from "../assets/images/02-logo.png";
import { NavLink, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import authProvider from "../utils/AuthProvider";
import { Roles } from "../utils/constants";

function Header() {
  const navigate = useNavigate();
  const handleCloseSession = () => {
    authProvider.deleteSession();
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <NavLink to="/">
              <div className="d-flex align-items-center">
                <img className="logo-line" src={logo} alt="Logotipo" />
                <img src={logo1} className="logo-name" alt="Logotipo" />
              </div>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-flex justify-content-end"
          >
            <Nav>
              <Nav.Link>
                <NavLink
                  className="sin-decoration"
                  to="/"
                  activeClassName="active"
                >
                  Inicio
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  className="sin-decoration"
                  to="/agendar-citas"
                  activeClassName="active"
                >
                  Agendar Citas
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  className="sin-decoration"
                  to="/contacto"
                  activeClassName="active"
                >
                  Contacto
                </NavLink>
              </Nav.Link>

              {authProvider.checkRoutePermissions("pacientes") ? (
                <NavDropdown title="Pacientes" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <NavLink className="sin-decoration" to="/pacientes">
                      Registrar Paciente
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink className="sin-decoration" to="/pacientes-listado">
                      Listar Pacientes
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              ) : null}
              {authProvider.checkRoutePermissions("usuarios") ? (
                <NavDropdown title="Usuarios" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <NavLink className="sin-decoration" to="/usuarios">
                      Registrar Usuario
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink className="sin-decoration" to="/usuarios-listado">
                      Listar Usuarios
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
              <NavDropdown title="Session" id="basic-nav-dropdown">
                {!!authProvider.checkAuth() ? (
                  <NavDropdown.Item
                    className="text-danger"
                    onClick={handleCloseSession}
                  >
                    Cerrar Session
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item>
                    <NavLink className="sin-decoration" to="/login">
                      Login
                    </NavLink>
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
             
      </Navbar>
    </>
  );
}

export default Header;

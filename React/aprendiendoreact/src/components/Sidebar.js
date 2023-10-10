import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <aside id="sidebar">
        {this.props.blog === "true" && (
          <div id="nav-blog" className="sidebar-item">
            <h3>Dirección</h3>
            <p>5ta. Avenida 1-26 Zona 1</p>
            <p>09023 - La Esperanza, Quetzaltenango, Guatemala</p>
            <p>Telefono: 7797-1444</p>
          </div>
        )}

        <div id="search" className="sidebar-item">
          <h3>Buscador</h3>
          <p>Encuentra el articulo que buscas..</p>
          <form>
            <input type="text" name="search" />
            <input
              type="submit"
              name="submit"
              value="buscar"
              className="btn btn-success"
            />
          </form>
        </div>
      </aside>
    );
  }
}

export default Sidebar;

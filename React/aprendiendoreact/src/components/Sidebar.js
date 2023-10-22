import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <div className="center">
        <div id="search" className="sidebar-search">
          <h2>Buscador</h2>
          <p>Ingresa los nombres del paciente</p>
          <form>
            <input type="text" className="search" />
            <input
              type="submit"
              name="submit"
              value="buscar"
              className="btn btn-success"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Sidebar;

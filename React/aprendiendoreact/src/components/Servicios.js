import React, { Component } from "react";
import Pelicula from "./Pelicula";
import Sidebar from "./Sidebar";
import Slider from "./Slider";

class Servicios extends Component {
  state = {
    peliculas: [
      {
        titulo: "batman vs spiderman",
        image: "https://i.ytimg.com/vi/9edrbmNxUMU/maxresdefault.jpg",
      },
      {
        titulo: "grandTorino",
        image:
          "https://resizer.iproimg.com/unsafe/880x/filters:format(webp)/https://assets.iprofesional.com/assets/jpg/2020/04/494660.jpg",
      },
      {
        titulo: "Looper",
        image:
          "https://www.apositivar.com/wp-content/uploads/2013/01/looper-poster-quad.jpg",
      },
    ],
    nombre: "MrRalda",
    favorita: {},
  };

  cambiarTitulo = () => {
    var { peliculas } = this.state;
    //var random = Math.floor(Math.random() * 3);
    peliculas[0].titulo = "Cambiando la Pelicula";
    peliculas[0].image =
      "https://www.guatemala.com/fotos/2023/08/Fecha-de-estreno-de-la-pelicula-Blue-Beetle-en-Guatemala-885x500.jpg";

    this.setState({
      peliculas: peliculas, // esto nos puede servir para jalar a los pacientes
    });
  };

  favorita = (pelicula, indice) => {
    // esto lo utilizamos para jalar props del componente hijo
    console.log("marcar favorita");
    console.log(pelicula, "el indice es: ", indice);
    this.setState({
      favorita: pelicula, // esto nos puede servir para jalar a los pacientes
    });
  };

  render() {
    var buttonString = "Ver más";
    var pStyle = {
      background: "green",
      color: "white",
      padding: "10px",
    };
    var favorita;
    if (this.state.favorita.titulo) {
      favorita = (
        <p className="favorita" style={pStyle}>
          <strong>Paciente: </strong>
          <span>{this.state.favorita.titulo}</span>
        </p>
      );
    } else {
      favorita = <p>No hay ningún paciente seleccionado</p>;
    }

    return (
      <React.Fragment>
        <div className="center">
          <div id="content" className="peliculas">
            <h2 className="subheader"> Servicios </h2>
            <p>
              Selección de las peliculas favoritas de:{" "}
              <code className="read-the-docs">{this.state.nombre}</code>
            </p>
            <p>
              <button onClick={this.cambiarTitulo} className="btn btn-success">
                Cambiar Titulo de Batman
              </button>
            </p>
            {/* {this.state.favorita.titulo ? ( // esto es para hacer condiciones
          // esto nos puede servir para jalar a los pacientes
          <p className="favorita" style={pStyle}>
            <strong>Paciente: </strong>
            <span>{this.state.favorita.titulo}</span>
          </p>
        ) : (
          <p>No hay ningún paciente seleccionado.</p>
        )} */}
            {favorita}
            <div id="articles" className="peliculas">
              {this.state.peliculas.map((pelicula, i) => {
                return (
                  <Pelicula
                    key={i}
                    pelicula={pelicula}
                    indice={i}
                    marcarFavorita={this.favorita}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Servicios;

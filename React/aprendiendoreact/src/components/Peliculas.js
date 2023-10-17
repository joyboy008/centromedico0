import React, { Component } from "react";
import Servicio from "./Servicio";
import Sidebar from "./Sidebar";
import Slider from "./Slider";

class Peliculas extends Component {
  state = {
    peliculas: [
      {
        titulo: "Traumatología y Ortopedia",
        details:
          " Nuestro experimentado Dr. Guillermo E. Mendez Escobar se especializa en el tratamiento de lesiones ortopédicas y traumatismos. Ofrecemos atención personalizada para ayudarte a recuperar la movilidad y la calidad de vida.",
        image: "https://i.ytimg.com/vi/9edrbmNxUMU/maxresdefault.jpg",
      },
      {
        titulo: "Medicina Interna",
        details:
          "La Dra. Eunice De Los Angeles Lopez es una experta en medicina interna, brindando un enfoque integral para tratar enfermedades y afecciones médicas. Ofrecemos diagnósticos precisos y un plan de atención completo.",
        image:
          "https://resizer.iproimg.com/unsafe/880x/filters:format(webp)/https://assets.iprofesional.com/assets/jpg/2020/04/494660.jpg",
      },
      {
        titulo: "Ginecología y Obstetricia",
        details:
          "La Dra. Grely Gramajo de Barrios se especializa en ginecología y obstetricia, cuidando de la salud de las mujeres en todas las etapas de la vida. Ofrecemos servicios de atención prenatal y ginecológica excepcionales.",
        image:
          "https://www.apositivar.com/wp-content/uploads/2013/01/looper-poster-quad.jpg",
      },
      {
        titulo: "Fisioterapia",
        details:
          "Nuestro fisioterapeuta, el Lic. Hugo G. Cifuentes De León, se dedica a la rehabilitación física y el alivio del dolor. Te ayudará a recuperar tu funcionalidad y bienestar a través de terapias personalizadas.",
        image:
          "https://resizer.iproimg.com/unsafe/880x/filters:format(webp)/https://assets.iprofesional.com/assets/jpg/2020/04/494660.jpg",
      },
      {
        titulo: "Anestesiología",
        details:
          " Nuestros anestesiólogos, el Dr. Guido Noriega Díaz y la Dra. Mónica García de Ayerdi, garantizan la seguridad y el confort de los pacientes durante procedimientos quirúrgicos. Tu tranquilidad es nuestra prioridad.",
        image:
          "https://www.apositivar.com/wp-content/uploads/2013/01/looper-poster-quad.jpg",
      },
      {
        titulo: "Rayos X y Ultrasonido",
        details:
          "Nuestros radiólogos, el Dr. Carlos W. Santizo R y el Dr. Erick E. Maldonado M, utilizan tecnología avanzada para obtener imágenes precisas y apoyar diagnósticos médicos. Calidad y precisión garantizadas.",
        image: "https://i.ytimg.com/vi/9edrbmNxUMU/maxresdefault.jpg",
      },
      {
        titulo: "Pediatría",
        details:
          "La Dra. Lucky Martínez de Squitin se dedica a la salud de los más pequeños. Ofrecemos atención pediátrica de alta calidad para cuidar de la salud de tus hijos en cada etapa de crecimiento.",
        image:
          "https://resizer.iproimg.com/unsafe/880x/filters:format(webp)/https://assets.iprofesional.com/assets/jpg/2020/04/494660.jpg",
      },
      {
        titulo: "Cirugía General",
        details:
          "El Dr. Carlos Piedrasanta Molina es un cirujano general altamente calificado. Realiza procedimientos quirúrgicos con precisión y cuidado. Tu salud está en buenas manos.",
        image:
          "https://www.apositivar.com/wp-content/uploads/2013/01/looper-poster-quad.jpg",
      },
      {
        titulo: "Laboratorio Clínico",
        details:
          "Nuestro laboratorio clínico, dirigido por la Licda. Iliana Patricia Lopez Gutierrez, proporciona análisis y pruebas confiables para respaldar el diagnóstico médico. Resultados precisos en tiempo récord.",
        image: "https://i.ytimg.com/vi/9edrbmNxUMU/maxresdefault.jpg",
      },
      {
        titulo: "Cardiología y Ecocardiografía",
        details:
          "El Dr. Manuel Aririaga Lopez es un cardiólogo experto en el diagnóstico y tratamiento de enfermedades cardíacas. Ofrecemos servicios de ecocardiografía de vanguardia para cuidar de tu corazón.",
        image: "https://i.ytimg.com/vi/9edrbmNxUMU/maxresdefault.jpg",
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
            <h2 className="subheader"> Peliculas </h2>
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
                  <Servicio
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

export default Peliculas;

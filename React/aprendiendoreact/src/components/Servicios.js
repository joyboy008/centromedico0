import React, { Component } from "react";
import Servicio from "./Servicio";
import Slider from "./Slider";

class Servicios extends Component {
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
  };

  render() {
    return (
      <React.Fragment>
        <div className="center">
          <div id="content" className="peliculas">
            <div id="articles" className="peliculas">
              {this.state.peliculas.map((pelicula, i) => {
                return (
                  <Servicio
                    key={i}
                    servicio={pelicula}
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

import React, { Component } from "react";
import Servicio from "./Servicio";
import Slider from "./Slider";
import nosotros from "../assets/images/nosotros.jpg";
import clinica from "../assets/images/clinica.jpg";
import farmacia from "../assets/images/farmacia.jpg";
import dralucrecia from "../assets/images/dra-lucrecia.jpg";
import horario from "../assets/images/horario.jpg";
import rayosx from "../assets/images/rayos-x.jpg";
import emergencia from "../assets/images/emergencia.jpg";

class Servicios extends Component {
  state = {
    servicios: [
      {
        titulo: "Nosotros",
        details:
          "Nuestra misión es ser un apoyo confiable para la salud de la comunidad, proporcionando servicios médicos integrales y accesibles para todos.",
        image: nosotros,
      },
      {
        titulo: "Traumatología y Ortopedia",
        details:
          " Nuestro experimentado Dr. Guillermo E. Mendez Escobar se especializa en el tratamiento de lesiones ortopédicas y traumatismos. Ofrecemos atención personalizada para ayudarte a recuperar la movilidad y la calidad de vida.",
        image: farmacia,
      },
      {
        titulo: "Cirugía General",
        details:
          "El Dr. Carlos Piedrasanta Molina es un cirujano general altamente calificado. Realiza procedimientos quirúrgicos con precisión y cuidado. Tu salud está en buenas manos.",
        image: nosotros,
      },
      {
        titulo: "Medicina Interna",
        details:
          "La Dra. Eunice De Los Angeles Lopez es una experta en medicina interna, brindando un enfoque integral para tratar enfermedades y afecciones médicas. Ofrecemos diagnósticos precisos y un plan de atención completo.",
        image: horario,
      },
      {
        titulo: "Ginecología y Obstetricia",
        details:
          "La Dra. Grely Gramajo de Barrios se especializa en ginecología y obstetricia, cuidando de la salud de las mujeres en todas las etapas de la vida. Ofrecemos servicios de atención prenatal y ginecológica excepcionales.",
        image: horario,
      },
      {
        titulo: "Fisioterapia",
        details:
          "Nuestro fisioterapeuta, el Lic. Hugo G. Cifuentes De León, se dedica a la rehabilitación física y el alivio del dolor. Te ayudará a recuperar tu funcionalidad y bienestar a través de terapias personalizadas.",
        image: emergencia,
      },
      {
        titulo: "Anestesiología",
        details:
          " Nuestros anestesiólogos, el Dr. Guido Noriega Díaz y la Dra. Mónica García de Ayerdi, garantizan la seguridad y el confort de los pacientes durante procedimientos quirúrgicos. Tu tranquilidad es nuestra prioridad.",
        image: horario,
      },
      {
        titulo: "Rayos X y Ultrasonido",
        details:
          "Nuestros radiólogos, el Dr. Carlos W. Santizo R y el Dr. Erick E. Maldonado M, utilizan tecnología avanzada para obtener imágenes precisas y apoyar diagnósticos médicos. Calidad y precisión garantizadas.",
        image: rayosx,
      },
      {
        titulo: "Pediatría",
        details:
          "La Dra. Lucrecia Martínez de Squitin se dedica a la salud de los más pequeños. Ofrecemos atención pediátrica de alta calidad para cuidar de la salud de tus hijos en cada etapa de crecimiento.",
        image: dralucrecia,
      },

      {
        titulo: "Laboratorio Clínico",
        details:
          "Nuestro laboratorio clínico, dirigido por la Licda. Iliana Patricia Lopez Gutierrez, proporciona análisis y pruebas confiables para respaldar el diagnóstico médico. Resultados precisos en tiempo récord.",
        image: clinica,
      },
    ],
  };

  render() {
    return (
      <React.Fragment>
        <div className="center">
          <div id="content" className="peliculas">
            <div id="articles" className="peliculas">
              {this.state.servicios.map((servicio, i) => {
                return <Servicio key={i} servicio={servicio} indice={i} />;
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Servicios;

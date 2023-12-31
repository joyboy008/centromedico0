import React, { Component } from "react";
import DefaulLayout from "../components/DefaultLayout";
import Footer from "../components/Footer";

class Contacto extends Component {
  render() {
    return (
      <React.Fragment>
        <DefaulLayout title="Contacto" size="slider-small" showSidebar>
          <div className="center">
            <div id="content" className="py-4">
              <h1>Encuéntranos aquí.</h1>
              <br />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123400.05917102644!2d-91.64478891943553!3d14.867189205483935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858e99b45a0edb37%3A0xafebcef1a50167d6!2sCentro%20M%C3%A9dico%20La%20Esperanza!5e0!3m2!1ses!2sgt!4v1692168212850!5m2!1ses!2sgt"
                width="600"
                height="450"
                Pstyle="border:0"
                allowfullscreen=""
                loading="eager"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </DefaulLayout>
        <div className="clearfix"></div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Contacto;

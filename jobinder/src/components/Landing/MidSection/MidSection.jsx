//import React from 'react'
import { FaCheck } from "react-icons/fa";
import profilePic from "../../../assets/img/profile-pic.png"
import { mainColor } from "../../../assets/constants";

const MidSection = () => {
  return (
    <section className="my-3">
      

      <div style={{backgroundColor:`${mainColor}70`}} className="container rounded">
        <div className="row gx-1 ">
          <div className="col-md-3 col-lg-3 d-flex justify-content-center">
            <img
                style={{ width: "150px", height: "150px" }}
              className=" rounded-circle"
              src={profilePic}
              alt="profile-pic-1"
            />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 container-ul">
            <h2
              className="final-text text-start d-sm-text-center"
              style={{
                textShadow:
                  "0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px rgba(60, 64, 67, 0.15)",
              }}
            >
              Encuentra el empleo de tus sueños con Jobinder!{" "}
            </h2>
            <p
              style={{ color: "#565E6CFF" }}
              className="d-sm-text-center slogan "
            >
              Nuestra aplicación te ayudará a encontrar oportunidades laborales
              acordes a tus habilidades y experiencia.
            </p>
            <ul className="check-list list group w-100 ">
              <li className="list-unstyled li-register">
                <FaCheck color="green" className="icon-check" />
                Registro gratuito. Encuentra tu próximo trabajo hoy
              </li>
              <li className="list-unstyled li-register">
                <FaCheck color="green" className="icon-check" />
                Disfruta de ofertas diarias que se ajustan a tu perfil
              </li>
              
              <li className="list-unstyled li-register">
                <FaCheck color="green" className="icon-check" />
                Completa tu perfil en Jobinder para mostrar tu profesionalismo y
                ganar visibilidad{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MidSection
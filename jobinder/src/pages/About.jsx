//import React from 'react'
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import misionPic from "../assets/img/mision1.jpg";
import visionPic from "../assets/img/vision1.jpg";
import valoresPic from "../assets/img/values1.jpg";
//import { text } from "body-parser";

const About = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setTimeout(() => {
      setHovered(true);
    }, 3000);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHovered(false);
    }, 3000);
  };

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
  }, []);
  const iconStyle = {
    width: "5vw",
    height: "5vh",
    color: hovered ? "#232ED1 " : "#004BA8",
    backgroundColor: "transparent",
    transition: "",
    transform: hovered ? "scale(1.2)" : "scale(1)",
    cursor: "pointer",
    opacity: hovered ? "0.7" : "1",
  };
  const style = {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "100vw",
    height: "auto",

    color: "#000",
  };
  const letters = {
    background:
      " -webkit-linear-gradient(90deg, rgb(17, 0, 102), rgb(12, 102, 192))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "center",
    textShadow:
      "0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px rgba(60, 64, 67, 0.15)",
  };

  const Card = ({ image, title, content }) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
      setHovered(true);
    };

    const handleMouseLeave = () => {
      setHovered(false);
    };

    const cardStyle = {
      background: hovered ? "#498ba6 " : "rgba(0, 189, 214, 0.18)",
      borderRadius: "16px",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(2px)",
      WebkitBackdropFilter: "blur(2px)",
      color: hovered ? " #f2f2f2" : "#110066",
      position: "relative",
      overflow: "hidden",
      minHeight: "500px",

    };

    const overlayStyle = {
      content: "",
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      transition: "0.5s",
      background:
        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
    };
    
    if (hovered) {
      overlayStyle.left = "100%";
    }
    //, transform: mover()
    return (
      <div
        className={``}
        style={{ ...cardStyle }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="d-flex justify-content-center align-items-center">
          <img
            className=""
            style={{
              width: "60%",
              
              borderRadius: "20px",
              marginTop: "30px",
              color: "#110066",
            }}
            src={image}
            alt="Card cap"
          />
        </div>
        <div className="card-body-about">
          <h5 className="card-title-about text-center p-2">{title}</h5>
          <p className="p-3" style={{textAlign: "justify"}}>{content}</p>
        </div>
        <div style={overlayStyle}></div>
      </div>
    );
  };

  return (
    <>
      
      <div style={style} className=" mb-3">
        <div className="row gx-5 jd-grid align-items-center">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              marginTop: "40px",
              marginLeft: "30px",
            }}
          >
            <FaHome
              style={iconStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </Link>
          <div className="container mb-5">
            <div className="row">
              <div className="col-md-3 d-flex justify-content-center align-items-center">
                <h1 className="mb-3 mt-5 text-center" style={letters}>
                  Acerca de Jobinder
                </h1>
              </div>
              <div className="col-md-9">
                <div
                  className="p-3"
                  style={{
                    background: "rgba(0, 189, 214, 0.18)",
                    borderRadius: "16px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(5.7px)",
                    WebkitBackdropFilter: "blur(5.7px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    width: "100%",
                  }}
                >
                  <h2 className="m-5 fs-5" style={{textAlign:'justify'}}>
                    Bienvenido a Jobinder, la plataforma líder en búsqueda de
                    empleo dedicada a conectar nuestros usuarios con sus
                    trabajos ideales. Nuestra misión es simplificar el proceso
                    de búsqueda de empleo y ayudar tanto a los candidatos como a
                    los empleadores a encontrar la combinación perfecta. Con
                    nuestros algoritmos de Match avanzados y una interfaz fácil
                    de usar, ahora es más fácil que nunca encontrar
                    oportunidades laborales que se alineen con tus habilidades y
                    preferencias.
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4  ">
            <Card
              image={misionPic}
              title="Misión"
              content="Nuestra misión en Jobinder es simplificar y transformar el proceso de búsqueda de empleo al conectar de manera efectiva a los candidatos con las oportunidades laborales ideales. Buscamos empoderar a los profesionales al proporcionarles herramientas y recursos innovadores que les permitan alcanzar sus metas y desarrollar su potencial. Nos esforzamos por ser líderes en la industria y ser reconocidos como el aliado confiable  para aquellos que buscan oportunidades de empleo."
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 my-3">
            <Card
              image={visionPic}
              title="Visión"
              content="Nuestra visión en Jobinder es ir más allá de ser simplemente una plataforma de búsqueda de empleo, aspiramos a convertirnos en el referente global en el campo de la empleabilidad y el desarrollo profesional. Nos esforzamos por crear un ecosistema inclusivo y dinámico que permita a los candidatos descubrir nuevas oportunidades, desarrollar sus habilidades y alcanzar el éxito en sus carreras. Buscamos ser reconocidos por nuestra innovación constante, calidad excepcional y la creación de un impacto positivo en la vida de las personas a través del empleo."
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 ">
            <Card
              image={valoresPic}
              title="Valores"
              content="
              En Jobinder, nos basamos en valores fundamentales. Buscamos empoderar a los candidatos, brindándoles herramientas y conocimientos para tomar decisiones informadas. Fomentamos la colaboración, estableciendo alianzas estratégicas para maximizar oportunidades. Valoramos la diversidad, creando un entorno inclusivo donde todos son valorados, sin importar su género, raza u orientación sexual. La transparencia es primordial en nuestras interacciones con candidatos y empleadores, proporcionando información clara y honesta para construir una relación de confianza duradera. "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About
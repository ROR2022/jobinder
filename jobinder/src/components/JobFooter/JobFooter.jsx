//import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaBookReader,
  FaWhatsapp,
  FaMapMarked,
  FaShieldAlt,
  FaTiktok,
  FaInfo,
  FaLinkedin,
  FaGithub,
  FaCode
} from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";

import { Link } from "react-router-dom";

const JobFooter = () => {
  return (
    <footer
      className="text-center"
      style={{
        backgroundColor: "#498ba6",
        fontFamily: "Poppins",
      }}
    >
      <Container>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <section className="mb-4 mt-5 d-flex justify-content-center gap-2 w-50">
              <Link
                className="btn btn-outline-info text-white"
                to="https://www.linkedin.com/in/ramiro-ocampo-5a661b1a7/"
                role="button"
              >
                <FaLinkedin />
              </Link>
              <Link
                className="btn btn-outline-info text-white"
                to="https://github.com/ROR2022"
                role="button"
              >
                <FaGithub />
              </Link>
              <Link
                className="btn btn-outline-info text-white"
                to="https://docs.google.com/document/d/104ek8dOTdOU6RcDMtGT-g1T--FWxq2earIDvMZoQ79E/edit?usp=sharing"
                role="button"
              >
                <TiDocumentText />
              </Link>
              <Link
                className="btn btn-outline-info text-white"
                to="https://github.com/ROR2022"
                role="button"
              >
                <FaCode />
              </Link>
            </section>
          </Col>
        </Row>
        <Row className="text-white fs-5">
          <Col>
            <ul className="d-flex justify-content-around flex-wrap list-unstyled col-md-12"></ul>
          </Col>
        </Row>
        <Row className="text-white fs-5">
          <Col>
            <ul
              className="d-flex justify-content-around flex-wrap list-unstyled col-md-12"
              style={{ fontSize: "15px", textDecoration: "none" }}
            >
              <li className="text-footer col-sm-12  col-md-4 col-lg-4 col-xl-4 mb-3 mt-2 w-30">
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to="/PoliticaPrivacidad"
                >
                  {" "}
                  <FaShieldAlt
                    className="mx-4 "
                    style={{ width: "30px", height: "30px" }}
                  />{" "}
                  Políticas de Privacidad{" "}
                </Link>
              </li>
              <li className="text-footer col-sm-12  col-md-4 col-lg-4 col-xl-4 mb-3 mt-2 w-30">
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to="/TerminosyCondiciones"
                >
                  <FaBookReader
                    className="mx-4"
                    style={{ width: "30px", height: "30px" }}
                  />
                  Términos y Condiciones
                </Link>
              </li>
              {/* políticas de privacidad */}
              <li className=" text-footer col-sm-12  col-md-4 col-lg-4 col-xl-4 mb-3 mt-2 w-30">
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to="/About"
                >
                  <FaInfo
                    className="mx-4"
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />{" "}
                  Nosotros{" "}
                </Link>
              </li>

              <li className="text-footer col-sm-12  col-md-4 col-lg-4 col-xl-4 mb-3 mt-2 w-30 d-none">
                <a
                  style={{ color: "inherit", textDecoration: "none" }}
                  href="https://api.whatsapp.com/send?phone=+34613288116&text=%C2%A1Hola%21%20Estoy%20interesado%20en%20la%20%app%20Jobinder.
                  "
                  className="text-decoration-none"
                >
                  {" "}
                  <FaWhatsapp
                    className="mx-4 "
                    style={{ width: "30px", height: "30px" }}
                  />{" "}
                  Contáctanos!{" "}
                </a>
              </li>
              <li className="text-footer col-sm-12  col-md-4 col-lg-4 col-xl-4 mb-3 mt-2 w-30 d-none">
                <a
                  style={{ color: "inherit", textDecoration: "none" }}
                  href="https://www.google.com/maps/place/Kodemia/@19.3958417,-99.1851738,15z/data=!4m6!3m5!1s0x85d1ff670e8593a7:0x412eb750f0bf970c!8m2!3d19.3958417!4d-99.1851738!16s%2Fg%2F11gxmv_zgw?entry=ttu"
                >
                  {" "}
                  <FaMapMarked
                    className="mx-4 "
                    style={{ width: "30px", height: "30px" }}
                  />{" "}
                  Ubicación{" "}
                </a>
              </li>
              
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className=" text-center text-white p-3 w-100">
              © Jobinder 2023. All Rights Reserved.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default JobFooter
//import React from 'react'
import Accordion from "react-bootstrap/Accordion";
import { FaQuestion } from "react-icons/fa";

const FAQSection = () => {
  return (
    <>
      <div
        style={{
          fontFamily: "Poppins",
          color: "#0D324D",
          minHeight: "",
          marginBottom: "50px",
          
        }}
        className="container mb-3"
      >
        <div className="">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <h3
              className="text-center"
              style={{
                background: "rgba(0, 189, 214, 0.18)",

                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5.7px)",
                WebkitBackdropFilter: "blur(5.7px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                width: "100%",
                height: "100px",
                padding: "30px",
              }}
            >
              <FaQuestion
                className="mx-2"
                style={{ width: "30px", height: "30px" }}
              />{" "}
              Preguntas Frecuentes
            </h3>
          </div>
          <Accordion className="">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                ¿Como creo una cuenta en Jobinder?
              </Accordion.Header>
              <Accordion.Body>
                Para crear una cuenta en Jobinder, simplemente sigue estos
                pasos: 1. Visita nuestro sitio web en https://web.jobinder.org/.
                2. Haz clic en el botón <span className="fw-bold">Registrarse</span> en la esquina superior
                derecha. 3. Completa el formulario de registro con tus datos
                personales y de contacto. 4. Haz clic en <span className="fw-bold">Crear cuenta</span> y
                ¡listo! Tu cuenta en Jobinder estará creada y podrás comenzar a
                utilizarla.,
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                No puedo ingresar a mi cuenta / Olvidé de mi contraseña, ¿cómo
                la recupero?
              </Accordion.Header>
              <Accordion.Body>
                1.-Dirígete a la página de Inicio de Sesión de Jobinder: si eres
                candidato https://web.jobinder.org/login-candidato ó a
                https://web.jobinder.org/login-recruiter si eres reclutador
                2.-Haz clic en el enlace <span className="fw-bold">Olvidaste tu Contraseña</span> que se
                encuentra debajo del botón <span className="fw-bold">Enviar</span>. 3.-Se te redirigirá a una
                página donde deberás proporcionar la dirección de correo
                electrónico asociada a tu cuenta Jobinder. 4.-Después de
                ingresar tu dirección de correo electrónico, haz clic en el
                botón <span className="fw-bold">Enviar</span>. 5.- Revisa tu bandeja de entrada en el correo
                electrónico proporcionado. Deberías recibir un correo de
                Jobinder con instrucciones para restablecer tu contraseña.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                ¿Cómo me postulo a una vacante?
              </Accordion.Header>
              <Accordion.Body>
                1.- Inicia sesión en tu cuenta. Ve al panel de inicio y dirígete
                a la sección de Jobinder dentro de la página <span className="fw-bold">Buscar</span>. Puedes
                acceder a ella a través del siguiente enlace:
                https://web.jobinder.org/dashboard-candidato/search#home 2.-
                Explora las vacantes disponibles. Una vez dentro de la sección
                de Jobinder, podrás ver la lista de vacantes disponibles. Cada
                vacante tiene información sobre la empresa, el título de la
                vacante, el tipo de trabajo, la modalidad y el salario. 3.-
                Revisa los detalles de la vacante que te interesa. Observa el
                título de la vacante y la empresa que la ofrece para asegurarte
                de que sea la posición que deseas. Te recomendamos que no te
                postules a las ofertas en las que no cumples con los requisitos
                mínimos, ya que no serás tomado en cuenta para el puesto. 4.-
                Postúlate a la vacante. Cuando encuentres la vacante que te
                interesa, haz clic en el botón <span className="fw-bold">Aplicar</span>. 5.- Envía tu
                postulación. Una vez que hayas completado el formulario, busca
                el botón <span className="fw-bold">Enviar</span> y ¡Listo! ya has postulado a tu primera
                vacante.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                ¿Por qué las empresas no leen mi CV y/o no me llaman?
              </Accordion.Header>
              <Accordion.Body>
                Las empresas reciben una gran cantidad de CVs por cada aviso que
                publican. Para facilitar el proceso de selección, Jobinder
                brinda herramientas para filtrar a los candidatos según los
                requisitos del puesto. Durante el filtrado, muchos candidatos
                pueden ser descartados por no cumplir con los requisitos o por
                criterios definidos por la empresa, incluso antes de ser leídos.
                Para maximizar tus chances de avanzar, te sugerimos postularte a
                avisos en los que cumplas con todos los requisitos solicitados.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>¿Cómo cambio mi contraseña?</Accordion.Header>
              <Accordion.Body>
                1.- Ingresa a la página de inicio de sesión. Abre tu navegador
                web y dirígete a la página de Jobinder:
                https://web.jobinder.org/login-candidato ó a
                https://web.jobinder.org/login-recruiter si eres reclutador 2.-
                Si olvidaste tu contraseña o deseas cambiarla por seguridad,
                busca en la página de inicio de sesión el enlace que dice
                <span className="fw-bold">Olvidaste tu Contraseña?Cambia tu Contraseña.</span> y haz clic en
                él. 3.- Solicita el código de verificación. Una vez que hayas
                ingresado tu correo electrónico, Jobinder enviará un código de
                verificación a dirección de corre electrónico. 4.- Revisa tu
                correo electrónico. Accede a tu bandeja de entrada y busca el
                mensaje de Jobinder con el código de verificación. Si no
                encuentras el correo, revisa la carpeta de spam o correo no
                deseado. 5.- Ingresa el código de verificación. Una vez que
                recibas el correo con el código, ahora en la misma sección te
                aparecerá la opción de modificar contraseña inmediatamente si
                ingresaste el código válido.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  )
}

export default FAQSection
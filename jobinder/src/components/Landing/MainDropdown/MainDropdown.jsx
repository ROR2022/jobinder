import Dropdown from "react-bootstrap/Dropdown";


const MainDropdown = () => {
  return (
    <div className="d-flex gap-2 mt-2 me-2">
    <Dropdown className="px-3">
        <Dropdown.Toggle
          as="div"
          className="btn btn-outline-info text-white"
          style={{
            width: "100px",
            fontSize: "12px",
            padding: "12px",
            cursor: "pointer",
          }}
        >
          Iniciar sesión
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/login?role=recrutier">Soy Reclutador</Dropdown.Item>
          <Dropdown.Item href="#/login?role=candidate">Soy Candidato</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Utilizamos el componente Button2 y pasamos las mismas propiedades que al primer botón */}
      <Dropdown className="d-none">
        <Dropdown.Toggle
          as="div"
          className="btn btn-outline-info text-white"
          style={{
            width: "100px",
            fontSize: "12px",
            padding: "12px",
            cursor: "pointer",
          }}
        >
          Registrarse
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="register-recruiter">
            Soy Reclutador
          </Dropdown.Item>
          <Dropdown.Item href="register-candidato">Soy Candidato</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>
  )
}

export default MainDropdown
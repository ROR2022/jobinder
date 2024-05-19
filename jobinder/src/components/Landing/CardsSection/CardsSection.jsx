import { useMediaQuery } from "react-responsive";
import { FaUserTie, FaCode } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const CardsSection = () => {

    const navigate = useNavigate();
    const handleClickCandidate = () => {
        //window.location.href = "/login-candidato";
        navigate("/login?role=candidate");
      };
      const handleClickRecruiter = () => {
        //window.location.href = "/login-recruiter";
        navigate("/login?role=recrutier");
      };
      const isMobile = useMediaQuery({
        query: "(max-width: 436px)",
      });
  return (
    <section className="container mb-3">
      <div className="">
        <div className="row d-flex justify-content-center align-items-center gap-4 ">
          <div className="col-12 col-md-5 bg-info bg-opacity-50 rounded ">
            
            <div className="cartas" style={{ cursor: "pointer", minHeight:'300px' }}>
              
              <div className="d-flex justify-content-center align-items-center">
                <FaUserTie
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "35px",
                    color: "black",
                    marginTop: "20px",
                  }}
                />
              </div>

              <div className="card-body-1 ">
                <h5 className="card-title text-center">¿Eres Reclutador?</h5>
                <p className="card-text text-center">
                  Accede a nuestra plataforma para publicar tus vacantes, buscar
                  talentos y gestionar tus procesos de selección.
                </p>
                <div
                  className="d-flex justify-content-center align-items-center"
                  onClick={handleClickRecruiter}
                >
                  <Button
                    className="text-white"
                    style={{ 
                        cursor: "pointer",
                        borderRadius: "10px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        width: "250px",
                        height: "50px",
                        backgroundColor: "#106973",
                        fontSize: isMobile ? "10px" : "14px",
                        padding: isMobile ? "10px" : "10px : 10px 20px 10px 20px",
                        border: "none",
                        
                    }}
                  >
                    Acceder como reclutador
                    </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 bg-info bg-opacity-50 rounded ">
            <div className="cartas" style={{ cursor: "pointer", minHeight:'300px' }}>
              

              <div className="d-flex justify-content-center align-items-center">
                <FaCode
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "30px",
                    color: "black",
                    marginTop: "20px",
                  }}
                />
              </div>
              <div className="card-body-1 ">
                <h5 className="card-title text-center">¿Eres Candidato?</h5>
                <p className="card-text text-center">
                  Encuentra las mejores ofertas de trabajo, aplica a las
                  vacantes de las empresas más importantes, ahora mismo.
                </p>

                <div
                  className="d-flex justify-content-center align-items-center"
                  onClick={handleClickCandidate}
                >
                  <Button
                    className="text-white"
                    style={{ 
                        cursor: "pointer",
                        borderRadius: "10px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        width: "250px",
                        height: "50px",
                        backgroundColor: "#106973",
                        fontSize: isMobile ? "10px" : "14px",
                        padding: isMobile ? "10px" : "10px : 10px 20px 10px 20px",
                        border: "none",
                        
                    }}
                  >
                    Acceder como candidato
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardsSection
import {useState, useEffect} from 'react'
import { Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSearch, FaSuitcase, FaSignOutAlt, FaCheckDouble } from "react-icons/fa";
import useJob from "../../hooks/useJob";
import logo from "../../assets/img/logo.png";
import PropTypes from 'prop-types';
import { mainColor } from "../../assets/constants";
import InfoModal from "../InfoModal/InfoModal";




const JobOffCanvas = ({ showOffcanvas, handleShowOffcanvas }) => {
    /* const [
        dataCandidate,
        setDataCandidate,
        dataRecruiter,
        setDataRecruiter,
        dataLocalStorage,
        setDataLocalStorage,
      ] = useJob(); */
      const {1:setDataCandidate, 3:setDataRecruiter, 4:dataLocalStorage, 5:setDataLocalStorage} = useJob();
      const navigate = useNavigate();
      const [showModal, setShowModal] = useState(false);
        const [dataModal, setDataModal] = useState({});
        const [confirmModal, setConfirmModal] = useState(false);
        const [role, setRole] = useState("");
        

        useEffect(() => {
            if (confirmModal===true) {
                setDataLocalStorage({});
                setDataCandidate({});
                setDataRecruiter({});
                navigate("/");
            }
        }, [confirmModal]);

        useEffect(() => {
          const tempRole = dataLocalStorage?.role;
            if (tempRole&&tempRole !== "") {
              setRole(tempRole);
              //console.log("Role: ", tempRole);
            }
            
          }, []);


      const logout = (e) => {
        e.preventDefault();
        console.log("Cerrando Sesión:...");
        setDataModal({
            title: "Cerrar Sesión",
            description: "Estas Seguro de Cerrar Sesión?",
            severity: "error",
            isConfirm: true,
            });
            setShowModal(true);
        /* Swal.fire({
          title:'Estas Seguro de Cerrar Sesión',
          confirmButtonText:'Cerrar Sesión',
          confirmButtonColor:'green',
          showCancelButton: true,
          cancelButtonText:'Cancelar',
          cancelButtonColor:'red',
          icon:'warning',
          }).then((result) => {
          if (result.isConfirmed) {
            setDataLocalStorage({});
            setDataCandidate({});
            setDataRecruiter({});
            navigate("/");
          }
        }); */
      };
    
      return (
        <>
        {showModal && (
                <InfoModal
                dataModal={dataModal}
                showInfoModal={showModal}
                setShowInfoModal={setShowModal}
                setConfirmModal={setConfirmModal}
                />
            )}
          <Offcanvas
            show={showOffcanvas}
            onHide={handleShowOffcanvas}
            className=""
            style={{ backgroundColor: `${mainColor}`}}
            
          >
            <Offcanvas.Header closeButton className=" offcanvas-header">
              <Link to={"/"} className="logo-jobinder d-flex justify-content-center align-items-center w-100">
                <img
                  src={logo}
                  className="my-2 ms-2 hoverImage bg-light bg-opacity-25 rounded"
                  alt="logoJobinder"
                  style={{ width: "150px", height: "50px", margin: "50px 0 20px" }}
                />
              </Link>
            </Offcanvas.Header>
            <Offcanvas.Body className="offcanvas-body">
              <div
                onClick={handleShowOffcanvas}
                className="d-flex flex-column columns"
              >
                
                <Link to={ role==='candidate'?`/candidateProfile`:'/recrutierProfile'} className="btn btn-outline-info text-white d-flex justify-content-start align-items-center gap-2 mb-2">
                  <FaUser className="icons" />{" "}
                  <span className="text fs-6">Perfil</span>
                </Link>
                <Link to={role==='candidate'?'/searchVacancies':'/vacancies'} className="btn btn-outline-info text-white d-flex justify-content-start align-items-center gap-2 mb-2">
                  {role==='candidate'?
                  <FaSearch className="icons" />
                  :
                  <FaSuitcase className="icons" />
                  }
                  
                  <span className="text fs-6">{role==='candidate'?'Buscar Vacantes':'Vacantes'}</span>
                </Link>
                <Link to={role==='candidate'?'/myVacancies':'/applicants'} className="btn btn-outline-info text-white d-flex justify-content-start align-items-center gap-2 mb-2">
                {role==='candidate'?
                  <FaSuitcase className="icons" />
                  :
                  <FaCheckDouble className="icons" />
                  }
                  <span className="text fs-6">{role==='candidate'?'Mis Vacantes':'Aplicantes'}</span>
                </Link>
                
                  <button
                    type="button"
                    onClick={logout}
                    className="btn btn-outline-info text-white d-flex justify-content-start align-items-center gap-2"
                    
                  >
                    <FaSignOutAlt className="icons" />
                    <span className="text fs-6">Cerrar Sesión</span>  
                  </button>
                  
                
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      );
    }

    JobOffCanvas.propTypes = {
        showOffcanvas: PropTypes.bool,
        handleShowOffcanvas: PropTypes.func,
        };

export default JobOffCanvas
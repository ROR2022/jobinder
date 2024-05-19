import {useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Button, OverlayTrigger, Tooltip, Dropdown } from "react-bootstrap";
import { FaBars, FaUser, FaSignOutAlt } from "react-icons/fa";
import useJob from "../../hooks/useJob";
//import OffCanvasCandidate from "../OffCanvas/OffCanvasCandidate";
import JobOffCanvas from './JobOffCanvas';
import tempImgUser from "../../assets/img/tempImgUser.png";
import logo from "../../assets/img/logo.png";
import logoSmall from "../../assets/img/logoSmall-removebg-preview.png";
import ImageProfile from "./ImageProfile";
import { mainColor } from '../../assets/constants';

const LoggedNavbar = () => {
    const navigate = useNavigate();
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [
      dataCandidate,
      setDataCandidate,
      dataRecruiter,
      setDataRecruiter,
      dataLocalStorage,
      setDataLocalStorage,
    ] = useJob();
  
    const [isErrorImg, setIsErrorImg] = useState(null);
    const [isLoadImg, setIsLoadImg] = useState(null);
    const [imgUserUrl, setImgUserUrl] = useState(
      dataLocalStorage?.avatar_url ? dataLocalStorage?.avatar_url : tempImgUser
    );
    const [nameUser, setNameUser] = useState("Bienvenido!");
    const [role, setRole] = useState("");
  
    useEffect(() => {
      /* if(isErrorImg===true){
        console.log('Error al cargar la Imagen:...')
        whileErrorImg();
      }
      if(isLoadImg===true){
        console.log('Imagen Carganda con exito:...')
      } */
      //console.log("Avatar URL USER:..", dataCandidate.avatar_url);
      //console.log("Reloading Navbar:...", imgUserUrl);
    }, [imgUserUrl]);
  
    useEffect(() => {
      if(dataLocalStorage?.role){
        setRole(dataLocalStorage.role);
      }
      
      if (dataLocalStorage?.avatar_url) {
        setImgUserUrl(dataLocalStorage.avatar_url);
      }
      if (dataLocalStorage?.email && dataLocalStorage?.email !== "") {
        setNameUser(`${dataLocalStorage.name || dataLocalStorage.email} ${dataLocalStorage.last_name || ""}`);
      }
    }, [dataLocalStorage, dataCandidate]);
  
    const whileErrorImg = () => {
      setIsErrorImg(null);
      setIsLoadImg(null);
    };
  
    const handleError = () => {
      //console.log("Error al cargar Imagen(handleError):...");
      setImgUserUrl(tempImgUser);
      //setIsErrorImg(true);
      //setIsLoadImg(false);
    };
  
    const handleLoad = () => {
      //console.log("Imagen Carganda con exito(handleLoad):...");
      setImgUserUrl(dataCandidate.avatar_url);
      //setIsLoadImg(true);
      //setIsErrorImg(false);
    };
    const placement = "bottom";
    const [showDropdown, setShowDropdown] = useState(false);
    const [onSuccessImg, setOnSuccessImg] = useState(false);
  
    const goHome = () => {
      if (onSuccessImg === true) navigate("/");
  
      //setOnSuccessImg(false);
    };
    const handleDropdownToggle = () => {
      //console.log("Muestrame el DropDown:...");
      setShowDropdown((prev) => !prev);
    };
  
    const handleDropdownSelect = (eventKey) => {
      //console.log("opción seleccionada:", eventKey);
    };
    // console.log("dataCandidate...", dataCandidate);
    // console.log("dataRecruiter...", dataRecruiter);}
  
    const handleShowOffCanvas = () => {
      setShowOffcanvas((prev) => !prev);
    };
  
    const logout = () => {
      setDataLocalStorage({});
      setDataCandidate({});
      setDataRecruiter({});
      navigate("/");
    };
  
    return (
      <Navbar style={{backgroundColor:mainColor}} expand="lg" className="nav w-100">
        <Container className="container-fluid contenedor">
          <Navbar.Brand  className="logo d-flex align-items-center gap-2">
            {" "}
            
            <Button
              variant="outline-info"
              style={{ height: "40px", width: "40px" }}
              onClick={handleShowOffCanvas}
              className="toggle d-flex justify-content-center align-items-center "
            >
              <FaBars />
            </Button>
            <Link to="/">
              <img
                src={logoSmall}
                width={"50px"}
                alt="Logo"
                className="my-2 ms-2 hoverImage bg-light bg-opacity-25 rounded d-md-none"
              />
            </Link>
            <Link to="/">
              <img
                src={logo}
                width={"150px"}
                alt="Logo"
                className="d-none d-md-block my-2 ms-2 hoverImage bg-light bg-opacity-25 rounded"
              />{" "}
            </Link>
          </Navbar.Brand>
          <JobOffCanvas
            showOffcanvas={showOffcanvas}
            handleShowOffcanvas={handleShowOffCanvas}
          />
  
          <div className=" d-flex justify-content-end align-items center gap-2">
            <p className=" ">
              {" "}
              <span className="d-none d-md-block ">
                {nameUser}
              </span>
            </p>
  
            <OverlayTrigger
              style={{ cursor: "pointer" }}
              placement={placement}
              overlay={
                <Tooltip
                  className={showDropdown ? "d-none" : ""}
                  id={`tooltip-${placement}`}
                >
                  Welcome Back! {dataLocalStorage.email}
                </Tooltip>
              }
            >
              <div>
                <ImageProfile
                  src={imgUserUrl}
                  onSuccessImg={onSuccessImg}
                  setOnSuccessImg={setOnSuccessImg}
                  goHome={goHome}
                  placeholderSrc={tempImgUser}
                  handleDropdownToggle={handleDropdownToggle}
                  width="30px"
                />
                
  
                {showDropdown && (
                  <Dropdown.Menu
                    show={showDropdown}
                    align="end"
                    onSelect={handleDropdownSelect}
                    style={{
                      background: "#f2f2f2",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(5px)",
                      WebkitBackdropFilter: "blur(5px)",
                      border: "1px solid rgba(119, 197, 229, 0.3)",
                    }}
                  >
                    <Dropdown.Item
                      eventKey="opcion1"
                      style={{
                        color: "#498BA6",
                        fontFamily:
                          "Poppins, sans-serif, Verdana, Geneva, Tahoma",
                      }}
                      as={Link}
                      to={role === "candidate" ? "/candidateProfile" : "/recrutierProfile"}
                    >
                      <FaUser /> Mi Perfil
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="opcion2"
                      style={{
                        color: "#498BA6",
                        fontFamily:
                          "Poppins, sans-serif, Verdana, Geneva, Tahoma",
                      }}
                      onClick={logout}
                    >
                      <FaSignOutAlt /> Cerrar Sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                )}
              </div>
            </OverlayTrigger>
          </div>
        </Container>
      </Navbar>
    );
  };

export default LoggedNavbar
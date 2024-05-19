import {useState,useEffect} from 'react'
import { useParams, useSearchParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
//import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { findUserService, sendCodeService, updatePasswordService } from '../../api/api';
import InfoModal from '../InfoModal/InfoModal';
//import { set } from 'mongoose';

const expEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const initData = {
  email: "",
  accessCode: "",
  userCode: "",
  password: "",
  confirmPassword: "",
};

const UpdatePassword = () => {
    const { email } = useParams();
    const [accessCode, setAccessCode] = useState(null);
    const [isConfirmCode, setIsConfirmCode] = useState(false);
    const [dataFormUpdate, setDataFormUpdate] = useState(initData);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidUserCode, setIsValidUserCode] = useState(false);
    const [erroUserCode, setErroUserCode] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [searchParams]= useSearchParams();
    const [role, setRole] = useState(searchParams.get("role"));
    //const navigate = useNavigate();
  
    useEffect(() => {
      if (email !== "none") {
        //console.log("Email USER:..", email);
        validateEmail(email);
      }
    }, []);
  
    const validateEmail = (emailUser) => {
      const resultValidate = expEmail.test(emailUser);
      setIsValidEmail(resultValidate);
      //console.log('resultVAlidateEmail:..',String(resultValidate));
      return resultValidate;
    };
  
    useEffect(() => {
      if (accessCode !== "") {
        setDataFormUpdate({
          ...dataFormUpdate,
          accessCode: String(accessCode),
        });
      }
    }, [accessCode]);
  
    useEffect(() => {
      if (accessCode && dataFormUpdate.accessCode === dataFormUpdate.userCode) {
        setIsConfirmCode(true);
      }
    }, [dataFormUpdate.accessCode, dataFormUpdate.userCode]);
  
    useEffect(() => {
      if (email !== "none") {
        setDataFormUpdate({
          ...dataFormUpdate,
          email: email,
        });
      }
    }, [email]);
  
    useEffect(() => {
      validateEmail(dataFormUpdate.email);
    }, [dataFormUpdate.email]);
  
    useEffect(() => {
      validateUserCode(dataFormUpdate.userCode);
      if (
        isValidUserCode &&
        dataFormUpdate.userCode !== dataFormUpdate.accessCode
      ) {
        setErroUserCode(true);
      }
      if (dataFormUpdate.userCode === dataFormUpdate.accessCode) {
        setErroUserCode(false);
      }
    }, [dataFormUpdate.userCode]);
  
    const validateUserCode = (code) => {
      if (code.length > 6) {
        setIsValidUserCode(false);
        return;
      }
      if (!isNaN(parseInt(code, 10))) {
        setIsValidUserCode(false);
        return;
      }
      setIsValidUserCode(true);
      return;
    };
  
    const searchEmailInDB = async (emailUser) => {
      try {
        const resFindUser = await findUserService(emailUser);
        const isFoundUser = resFindUser?.email;
        console.log('resultado de busqueda de usuario:..',resFindUser);
        return isFoundUser;
      } catch (error) {
        console.log(error);
      }
    };
  
    const enviarCodigo = async (emailUser) => {
      try {
        const resSendCode = await sendCodeService(emailUser);
        const backCode = resSendCode?.code;
        if (backCode) {
          setAccessCode(backCode);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleChange = (e) => {
      setDataFormUpdate({
        ...dataFormUpdate,
        [e.target.name]: e.target.value.trim(),
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      //console.log("Valores del form:..", dataFormUpdate);
  
      if (
        dataFormUpdate.password !== "" &&
        dataFormUpdate.confirmPassword === dataFormUpdate.password
      ) {
        //const { userURL } = endpointsGral;
  
        try {
          
          const response = await updatePasswordService(dataFormUpdate);
          const updatedPassword = response?.user?.email;
          if (updatedPassword) {
            console.log("Muy bien! Tu Contraseña ha sido Actualizada!");
            setDataModal({
              title: "Contraseña Actualizada",
              description: "Muy bien! Tu Contraseña ha sido Actualizada!",
              severity: "success",
            });
            setShowModal(true);
          } else {
            
            console.log("Error! Email no encotrado!");
            setDataModal({
              title: "Error!",
              description: "Email no encotrado!",
              severity: "error",
            });
            setShowModal(true);
          }
        } catch (error) {
           console.log(error);
        }
      }
    };
  
    const handleSendCode = async () => {
      if (!isValidEmail) return;
  
      try {
        const resultSearch = await searchEmailInDB(dataFormUpdate?.email);
        if (resultSearch) {
          //console.log('enviando AccessCode:..');
          await enviarCodigo(dataFormUpdate?.email);
        } else {
          /* Swal.fire("Error!", "Email no encotrado!", "error").then(navigate("/")); */
            console.log("Error! Email no encotrado!");
        }
      } catch (error) {
        console.log(error)
      }
    };
  
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
    const loginInit = {
      fontFamily: "Poppins",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      color: "#000",
  
      minHeight: "450px",
      display: "flex",
      alignItmes: "center",
      justifyContent: "center",
    };
  
    const glass = {
      borderRadius: "16px",
      boxShadow:
        "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      width: "500px",
      marginTop: "50px",
      marginBottom: "50px",
      height: "100%",
      padding: isMobile ? "30px" : "90px",
    };
    return (
      <>
        <div style={loginInit}>
        {showModal && (
                <InfoModal
                dataModal={dataModal}
                showInfoModal={showModal}
                setShowInfoModal={setShowModal}
                />
            )}
          <div className="ms-auto me-auto my-3" style={glass}>
            {/* <NavbarCandidate /> */}
            <h2>Actualizando Contraseña</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className={accessCode ? "d-none" : "mb-3"}
                controlId="formBasicEmail"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={dataFormUpdate.email}
                  onChange={handleChange}
                />
              </Form.Group>
              {!isValidEmail && (
                <Form.Text className="text-danger">
                  Ingresar un email valido
                </Form.Text>
              )}
              <div className={accessCode ? "d-none" : ""}>
                <Form.Label className={isValidEmail ? "d-block" : "d-none"}>
                  Se te enviara un codigo a tu email.
                </Form.Label>
                <Button
                  type="button"
                  onClick={handleSendCode}
                  disabled={!isValidEmail}
                >
                  Enviar Codigo
                </Button>
              </div>
              {accessCode && !isConfirmCode && (
                <>
                  <Form.Group className="mb-3" controlId="formBasicEmail2">
                    <Form.Label>
                      Captura el código de acceso que fue enviado a tu email:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Access Code"
                      name="userCode"
                      value={dataFormUpdate.userCode}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {erroUserCode && (
                    <Form.Text className="text-danger d-block">
                      Error en el codigo de acceso
                    </Form.Text>
                  )}
                </>
              )}
              {isConfirmCode && (
                <>
                  <h3>Ahora puedes ingresar tu nueva Contraseña</h3>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={dataFormUpdate.password}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="confirmPassword"
                      value={dataFormUpdate.confirmPassword}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Guardar
                  </Button>
                </>
              )}
            </Form>
          </div>
        </div>
        
      </>
    );
  };

export default UpdatePassword
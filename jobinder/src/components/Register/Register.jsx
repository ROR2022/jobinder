import {useState,useEffect} from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { findUserService, registerService, sendCodeService } from '../../api/api';
import logo from '../../assets/img/logo.png'
import InfoModal from '../InfoModal/InfoModal';
//import { set } from 'mongoose';
import useJob from '../../hooks/useJob'




let previousTitle = document.title;

window.addEventListener("blur", () => {
  previousTitle = document.title;
  document.title = "Haz crecer tu carrera con Jobinder";
});

window.addEventListener("focus", () => {
  document.title = previousTitle;
});
const initDataForm = {
  email: "",
  password: "",
  confirmPassword: "",
  role: "candidato",
  code: "",
  backCode: "",
};

const profileSchema = Yup.object().shape({
  email: Yup.string()
    .required("Favor de ingresar correo")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Favor de Ingresar un email valido"
    ),
  password: Yup.string()
    .required("Ingresar el password")
    .min(8, "El password debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "La contraseña debe tener entre 8 y 10 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico."
    ),
  confirmPassword: Yup.string()
    .required("Confirma Password")
    .min(8, "El password debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "La contraseña debe tener entre 8 y 10 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico."
    )
    .oneOf([Yup.ref("password"), null], "El password no coincide"),
});

const Register = () => {
    const navigate = useNavigate();
    const [dataForm, setDataForm] = useState(initDataForm);
    const [showPassword, setShowPassword] = useState(false);
    const [isResgitering, setIsResgitering] = useState(false);
    const [isConfirmEmail, setIsConfirmEmail] = useState(false);
    const [dataModal, setDataModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
  
    const [isChecked, setIsChecked] = useState(false);
    const [searchParams] = useSearchParams();
    const [role, setRole] = useState(searchParams.get("role")); 
    //const role = searchParams.get("role");
  
    //const [isInformationUser, setInformationUser] = useState([]);
    /* const [
      dataCandidate,
      setDataCandidate,
      dataRecruiter,
      setDataRecruiter,
      dataLocalStorage,
      setDataLocalStorage,
    ] = useJob(); */
    const {5:setDataLocalStorage}=useJob();
    /* const fetchUser = async () => {
      const response = await axios.get(endpointsGral.userURL);
      const dataInformation = response.data["item"];
      if (dataInformation) {
        setInformationUser(dataInformation["docs"]);
      } else {
        //console.log("error infoSkill");
      }
    }; */
    useEffect(() => {
      // if()
      //fetchUser();
    }, []);
  
    useEffect(() => {
      if (
        dataForm.code !== "" &&
        dataForm.code.trim() === String(dataForm.backCode)
      ) {
        setIsConfirmEmail(true);
      } else {
        setIsConfirmEmail(false);
      }
    }, [dataForm.code, dataForm.backCode]);
  
    const onFormInputChange = (event) => {
      const Input = event.target.id;
      const InputValue = event.target.value;
  
      setDataForm({
        ...dataForm,
        [Input]: InputValue,
      });
    };
  
    const confirmAccesCode = async (values) => {
      
      try {
        const response = await sendCodeService(values.email);
        console.log("responseConfirmEmail:..", response);
         setDataForm({
          ...values,
          backCode: response?.code,
          role: role,
        }); 
      } catch (error) {
        console.log(error);
      }
    };
  
    const searchUserInDB = async (email) => {
      try {
        const response = await findUserService(email);
        console.log("response searchUserInDB:..", response);
        if (response?.user) {
          //console.log('Email duplicado (no puede continuar):...')
          return true;
        } else {
          //console.log('Puede continuar con su registro:...')
          return false;
        }
      } catch (error) {
        //console.log(error);
      }
    };
  
    const handleCheckboxChange = () => {
      setIsChecked(prev=>!prev);
    };
  
    const handleSubmit = async (values) => {
      
      const dataRepet = await searchUserInDB(values.email);
      //console.log("dataRepet:..", dataRepet);
      if (dataRepet === true) {
        
        setDataModal({
          title: "Error al registrar!",
          description: "Este correo ya tiene una cuenta, inicia sesión!",
          severity: "error",
        })
        setShowModal(true);
        console.log("Este correo ya tiene una cuenta, inicia sesión!");
      } else {
        if (!isChecked) {
          // console.log('acepta terminos y condiciones')
          
          setDataModal({
            title: "Ups!",
            description: "Por favor acepta nuestros términos y condiciones!",
            severity: "error",
          })
            setShowModal(true);
            console.log("Por favor acepta nuestros términos y condiciones!");
        } else {
          setIsResgitering(true);
          confirmAccesCode(values);
        }
        // //console.log("agregalo");
      }
    };
  
    const registerRecruiter = async () => {
      // if (formValues.role === "candidato") {
      try {
        const register = await registerService(dataForm);
        //setDataForm(register);
        console.log("datos de Registro:..", register);
        console.log("Registro Exitoso:..", register?.user);
        //setDataLocalStorage({ ...register?.data });
        if (register?.user) {
          console.log("Bienvenido! Por favor completa tu perfil!");
        setDataModal({
          title: "Registro Exitoso!",
          description: "Bienvenido! Por favor completa tu perfil!",
          severity: "success",
        })
        setShowModal(true);
        setDataLocalStorage({ ...register?.user });
        navigate(`/`);
      } else {
        setDataModal({
          title: "Error al registrar!",
          description: register.error||"Error al registrar!",
          severity: "error",
        })
        setShowModal(true);
        console.log("Error al registrar:..");
      }
        
      } catch (error) {
        
        setDataModal({
          title: "Error al registrar!",
          description: "Error al registrar!",
          severity: "error",
        })
        setShowModal(true);
        console.log("error al registrar:..", error);
      }
    };
  
    const handleConfirmEmail = () => {
      
      if (dataForm.code === "") {
        
        setDataModal({
          title: "Error al registrar código!",
          description: "Ingresa el código de verificación enviado a tu correo!",
          severity: "error",
        })
        setShowModal(true);
        console.log("Ingresa el código de verificación enviado a tu correo!");
      } else {
        if (isConfirmEmail === true) {
          registerRecruiter();
          //console.log("Email confirmado con Exito:..");
        } else {
          
          setDataModal({
            title: "Error!",
            description: "Código de Acceso Incorrecto!",
            severity: "error",
          })
          setShowModal(true);
            console.log("Código de Acceso Incorrecto!");
        }
      }
    };
  
    
  
    const glass = {
      borderRadius: "16px",
      boxShadow:
        "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
  
      marginBottom: "30px",
      height: "80%",
    };
  
    return (
      <>
      
        <section className="mt-3">
          <div className="container">
            {showModal && (
                <InfoModal
                    showInfoModal={showModal}
                    setShowInfoModal={setShowModal}
                    dataModal={dataModal}
                    />
                )}
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-7 col-md-offset-3">
                <div className="block text-center" style={glass}>
                  <div className="d-flex justify-content-center align-items-center">
                    <Link to={"/"} className="logo_Jobinder">
                      <img src={logo} alt="" style={{width:'150px'}} />
                    </Link>
                  </div>
                  <h2 className="text-center p-1 m-0">
                    
                    {role === "recrutier" && "Reclutador"}
                    {role === "candidate" && "Candidato"}
                    </h2>
                  <span>Crear cuenta.</span>
                  <Formik
                    initialValues={dataForm}
                    enableReinitialize={true}
                    validationSchema={profileSchema}
                    onSubmit={handleSubmit}
                  >
                    {(props) => (
                      <Form
                        className="text-left m-2"
                        onSubmit={props.handleSubmit}
                      >
                        <Form.Group className="form-group">
                          <Form.Control
                            type="email"
                            className={`form-control rounded ${
                              props.touched.email && props.errors.email
                                ? "border border-danger"
                                : "border border-secondary"
                            }`}
                            id="email"
                            name="email"
                            placeholder="Escribe tu correo"
                            value={props.values.email}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
  
                          <span className="text-danger">
                            <ErrorMessage name="email" />
                          </span>
                        </Form.Group>
  
                        <Form.Group className="input-group ">
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            className={`form-control rounded ${
                              props.touched.password && props.errors.password
                                ? "border border-danger"
                                : "border border-secondary"
                            }`}
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={props.values.password}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                          <span
                            className="input-group-text "
                            style={{
                              color: "#f2f2f2",
                              backgroundColor: "#0093E9",
                              backgroundImage:
                                "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
                              borderRadius: "0px 5px 5px 0px",
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <FaEyeSlash style={{ width: "30px" }} />
                            ) : (
                              <FaEye style={{ width: "30px" }} />
                            )}
                          </span>
                          <span className="text-danger input-group">
                            <ErrorMessage name="password" />
                          </span>
                        </Form.Group>
  
                        <Form.Group className="input-group">
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            className={`form-control rounded ${
                              props.touched.confirmPassword &&
                              props.errors.confirmPassword
                                ? "border border-danger"
                                : "border border-secondary"
                            }`}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirmar Password"
                            value={props.values.confirmPassword}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                          <span
                            className="input-group-text "
                            style={{
                              color: "#f2f2f2",
                              backgroundColor: "#0093E9",
                              backgroundImage:
                                "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
                              borderRadius: "0px 5px 5px 0px",
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <FaEyeSlash style={{ width: "30px" }} />
                            ) : (
                              <FaEye style={{ width: "30px" }} />
                            )}
                          </span>
                          <span className="text-danger input-group">
                            <ErrorMessage name="confirmPassword" />
                          </span>
                        </Form.Group>
                        <Form.Group className="text-center d-flex justify-content-center align-items-center">
                          <Form.Check
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                             style={{ color: "inherit",fontSize:'12px', padding:'10px'}}
                          />
                          <Link
                            style={{ color: "inherit", fontSize: "12px" }}
                            to="/TerminosyCondiciones"
                          >
                            Aceptar los términos y condiciones
                          </Link>
                        </Form.Group>
                        {!isResgitering && (
                          <Button
                            type="submit"
                            className="buttons btn btn-info btn-lg m-3"
                          >
                            Enviar
                          </Button>
                        )}
                        {isResgitering && (
                          <>
                            <label htmlFor="code">
                              Captura el código que fue enviado a tu E-mail:
                            </label>
                            <input
                              type="text"
                              value={dataForm.code}
                              id="code"
                              onChange={onFormInputChange}
                              className="form-control"
                              placeholder="codigo de acceso"
                            />
                            <div className="text-muted">
                              Revisa tu bandeja de entrada o tu carpeta de Spam
                            </div>
                            <div className="buttons_actions d-grid">
                              <button
                                type="button"
                                onClick={handleConfirmEmail}
                                className="buttons btn btn-info btn-lg"
                              >
                                Confirmar
                              </button>
                            </div>
                          </>
                        )}
                        
                      </Form>
                    )}
                  </Formik>
                  <p className="mt-20 ">
                    Ya tienes una cuenta?
                    <Link to={`/login?role=${role}`}>Accede</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

export default Register
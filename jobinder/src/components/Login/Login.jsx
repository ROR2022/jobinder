import {useState, useEffect} from 'react'
import * as Yup from "yup";
import { Link,useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Formik, ErrorMessage } from "formik";
import { loginService } from '../../api/api';
import InfoModal from '../InfoModal/InfoModal';
import { useSearchParams } from 'react-router-dom';
import logo from "../../assets/img/logo.png"
import { Button } from "react-bootstrap";
import useJob from '../../hooks/useJob';



const initFormValues = {
    email: "",
    password: "",
    role: "",
  };

  const initModal = {
    title: "",
    description: "",
    severity: "",
  };
  
  /*
  .min(8, "El password debe tener al menos 8 caracteres")
      .matches(
        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
        "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico."
      )*/
  
  const profileSchema = Yup.object().shape({
    email: Yup.string()
      .required("Favor de ingresar el email")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Favor de Ingresar un email valido"
      ),
    password: Yup.string().required("Favor de Ingresar el password"),
  });

const Login = () => {
    const [formValues, setFormValues] = useState({ ...initFormValues });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState({ ...initModal });
    const [searchParams] = useSearchParams();
    console.log("params:..", searchParams.get("role"));
    const [role,setRole] = useState(searchParams.get("role"));
    //const role = searchParams.get("role");
     /* const [
      dataCandidate,
      setDataCandidate,
      dataRecruiter,
      setDataRecruiter,
      dataLocalStorage,
      setDataLocalStorage,
    ] = useJob();  */
    const { 4: dataLocalStorage, 5: setDataLocalStorage } = useJob();

    useEffect(() => {
      if (dataLocalStorage.email && dataLocalStorage.email !== "") {
        if (dataLocalStorage.role === "candidate") navigate("/candidateProfile");
        if (dataLocalStorage.role === "recrutier") navigate("/recrutierProfile");
      }

      
    }, [dataLocalStorage]);

    useEffect(() => {
      if (searchParams.get("role")!==role) {
        setRole(searchParams.get("role"));
      }
    }, [searchParams]);
  
    const onFormInputChange = (event) => {
      const InputID = event.target.id;
      const InputValue = event.target.value;
      setFormValues({ ...formValues, [InputID]: InputValue });
    };
  
    //const importantData = formValues.email !== "" && formValues.password !== "";
    const resetForm = () => {
      setFormValues({
        ...initFormValues,
      });
    };
  
    const onFormSubmit = (values) => {
      //e.preventDefault();
  
      //console.log("velues del Form:..", values);
  
      initLogin(values);
    };
    const initLogin = async (values) => {
      try {
        if (values.email !== "" && values.password !== "") {
          console.log("formValues:..", values);
          const loginCandidate = await loginService({
            email: values.email,
            password: values.password,
            role: role ? role : "candidate",
          });
          console.log("loginCandidate:..", loginCandidate);
          if (loginCandidate?.user) {
          setDataModal({
            title: "Bienvenido!",
            description: "Has iniciado sesión correctamente",
            severity: "success",
            });
            setShowModal(true);
            setDataLocalStorage(loginCandidate.user);
            
          }else{
            setDataModal({
              title: "Credenciales invalidas!",
              description: loginCandidate||"Favor de verificar tu email y password",
              severity: "error",
              });
              setShowModal(true);
              console.log("Error en login:..", loginCandidate);
          }
          //setFormValues(loginCandidate);
          //console.log("loginCandidate(checando user_skills):..", loginCandidate);
  
        }
      } catch (error) {
        
        console.log("Error en login:..", error);
        setDataModal({
            title: "Credenciales invalidas!",
            description: "Favor de verificar tu email y password",
            severity: "error",
            });
        setShowModal(true);
      }
  
      // navigate('/dashboard-candidato')
    };
    return (
      <>
        
        <section
          className=" mt-3"
          style={{
            fontFamily: "Poppins",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            color: "#000000",
          }}
        >
          <div className="container ">
            {showModal && (
                <InfoModal
                dataModal={dataModal}
                showInfoModal={showModal}
                setShowInfoModal={setShowModal}
                />
            )}
            <div className="row  d-flex justify-content-center align-items-center">
              <div className="col-md-7 col-md-offset-3  ">
                <div
                  className="block text-center"
                  style={{
                    borderRadius: "16px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                    backdropFilter: "blur(2px)",
                    WebkitBackdropFilter: "blur(2px)",
                    marginBottom: "30px",
                    height: "80%",
                  }}
                >
                  <Link to={"/"} className="logo_Jobinder">
                    <img src={logo} alt="" style={{width:'100px'}} />
                  </Link>
  
                  <h2 className="text-center welcome-back ">
                    Bienvenido {role==="recrutier" ? "Reclutador!" : "Candidato!"} 
                  </h2>
  
                  <Formik
                    className="text-left clearfix"
                    id="formCandidate"
                    initialValues={formValues}
                    onSubmit={(values) => {
                      onFormSubmit(values);
                      values = {};
                    }}
                    validationSchema={profileSchema}
                    enableReinitialize={true}
                  >
                    {(props) => (
                      <form onSubmit={props.handleSubmit} className='container'>
                        <div className="form-group ">
                          <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            name="email"
                            className={`form-control mb-3 ${
                              props.touched.email && props.errors.email
                                ? "border border-danger"
                                : "border border-secondary"
                            }`}
                            value={props.values.email}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                          <span className="text-danger">
                            <ErrorMessage name="email" />
                          </span>
                        </div>
  
                        <div className="input-group mb-3">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            name="password"
                            className={`form-control mb-3 ${
                              props.touched.password && props.errors.password
                                ? "border border-danger"
                                : "border border-secondary"
                            }`}
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
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <FaEyeSlash style={{ width: "30px" }} />
                            ) : (
                              <FaEye style={{ width: "30px" }} />
                            )}
                          </span>
                        </div>
                        <span className="text-danger">
                          <ErrorMessage name="password" />
                        </span>
  
                        <Button
                          type="submit"
                          className="buttons btn btn-info btn-lg m-3"
                        >
                          Enviar
                        </Button>
  
                        <p className="mt-20  text-decoration-none">
                          No tienes una cuenta?
                          <Link to={`/register?role=${role}`}>
                            Crea una cuenta con nosotros.
                          </Link>
                        </p>
                        <p className="mt-20  text-decoration-none">
                          Olvidaste tu Contraseña?
                          <Link
                            to={
                              props.values.email !== ""
                                ? `/updatePassword/${props.values.email}?role=${role}`
                                : `/updatePassword/none?role=${role}`
                            }
                          >
                            Cambia tu Contraseña.
                          </Link>
                        </p>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

export default Login
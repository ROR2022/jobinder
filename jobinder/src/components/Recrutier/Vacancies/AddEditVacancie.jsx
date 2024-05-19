import {useState,useEffect} from 'react'
import useJob from '../../../hooks/useJob'
//import { useNavigate } from 'react-router-dom';
//import { useFormik } from 'formik';
//import * as Yup from 'yup';
//import swal from 'sweetalert';
import logo from '../../../assets/img/tempImgUser.png';
import UploadImage from '../../UploadImage/UploadImage';
import ExperienceList from './ExperienceList';
import ListSoftskills from '../../Candidate/CandidateProfile/ListSoftskills';
import { Spinner } from 'react-bootstrap';
//import { createVacancyService, getVacancyByIdService } from '../../../api/apiVacancies';
//import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FormVacancie from './FormVacancie';
import { getVacancyByIdService } from '../../../api/apiVacancies';
//import { set } from 'mongoose';
//import { act } from 'react';
//import { get } from 'mongoose';


const initDataForm = {
  companyName: "",
  avatar_url: "",
  title: "",
  type: "",
  mode: "",
  city: "",
  salary: "",
  status: "Iniciado",
  
};

const AddEditVacancie = () => {
  const [listSkills, setListSkills] = useState([]);
  const [imageUser, setImageUser] = useState(null);
  const [dataForm, setDataForm] = useState(initDataForm);
  const [dataActivities, setDataActivities] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [searchParams] = useSearchParams();
  const [idVacancie, setIdVacancie] = useState(searchParams.get('v'));
  const [isApplicant, setIsApplicant] = useState(searchParams.get('isApplicant'));
  const [submitForm, setSubmitForm] = useState(false);
  const [noDataVacancie, setNoDataVacancie] = useState(false);
  
  /* const [
    dataCandidate,
    setDataCandidate,
    dataRecruiter,
    setDataRecruiter,
    dataLocalStorage,
    setDataLocalStorage,
  ] = useJob(); */
  const {2:dataRecruiter,4:dataLocalStorage} = useJob();
  //const navigate = useNavigate();

  useEffect(() => {
    if (dataLocalStorage.role) {
      //console.log("dataLocalStorage:..", dataLocalStorage);
      if (dataLocalStorage.role === "candidate") {
        setIsApplicant("1");
      } else {
        setIsApplicant(undefined);
    }
  }
  }, []);
  useEffect(() => {
    if(idVacancie){
      getVacancieById(idVacancie);
    }
    console.log("idVacancie:..",idVacancie);
  }, [idVacancie]);

  useEffect(() => {
//console.log("dataForm:..",dataForm);
  }, [dataForm]);

  useEffect(() => {
    if (isApplicant) {
      console.log("isApplicant:..",isApplicant);
    }
  }, [isApplicant]);


  const getVacancieById = async (idVac) => {
    try {
      //const response = await axios.get(`${backURL}api/v1/jobVacancies/${idVac}`);
      //const data = response.data;
      //console.log("data:..",data);
      //setDataForm(data);
      const response = await getVacancyByIdService(idVac);
      //console.log("response Data Vacancie:..",response);
      const {infoVacancy} = response;
      if(infoVacancy){
      setDataForm({
        companyName: infoVacancy.companyName,
        avatar_url: infoVacancy.avatar_url,
        title: infoVacancy.title,
        type: infoVacancy.type,
        mode: infoVacancy.mode,
        city: infoVacancy.city,
        salary: infoVacancy.salary,
        status: infoVacancy.status,
      });
      setDataActivities(infoVacancy.activities);
      setListSkills(infoVacancy.job_skills);
      setNoDataVacancie(false);
    
    }
      else {
        setDataForm(initDataForm);
        console.log("No se encontraron datos de la vacante");
        setNoDataVacancie(true);
      }
      
    } catch (error) {
      console.error("Error en getVacancieById", error);
    }
  }

  const stylePerfil = {
    borderRadius: "14%",
    margin: "20px",
    filter:
      "drop-shadow(0px 54px 55px rgba(0, 0, 0, 0.25)) drop-shadow(0px -12px 30px rgba(0, 0, 0, 0.12)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.12)) drop-shadow(0px 12px 13px rgba(0, 0, 0, 0.17)) drop-shadow(0px -3px 5px rgba(0, 0, 0, 0.09))",
    borderWidth: "2px",
    borderStyle: "solid",
    width: "20vw",
    height: "auto",
    borderImage:
      "radial-gradient(circle 588px at 31.7% 40.2%, rgba(225, 200, 239, 1) 21.4%, rgba(163, 225, 233, 1) 57.1%)",
  };
  

  //const navigate = useNavigate();

  useEffect(() => {
    if (dataLocalStorage) {
      //console.log("dataLocalStorage:..", dataLocalStorage);
    }
  }, [dataLocalStorage]);
  

  

  return (
    <>
      <div className="">
        <h1
          className="text-start ms-2 mt-3"
          style={{
            color: "#498BA6",
            textShadow:
              "0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px rgba(60, 64, 67, 0.15)",
            fontFamily: "Poppins, sans-serif, Verdana, Geneva, Tahoma",
          }}
        >
          {/* <p>{dataRecruiter.rfc}</p> */}
          {!idVacancie && "Crear Vacante"}
          {(idVacancie&&isApplicant!=='1') && "Editar Vacante"}
          {(idVacancie&&isApplicant==='1') && "Datos Vacante"}
        </h1>
        {noDataVacancie && <h2 className="text-center alert alert-danger fs-5">No se encontraron datos de la vacante</h2>}
        <div
          className="row"
          style={{
            color: "#106973",
            fontFamily: "Poppins, sans-serif, Verdana, Geneva, Tahoma",
          }}
        >
          <div className="col-12 col-md-4">
            {!imageUser && (
              <>
                <img
                  style={stylePerfil}
                  src={dataForm.avatar_url ? dataForm.avatar_url : logo}
                  alt="imgProfile"
                  className="d-block ms-auto me-auto my-2 rounded"
                />
                {isApplicant!=='1' &&
                <p
                  className="allowed-files w-100 text-center mt-3 "
                  style={{
                    color: "#106973",
                    fontFamily: "Poppins, sans-serif, Verdana, Geneva, Tahoma",
                  }}
                >
                  Archivos permitidos .png, .jpg, jpeg{" "}
                </p>
                }
                
              </>
            )}
            {isApplicant!=='1' &&
            <div className="buttons_actions d-flex justify-content-center">
            <UploadImage setDataImg={setImageUser} />
          </div>
            }
            
          </div>
          <div
            className="col-12 col-md-8 px-5"
            style={{
              background: "rgba(0, 189, 214, 0.18)",
              borderRadius: "16px",
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              padding: "50px",
              marginBottom: "30px",
              height: "50%",
            }}
          >
            {((idVacancie===null)||(idVacancie && dataForm.companyName)) &&
              <FormVacancie
              isApplicant={isApplicant}
              dataForm={dataForm}
              setDataForm={setDataForm}
              isSaving={isSaving}
              setIsSaving={setIsSaving}
              imageUser={imageUser}
              setImageUser={setImageUser}
              dataRecruiter={dataRecruiter}
              dataLocalStorage={dataLocalStorage}
              dataActivities={dataActivities}
              listSkills={listSkills}
              idVacancie={idVacancie}
              setSubmitForm={setSubmitForm}
              submitForm={submitForm}
            />
            }
              

            <ExperienceList
            isApplicant={isApplicant}
                dataActivities={dataActivities}
                setDataActivities={setDataActivities}
              />
              
              <ListSoftskills isApplicant={isApplicant} listSkills={listSkills} setListSkills={setListSkills} />
              
              {isApplicant!=='1' &&
              <button
                  type="button"
                  className="buttons btn btn-info text-light"
                  disabled={isSaving}
                  onClick={() => {
                    setSubmitForm(true);
                  }}
                >
                  {isSaving ? <Spinner /> : "Guardar Vacante"}
                </button>
              }
              
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditVacancie
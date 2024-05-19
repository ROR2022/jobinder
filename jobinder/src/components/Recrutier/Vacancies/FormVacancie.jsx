import {useEffect} from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
//import { Spinner } from 'react-bootstrap';
import { createVacancyService, updateVacancyService } from '../../../api/apiVacancies';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const style = {
    color: "#498BA6",
    fontFamily: "Poppins, sans-serif, Verdana, Geneva, Tahoma",
  };

const FormVacancie = ({
  isApplicant,
    submitForm, setSubmitForm,
    idVacancie,
    dataForm,dataRecruiter,setIsSaving, imageUser, listSkills, dataActivities, dataLocalStorage}) => {
    const navigate = useNavigate();
      //console.log("isApplicant(FormVacancie):..", isApplicant);
    useEffect(() => {
        //console.log("dataForm(FormVacancie):..", dataForm);
      }, [dataForm]);
      useEffect(() => {
        if(submitForm===true){
          formik.handleSubmit();
          setSubmitForm(false);
        }
      }, [submitForm]);
    const formik = useFormik({
        initialValues: dataForm,
        validationSchema: Yup.object({
          companyName: Yup.string().required("Requerido"),
          title: Yup.string().required("Requerido"),
          type: Yup.string().required("Requerido"),
          mode: Yup.string().required("Requerido"),
          city: Yup.string().required("Requerido"),
          salary: Yup.number().required("Requerido"),
        }),
        onSubmit: async (values) => {
          
            ////console.log("...........", imageUser);
            //console.log("RFC COMPLETE", dataRecruiter.rfc)
    
            if (dataRecruiter.rfc === undefined) {
              swal({
                title: "Completa tu perfil para agregar vacantes!!",
                text:'Lamentamos los incovenientes, completa tu perfil para continuar!',
                icon: "error",
                button: "ok",
              });
              return;
            } else {
              
              setIsSaving(true);
              // console.log("agregando vacantes...");
              const idsSkills = listSkills.map((item) => item.skill || item._id || item);
              const formData = new FormData();
              if (imageUser) formData.append("image", imageUser);
              if (idsSkills) {
                for (let i = 0; i < idsSkills.length; i++) {
                  formData.append("job_skills", idsSkills[i]);
                }
              }
              if (dataActivities) {
                for (let i = 0; i < dataActivities.length; i++) {
                  formData.append("activities", JSON.stringify(dataActivities[i]));
                }
              }
              Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
              });
              formData.append("userToken", dataLocalStorage.accessToken);
              let responseBackend=null;
              if(idVacancie){
                responseBackend = await updateVacancyService(idVacancie,formData);
              }else{
               responseBackend = await createVacancyService(formData); 
              }
              console.log("responseBackend:..", responseBackend);
              if (responseBackend) {
                swal({
                  title: idVacancie ? "Vacante actualizada" : "Vacante agregada",
                  icon: "success",
                  button: "ok!",
                });
                setIsSaving(false);
                navigate(`/`);
              }else{
                swal({
                  title: "Error al agregar la vacante",
                  icon: "error",
                  button: "ok!",
                });
                setIsSaving(false);
              }
              
            }
          
        },
      });
      
  return (
    <>
    {(idVacancie&&formik.values.companyName)||(!idVacancie)?(
      <form
      onSubmit={formik.handleSubmit}
      style={{
        color: "#106973",
        fontFamily: "Poppins, sans-serif, Verdana, Geneva, Tahoma",
      }}
    >
      <div className="row mb-4">
        <div className="col">
          <div className="form-outline bg-gray">
            <label
              className="form-label"
              htmlFor="form6Example1"
              style={style}
            >
              Nombre de la Empresa
            </label>
            <input
              type="text"
              id="comapnyName"
              name="companyName"
              className={`form-control ${
                formik.touched.companyName && formik.errors.companyName
                  ? "border border-danger"
                  : "border border-secondary"
              }`}
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Empresa"
              disabled={isApplicant==='1' ? true : false}
            />
            {formik.touched.companyName &&
              formik.errors.companyName && (
                <span className="text-danger">
                  {formik.errors.companyName}
                </span>
              )}
          </div>
        </div>
        <div className="col">
          <div className="form-outline bg-gray">
            <label
              className="form-label"
              htmlFor="form6Example1"
              style={style}
            >
              Título de la vacante
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={`form-control ${
                formik.touched.title && formik.errors.title
                  ? "border border-danger"
                  : "border border-secondary"
              }`}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Título"
              disabled={isApplicant==='1' ? true : false}
            />
            {formik.touched.title && formik.errors.title && (
              <span className="text-danger">{formik.errors.title}</span>
            )}
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <div className="form-outline">
            <label
              className="form-label"
              htmlFor="form6Example1"
              style={style}
            >
              Tipo de trabajo
            </label>
            <select
              className={`form-control ${
                formik.touched.type && formik.errors.type
                  ? "border border-danger"
                  : "border border-secondary"
              }`}
              name="type"
              id="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isApplicant==='1' ? true : false}
            >
              <option> Selecciona</option>
              <option> Tiempo Completo</option>
              <option> Por proyecto</option>
            </select>
            {formik.touched.type && formik.errors.type && (
              <span className="text-danger">{formik.errors.type}</span>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-outline">
            <label
              className="form-label"
              htmlFor="form6Example1"
              style={style}
            >
              Modalidad
            </label>
            <select
              className={`form-control ${
                formik.touched.mode && formik.errors.mode
                  ? "border border-danger"
                  : "border border-secondary"
              }`}
              id="mode"
              name="mode"
              value={formik.values.mode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isApplicant==='1' ? true : false}
            >
              <option> Selecciona</option>
              <option> Presencial</option>
              <option> Remoto</option>
              <option> Hibrído</option>
            </select>
            {formik.touched.mode && formik.errors.mode && (
              <span className="text-danger">{formik.errors.mode}</span>
            )}
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <div className="form-outline">
            <label
              className="form-label"
              htmlFor="form6Example1"
              style={style}
            >
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${
                formik.touched.city && formik.errors.city
                  ? "border border-danger"
                  : "border border-secondary"
              }`}
              placeholder="Ciudad"
              disabled={isApplicant==='1' ? true : false}
            />
            {formik.touched.city && formik.errors.city && (
              <span className="text-danger">{formik.errors.city}</span>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-outline">
            <label
              className="form-label"
              htmlFor="form6Example2"
              style={style}
            >
              Sueldo Mensual
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              className={`form-control ${
                formik.touched.salary && formik.errors.salary
                  ? "border border-danger"
                  : "border border-secondary"
              }`}
              placeholder="Sueldo"
              disabled={isApplicant==='1' ? true : false}
            />
            {formik.touched.salary && formik.errors.salary && (
              <span className="text-danger">
                {formik.errors.salary}
              </span>
            )}
          </div>
        </div>
      </div>
      
      
      <div className="buttons_actions d-flex justify-content-end align-content-end">
      {(
      (formik.touched.salary && formik.errors.salary) 
      ||(formik.touched.companyName && formik.errors.companyName)
      ||(formik.touched.title && formik.errors.title)
      ||(formik.touched.type && formik.errors.type)
      ||(formik.touched.mode && formik.errors.mode)
      ||(formik.touched.city && formik.errors.city)
      ||(formik.touched.status && formik.errors.status)
      )
      && (
              <span className="text-danger me-2">
                Favor de llenar correctamente el formulario
              </span>
            )}
        
      </div>
    </form>
    ):(
      <div>
        <h1>Not dataForm </h1>
        <p>{formik.values.companyName}</p>
        <p>{formik.values.title}</p>
      </div>
    )}
   </> 
  )
}

FormVacancie.propTypes = {
    
    dataForm: PropTypes.object.isRequired,
    dataRecruiter: PropTypes.object.isRequired,
    setIsSaving: PropTypes.func.isRequired,
    imageUser: PropTypes.object,
    listSkills: PropTypes.array.isRequired,
    dataActivities: PropTypes.array.isRequired,
    dataLocalStorage: PropTypes.object.isRequired,
    submitForm: PropTypes.bool.isRequired,
    setSubmitForm: PropTypes.func.isRequired,
    idVacancie: PropTypes.string,
    isApplicant: PropTypes.string.isRequired,

}

export default FormVacancie
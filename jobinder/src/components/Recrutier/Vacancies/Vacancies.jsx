import {useState,useEffect} from 'react'
import useJob from '../../../hooks/useJob';
import { Link } from 'react-router-dom';
//import { Button } from 'react-bootstrap';
import ListVacancies from './ListVacancies';
import { FcRefresh } from 'react-icons/fc';
import { useMediaQuery } from 'react-responsive';
import Swal from 'sweetalert2';
import { getVacanciesByUserService } from '../../../api/apiVacancies';


const Vacancies = () => {
  /* const [
    dataCandidate,
    setDataCandidate,
    dataRecruiter,
    setDataRecruiter,
    dataLocalStorage,
    setDataLocalStorage,
  ] = useJob(); */
  const {2:dataRecruiter, 4:dataLocalStorage} = useJob();
  const [vacancyAll, setVacancyAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [btnDetele, setBtnDelete] = useState(false);

  const fetch = async (page, newPerPage) => {
    setLoading(true);
    try {
      /* axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer: ${dataRecruiter.accessToken}`;
      const allVacancies = await axios.get(
        `${endpointsGral.vacancyURL}getAllJobVacancyByUser/${dataRecruiter.accessToken}?page=${page}&limit=${newPerPage}`
      ); */
      //let allVacancies = [];
      //const datas = allVacancies.data["item"];
       //console.log("backend Response:..", allVacancies);
      //setVacancyAll(datas["docs"]);
      // console.log("PAGINATION", datas["totalDocs"]);
      //setTotalRows(datas["totalDocs"]);
      //const responseVacancies = await getVacanciesByUserService(dataLocalStorage.accessToken,page, newPerPage);
      //console.log('responseVacancies:..',responseVacancies);
      const  arrayVacancies = [...dataLocalStorage.company_names];
      //console.log('arrayVacancies:..',arrayVacancies);
      if(arrayVacancies.length>0){
      setVacancyAll([...arrayVacancies]);
      setTotalRows(arrayVacancies.length);
      }else{
        setVacancyAll([]);
        setTotalRows(0);
      }
      setLoading(false);
      
    } catch (error) {
      console.log('Error al intentar recuperar datos:..',error?.response?.data?.errors[0]?.message);
      const errMsg= error?.response?.data?.errors[0]?.message;
      if(errMsg){
        Swal.fire('Lo sentimos!',`${errMsg}`,'error');
      }
    }
    
  };

  
  useEffect(() => {
    if(dataLocalStorage?.accessToken)
    fetch(1, 10);
  }, [dataLocalStorage]);

  //console.log(vacancyAll);
  //console.log(totalRows);

  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });

  useEffect(() => {
    if (vacancyAll.length > 0) {
      //console.log("vaListTem", vacancyAll);
      setVacancyAll([...vacancyAll]);
    }
  }, []);

  useEffect(() => {
    //console.log("Nuevo valor de limit:..", perPage);
  }, [perPage]);

  // pagination
  const handlePageChange = (page) => {
    fetch(page, perPage);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    //console.log("Cambiando limit:...", newPerPage);
    fetch(page, newPerPage);
    setPerPage(newPerPage);
  };
  // pagination

  useEffect(() => {
    // //console.log('applicants', vacancyAll)
    // checkApplicants()
    let tempApplicants = false;
    vacancyAll.forEach((item) => {
      const checkArr = item.applicants;
      if (checkArr.length > 0) {
        //console.log("si tiene candidatos", checkArr);
        tempApplicants = true;
      }
    });
    setBtnDelete(tempApplicants);
  }, [vacancyAll]);

  //console.log("si tiene candidatos outSet", btnDetele);

  const handleDeleteSkill = (index) => {
    Swal.fire({
      title: "Eliminar Vacante?",
      text: "Estas seguro de eliminar esta vacante?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(index);
        const deleteVacancy = vacancyAll[index];
        const id = deleteVacancy?._id;
        /* axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer: ${dataRecruiter.accessToken}`;

        axios
          .delete(`${endpointsGral.vacancyURL}${id}`)
          .then((response) => {
            //console.log(response);
            const updateList = vacancyAll.filter((_, i) => i !== index);
            setVacancyAll(updateList);
          })
          .catch((error) => {
            //console.log(error.response);
          }); */
        Swal.fire("Eliminado!", "Vacante eliminada correctamente.", "success");
      }
    });
  };
  // ----------------------------------- table
  const handleRefresh = ()=>{
    // console.log('refrescando datos:..');
    fetch(1, 10);
  }


  return (
    <>
      <div
        className="row container_form_ForVacancy  m-3 p-3"
        style={{ fontFamily: "Poppins, sans-serif, Verdana, Geneva, Tahoma" }}
      >
        <div className="d-flex">
          <h1
            className="d-flex justify-content-center w-100 mt-3 "
            style={{
              color: "#498BA6",
              textShadow:
                "0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px rgba(60, 64, 67, 0.15)",
              fontFamily: "Poppins, sans-serif, Verdana, Geneva,Tahoma",
            }}
          >
            Vacantes
          </h1>
        </div>
          <div
            className={`tu-clase ${
              isMobile ? "d-flex justify-content-center align-items-center" : ""
            }`}
          >
            <Link
              to={`/addEditVacancie`}
              className='btn btn-outline-info'
              // className="text-decoration-none d-sm-block p-2"
            >
              
                Crear Vacante
              
            </Link>
            <span 
        style={{width:'fit-content',cursor:'pointer', color:'blue'}} 
        onClick={handleRefresh}
        className=" text-center ms-auto btn btn-outline-info d-flex">
          <FcRefresh style={{color:'blue'}}/>
          </span>
          </div>
        {/* </div> */}
        {/* <div className='card-body'> */}
        <div className="row softskills" style={{ marginBottom: "100px" }}>
          <div className="col">
            <ListVacancies
              vacancyAll={vacancyAll}
              handleDeleteSkill={handleDeleteSkill}
              handlePageChange={handlePageChange}
              handlePerRowsChange={handlePerRowsChange}
              totalRows={totalRows}
              loading={loading}
              currentPage={currentPage}
              btnDetele={btnDetele}
              perPage={perPage}
            />
          </div>
        </div>
        {/* <ListVacancy postdata={vacancyAll}/>
              <Outlet/> */}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Vacancies
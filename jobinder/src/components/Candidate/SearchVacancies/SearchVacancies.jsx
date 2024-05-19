import {useState,useEffect} from 'react'
import { FcRefresh } from "react-icons/fc";
import { Spinner } from 'react-bootstrap';
import VacanciesDataTable from './VacanciesDataTable';
import SelectAutoComplete from './SelectAutoComplete';
import useJob from '../../../hooks/useJob';
import { getAllVacanciesService, getTitlesVacanciesService, updateVacancyService, getDataConsultService } from '../../../api/apiVacancies';
import Swal from 'sweetalert2';
import { updateProfileService, findUserService } from '../../../api/api';
import { Link } from 'react-router-dom';
import { myId } from '../../../lib/myLib';

const SearchVacancies = () => {

  /* const [
    dataCandidate,
    setDataCandidate,
    dataRecruiter,
    setDataRecruiter,
    dataLocalStorage,
    setDataLocalStorage,
  ] = useJob(); */
  const { 0:dataCandidate, 4:dataLocalStorage, 5:setDataLocalStorage } = useJob();

  const { my_vacancies } = dataLocalStorage;
  //console.log('my_vacancies:..',my_vacancies)
  const [loading, setLoading] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorBackend, setErrorBackend] = useState("");
  const [data, setData] = useState([]);
  const [dataTitles, setDataTitles] = useState([]);
  const [resetConsult, setResetConsult] = useState(false);

  const [dataConsult, setDataConsult] = useState("");

  function parseJwt(token) {
    const base64Url = token?.split(".")[1];
    const base64 = base64Url?.replace("-", "+")?.replace("_", "/");
    if(base64){
      return JSON.parse(window.atob(base64));
    }
    
  }
  const fetchData = async (page, newPerPage) => {
    //Aqui recuperamos los datos de las vacantes
    setLoading(true);
    try {
      /* axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer: ${dataCandidate?.accessToken}`;
      const response = await axios.get(
        `${endpointsGral.vacancyURL}?page=${page}&limit=${newPerPage}`
      ); */
      /*//console.log(
        `${endpointsGral.vacancyURL}?page=${page}&limit=${newPerPage}`,
        response
      );*/
      const responseVacancies = await getAllVacanciesService(page, newPerPage);
      const datas = responseVacancies?.item;
      if (datas) {
        ////console.log("datas.docs:..", datas["docs"]);

        const dataUser = parseJwt(dataCandidate.accessToken);
        //console.log('dataUser:..',dataUser);
        let tempDataVacancies = [];
        datas["docs"].forEach((vacante) => {
          
          const findCandidateinRejecteds = vacante?.rejecteds?.find(
            (dataCandidate) =>
              String(dataCandidate._id) === String(dataUser?._id)
          );
          if (!findCandidateinRejecteds) {
            tempDataVacancies.push(vacante);
          }
        });
        setVacancies([...tempDataVacancies]);

        setTotalRows(datas["totalDocs"]);
        setCurrentPage(page);
        setPerPage(newPerPage);
      }

      setLoading(false);
      ////console.log(`response fetchData page(${page}) newPerPage(${newPerPage}):..`,response.data);
      ////console.log("Response Data All vacancies.... ", response.data);
    } catch (error) {
      //console.log(error);
    }
  };

  const getTitlesVacancies = async () => {
    try {
      /* const response = await axios.get(
        `${endpointsGral.vacancyURL}getTitlesVacancies`
      ); */
      ////console.log("response getTitlesVacancies:...", response);
      const responseTitles = await getTitlesVacanciesService();
      if (responseTitles) {
        const {distinctCities, distinctCompanies, distinctModes, distinctTitles, distinctTypes} = responseTitles;
        let tempData = [
          ...distinctTitles,
          ...distinctCompanies,
          ...distinctCities,
          ...distinctModes,
          ...distinctTypes,
        ];
        if (tempData) {
          setDataTitles([...tempData]);
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    fetchData(1, 10);
    getTitlesVacancies();
  }, []);

  useEffect(() => {
    if (errorBackend !== "") {
      Swal.fire("Lo Sentimos!", errorBackend, "error");
    }
  }, [errorBackend]);

  useEffect(() => {
    if(dataLocalStorage.work_experience){
      //console.log('dataLocalStorage.work_experience:..',dataLocalStorage.work_experience)
    }
      //console.log('dataLocalStorage:..',dataLocalStorage)
  }, [dataLocalStorage]);

  const handleApply = (e) => {
    Swal.fire({
      title: "Aplicar a Vacante",
      text: "Estas seguro de aplicar a esta vacante!!?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Aplicar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const idVacancie = e.target.id;
        //console.log("Manejando la funcion Aplicar:...", idVacancie);
        let dataVacancies = [];
        //let dataApplicants = [];
        try {
          /* axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer: ${dataCandidate?.accessToken}`; */

          if (dataCandidate?.my_vacancies) {
            const tempArrayIdsVacancies = dataCandidate?.my_vacancies?.map(
              (item) => item._id
            );
            dataVacancies = [...tempArrayIdsVacancies, idVacancie];
          } else {
            dataVacancies.push(idVacancie);
          }

          //se actualiza el array de my_vacancies en la entidad user
          const dataFormUser= new FormData();
          for (let i = 0; i < dataVacancies.length; i++) {
            dataFormUser.append("my_vacancies", dataVacancies[i]);
          }
          const responseUpdateDataUser = await updateProfileService(dataFormUser,dataCandidate.accessToken);
          /* const responseUpdateDataUser = await axios.patch(
            `${endpointsGral.userURL}${dataCandidate.accessToken}`,
            { my_vacancies: dataVacancies }
          ); */
          //se actualiza el array de applicants en la entidad vacancie
          const responseUpdateDataVacancie = await updateVacancyService(idVacancie, { userToken: dataCandidate.accessToken });
          /* const responseUpdateDataVacancie = await axios.patch(
            `${endpointsGral.vacancyURL}${idVacancie}`,
            { token: dataCandidate.accessToken }
          ); */

          if (responseUpdateDataUser && responseUpdateDataVacancie) {
            const getDataCandidate = await findUserService(dataCandidate.email);
            /* const getDataCandidate = await axios.get(
              `${endpointsGral.userURL}${dataCandidate.accessToken}`
            ); */
            if (getDataCandidate)
              //se actualiza el contexto
              setDataLocalStorage({
                ...getDataCandidate,
                accessToken: dataCandidate.accessToken,
              });
          }
          ////console.log("Response updateDataUser:..", responseUpdateDataUser);
          ////console.log("Response updateDataVacancie:..", responseUpdateDataVacancie);
        } catch (error) {
          console.log("Error al aplicar:...", error);
          const errMsg = error?.response?.data?.errors[0]?.message;
          if (errMsg) {
            setErrorBackend(errMsg);
          }
        }
      }
    });
  };

  const handleStopApplying = (e) => {
    Swal.fire({
      title: "Dejar de Aplicar a Vacante",
      text: "Estas seguro de Dejar de aplicar a esta vacante!!?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Dejar de Aplicar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const idVacancie = e.target.id;
        //console.log("Manejando la funcion de Dejar de Aplicar:...", idVacancie);
        //filtrar el array de my_vacancies
        let dataVacancies = my_vacancies?.filter(item=>item._id!==idVacancie);
        try {
          /* axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer: ${dataCandidate?.accessToken}`; */

         if (my_vacancies) {
            my_vacancies.forEach((element) => {
              if (element._id !== idVacancie) {
                dataVacancies.push(element._id);
              }
            });
          } 

          //se actualiza el array de my_vacancies en la entidad user
          /* const dataFormUser= new FormData();
          for (let i = 0; i < dataVacancies.length; i++) {
            dataFormUser.append("my_vacancies", dataVacancies[i]);
          }
          if(dataVacancies.length===0){
            dataFormUser.append("my_vacancies", []);
          } */
          console.log('dataVacancies:..',dataVacancies);
          const dataObjectUser = { my_vacancies: dataVacancies };
          const responseUpdateDataUser = await updateProfileService(dataObjectUser,dataLocalStorage.accessToken);
          console.log('responseUpdateDataUser:..',responseUpdateDataUser);

          /* const responseUpdateDataUser = await axios.patch(
            `${endpointsGral.userURL}${dataCandidate.accessToken}`,
            { my_vacancies: dataVacancies }
          ); */
          //se actualiza el array de applicants en la entidad vacancie
          const responseUpdateDataVacancie = await updateVacancyService(idVacancie, { userToken: dataLocalStorage.accessToken, deleteApplicant: true });
          console.log('responseUpdateDataVacancie:..',responseUpdateDataVacancie);
          /* const responseUpdateDataVacancie = await axios.patch(
            `${endpointsGral.vacancyURL}${idVacancie}`,
            { token: dataCandidate.accessToken, deleteApplicant: true }
          ); */

          if (responseUpdateDataUser && responseUpdateDataVacancie) {
            const getDataCandidate = await findUserService(dataLocalStorage.email);
            /* const getDataCandidate = await axios.get(
              `${endpointsGral.userURL}${dataCandidate.accessToken}`
            ); */
            if (getDataCandidate)
              //se actualiza el contexto
            console.log('actualizando dataLocalStorage:..',getDataCandidate);
              setDataLocalStorage({
                ...getDataCandidate,
                accessToken: dataCandidate.accessToken,
              });
          }
        } catch (error) {
          console.log("Error al dejar de aplicar:...", error);
          const errMsg = error?.response?.data?.errors[0]?.message;
          if (errMsg) {
            setErrorBackend(errMsg);
          }
        }
      }
    });
  };

  const columns = [
    {
      name: "id",
      selector: (row) => row._id,
      sortable: true,
      omit: true,
    },
    {
      name: "EMPRESA ",
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: "TÍTULO DE LA VACANTE",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "TIPO DE TRABAJO",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "CIUDAD",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "MODALIDAD",
      selector: (row) => row.mode,
      sortable: true,
    },
    {
      name: "COMPATIBILIDAD",
      selector: (row) => row.match,
      sortable: true,
    },
    {
      name: "SALARIO MENSUAL",
      selector: (row) => row.salary,
      sortable: true,
    },
    {
      name: "OPCIÓN",
      sortable: false,
      selector: (row) => row.null,
      center: true,
      cell: (d) => (
        <div
          className="options-buttons mt-3 mb-3 bg-light  d-flex flex-column gap-1"
          key={myId()}
          style={{
            width: "350px",
            fontFamily: "Poppins, sans-serif, Verdana, Geneva, Tahoma",
          }}
        >
          {my_vacancies?.find((myVac) => myVac._id === d._id) === undefined ? (
            <button
              type="submit"
              id={d._id}
              key={myId()}
              className="btn btn-outline-success buscar w-100"
              onClick={handleApply}
              disabled={
                my_vacancies?.find((myVac) => myVac._id === d._id) === undefined
                  ? false
                  : true
              }
            >
              {my_vacancies?.find((myVac) => myVac._id === d._id) === undefined
                ? "Aplicar"
                : "Aplicando"}
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-outline-danger w-100"
              id={d._id}
              key={myId()}
              onClick={handleStopApplying}
            >
              No Aplicar
            </button>
          )}
          <Link to={`/addEditVacancie?v=${d._id}&isApplicant=1`}>
            <button
              type="submit"
              className="btn btn-outline-info w-100"
              key={myId()}
            >
              Abrir
            </button>
          </Link>
        </div>
      ),
    },
  ];

  const retriveUser = dataCandidate.user_skills?.map((item) => {
    return item.name;
  });
  const filterRDuplexUser = [...new Set(retriveUser)];
  useEffect(() => {
    if (vacancies.length > 0) {
      const tempData = vacancies?.map((item, index) => {
        const retriveVacancy = item.job_skills.map((idSkill) => {
          return idSkill.name;
        });
        const filterRDuplexVacancy = [...new Set(retriveVacancy)];
        if(item.companyName==='DigiComp'){
          //console.log(`filterRDuplexVacancy(useEffect):..empresa:(${item.companyName})`,filterRDuplexVacancy);
        }
        
        const conteo = {};
        /*
        {
          ada:1,
          actionscript:1,
        }
        */

        filterRDuplexUser.forEach((element)=>{
          if(conteo[element]){
            conteo[element]++
          }else{
            conteo[element]=1
          }
        });

        let suma=0;
        const quanty=filterRDuplexVacancy?.length

        filterRDuplexVacancy?.forEach((element) => {
          if(conteo[element]){
            suma+=conteo[element]
          }
        });
        //  //console.log(`La suma de los valores repetidos es: ${suma}`);
        //console.log(quanty);
        let operador = 0;
        //  //console.log('operador ', (suma * 100) / quanty)

        if (suma === 0) {
          operador = 0;
        } else {
          operador = Math.floor((suma * 100) / quanty);
        }
        const str = item.salary.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return {
          ...item,
          id: myId(),
          _id: item._id,
          index: index + 1,
          company: item.companyName,
          title: item.title,
          type: item.type,
          city: item.city,
          mode: item.mode,
          match: `${operador} %`,
          salary: `$ ${str}.00`,
        };
      });
      tempData.sort((a, b) =>  Number(b.match.slice(0,1))-Number(a.match.slice(0,1)));
      
      setData([...tempData]);
    }
  }, [vacancies]);

 /*  useEffect(() => {
    ////console.log('datos de la tabla:...',data);
  }, [data]); */

  /* const tableData = {
    columns,
    data,
  }; */
  useEffect(() => {
    ////console.log('nuevo valor de currentPage(dad):..',currentPage)
  }, [currentPage]);
  useEffect(() => {}, [totalRows]);
  useEffect(() => {
    ////console.log('nuevo valor de limit(perPage)(dad):..',perPage)
  }, [perPage]);
  useEffect(() => {}, [dataConsult]);
  useEffect(() => {}, [resetConsult]);

  const handleConsult = async (value, dataPage, dataPerPage) => {
    //console.log("(HandleConsult)Buscaremos en el Back:..", value);
    setLoading(true);
    const pageConsult = dataPage ? dataPage : currentPage;
    const limitConsult = dataPerPage ? dataPerPage : perPage;
    try {
      /* const response = await axios.get(
        `${endpointsGral.vacancyURL}getDataConsult?value=${value}&page=${pageConsult}&limit=${limitConsult}`
      ); */
      //console.log(`response getDataConsult currentPage(${pageConsult}) limit(${limitConsult}):..`, response);
      const responseConsult = await getDataConsultService(value, pageConsult, limitConsult);
      if (responseConsult) {
        const datas = responseConsult.item;
        const dataUser = parseJwt(dataCandidate?.accessToken);
        let tempDataVacancies = [];
        datas["docs"]?.forEach((vacante) => {
          const findCandidateinRejecteds = vacante?.rejecteds?.find(
            (dataCandidate) =>
              String(dataCandidate._id) === String(dataUser._id)
          );
          if (!findCandidateinRejecteds) {
            tempDataVacancies.push(vacante);
          }
        });

        //setVacancies([...tempDataVacancies]);
        //console.log('Iniciamos algoritmo de Match:...');
        //console.log('tempDataVacancies:..',tempDataVacancies);
        const tempData = tempDataVacancies.map((item, index) => {
          const retriveVacancy = item.job_skills.map((idSkill) => {
            return idSkill.name;
          });
          //console.log('retriveVacancy:..',retriveVacancy);
          const filterRDuplexVacancy = [...new Set(retriveVacancy)];
          //console.log('companyName...',item.companyName);
          if(item.companyName==='DigiComp'){
            //console.log(`filterRDuplexVacancy(handleConsult):..empresa:(${item.companyName})`,filterRDuplexVacancy);
          }
          
          const conteo = {};
  
          filterRDuplexVacancy.forEach((element) => {
            if (conteo[element]) {
              conteo[element]++;
            } else {
              conteo[element] = 1;
            }
          });
          //console.log('conteo:..',conteo);
          let suma = 0;
          const quanty = filterRDuplexVacancy?.length;
  
          filterRDuplexUser?.forEach((element) => {
            if (conteo[element]) {
              suma += conteo[element];
            }
          });
          //console.log(`La suma de los valores repetidos es: ${suma}`);

          //console.log('quanty:...',quanty);
          let operador = 0;
          //  //console.log('operador ', (suma * 100) / quanty)
  
          if (suma === 0) {
            operador = 0;
          } else {
            operador = Math.floor((suma * 100) / quanty);
          }
          const str = item.salary.toString().split(".");
          str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return {
            ...item,
            id: myId(),
            _id: item._id,
            index: index + 1,
            company: item.companyName,
            title: item.title,
            type: item.type,
            city: item.city,
            mode: item.mode,
            match: `${operador} %`,
            salary: `$ ${str}.00`,
          };
        });
        tempData.sort((a, b) =>  Number(b.match.slice(0,1))-Number(a.match.slice(0,1)));

        setData([...tempData]);
        setTotalRows(responseConsult?.item?.totalDocs);
        //data.item.page
        setCurrentPage(responseConsult?.item?.page);
        setPerPage(responseConsult?.item?.limit);
        setLoading(false);
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    ////console.log("Cambiando limit:...", newPerPage);
    if (dataConsult === "") {
      fetchData(page, newPerPage);
    } else {
      handleConsult(dataConsult, null, newPerPage);
    }

    setPerPage(newPerPage);
  }; 

  const handlePageChange = (page) => {
    ////console.log("handlePageChange Page:..", page);
    if (dataConsult === "") {
      fetchData(page, perPage);
    } else {
      handleConsult(dataConsult, page);
    }

    setCurrentPage(page);
  };
  const handleRefresh = () => {
    ////console.log("Manejando Refreshing:...");
    setCurrentPage(1);
    setPerPage(10);
    fetchData(1, 10);
    setResetConsult(true);
    setDataConsult("");
  };

  return (
    <div>
      <h1
          className="text-center my-3"
          style={{
            color: "#498BA6",
            textShadow:
              "0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px rgba(60, 64, 67, 0.15)",
            fontFamily: "Poppins, sans-serif, Verdana, Geneva, Tahoma",
          }}
        >
          Buscar Vacantes
        </h1>
        <div className="container d-flex justify-content-end">
        <span
          style={{ width: "fit-content", cursor: "pointer", color: "blue" }}
          onClick={handleRefresh}
          className=" text-center  btn btn-outline-info"
        >
          <FcRefresh style={{ color: "blue" }} />
        </span>
      </div>
      <SelectAutoComplete
        dataSelect={dataTitles}
        handleConsult={handleConsult}
        resetConsult={resetConsult}
        setResetConsult={setResetConsult}
        setCurrentPage={setCurrentPage}
        setPerPage={setPerPage}
        setDataConsult={setDataConsult}
      />
      <span className="d-flex justify-content-center my-2">
        {loading && <Spinner />}
      </span>

      <VacanciesDataTable
        columns={columns}
        data={data}
        loading={loading}
        perPage={perPage}
        totalRows={totalRows}
        currentPage={currentPage}
        handlePerRowsChange={handlePerRowsChange}
        handlePageChange={handlePageChange}
      />
      </div>
  )
}

export default SearchVacancies
//import React from 'react'
import useJob from '../../../hooks/useJob'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import { FcRefresh } from 'react-icons/fc'
import Swal from 'sweetalert2'
import { getVacanciesByUserService } from '../../../api/apiVacancies'
import { myId } from '../../../lib/myLib'


const ListApplicants = () => {
    const customStyles = {
        rows: {
          style: {
            minHeight: "72px", // override the row height
            fontsize: "18px",
          },
        },
        headCells: {
          style: {
            backgroundColor: "#7FADC0",
            color: "#fff",
            fontWeight: "bold",
            fontsize: "12px",
            paddingLeft: "8px", // override the cell padding for head cells
            paddingRight: "8px",
          },
        },
        cells: {
          style: {
            fontsize: "18px",
            paddingLeft: "8px", // override the cell padding for data cells
            paddingRight: "8px",
          },
        },
      };
      /* const [
        dataCandidate,
        setDataCandidate,
        dataRecruiter,
        setDataRecruiter,
        dataLocalStorage,
        setDataLocalStorage,
      ] = useJob(); */
      const {2:dataRecruiter} = useJob();
      const [dataInformation, setDataInformation] = useState([]);
      const [dataStatusEditing, setDataStatusEditing] = useState({});
      const [loading, setLoading] = useState(false);
      const [totalRows, setTotalRows] = useState(0);
      const [perPage, setPerPage] = useState(10);
      const [currentPage, setCurrentPage] = useState(1);
      const [errorBackend, setErrorBackend] = useState("");
    
      
      const queryMatch = async (page, newPerPage) => {
        try {
          setLoading(true);
          /* axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer: ${dataRecruiter.accessToken}`;
          const allVacancies = await axios.get(
            `${endpointsGral.vacancyURL}getAllJobVacancyByUser/${dataRecruiter.accessToken}?page=${page}&limit=${newPerPage}`
          ); */
          const getDataVacanciesResponse= await getVacanciesByUserService(dataRecruiter.accessToken,page,newPerPage);
          const datas = getDataVacanciesResponse["item"];
          //console.log('info todas las vacantes:..',allVacancies);
          // const statusStart= datas['docs'].filter(item=>item.status==='Iniciado')
          // //console.log('lista iniciados',statusStart)
          //console.log('info todas las vacantes:..',datas);
          setDataInformation(datas["docs"]);
          //console.log('PAGINATION',datas["totalDocs"])
          setTotalRows(datas["totalDocs"]);
          setLoading(false);
        } catch (error) {
          console.log("Error al recuperar datos:..", error);
          const errMsg = error?.response?.data?.errors[0]?.message;
          if (errMsg) {
            setErrorBackend(errMsg);
          }
        }
      };
    
      useEffect(() => {
        if(dataRecruiter?.accessToken!==undefined && dataRecruiter?.accessToken!==null){
          queryMatch(1, 10);
        }
        
      }, []);
      useEffect(() => {
        //console.log("Nuevo valor de limit:..", perPage);
      }, [perPage]);
    
      useEffect(() => {
        if (errorBackend !== "") {
          Swal.fire("Lo sentimos!", `${errorBackend}`, "error")
          console.log("Error Backend:..", errorBackend);
        }
      }, [errorBackend]);
    
      useEffect(() => {
        if (dataStatusEditing);
        //  console.log();
      }, [dataStatusEditing]);
    
      // pagination
      const handlePageChange = (page) => {
        queryMatch(page, perPage);
        setCurrentPage(page);
      };
    
      const handlePerRowsChange = async (newPerPage, page) => {
        //console.log("Cambiando limit:...", newPerPage);
        queryMatch(page, newPerPage);
        setPerPage(newPerPage);
      };
      // pagination
    
      /* const handleClick = (index) => {
        const editState = dataInformation[index];
    
        Swal.fire({
          title: "Cambiar estado: ",
          input: "select",
          inputOptions: {
            Cerrado: "Cerrado",
            Iniciado: "Iniciado",
          },
          inputPlaceholder: "required",
          showCancelButton: true,
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== "") {
                const newValues = {
                  status: value,
                };
                editStatus(newValues, editState);
                resolve();
              } else {
                resolve("You need to select a Tier");
              }
            });
          },
        }).then(function (result) {
          if (result.isConfirmed) {
            Swal.fire({
              icon: "success",
              html: "Estado: " + result.value,
            });
            if (result.value === "Iniciado") {
              setDataStatusEditing({
                ...editState,
                status: "Iniciado",
              });
            }
            if (result.value === "Cerrado") {
              setDataStatusEditing({
                ...editState,
                status: "Cerrado",
              });
            }
          }
        });
        //console.log(`You clicked me! ${index}`);
      }; */
    
      /* const editStatus = (values, editState) => {
        //console.log("value", values);
        const arrVacancy = dataInformation.map((item) => {
          if (item._id === editState._id) {
            item.status = values.status;
          }
          return item;
        });
        setDataInformation([...arrVacancy]);
    
        //console.log(arrVacancy);
        /* axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer: ${dataRecruiter.accessToken}`;
    
        axios
          .patch(`${endpointsGral.vacancyURL}${editState._id}`, values)
          .then((response) => {
            //console.log(response);
          })
          .catch((error) => {
            //console.log(error.response);
          }); 
      }; */
    
      // console.log('data iNFORMATION', dataInformation.applicants)
      const data = dataInformation?.map((vacante, index) => {
        const tempArray = [];
        const aplicantes = [...vacante.applicants];
        aplicantes?.forEach((idAplicante) => {
          const isFounded = tempArray?.find((id) => id === idAplicante);
          if (!isFounded) {
            tempArray.push(idAplicante);
          }
        });
        const str = vacante?.salary?.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return {
          id: vacante._id,
          qty: index,
          company: vacante.companyName,
          title: vacante.title,
          salary:`$${str}.00`,
          status: vacante.status,
          candidato: tempArray?.length || 0,
        };
      });
    
      const columns = [
        {
          name: "rowId",
          selector: (row) => row.id,
          sortable: true,
          hide: true,
          omit: true,
        },
        {
          name: "EMPRESA",
          selector: (row) => row.company,
          sortable: true,
        },
        {
          name: "TITULO DE LA VACANTE",
          selector: (row) => `${row.title}`,
          sortable: true,
        },
        {
          name: "SALARIO MENSUAL",
          selector: (row) => `${row.salary}`,
          sortable: true,
           center: true,
        },
        {
          name: "ESTADO DE LA VACANTE",
          selector: (row) => row.status,
          sortable: true,
        },
        {
          name: "APLICANTES",
          selector: (row) => row.candidato,
          sortable: true,
          // center: true,
        },
        {
          name: "OPCIONES",
          sortable: false,
          selector: (row) => row.null,
          cell: (d) => [
            <Link key={myId()} to={`/vacancieDetail?v=${d.id}`}>
              <button type="button" className="buttons btn btn-outline-info">
                <FaEye className="icon_eye1" />
              </button>
            </Link>,
            // <button type="button" className="buttons btn btn-outline-success" onClick={handleClick.bind(this,d.qty)} ><FaEdit className="icon_edit1"/></button>
          ],
        },
      ];
    
      // const data = dataShow;
    
      const tableData = {
        columns,
        data,
      };
    
      const handleRefresh = ()=>{
        // console.log('refrescando datos:..');
        queryMatch(1, 10);
      }
    
      return (
        <div
          className="row m-2 p-3"
          style={{ fontFamily: "Poppins, sans-serif, Verdana, Geneva, Tahoma" }}
        >
          
          {errorBackend !== "" ? (
            <div>
            {errorBackend}
            </div>
          ) : (
            <>
            <span 
            style={{width:'fit-content',cursor:'pointer', color:'blue'}} 
            onClick={handleRefresh}
            className=" text-center ms-auto btn btn-outline-info">
              <FcRefresh style={{color:'blue'}}/>
              </span>
            <DataTableExtensions export={false} print={false} {...tableData}>
              
              <DataTable
                {...tableData}
                columns={columns}
                data={data}
                customStyles={customStyles}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationDefaultPage={currentPage}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                highlightOnHover
                dense
              />
            </DataTableExtensions>
            </>
          )}
        </div>
      );
    };

export default ListApplicants
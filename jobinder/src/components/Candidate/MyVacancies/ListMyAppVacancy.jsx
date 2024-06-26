import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import { Badge, Button } from 'react-bootstrap'
import { FaEye } from 'react-icons/fa'
import { myId } from '../../../lib/myLib'
import useJob from '../../../hooks/useJob'

import PropTypes from 'prop-types'

const ListMyAppVacancy = ({refreshing}) => {
    const navigate=useNavigate();
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
    const {0:dataCandidate,4:dataLocalStorage,5:setDataLocalStorage} = useJob();
    const { my_vacancies } = dataCandidate;
  
    const cargarDatos = async () => {
      try {
        /* const response = await axios.get(
          `${endpointsGral.userURL}getUserByEmail?email=${dataCandidate.email}`
        ); */
        //console.log('response Backend:..',response);
        const dataPhaseStatus = dataLocalStorage.phase_status;
        const dataMyVacancies = dataLocalStorage.my_vacancies;
        const newDataMyVacancies= dataMyVacancies.filter(el=>el.status==='Iniciado');
        const reversedData= newDataMyVacancies?.reverse();
        //console.log('dataMyVacancies:..',dataMyVacancies);
        if (dataPhaseStatus && dataCandidate) {
          setDataLocalStorage({
            ...dataLocalStorage,
            my_vacancies:[...reversedData],
            phase_status:[...dataPhaseStatus]
          });
        }
        //console.log("responseDataUser in Backend:..", response?.data?.user);
      } catch (error) {
        //console.log(error);
      }
    };
    useEffect(() => {
      cargarDatos();
      //console.log('cargando componente:...',String(refreshing));
    }, [refreshing]);
    useEffect(() => {
      if (dataCandidate?.phase_status) {
        //console.log("phase_status:..", dataCandidate?.phase_status);
      }
    }, [dataCandidate]);
  
  
    const handleView = (idVacancy)=>{
      //console.log('idVacancy (a mostrar):..',idVacancy);
      navigate(`/addEditVacancie?v=${idVacancy}&isApplicant=1`)
    }
  
    const data = my_vacancies?.map((item, index) => {
      const findVacancy = dataCandidate?.phase_status?.find(
        (el) => el.idVacancy === item._id
      );
      let myPhase = "Aplicando";
      let myBadge ='secondary';
      
      if (findVacancy) {
        myPhase = findVacancy.phase;
        if(myPhase!=='Aplicando'&&myPhase!=='Contratado'){
          myBadge='info';
        }
        if(myPhase==='Contratado'){
          myBadge='primary';
        }
      }
      var str = item.salary.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return {
        ...item,
        id: index + 1,
        company: item.companyName,
        title: item.title,
        type: item.type,
        mode: item.mode,
        salary: `$ ${str}.00`,
        phase: myPhase,
        badge: myBadge
      };
    });
  
    const columns = [
      {
        name: "rowId",
        selector: (row) => row._id,
        sortable: true,
        omit: true,
      },
      {
        name: "EMPRESA",
        selector: (row) => `${row.company}`,
        sortable: true,
      },
      {
        name: "TITULO DE LA VACANTE",
        selector: (row) => `${row.title}`,
        sortable: true,
      },
      {
        name: "TIPO DE TRABAJO",
        selector: (row) => `${row.type}`,
        sortable: true,
      },
      {
        name: "MODALIDAD",
        selector: (row) => `${row.mode}`,
        sortable: true,
      },
      {
        name: "SALARIO MENSUAL",
        selector: (row) => `${row.salary}`,
        sortable: true,
      },
      {
        name: "ESTADO",
        selector: (row) => row.null,
        sortable: true,
  
        cell: (row) => [
          <Badge key={myId()} bg={row.badge} className="badge_state1 p-2 buscar me-1">
            {row.phase}
          </Badge>,
          <Button key={myId()} onClick={handleView.bind(this,row._id)}>
            <FaEye/>
          </Button>
        ],
      },
    ];
  
    const tableData = {
      columns,
      data,
    };
    
    return (
      <>
        <div
          className="m-5 p-3"
          id="formGral"
          style={{ fontFamily: "Poppins, sans-serif, Verdana, Geneva, Tahoma" }}
        >
          
          <DataTableExtensions {...tableData} export={false} print={false}>
            <DataTable
              {...tableData}
              columns={columns}
              data={data}
              defaultSortField="#"
              defaultSortAsc
              pagination
              /*  paginationPerPage={perPage} */
              highlightOnHover
              dense
              key={myId()}
              customStyles={customStyles}
            />
          </DataTableExtensions>
        </div>
      </>
    );
  };

ListMyAppVacancy.propTypes = {
    refreshing: PropTypes.string
    }

export default ListMyAppVacancy
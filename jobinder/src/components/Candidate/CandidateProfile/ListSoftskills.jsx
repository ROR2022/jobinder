import {useState,useEffect} from 'react'
import swal from "sweetalert";
import Swal from "sweetalert2";
import { myId } from '../../../lib/myLib';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { FaTrash, FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { getSkillsService } from '../../../api/apiSkills';

const ListSoftskills = ({ isApplicant,listSkills,setListSkills,emailCandidate}) => {
  const [dataSkill, setDataSkill] = useState([]);
  const [selectSkill, setSelectSkill] = useState("select");
  const [skillTemp, setSkillTemp] = useState(listSkills?listSkills:[]);
  //const [addList, setAddList]=useState({})


  const fetchSkill = async () => {
    const response = await getSkillsService();
    //console.log('response(jobSkills):..',response)
    const infoSkill = [...response];
    let arrShort=infoSkill.sort((x, y) => x.name.localeCompare(y.name));
    //console.log(arrShort);
    setDataSkill(arrShort); 
  };
  useEffect(() => {
    fetchSkill();
    console.log('listSkills:..',listSkills)
  }, []);

  useEffect(()=>{
    if(skillTemp.length===0){
      if(listSkills.length>0){
        // console.log('skillsCandidate:..',listSkills);
        setSkillTemp([...listSkills])
      }
    }
  },[listSkills]) 

//  console.log('lista desde backend', skillTemp)
 

  useEffect(()=>{
    if(skillTemp.length>0){

      setListSkills([...skillTemp])
    }else{
      setListSkills([])
    }
    //console.log('skillTemp:..',skillTemp)
  },[skillTemp])
 
 

  const handleSkillChange = (event) => {
    const value = event.target.value;
    setSelectSkill(value);
    console.log('valor',value)
    // clearSkills()
  };
  // console.log('newSkill',selectSkill)

  const newSkill = {
    skill: selectSkill,
  };


  const onFormSubmit = async(event) => {
    event.preventDefault();
    

    if(newSkill.skill==='select'){
      swal({
        title: "Favor de Seleccionar una Skill !!",
        icon: "error",
        button: "ok!",
    });
    return
    }
    const dataRepet= skillTemp?.find(item=>item._id===selectSkill);
    if(dataRepet){
        swal({
            title: "Ya hemos agregado esa skill!",
            icon: "error",
            button: "ok!",
        });
    }else{
        // setSkillTemp([...skillTemp,newSkill]);
         setSkillTemp([...skillTemp,selectSkill]);
    }
  };

//   console.log("arr de skills", skillTemp);

  const handleDeleteSkill = (index) => {
    Swal.fire({
      title: 'Eliminar Skill',
      text: "Estas seguro de eliminar esta skill?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        const skillToDelete = skillTemp[index];
        if (skillToDelete) {
          const updatedSkills = skillTemp.filter((_, i) => i !== index);
          setSkillTemp(updatedSkills);
        } else {
          console.log("error al eliminar");
        }
        Swal.fire(
          'Eliminado!',
          'Skill eliminada correctamente. No olvides guardar tus cambios al final',
          'success'
        )
      }
    })
  };
  // ----------------------------table

  const data= skillTemp?.map((skill, index) => {
    let myDataSkill=null;
    //console.log('skillTemp:..',skillTemp)
    //console.log('dataSkill:..',dataSkill)
    myDataSkill= dataSkill?.find(item=>item._id===skill);
    // console.log('compartive',myDataSkill)
    if(!myDataSkill){
     myDataSkill= dataSkill?.find(item=>item._id===skill.skill);
    }
    if(!myDataSkill){
      myDataSkill= dataSkill?.find(item=>item._id===skill._id);
    }
    //console.log('myDataSkill:..',myDataSkill)
    return(
      {
        id:myDataSkill?._id,
        qty:index,
        skill: myDataSkill?.name,
        level: myDataSkill?.level,
      }
    )
  })

  const columns = [
    {
      name:'rowId',
      selector: (row) =>`${row.id}${row.qty}`,
      sortable: true, hide:true,
      omit:true,

    },
    {
      name: "#",
      selector: (row,i) => i + 1,
      sortable: true,
      omit:true,
    },
    {
      name: "SKILL",
      selector: (row, i) =>`${row.skill}`,
      sortable: true
    },
    {
      name: "NIVEL",
      selector: (row, i) => row.level,
      sortable: true
    },
    {
      name: "OPCIONES",
      sortable: false,
      selector: (row, i) => row.null,
      cell: (d) =>[
        <button type="button" key={myId()} className="buttons btn btn-outline-danger"onClick={handleDeleteSkill.bind(this,d.qty)}>
         <FaTrash className="icon_trash" />  
         </button>,
  ]
 }
  ];

 const dataColumns = [...columns];
  columns.pop();
 
  const tableData = {
    columns:(isApplicant==='1'||emailCandidate)?columns:dataColumns,
    data
  };
  return (

        <div   style={{
        background: "rgba(0, 189, 214, 0.18)",
        borderRadius: "16px",
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        padding: "50px",
        marginTop:"20px",
        marginBottom:"50px"
      }}>
       <h2
        className="text-center mt-4 mb-4 fs-1 "
        style={{
          color: "rgb(73, 139, 166)",
          textShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px, rgba(60, 64, 67, 0.15) 0px 1px 3px",
          fontFamily: "Poppins, sans-serif, Verdana, Geneva, Tahoma",
        }}
      >
        Skills
        
      </h2>
          <div className="col-12 col-md-12">
            {isApplicant!=='1'&&!emailCandidate &&
            <div className="row d-flex">
            <label className="form-label text-dark" htmlFor="form6Example1">
              Elige la SoftSkill:
            </label>
            <div className="col">
              <div className="form-outline">
                <select
                  className="form-control"
                  id="selectSkill"
                  value={selectSkill}
                  onChange={handleSkillChange}
                >
                  <option value="select">Select</option>
                  {dataSkill.map((item) => {
                   
                    const id = item._id;
                    const skillComplete = `${item.name} - ${item.level}`;
                    return <option key={myId()}  value={`${id}`}>{skillComplete}</option>;
                  })}
                </select>
              </div>
            </div>
              <div className="col-2 buttons_actions sm">
                <button type="button" onClick={onFormSubmit} className="buttons btn btn-info text-light">
                  <FaPlus> </FaPlus>
                </button>
              </div>
          </div>
            }
              
                   
          </div>
          {/* table of skills */}
          <div className="col-12 col-md-12">
            <div className="mt-3">
                <DataTableExtensions  
                    export={false}
                    print={false}
                    filter={false}
                    {...tableData}>
                    <DataTable {...tableData}
                    key={myId()}
                    columns={columns}
                    data={data}
                    defaultSortAsc={true}
                    // noHeader
                    // defaultSortField="#"
                    // defaultSortAsc={true}
                    pagination
                    highlightOnHover
                    dense
                    title={isApplicant==='1'?"Lista de skills solicitadas":"Lista de skills agregadas"}
                    />
                </DataTableExtensions>
            </div>
            </div>

          {/* Table Skills */}
        </div>
    
  );

}

  ListSoftskills.propTypes = {
    listSkills: PropTypes.array.isRequired,
    setListSkills: PropTypes.func.isRequired
  }



export default ListSoftskills
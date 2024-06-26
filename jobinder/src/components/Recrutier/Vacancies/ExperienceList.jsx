import {useState,useEffect} from 'react'
import {Table} from 'react-bootstrap'
import {FaTrash,FaEdit} from 'react-icons/fa'
import Swal from 'sweetalert2'
import {myId} from '../../../lib/myLib'
import PropTypes from 'prop-types'


const initAddExp = {
    task: "",
  };

const ExperienceList = ({isApplicant, dataActivities, setDataActivities }) => {
    const [addTask, setAddTask] = useState(initAddExp);
    const [isEditing, setIsEditing] = useState(false);
    const [dataEditing, setDataEditing] = useState({});
  
    const handleChange = (e) => {
      //console.log(e.target.name, e.target.value);
      setAddTask({
        ...addTask,
        [e.target.name]: e.target.value,
      });
    };
  
    useEffect(()=>{
      //console.log('dataActivities:..',dataActivities)
    },[dataActivities])
  
    const handleExperience = () => {
      // console.log("Agregando Actividad:..", addTask);
      if (addTask.task === "") {
        Swal.fire("Agrega una actividad!", "Valor vacio", "error");
      } else {
        setDataActivities([...dataActivities, addTask]);
        setAddTask(initAddExp);
        Swal.fire("Actividad agregada!", "listo!", "success");
      }
    };
  
    const handleDeleteExp = (index) => {
      Swal.fire({
        title: "Eliminar actividad",
        text: "Estas seguro de eliminar esta actividad?!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          const tempData = [...dataActivities];
          const newData = tempData.filter((_, i) => i !== index);
          // console.log("newData:..", newData);
          setDataActivities([...newData]);
          Swal.fire("Eliminado!", "Actividad eliminada!", "success");
        }
      });
      // ----------------------------------------
      // console.log("Borrar el index:...", index);
      // const tempData= [...dataActivities];
      // const newData= tempData.filter((_,i)=>i!==index);
      // console.log('newData:..',newData);
      // setDataActivities([...newData]);
    };
  
    const handleEditTask=(index)=>{
      setIsEditing(true)
      let tempEdit= dataActivities[index]
      setDataEditing({...tempEdit})
      setAddTask({
        task:tempEdit.task|| "",
      })
    }
  
    const updateTask=()=>{
      // console.log('hola')
      const result=dataActivities.map(item=>{
        if(item._id===dataEditing._id){
          item.task=addTask.task
        }
        return item
      })
      setDataActivities([...result])
      Swal.fire("Actividad Editada!", "No olvides guardar tus cambios al final!", "success");
      setIsEditing(false)
      addTask.task=''
    }
  
    return (
      <div className="row">
        <h2
          className="text-start mt-4 fs-4 text-center"
          style={{
            color: "rgb(73, 139, 166)",
            textShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px, rgba(60, 64, 67, 0.15) 0px 1px 3px",
            fontFamily: "Poppins, sans-serif, Verdana, Geneva, Tahoma",
          }}
        >
          Actividades y Requisitos
        </h2>
        {isApplicant!=='1' &&
        <div className="col-12 form-outline">
        <textarea
          id="task"
          name="task"
          value={addTask.task}
          className="form-control"
          type="text"
          onChange={handleChange}
        />
        <button
          className=" btn btn-outline-info my-2"
          type="button"
          style={{
            width: "150px",
            fontSize: "12px",
            padding: "15px",
          }}
          onClick={
            isEditing?updateTask:
            handleExperience}
        >
          {
            isEditing?'Editar actividad':' Agregar actividad'
          }
          
        </button>
      </div>
        }
        
        <div className="col-12">
           <Table striped bordered hover>
          <thead>
            <tr>
              {/* <th className="fs-6">#</th> */}
              <th>Descripción</th>
              {isApplicant!=='1' &&
              <th>Opciones</th>
              }
              
            </tr>
          </thead>
          <tbody>
            {dataActivities?.map((item, index) => {
              return (
                <tr key={myId()}>
                  {/* <td>{index+1}</td> */}
                  <td>{item.task}</td>
                  {isApplicant!=='1' &&

<td>
                    <div className="d-flex justify-content-around">
                    <span
                      className="btn btn-outline-danger"
                      name={index}
                      onClick={()=>handleDeleteExp(index)}>
                      <FaTrash />
                    </span>
                    <span
                      className="btn btn-outline-success"
                      name={index}
                      onClick={()=>handleEditTask(index)}>
                      <FaEdit />
                    </span>
  
                    </div>
                  </td>

                  }
                  
                </tr>
              );
            })}
          </tbody>
        </Table>
          
        </div>
        
      </div>
    );
  };

    ExperienceList.propTypes = {
        dataActivities: PropTypes.array.isRequired,
        setDataActivities: PropTypes.func.isRequired,
        };

export default ExperienceList
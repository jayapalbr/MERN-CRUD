import React from "react";
import { FaTrash, FaEdit, FaCheckDouble } from "react-icons/fa";

const Task = ({ task, index,deleteTask ,getSingleTAsk,setToComplete}) => {
  return (
    <div style={{display:'flex', alignItems:'center' ,justifyContent:"space-between",margin:'0px 200px',borderBottom:'1px solid aqua'}}>
      <p>
        <b>{index + 1}</b>
        {/* <b>{index + 1}</b>
        <b>{index + 1}</b>
        <b>{index + 1}</b> */}
        {task.name}
      </p>
      <div style={{}}>
        <FaCheckDouble color="green" onClick={()=>setToComplete(task)} style={{marginLeft:"20px"}}/>
        <FaEdit color="purple"  onClick={()=>{getSingleTAsk(task)}} style={{marginLeft:"20px"}}/>
        <FaTrash color="red" onClick={()=>deleteTask(task._id)} style={{marginLeft:"20px"}} />
      </div>
      
    </div>

  );
};

export default Task;

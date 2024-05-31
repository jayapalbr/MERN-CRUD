import React from 'react'

const TaskForm = ({createTask,name,handleInputChange,isEditing,updateTask}) => {
  return (
    <div>
        <form className='task-form' onSubmit={ isEditing? updateTask: createTask}>
        <input type='text' 
        name='name'
        value={name}
        onChange={handleInputChange}
        placeholder='Add a Task'/>
        <button type='submit' style={{backgroundColor:'red'}}>{isEditing ?"edit":"Add"}</button>
        </form>
       
        <div>
        </div>
    </div>
  )
}

export default TaskForm
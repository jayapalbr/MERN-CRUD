import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { toast } from "react-toastify";
import { URL } from "../App";
import e from "cors";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedtasks, setCompletedTasks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    completd: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTAskID] = useState("");

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTasks(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createTask = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (name === "") {
      return toast.error("Input field cannotbe empty");
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData);
      toast.success("Task added succefully");

      setFormData({ ...formData, name: "" });
      getTasks()
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleTAsk = async (task) => {
    setFormData({ name: task.name, completd: false });
    setTAskID(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();

    if (name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      await axios.put(`${URL}/api/tasks/${taskId}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completd: true,
    };
    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(()=>{
    const cTask=tasks.filter((task)=>{
        return task.completd===true
    })
    setCompletedTasks(cTask)
          },[tasks])

  return (
    <div>
      <h2>Task MAnager</h2>
      <TaskForm
        createTask={createTask}
        handleInputChange={handleInputChange}
        name={name}
        isEditing={isEditing}
        updateTask={updateTask}
      />



      <div>
        <p>
          <b>Total Tasks</b>:{tasks.length}
        </p>
        <p>
          <b>Completed Tasks</b>:{completedtasks.length}
        </p>
      </div>
      <hr />
      {/* {isLoading && <div>LOADINGGGGGGGGGGG</div>} */}
      {!isLoading && tasks.length === 0 ? (
        <p>No Task added</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={tasks._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTAsk={getSingleTAsk}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;

import {useEffect, useState} from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from '../App';
/* Is loading spinner */
import { Dna } from  'react-loader-spinner'



const TaskList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks,setTasks] = useState()
  const getTasks = () =>{
    setIsLoading(true);
    setTimeout(() => {
      axios.get(`${URL}/api/tasks`)
      .then(function (response) {
        // handle success
        setTasks(response.data)
        setIsLoading(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setIsLoading(false)
      })
    }, 400);

  }
  useEffect(()=>{
    getTasks();
    /* console.log(tasks); */
  },[]);
  /* New task */
  const [newTask, setNewTask] = useState('');
  const hangleInputChange = (text) =>{
      setNewTask(text);
  }
  const createTask = (e) => {
      e.preventDefault();
      if(!Boolean(newTask)){
        toast.error("Can't create an empty task!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        return;
      }
      axios.post(`${URL}/api/tasks`,{
          name: newTask,
          completed: false
      }).then(function(res){
        toast.success("New task has been created!", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        getTasks();
        setNewTask('');
      }).catch(function(error){
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    )
  }
  /* Delete task */
  const deleteTask = (id) => {
    axios(
      {
        url:`${URL}/api/tasks/${id}`,
        method: "DELETE",
        headers:{
          "Accepts":"application/json"
        }
      }
    )
    .then(function(res){
      toast.success("Task successfully deleted!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      getTasks();
    })
    .catch(function(err){
      console.log(err);
      toast.error(err.message,{
        position: "top-right"
      })
    })
  }
  /* Check completition */
  const checkTask = (id,status) =>{
    axios({
      method: 'patch',
      url: `${URL}/api/tasks/${id}`,
      data: {
        completed:!status
      }
    }).then(()=>{
      getTasks();
    }).catch((err)=>{
      console.log(err)
      toast.error(err.message)
    })

  }

  /* Updating a task */
  const [isUpdating, setIsUpdating] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState();
  /* setupEdit, used in Task.jsx */
  const setupEdit = (name,id) => {
    setIsUpdating(true);
    setNewTask(name);
    setIdToUpdate(id);
  }
  /* updateTask, used on TaskForm.jsx */
  const updateTask = async (e,id) => {
    e.preventDefault();
    if(!Boolean(newTask)){
      toast.error("Can't create an empty task!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        });
      return;
    }
    let name = e.target.previousSibling.value;
    try {
      await axios.patch(`${URL}/api/tasks/${id}`,{
        name:name
      })
      toast.success('Updated!',{
        position: "top-left",
        theme: "dark"
      });
      setIsUpdating(false);
      setNewTask('');
      getTasks();
    } catch (error) {
      toast.error(error.message,{theme:'dark'});
      console.log(error);
      setIsUpdating(false);
      setNewTask('');
    }

  }

  const completedTasks = tasks?.filter((t)=>t.completed).length

  return (
    <div className='flex flex-col items-center w-full px-4'>
      <h2>Task Manager</h2>

      <TaskForm name={newTask} updateTask={updateTask} id={idToUpdate} 
      createTask={createTask} handleInputChange={hangleInputChange} 
      isUpdating={isUpdating} />

      <div className='flex justify-between w-full pt-3'>
        <div className='total text-sm'>
          <b>Total tasks: </b> <span className='text-gray-800'>{tasks?.length}</span>
        </div>
        <div className='completed text-sm'>
          <b>Completed tasks: </b> <span className='text-gray-800'>{ completedTasks || 0 }</span>
        </div>
      </div>
      <hr className='border-[,5px] border-gray-400 my-1 w-full'/>

      {
        isLoading && (
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        )
      }

      {
        !isLoading && (tasks?.length !== 0 ? 
        (
          tasks?.map((task,i)=>{
            return <Task  
                      setupEdit={setupEdit}
                      task={task}
                      deleteTask={deleteTask} checkTask={checkTask}
                      key={task._id} id={task._id} i={i}/>
          })
        ) :
        (
          <p className='caret-transparent'>No tasks found</p>
        ))
      }

    </div>
  )
}

export default TaskList
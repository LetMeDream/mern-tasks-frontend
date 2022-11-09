import React from 'react';
import { FaEdit, FaCheckDouble, FaTrashAlt } from "react-icons/fa"

const Task = ({task,i,deleteTask,checkTask,id,setupEdit}) => {
  let thisTask = task.completed;
  let styles = {
    taskContainer: 'flex w-full transition-all justify-between items-center caret-transparent cursor-pointer bg-slate-100 hover:bg-slate-200 p-2 px-4 border-l-4 border-purple-500 mb-[2px] ',
    task:'task flex '
  }
  let completed = ''
  if(thisTask){
    completed = 'text-blue-700 bg-blue-100 hover:bg-blue-200 border-l-blue-500'
  }
  

  return (
    <div className={styles.taskContainer + completed}>
      <div className={styles.task}>
        <b>{i+1}.</b>
        <p>{task.name}</p>
      </div>
      <div className='task-icons flex gap-1 font-light text-md cursor-pointer'>
        <FaCheckDouble onClick={(e)=>checkTask(id,task.completed)} className='hover:text-blue-700 text-blue-600'/>
        <FaEdit onClick={()=> setupEdit(task.name,id) } className='hover:text-green-700 text-green-600'/>
        <FaTrashAlt onClick={()=>deleteTask(id)} className='hover:text-red-700 text-red-600'/>
      </div>
    </div>
  )
}

export default Task
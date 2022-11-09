import React from 'react'

const Taskform = ({handleInputChange, createTask,name,isUpdating,updateTask, id}) => {
  return (
    <form onSubmit={(e)=>createTask(e)} autoComplete='nope' className='flex mt-4 w-full'>
      <input
        onChange={(e)=>handleInputChange(e.target.value)} className='p-2 px-4 w-full border-[1px] border-gray-400' autoComplete='nope' 
        type='text' placeholder='Add a task' name='name' value={name} />

      { !isUpdating ? 
        (
          <button className=' bg-purple-600 hover:bg-purple-500 p-2 px-4 text-white caret-transparent' type="submit">Add</button>
        ):
        (
          <button onClick={(e) => updateTask(e,id)} className=' bg-purple-600 hover:bg-purple-500 p-2 px-4 text-white caret-transparent'>Update</button>
        )
      }

    </form>
  )
}

export default Taskform
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import TaskList from './components/TaskList';

/* Since proxying seems to never work... */
export const URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

function App() {

  return (
    <div className="App min-h-screen bg-sky-500 flex justify-center items-start py-10">
      <div className="task-container bg-white w-[90%] md:w-[50%] rounded-lg flex items-center p-6 text-xl">
        <TaskList/>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App

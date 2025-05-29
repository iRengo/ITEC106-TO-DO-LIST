import './App.css';
import { useState, useEffect } from 'react';
import listIcon from './assets/images/list.png';
import noteImage from './assets/images/note.png';
import { FaTrash } from 'react-icons/fa';

function App() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        completed: false,
        deleting: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, deleting: true } : task
    ));

    setTimeout(() => {
      setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
    }, 300);
  };

  const handleToggle = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-cover">

      <div className="shadow-md bg-[#394DA5] p-4 flex items-center justify-between">
        <h1 className="text-white text-3xl font-piedra ml-6">Keepnotes</h1>
        <img src={listIcon} alt="List Icon" className="w-10 h-10 mr-8" />
      </div>

      <div className="flex justify-center items-center h-[calc(100vh-80px)] px-6">
        <div className="flex w-full max-w-5xl bg-[#22376C] rounded-xl p-10 shadow-lg backdrop-blur-md">

          <div className="flex-1 text-white pr-6">
            <h2 className="text-2xl font-bold mb-8 font-poppins ml-2">TODO-LIST</h2>

            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Enter a task..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                className="w-full py-4 pl-6 pr-28 rounded-full bg-white text-black outline-none"
              />
              <button
                onClick={handleAddTask}
                className="absolute right-1 top-1 bottom-1 px-8 bg-[#394DA5] text-white rounded-full hover:bg-[#2e3e88] transition"
              >
                Add Task
              </button>
            </div>

            <div className="max-h-[240px] overflow-y-auto hide-scrollbar">
              <ul className="space-y-3 max-h-[240px] pr-1">
                {tasks.length === 0 ? (
                  <li className="text-white text-center text-lg font-poppins">No task to show</li>
                ) : (
                  tasks.slice().reverse().map((task) => (
                    <li
                      key={task.id}
                      className={`task-item bg-[#394DA5] text-white text-xl font-semibold rounded-lg px-4 py-3 flex items-center justify-between ${task.deleting ? 'deleting' : ''
                        }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggle(task.id)}
                            className="mr-4 w-5 h-5 rounded border-white border-2 checked:bg-[#FFFFFF] checked:border-white appearance-none cursor-pointer relative
              after:content-['✔'] after:absolute after:top-[-2px] after:left-[-1px] after:text-white after:text-sm after:opacity-0 checked:after:opacity-100"
                          />
                          <span className={`${task.completed ? 'line-through text-gray' : ''}`}>{task.text}</span>
                        </div>
                        <span className="text-sm text-gray-300 ml-9">
                          {new Date(task.id).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <button onClick={() => handleDelete(task.id)} className="text-white hover:text-red-700">
                        <FaTrash />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <img src={noteImage} alt="Note" className="max-w-full w-[90%] h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

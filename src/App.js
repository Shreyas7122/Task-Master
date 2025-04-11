import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const handleDelete = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
    setDeletedTasks([...deletedTasks, taskToDelete]);
    setCompletedTasks(completedTasks.filter((task) => task !== taskToDelete));
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks.filter((task) => task !== taskToDelete))
    );
  };
  const handleComplete = (taskToComplete, isChecked) => {
    if (isChecked) {
      setCompletedTasks([...completedTasks, taskToComplete]);
    } else {
      setCompletedTasks(completedTasks.filter(task => task !== taskToComplete));
    }
  };

  return (
    <div className="flex gap-2">
      <h1 className=" flex gap-2 text-2xl font-bold text-center text-slate-800">
        Task Master
      </h1>
      <input
        onChange={(e) => setTask(e.target.value)}
        value={task}
        type="text"
        name="task"
        id="task"
        autoComplete="off"
        className="flexw-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-5 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Type your task here"
      ></input>
      <button
        onClick={() => {
          setTasks([...tasks, task]);
          setTask("");
        }}
        className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        type="button"
      >
        ADD
      </button>
      <div className="flex flex-col gap-2">
        <div className="flex-row">
          {tasks.map((task, index) => (
            <div key={index} className="flex-row">
              {task}
              <input
                onClick={() => handleComplete(task)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                type="checkbox"
                checked={completedTasks.includes(task)}
                onChange={(e) => handleComplete(task, e.target.checked)}
              />
              <button
                onClick={() => handleDelete(task)}
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <h3>{completedTasks.length} tasks completed</h3>
    </div>
  );
}

export default App;

import "./App.css";
import React, { useEffect, useState } from "react";
import MyBtn from "./components/btn";
import EditComponent from "./components/edit";
import { nanoid } from "nanoid";
import PendingTasks from "./components/Pend";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [TotalEffort , setTotalEffort] = useState("0");

  const handleDelete = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
  };

  const handleComplete = (task, isChecked) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, isCompleted: isChecked } : t
    );
    setTasks(updatedTasks);
    if (isChecked) {
      setTotalEffort(TotalEffort-parseInt(task.effort));
    } else {
      setTotalEffort(TotalEffort+parseInt(task.effort));
    }
  };

  const handleAdd = (task) => {
    if (!task) {
      alert("Please enter a task");
      return;
    }
    if (tasks.some((t) => t.text === task)) {
      alert("Task already exists");
      return;
    }
    setTasks([
      ...tasks,
      {
        effort: document.getElementById("Effort").value,
        isCompleted: false,
        text: task,
        id: nanoid(),
        timestamp: new Date().toLocaleString(),
      },
    ]);
    document.getElementById("task").value = "";
  };

  const handleEdit = (updatedTask) => {
    const updatedTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(updatedTasks);
  };

useEffect(() => {
  setTotalEffort(
    tasks.reduce((acc, task) => {
  
      return acc+ parseInt(task.effort);
        }, 0)
  );
}
, [tasks.effort]);

const effortOptions = [20, 40, 60, 80, 100];
const effort = effortOptions.map((effort) => (
  <option key={effort} value={effort}>
    {effort}
  </option>
));

  return (
    <>
      <div className="Page">
        <h1 className="h1">Task Master</h1>
        <div className="input-container">
          <input
            type="text"
            name="task"
            id="task"
            placeholder="Type your task here"
          ></input>
          <select id="Effort" name="Effort">
          {effort}
          </select>
          <MyBtn className="Add-btn" label="ADD" 
          onClick={() => {
            const task = document.getElementById("task").value;
            handleAdd(task);
          }
          }
          />
        </div>
        {tasks.map((task) => (
              <div className="map-container" key={task.id}>
              <input
                type="checkbox"
                onChange={(e) => handleComplete(task, e.target.checked)}
              />
              <EditComponent task={task} updatedTask={handleEdit} />
              <MyBtn
                onClick={() => handleDelete(task)}
                className="Delete-btn"
                label="DELETE"
              />
            </div>
        ))}
          Total Effort:{TotalEffort}<br /><br />
        Tasks Completed: {tasks.filter((task) => task.isCompleted).length}
        <PendingTasks tasks={tasks} />
      </div>
    </>
  );
};

export default App;
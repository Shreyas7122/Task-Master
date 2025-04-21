import "./App.css";
import React, { useState } from "react";
import MyBtn from "./components/btn";
import EditComponent from "./components/edit";
import { nanoid } from "nanoid";
import PendingTasks from "./components/Pend";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleDelete = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
  };

  const handleComplete = (task, isChecked) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, isCompleted: isChecked } : t
    );
    setTasks(updatedTasks);
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

  const TotalEffort = tasks.reduce((acc, task) => {
    if (task.isCompleted) {
      return acc + parseInt(task.effort, 10);
    }
    return acc;
  }
  , 0);


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
          <select name="Effort" id="Effort">
            <option value="100">Effort</option>
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="60">60</option>
              <option value="80">80</option>
              <option value="100">100</option>
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
        ))}<br />
        Total Effort:{TotalEffort}<br/>  
        Tasks Completed: {tasks.filter((task) => task.isCompleted).length}
        <PendingTasks tasks={tasks} />
      </div>
    </>
  );
};

export default App;

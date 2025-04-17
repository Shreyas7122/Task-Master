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

  const handleadd = (task) => {
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
        isCompleted: false,
        text: task,
        id: nanoid(),
        timestamp: new Date().toLocaleString(),
      },
    ]);
  };



  const handleEdit = (updatedTask) => {
    console.log("Updated Task:", updatedTask);
    const updatedTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(updatedTasks);
  };

  const filter = (tasks) => {
    return tasks.filter((tasks) => tasks.isCompleted).length;
  };

  return (
    <>
    <div className="Page">
    <h1 className="h1">Task Master</h1>
      <div className="input-container">
        <input
          onBlur={(e) => handleadd(e.target.value)}
          type="text"
          name="task"
          id="task"
          placeholder="Type your task here"
        ></input>
        <MyBtn
          onClick={() => handleadd(task)}
          className="Add-btn"
          label="ADD"
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
      Tasks Completed: {filter(tasks)}
      <PendingTasks tasks={tasks} />
    </div>
    </>
  );
};

export default App;

import "./App.css";
import React, { useState } from "react";
import MyBtn from "./components/btn";
import { button } from "@material-tailwind/react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const timestamp = new Date().toLocaleString();
  const [task, setTask] = useState();
  const [completedTasks, setCompletedTasks] = useState([]);


  var id = 0;

 
    const handleDelete = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
    setCompletedTasks(completedTasks.filter((task) => task !== taskToDelete));
  };
  const handleComplete = (taskToComplete, isChecked) => {
    if (isChecked) {
      setCompletedTasks([...completedTasks, taskToComplete]);
    } else {
      setCompletedTasks(completedTasks.filter(task => task !== taskToComplete));
    }
  };

  const handleadd = (task) => {
    if (!task) {
      alert("Please enter a task");
      return;
    }
    if (tasks.includes(task)) {
      alert("Task already exists");
      return;
    }
const newTask = {
      text: task,
      id: id,
      timestamp: timestamp
    };

    setTasks([...tasks, newTask]);
    id++;
    setTask("");
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleadd(task);
    }
  }

  const handleEdit = (taskToEdit) => {
    const newTask = prompt("Edit your task", taskToEdit.text);
    if (newTask) {
      setTasks(tasks.map(task => (task === taskToEdit ? { ...task, text: newTask } : task)));
    }
  }

  return (
    <div className="Page">
      <h1>
        Task Master
      </h1>
      <div
        className="input-container"
      >
      <input
        onChange={(e) => setTask(e.target.value)}
        value={task}
        type="text"
        name="task"
        id="task"
        placeholder="Type your task here"
        onKeyPress={handleKeyPress}
      ></input>
      <MyBtn
        onClick={() => handleadd(task)}
        className="Add-btn"
        label="ADD"
      />
      </div>
      <div>
        <div
          className="map-container"> 
          {tasks.map((task,key) => (
            <div key={key}>
              <input
                type="checkbox"
                onChange={(e) => handleComplete(task, e.target.checked)}
              />
              {task.text}
              <MyBtn
                onClick={() => handleDelete(task)}
                className="Delete-btn"
                label="DELETE"
              />
              <MyBtn
                onClick = {()=> handleEdit(task)}
                className="Edit-btn"
                label="EDIT"
              />
            </div>
          ))}
        </div>
      </div>
      <h3>{completedTasks.length} tasks completed</h3>
    </div>
  );
}

export default App;

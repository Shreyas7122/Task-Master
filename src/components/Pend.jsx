import React from "react";

const PendingTasks = ({ tasks }) => {
  const pendingTasks = tasks.filter((task) => !task.isCompleted);

  return (
    <div>
      Pending Tasks
      {pendingTasks.map((task,key) => (
        <div key={key}>
          -{task.text}  </div>
      ))}
    </div>
  );
};

export default PendingTasks;

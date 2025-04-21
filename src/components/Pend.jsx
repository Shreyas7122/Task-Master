import React from "react";

const PendingTasks = ({ tasks }) => {
  const pendingTasks = tasks.filter((task) => !task.isCompleted);

  return (
    <div className="pending-tasks">
      Pending Tasks
      {pendingTasks.map((task) => (
        <div key={task.id}>
          -{task.text}  </div>
      ))}
    </div>
  );
};

export default PendingTasks;

import React, { useState } from "react";
import MyBtn from "./btn";

const EditComponent = ({ task, updatedTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(task?.text || "");


  const handleEditToggle = () => {
    if (isEditing) {
      if (!taskToEdit.trim()) {
        alert("Task cannot be empty");
        return;
      }
      updatedTask({ ...task, text: taskToEdit });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="edit-component">
      {isEditing ? (
        <input
          type="text"
          value={taskToEdit}
          onChange={(e) => setTaskToEdit(e.target.value)}
        />
      ) : (
        <span>{task.text}</span>
      )}
      Effort:{task.effort}
      <MyBtn className="Edit-btn" onClick={handleEditToggle} label={isEditing ? "Save" : "Edit"} />
    </div>
  );
};

export default EditComponent;
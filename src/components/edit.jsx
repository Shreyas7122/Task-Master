import React, { useState } from "react";
import MyBtn from "./btn";

const EditComponent = ({ task, updatedTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(task?.text || "");


  const handleEditToggle = () => {
    if (isEditing) {
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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              updatedTask({ ...task, text: taskToEdit });
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <span>{task.text}</span>
      )}
      <MyBtn className="Edit-btn" onClick={handleEditToggle} label={isEditing ? "Save" : "Edit"} />
    </div>
  );
};

export default EditComponent;
import React, { useState } from "react";
import MyBtn from "./btn";

const EditComponent = ({ task, updatedTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(task.text);
  const effortOptions = [20, 40, 60, 80, 100];
  const [effort, setEffort] = useState();

  const effortlist = effortOptions.map((p) => (
    <option key={p} value={p}>
      {p}
    </option>
  ));

  const handleEditToggle = () => {
    if (isEditing) {
      if (!taskToEdit.trim()) {
        alert("Task cannot be empty");
        return;
      }
      updatedTask({ ...task, text: taskToEdit ,effort: effort});
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="edit-component">
      {isEditing ? (
        <>
        <input
          type="text"
          value={taskToEdit}
          onChange={(e) => setTaskToEdit(e.target.value)}
          placeholder="Edit task"
        />
          <select id="Effort" name="Effort"  onChange={(e) => setEffort(e.target.value)} value={effort}>
          {effortlist}
          </select>
        </>
      ) : (
        <>
        <span>{task.text}</span>
        Effort: {task.effort}
        </>
      )}
      <MyBtn className="Edit-btn" onClick={handleEditToggle} label={isEditing ? "Save" : "Edit"} />
    </div>
  );
};

export default EditComponent;
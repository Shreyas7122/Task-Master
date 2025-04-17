import React from 'react';

const PendingTasks = ({tasks}) =>{

const pendingTasks = tasks.filter((task) => !task.isCompleted);

return (
<div>
            Pending Tasks
            <ul>
              {pendingTasks.map((task) => (
                <li key={task.id}>
                  {task.text}
                </li>
              ))}
            </ul>
          </div>
);
};

export default PendingTasks;
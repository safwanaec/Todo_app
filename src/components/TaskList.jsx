import React from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  if (!tasks || tasks.length === 0) {
    return <div className="task-list empty">No tasks available.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          onToggleComplete={onToggleComplete} 
        />
      ))}
    </div>
  );
}

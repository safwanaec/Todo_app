import React from 'react';
import { Trash2, Edit } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  if (!task) return null;
  const priority = task.priority || 'Medium';
  return (
    <div className={`task-card target-priority-${priority.toLowerCase()} ${task.isCompleted ? 'completed' : ''}`}>
      <div className="task-card-header">
        <label className="checkbox-container">
          <input 
            type="checkbox" 
            checked={task.isCompleted || false} 
            onChange={() => onToggleComplete && onToggleComplete(task.id)} 
          />
        </label>
        <span className="task-title" style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
          {task.title}
        </span>
        <span className={`badge badge-${priority.toLowerCase()}`}>{priority}</span>
      </div>
      {task.description && <div className="task-desc">{task.description}</div>}
      {task.dueDate && <div className="task-due-date">Due: {task.dueDate}</div>}
      <div className="task-actions">
        <button aria-label="Edit" onClick={() => onEdit && onEdit(task)}><Edit size={16}/></button>
        <button aria-label="Delete" onClick={() => onDelete && onDelete(task.id)}><Trash2 size={16}/></button>
      </div>
    </div>
  );
}

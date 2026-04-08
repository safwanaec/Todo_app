import React, { useState, useEffect } from 'react';
import { validateTitle, validateDescription } from '../models/TaskValidator';

export default function TaskForm({ onSubmit, initialData = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setDueDate(initialData.dueDate || '');
      setPriority(initialData.priority || 'Medium');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!validateTitle(title)) {
      setError('Title must be between 1 and 50 characters');
      return;
    }
    if (!validateDescription(description)) {
      setError('Description must be less than 200 characters');
      return;
    }
    
    setError('');
    const tData = { title, description, dueDate, priority };
    if (initialData) {
      onSubmit({ ...initialData, ...tData });
    } else {
      onSubmit(tData);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{initialData ? 'Edit Task' : 'Add Task'}</h3>
      <div className="form-group">
        <label>Title:</label>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />
        {error && <span className="error" style={{color: 'red', fontSize: '0.8rem'}}>{error}</span>}
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Due Date:</label>
        <input 
          type="date" 
          value={dueDate} 
          onChange={e => setDueDate(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Priority:</label>
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit" className="primary-btn">{initialData ? 'Update' : 'Add'}</button>
    </form>
  );
}

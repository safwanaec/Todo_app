import React from 'react';

export default function FilterBar({ 
  priority, setPriority, 
  completion, setCompletion, 
  dateRange, setDateRange 
}) {
  const clearFilters = () => {
    setPriority('All');
    setCompletion('All');
    setDateRange({ start: '', end: '' });
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Priority:</label>
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Status:</label>
        <select value={completion} onChange={e => setCompletion(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      <div className="filter-group date-filters">
        <label>From:</label>
        <input 
          type="date" 
          value={dateRange.start} 
          onChange={e => setDateRange({...dateRange, start: e.target.value})} 
        />
        <label>To:</label>
        <input 
          type="date" 
          value={dateRange.end} 
          onChange={e => setDateRange({...dateRange, end: e.target.value})} 
        />
      </div>

      <button className="secondary-btn" onClick={clearFilters}>Clear Filters</button>
    </div>
  );
}

import React from 'react';

export default function RecycleBinModal({ tasks = [], onRestore, onClose }) {
  const deletedTasks = tasks.filter(t => t.isDeleted);

  return (
    <div className="modal-overlay">
      <div className="modal-content recycle-bin">
        <h2>Deleted Tasks</h2>
        {deletedTasks.length === 0 ? (
          <p>No deleted tasks. Tasks will appear here if deleted within the last 7 days.</p>
        ) : (
          <ul className="deleted-list">
            {deletedTasks.map(task => {
              const daysLeft = Math.max(0, 7 - Math.floor((new Date() - new Date(task.deletedAt)) / (1000 * 60 * 60 * 24)));
              return (
                <li key={task.id} className="deleted-item">
                  <div className="deleted-info">
                    <strong>{task.title}</strong>
                    <span className="days-left">{daysLeft} days until permanent deletion</span>
                  </div>
                  <button className="secondary-btn" onClick={() => onRestore && onRestore(task.id)}>Restore</button>
                </li>
              );
            })}
          </ul>
        )}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

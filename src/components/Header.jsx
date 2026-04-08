import React from 'react';
import { Sun, Moon, Trash2 } from 'lucide-react';

export default function Header({ darkMode, toggleDarkMode, onOpenRecycleBin }) {
  return (
    <header className="header">
      <div className="header-brand">
        <span className="header-icon">✅</span>
        <h1>TaskFlow</h1>
        <span className="header-subtitle">Stay organized, stay ahead</span>
      </div>
      <div className="header-actions">
        <button className="icon-btn" onClick={onOpenRecycleBin} title="Deleted Tasks" aria-label="Open Recycle Bin">
          <Trash2 size={20} />
          <span>Deleted Tasks</span>
        </button>
        <button className="icon-btn theme-btn" onClick={toggleDarkMode} title="Toggle Theme" aria-label="Toggle dark mode">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}

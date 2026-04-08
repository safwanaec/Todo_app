import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import RecycleBinModal from './components/RecycleBinModal';
import Toast from './components/Toast';
import useTaskManager from './hooks/useTaskManager';
import useFilters from './hooks/useFilters';

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, restoreTask, toggleComplete } = useTaskManager();
  const [editingTask, setEditingTask] = useState(null);
  const [showRecycleBin, setShowRecycleBin] = useState(false);
  const [toast, setToast] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const activeTasks = useMemo(() => tasks.filter(t => !t.isDeleted), [tasks]);

  const {
    priorityFilter, setPriorityFilter,
    completionFilter, setCompletionFilter,
    dateRange, setDateRange,
    searchText, setSearchText,
    getFilteredTasks
  } = useFilters(activeTasks);

  const filteredTasks = useMemo(() => getFilteredTasks(), [getFilteredTasks]);

  const showToast = useCallback((msg) => setToast(msg), []);

  const handleAdd = useCallback((data) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      setEditingTask(null);
      showToast('Task updated ✓');
    } else {
      addTask(data);
      showToast('Task added ✓');
    }
  }, [editingTask, addTask, updateTask, showToast]);

  const handleDelete = useCallback((id) => {
    deleteTask(id);
    showToast('Task deleted');
  }, [deleteTask, showToast]);

  const handleRestore = useCallback((id) => {
    restoreTask(id);
    showToast('Task restored ✓');
  }, [restoreTask, showToast]);

  const handleToggleComplete = useCallback((id) => {
    toggleComplete(id);
  }, [toggleComplete]);

  const handleToggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);

  return (
    <div className={`app${darkMode ? ' dark' : ''}`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={handleToggleDarkMode}
        onOpenRecycleBin={() => setShowRecycleBin(true)}
      />

      <main className="main-layout">
        {/* Left: Task List */}
        <section className="task-panel">
          <div className="panel-controls">
            <SearchBar onSearch={setSearchText} />
            <FilterBar
              priority={priorityFilter}
              setPriority={setPriorityFilter}
              completion={completionFilter}
              setCompletion={setCompletionFilter}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>
          <div className="task-count">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
          </div>
          <TaskList
            tasks={filteredTasks}
            onEdit={setEditingTask}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        </section>

        {/* Right: Task Form */}
        <aside className="form-panel">
          <TaskForm
            onSubmit={handleAdd}
            initialData={editingTask}
            key={editingTask ? editingTask.id : 'new'}
          />
          {editingTask && (
            <button className="cancel-btn" onClick={() => setEditingTask(null)}>
              Cancel Edit
            </button>
          )}
        </aside>
      </main>

      {showRecycleBin && (
        <RecycleBinModal
          tasks={tasks}
          onRestore={handleRestore}
          onClose={() => setShowRecycleBin(false)}
        />
      )}

      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  );
}

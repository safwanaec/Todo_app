import { useState, useRef, useCallback } from 'react';
import TaskRepository from '../models/TaskRepository';

export default function useTaskManager() {
  const repo = useRef(new TaskRepository());
  const [tasks, setTasks] = useState(repo.current.getAll());

  const refresh = useCallback(() => {
    setTasks([...repo.current.getAll()]);
  }, []);

  const addTask = useCallback((data) => {
    const task = repo.current.add(data);
    refresh();
    return task;
  }, [refresh]);

  const updateTask = useCallback((id, updatedData) => {
    const task = repo.current.update(id, updatedData);
    refresh();
    return task;
  }, [refresh]);

  const deleteTask = useCallback((id) => {
    repo.current.softDelete(id);
    refresh();
  }, [refresh]);

  const restoreTask = useCallback((id) => {
    repo.current.restore(id);
    refresh();
  }, [refresh]);

  const toggleComplete = useCallback((id) => {
    repo.current.toggleComplete(id);
    refresh();
  }, [refresh]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    restoreTask,
    toggleComplete
  };
}

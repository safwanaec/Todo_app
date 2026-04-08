import TaskStorage from './TaskStorage';
import Task from './Task';
import { validateTitle } from './TaskValidator';

export default class TaskRepository {
  constructor() {
    this.tasks = TaskStorage.loadTasks();
    this.purgeExpiredDeletedTasks();
  }

  save() {
    TaskStorage.saveTasks(this.tasks);
  }

  getAll() {
    return this.tasks;
  }

  add(taskData) {
    const task = new Task(taskData);
    this.tasks.push(task);
    this.save();
    return task;
  }

  update(id, updatedData) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updatedData };
      this.save();
      return this.tasks[index];
    }
    return null;
  }

  softDelete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task && !task.isDeleted) {
      task.isDeleted = true;
      task.deletedAt = new Date().toISOString();
      this.save();
      return task;
    }
    return null;
  }

  restore(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task && task.isDeleted) {
      task.isDeleted = false;
      task.deletedAt = null;
      this.save();
      return task;
    }
    return null;
  }

  toggleComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.isCompleted = !task.isCompleted;
      this.save();
      return task;
    }
    return null;
  }

  purgeExpiredDeletedTasks() {
    const now = new Date();
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    
    let changed = false;
    this.tasks = this.tasks.filter(t => {
      if (t.isDeleted && t.deletedAt) {
        const deletedDate = new Date(t.deletedAt);
        if (now - deletedDate > SEVEN_DAYS) {
          changed = true;
          return false;
        }
      }
      return true;
    });
    
    if (changed) {
      this.save();
    }
  }
}

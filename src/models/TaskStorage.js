const STORAGE_KEY = 'todo_tasks_v1';

export default class TaskStorage {
  static saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  static loadTasks() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch (e) {
      return [];
    }
  }
}

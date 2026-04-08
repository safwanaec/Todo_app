export default class Task {
  constructor(data) {
    this.id = data.id || crypto.randomUUID();
    this.title = data.title;
    this.description = data.description || '';
    this.dueDate = data.dueDate || '';
    this.priority = data.priority || 'Medium';
    this.createdAt = data.createdAt || new Date().toISOString().split('T')[0];
    this.isCompleted = data.isCompleted || false;
    this.isDeleted = data.isDeleted || false;
    this.deletedAt = data.deletedAt || null;
  }
}

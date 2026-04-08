import TaskRepository from './TaskRepository';

describe('TaskRepository', () => {

  let repo;

  beforeEach(() => {
    repo = new TaskRepository();
  });

  test('should add a new task', () => {
    const task = repo.add({
      title: 'Learn Testing',
      priority: 'Medium'
    });

    expect(task.title).toBe('Learn Testing');
    expect(task.id).toBeDefined();
  });

  test('should update a task', () => {
    const task = repo.add({ title: 'Old Title' });

    const updated = repo.update(task.id, { title: 'New Title' });

    expect(updated.title).toBe('New Title');
  });

  test('should soft delete a task', () => {
    const task = repo.add({ title: 'Delete me' });

    repo.softDelete(task.id);

    const found = repo.getAll().find(t => t.id === task.id);

    expect(found.isDeleted).toBe(true);
    expect(found.deletedAt).toBeDefined();
  });

  test('should restore a deleted task', () => {
    const task = repo.add({ title: 'Restore me' });

    repo.softDelete(task.id);
    repo.restore(task.id);

    const found = repo.getAll().find(t => t.id === task.id);

    expect(found.isDeleted).toBe(false);
  });

  test('should toggle completion', () => {
    const task = repo.add({ title: 'Toggle' });

    repo.toggleComplete(task.id);

    const found = repo.getAll().find(t => t.id === task.id);

    expect(found.isCompleted).toBe(true);
  });

});

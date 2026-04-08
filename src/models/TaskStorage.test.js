import TaskStorage from './TaskStorage';

describe('TaskStorage', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('should save tasks to localStorage', () => {
    const tasks = [{ id: '1', title: 'Test' }];

    TaskStorage.saveTasks(tasks);

    const stored = JSON.parse(localStorage.getItem('todo_tasks_v1'));
    expect(stored).toEqual(tasks);
  });

  test('should load tasks from localStorage', () => {
    const tasks = [{ id: '1', title: 'Test' }];
    localStorage.setItem('todo_tasks_v1', JSON.stringify(tasks));

    const result = TaskStorage.loadTasks();

    expect(result).toEqual(tasks);
  });

  test('should return empty array if corrupted data', () => {
    localStorage.setItem('todo_tasks_v1', 'invalid-json');

    const result = TaskStorage.loadTasks();

    expect(result).toEqual([]);
  });

});

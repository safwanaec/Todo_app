import { renderHook, act } from '@testing-library/react';
import useTaskManager from './useTaskManager';

describe('useTaskManager', () => {

  test('should add task', () => {
    const { result } = renderHook(() => useTaskManager());

    act(() => {
      result.current.addTask({ title: 'Test Task' });
    });

    expect(result.current.tasks.length).toBe(1);
  });

  test('should delete task', () => {
    const { result } = renderHook(() => useTaskManager());

    let id;

    act(() => {
      const task = result.current.addTask({ title: 'Delete me' });
      id = task.id;
    });

    act(() => {
      result.current.deleteTask(id);
    });

    const task = result.current.tasks.find(t => t.id === id);

    expect(task.isDeleted).toBe(true);
  });

});

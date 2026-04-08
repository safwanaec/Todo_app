import { renderHook, act } from '@testing-library/react';
import useFilters from './useFilters';

describe('useFilters', () => {

  const tasks = [
    { title: 'A', priority: 'High', isCompleted: false, dueDate: '2026-04-01' },
    { title: 'B', priority: 'Low', isCompleted: true, dueDate: '2026-04-10' },
    { title: 'C', priority: 'Medium', isCompleted: false, dueDate: '2026-04-20' }
  ];

  test('should filter by priority', () => {
    const { result } = renderHook(() => useFilters(tasks));
    
    const filtered = result.current.getFilteredTasks({ priority: 'High' });
    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toBe('A');
  });

  test('should search by text', () => {
    const { result } = renderHook(() => useFilters(tasks));

    const filtered = result.current.getFilteredTasks({ search: 'A' });
    expect(filtered.length).toBe(1);
  });

  test('should filter by date range using state', () => {
    const { result } = renderHook(() => useFilters(tasks));

    // Filter From April 5th
    act(() => {
      result.current.setDateRange({ start: '2026-04-05', end: '' });
    });
    let filtered = result.current.getFilteredTasks();
    expect(filtered.length).toBe(2); // B and C
    expect(filtered.map(t => t.title)).toContain('B');
    expect(filtered.map(t => t.title)).toContain('C');

    // Filter To April 15th
    act(() => {
      result.current.setDateRange({ start: '', end: '2026-04-15' });
    });
    filtered = result.current.getFilteredTasks();
    expect(filtered.length).toBe(2); // A and B
    expect(filtered.map(t => t.title)).toContain('A');
    expect(filtered.map(t => t.title)).toContain('B');

    // Filter between April 5th and April 15th
    act(() => {
      result.current.setDateRange({ start: '2026-04-05', end: '2026-04-15' });
    });
    filtered = result.current.getFilteredTasks();
    expect(filtered.length).toBe(1); // Only B
    expect(filtered[0].title).toBe('B');
  });

});

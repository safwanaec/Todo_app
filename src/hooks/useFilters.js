import { useState, useCallback } from 'react';

export default function useFilters(tasks = []) {
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [completionFilter, setCompletionFilter] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchText, setSearchText] = useState('');

  const getFilteredTasks = useCallback((overrideCriteria = {}) => {
    const filters = {
      priority: priorityFilter,
      completion: completionFilter,
      search: searchText,
      dateRange: dateRange,
      ...overrideCriteria
    };

    return tasks.filter(task => {
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const tTitle = task.title ? task.title.toLowerCase() : '';
        const tDesc = task.description ? task.description.toLowerCase() : '';
        if (!tTitle.includes(query) && !tDesc.includes(query)) return false;
      }
      if (filters.priority && filters.priority !== 'All') {
        if (task.priority !== filters.priority) return false;
      }
      if (filters.completion && filters.completion !== 'All') {
        const wantsCompleted = filters.completion === 'Completed';
        if (task.isCompleted !== wantsCompleted) return false;
      }
      if (filters.dateRange && filters.dateRange.start) {
        if (!task.dueDate || new Date(task.dueDate) < new Date(filters.dateRange.start)) return false;
      }
      if (filters.dateRange && filters.dateRange.end) {
        if (!task.dueDate || new Date(task.dueDate) > new Date(filters.dateRange.end)) return false;
      }
      return true;
    });
  }, [tasks, priorityFilter, completionFilter, searchText, dateRange]);

  return {
    priorityFilter, setPriorityFilter,
    completionFilter, setCompletionFilter,
    dateRange, setDateRange,
    searchText, setSearchText,
    getFilteredTasks
  };
}

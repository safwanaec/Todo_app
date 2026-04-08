import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from './TaskCard';

test('renders task correctly', () => {
  const task = { title: 'Test Task', priority: 'High' };

  render(<TaskCard task={task} />);

  expect(screen.getByText('Test Task')).toBeInTheDocument();
});

test('calls delete when delete button clicked', () => {
  const mockDelete = jest.fn();

  const task = { id: '1', title: 'Task' };

  render(<TaskCard task={task} onDelete={mockDelete} />);

  fireEvent.click(screen.getByRole('button', { name: /delete/i }));

  expect(mockDelete).toHaveBeenCalledWith('1');
});

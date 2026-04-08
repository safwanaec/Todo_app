import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

test('renders form and submits valid task', () => {
  const mockAdd = jest.fn();

  render(<TaskForm onSubmit={mockAdd} />);

  fireEvent.change(screen.getByPlaceholderText(/title/i), {
    target: { value: 'New Task' }
  });

  fireEvent.click(screen.getByRole('button', { name: /add/i }));

  expect(mockAdd).toHaveBeenCalled();
});

test('shows validation error when title empty', () => {
  render(<TaskForm onSubmit={() => {}} />);

  fireEvent.click(screen.getByRole('button', { name: /add/i }));

  expect(screen.getByText(/title is required/i)).toBeInTheDocument();
});

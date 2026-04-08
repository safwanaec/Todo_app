import { render, screen } from '@testing-library/react';
import RecycleBinModal from './RecycleBinModal';

test('shows deleted tasks', () => {
  const tasks = [
    { id: '1', title: 'Deleted Task', isDeleted: true }
  ];

  render(<RecycleBinModal tasks={tasks} />);

  expect(screen.getByText('Deleted Task')).toBeInTheDocument();
});

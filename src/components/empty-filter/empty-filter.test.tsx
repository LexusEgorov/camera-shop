import { render, screen } from '@testing-library/react';
import EmptyFilter from './empty-filter';

describe('Component: EmptyFilter', () => {
  it('should render correctly', () => {
    render(<EmptyFilter />);

    expect(screen.getByText(/По вашему запросу ничего не найдено/i)).toBeInTheDocument();
  });
});

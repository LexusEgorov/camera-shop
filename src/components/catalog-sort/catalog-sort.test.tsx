import { render, screen } from '@testing-library/react';
import CatalogSort from './catalog-sort';

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    render(<CatalogSort />);

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
    expect(screen.getByText(/По цене/i)).toBeInTheDocument();
    expect(screen.getByText(/По популярности/i)).toBeInTheDocument();
  });
});

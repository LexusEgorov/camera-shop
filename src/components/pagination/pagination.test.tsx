import { render, screen } from '@testing-library/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const fakePagesCount = 3;
    const fakeCurrentPage = 2;

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/' element={
              <Pagination pagesCount={fakePagesCount} currentPage={fakeCurrentPage}/>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });

  it('should render correctly on first page', () => {
    const fakePagesCount = 3;
    const fakeCurrentPage = 1;

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/' element={
              <Pagination pagesCount={fakePagesCount} currentPage={fakeCurrentPage}/>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.queryByText(/Назад/i)).toBeNull();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  it('should render correctly on last page', () => {
    const fakePagesCount = 3;
    const fakeCurrentPage = 3;

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/' element={
              <Pagination pagesCount={fakePagesCount} currentPage={fakeCurrentPage}/>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.queryByText(/Далее/i)).toBeNull();
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
  });

  it('should render correctly on alone page', () => {
    const fakePagesCount = 1;
    const fakeCurrentPage = 1;

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/' element={
              <Pagination pagesCount={fakePagesCount} currentPage={fakeCurrentPage}/>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.queryByText(/Далее/i)).toBeNull();
    expect(screen.queryByText(/Назад/i)).toBeNull();
  });
});

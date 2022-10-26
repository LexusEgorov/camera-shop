import { render, screen } from '@testing-library/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Breadcrumbs from './breadcrumbs';

describe('Component: Breadcrumbs', () => {
  it('should render correctly without data', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/' element={
              <Breadcrumbs />
            }
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });

  it('should render correctly with data', () => {
    const fakeProduct = 'ПРОДУКТ ДЛЯ ТЕСТА';

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/' element={
              <Breadcrumbs productName={fakeProduct}/>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(fakeProduct)).toBeInTheDocument();
  });

});

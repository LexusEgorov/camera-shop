import { render, screen } from '@testing-library/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Header from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/' element={
              <Header />
            }
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText(/Cannonball Pro MX 8i/i)).toBeInTheDocument();
    expect(screen.getByText(/Cannonball Pro MX 7i/i)).toBeInTheDocument();
    expect(screen.getByText(/Cannonball Pro MX 6i/i)).toBeInTheDocument();
    expect(screen.getByText(/Cannonball Pro MX 5i/i)).toBeInTheDocument();
    expect(screen.getByText(/Cannonball Pro MX 4i/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
  });
});

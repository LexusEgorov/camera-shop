import { render, screen } from '@testing-library/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { FISH_PROMO } from '../../fish/fish';
import Banner from './banner';

const fakePromo = FISH_PROMO;
const fakeApp = (
  <BrowserRouter>
    <Routes>
      <Route
        path='/' element={
          <Banner promo={fakePromo} />
        }
      />
    </Routes>
  </BrowserRouter>
);

describe('Component: Banner', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByAltText(/баннер/i)).toBeInTheDocument();
    expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
  });
});

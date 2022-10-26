import { render, screen } from '@testing-library/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { FISH_PRODUCTS } from '../../fish/fish';
import ProductCardRating from './product-card-rating';

const {rating, reviewCount} = FISH_PRODUCTS[0];

describe('Component: ProductCardRating', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/' element={
              <ProductCardRating rating={rating} reviewCount={reviewCount}/>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText(reviewCount)).toBeInTheDocument();
  });
});

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { NameSpace } from '../../const';
import { FISH_PRODUCTS } from '../../fish/fish';
import { Camera, Promo } from '../../types/types';
import ProductCard from './product-card';

const fakeProduct = FISH_PRODUCTS[0];

const mockStore = configureMockStore();

const fakeStore = mockStore({
  [NameSpace.App]: {
    isCamerasLoading: false,
    isPromoLoading: false,
    isCameraLoading: false,
    isSimilarLoading: false,
    isReviewsLoading: false,
    isServerError: false,
  },
  [NameSpace.CameraData]: {
    cameras: [],
    currentCamera: {} as Camera,
    currentCameraReviews: [],
    currentCameraSimilar: [],
    promo: {} as Promo,
  }
});
describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/' element={
                <ProductCard product={fakeProduct}/>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(fakeProduct.name)).toBeInTheDocument();
  });
});

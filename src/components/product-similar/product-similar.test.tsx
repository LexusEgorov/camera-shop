import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NameSpace } from '../../const';
import { FISH_PRODUCTS } from '../../fish/fish';
import { Camera, Promo } from '../../types/types';
import ProductSimilar from './product-similar';

const fakeSimilarProducts = FISH_PRODUCTS;

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
    currentCameraSimilar: fakeSimilarProducts,
    promo: {} as Promo,
  },
  [NameSpace.ShoppingCartData]: {
    products: [],
  },
});
describe('Component: ProductSimilar', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/' element={
                <ProductSimilar productsSimilar={fakeSimilarProducts} openModal={jest.fn()} setCamera={jest.fn()}/>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });

  it('should no render, if similar products has length 0', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/' element={
                <ProductSimilar productsSimilar={[]} openModal={jest.fn()} setCamera={jest.fn()}/>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText(/Похожие товары/i)).toBeNull();
  });
});

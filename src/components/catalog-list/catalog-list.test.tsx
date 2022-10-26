import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NameSpace } from '../../const';
import { FISH_PRODUCTS } from '../../fish/fish';
import { Camera, Promo } from '../../types/types';
import CatalogList from './catalog-list';

const fakeProducts = FISH_PRODUCTS;

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

describe('Component: CatalogList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/' element={
                <CatalogList products={fakeProducts} currentPage={1} outputCount={9}/>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog-list')).toBeInTheDocument();
  });
});

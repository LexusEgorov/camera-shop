import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NameSpace } from '../../const';
import { Camera, Promo } from '../../types/types';
import thunk from 'redux-thunk';
import CatalogList from './catalog-list';

const mockStore = configureMockStore([thunk]);

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
                <CatalogList currentPage={1}/>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog-list')).toBeInTheDocument();
  });
});

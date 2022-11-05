import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { NameSpace } from '../../const';
import { Camera, Promo } from '../../types/types';
import Header from './header';

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

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/' element={
                <Header />
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Cannonball Pro MX 8i/i)).toBeInTheDocument();
    expect(screen.getByText(/Cannonball Pro MX 7i/i)).toBeInTheDocument();
    expect(screen.getByText(/Cannonball Pro MX 6i/i)).toBeInTheDocument();
    expect(screen.getByText(/Cannonball Pro MX 5i/i)).toBeInTheDocument();
    expect(screen.getByText(/Cannonball Pro MX 4i/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
  });
});

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NameSpace } from '../../const';
import { Camera, Promo } from '../../types/types';
import ModalAddReview from './modal-add-review';

let fakeSetIsOpened : React.Dispatch<React.SetStateAction<boolean>>;

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
describe('Component: ModalAddReview', () => {
  global.scrollTo = jest.fn();
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/' element={
                <ModalAddReview isOpened setIsOpened={fakeSetIsOpened}/>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });
});

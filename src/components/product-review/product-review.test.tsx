import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { NameSpace } from '../../const';
import { FISH_REVIEWS } from '../../fish/fish';
import { Camera, Promo } from '../../types/types';
import ProductReview from './product-review';

const fakeProductReviews = FISH_REVIEWS;

const mockStore = configureMockStore();

let fakeSetIsModalOpened : React.Dispatch<React.SetStateAction<boolean>>;

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
    currentCameraReviews: fakeProductReviews,
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
                <ProductReview setIsModalOpened={fakeSetIsModalOpened}/>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });

  it('should set reviews when user click to show more button', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/' element={
                <ProductReview setIsModalOpened={fakeSetIsModalOpened}/>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    const button = screen.getByTestId('show-more-button');
    expect(screen.getByTestId('review-block').childNodes.length).toEqual(3);
    fireEvent.click(button);
    expect(screen.getByTestId('review-block').childNodes.length).toEqual(6);
  });

  it('should set isModalOpened when user click to open modal button', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    useStateSpy.mockImplementation((init = false) => [init, setState]);

    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/' element={
                <ProductReview setIsModalOpened={setState}/>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    const button = screen.getByTestId('open-modal-button');
    fireEvent.click(button);
    expect(setState).toHaveBeenCalled();
  });
});

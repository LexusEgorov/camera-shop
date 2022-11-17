import { configureMockStore } from '@jedmao/redux-mock-store';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { NameSpace } from '../../const';
import HeaderSearchForm from './header-search-form';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as apiActions from '../../store/api-actions';
import * as cameraDataActions from '../../store/camera-data/camera-data';

const mockStore = configureMockStore([thunk]);

const fakeStore = mockStore({
  [NameSpace.CameraData]: {
    searchedCameras: [],
  }
});

const fakeApp = (
  <Provider store={fakeStore}>
    <BrowserRouter>
      <Routes>
        <Route
          path='/' element={
            <HeaderSearchForm />
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);
describe('Component: HeaderSearchForm', () => {
  beforeEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByTestId('form-search')).toBeInTheDocument();
  });

  it('should dispatch search value', () => {
    render(fakeApp);
    const fakeFetchLikeCameraAction = jest.spyOn(apiActions, 'findLikeCamerasAction');
    const input = screen.getByTestId('form-search-input');

    fireEvent.input(input, {
      target: {value: 'test'}
    });

    expect(fakeFetchLikeCameraAction).lastCalledWith('test');
  });

  it('should dispatch reset search if !value.length', () => {
    render(fakeApp);
    const input = screen.getByTestId('form-search-input');

    fireEvent.input(input, {
      target: {value: '123'}
    });

    const fakeResetAction = jest.spyOn(cameraDataActions, 'clearSearched');

    fireEvent.input(input, {
      target: {value: ''}
    });

    expect(fakeResetAction).toHaveBeenCalledTimes(1);
  });

  it('should reset', () => {
    render(fakeApp);
    const resetButton = screen.getByTestId('form-search-reset');
    const fakeResetAction = jest.spyOn(cameraDataActions, 'clearSearched');

    fireEvent.click(resetButton);

    expect(fakeResetAction).toHaveBeenCalledTimes(1);
  });
});

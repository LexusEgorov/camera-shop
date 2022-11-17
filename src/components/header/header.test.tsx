import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { NameSpace } from '../../const';
import Header from './header';
import thunk from 'redux-thunk';

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
            <Header />
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
  });
});

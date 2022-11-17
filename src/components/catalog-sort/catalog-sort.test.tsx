import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NameSpace } from '../../const';
import * as appHooks from '../../hooks/hooks';
import * as appProcessActions from '../../store/app-process/app-process';
import CatalogSort from './catalog-sort';

const mockStore = configureMockStore();

const fakeStore = mockStore({
  [NameSpace.App]: {
    searchParams: '',
  }
});

const fakeApp = (
  <Provider store={fakeStore}>
    <BrowserRouter>
      <Routes>
        <Route
          path='/' element={
            <CatalogSort />
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);

const fakeDispatch = jest.spyOn(appHooks, 'useAppDispatch');

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
    expect(screen.getByText(/По цене/i)).toBeInTheDocument();
    expect(screen.getByText(/По популярности/i)).toBeInTheDocument();
  });

  it('should dispatch searchParams to store when price is checked', () => {
    const dispatch = jest.fn();
    fakeDispatch.mockReturnValue(dispatch);

    const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');

    render(fakeApp);

    fireEvent.click(screen.getByTestId('sort-type-price'));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(fakeSetStoreSearchParams).toHaveBeenCalledWith('_sort=price&_order=asc');
  });

  it('should dispatch searchParams to store when rate is checked', () => {
    const dispatch = jest.fn();
    fakeDispatch.mockReturnValue(dispatch);

    const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');

    render(fakeApp);

    fireEvent.click(screen.getByTestId('sort-type-rating'));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(fakeSetStoreSearchParams).toHaveBeenCalledWith('_sort=rating&_order=asc');
  });

  it('should dispatch searchParams to store when desc is checked', () => {
    const dispatch = jest.fn();
    fakeDispatch.mockReturnValue(dispatch);

    const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');

    render(fakeApp);

    fireEvent.click(screen.getByTestId('sort-order-desc'));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(fakeSetStoreSearchParams).toHaveBeenCalledWith('_sort=price&_order=desc');
  });

  it('should dispatch searchParams to store when asc is checked', () => {
    const dispatch = jest.fn();
    fakeDispatch.mockReturnValue(dispatch);

    const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');

    render(fakeApp);

    fireEvent.click(screen.getByTestId('sort-order-asc'));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(fakeSetStoreSearchParams).toHaveBeenCalledWith('_sort=price&_order=asc');
  });
});

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { NameSpace } from '../../const';
import * as cameraSelectors from '../../store/camera-data/selectors';
import thunk from 'redux-thunk';
import CatalogList from './catalog-list';
import { Promo } from '../../types/types';
import { FISH_PRODUCTS } from '../../fish/fish';

const mockStore = configureMockStore([thunk]);

const fakeStore = mockStore({
  [NameSpace.App]: {
    searchParams: '',
  },
  [NameSpace.CameraData]: {
    cameras: [],
    promo: {} as Promo,
  },
  [NameSpace.FilterData]: {
    minPrice: -1,
  },
  [NameSpace.ShoppingCartData]: {
    products: [],
  },
});

const fakeApp = (
  <Provider store={fakeStore}>
    <MemoryRouter initialEntries={['/?_sort=price&_order=asc']}>
      <Routes>
        <Route
          path='/' element={
            <CatalogList currentPage={1} openModal={jest.fn()} setCamera={jest.fn()}/>
          }
        />
      </Routes>
    </MemoryRouter>
  </Provider>
);

describe('Component: CatalogFilter', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly without data', () => {
    render(fakeApp);

    expect(screen.getByText(/По вашему запросу ничего не найдено/i)).toBeInTheDocument();
  });

  it('should render correctly with data', () => {
    const fakeSelector = jest.spyOn(cameraSelectors, 'getCameras');
    fakeSelector.mockReturnValue(FISH_PRODUCTS);
    render(fakeApp);

    expect(screen.getByTestId('catalog-list')).toBeInTheDocument();
  });
});


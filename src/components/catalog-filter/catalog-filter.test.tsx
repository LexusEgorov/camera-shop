import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NameSpace } from '../../const';
import * as appProcessActions from '../../store/app-process/app-process';
import thunk from 'redux-thunk';
import CatalogFilter from './catalog-filter';

const mockStore = configureMockStore([thunk]);

const fakeStore = mockStore({
  [NameSpace.App]: {
    searchParams: '',
  },
  [NameSpace.FilterData]: {
    minPrice: 1990,
    maxPrice: 200000,
    minCatalogPrice: 1990,
    maxCatalogPrice: 200000,
  }
});

const fakeApp = (
  <Provider store={fakeStore}>
    <BrowserRouter>
      <Routes>
        <Route
          path='/' element={
            <CatalogFilter />
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
  });

  it('should set maxPrice placeholder from store minCatalogPrice', () => {
    const filterData = fakeStore.getState()[NameSpace.FilterData];

    render(fakeApp);

    const maxPrice = screen.getByTestId('filter-max-price');
    expect(maxPrice.getAttribute('placeholder')).toEqual(filterData.maxCatalogPrice.toString());
  });

  describe('User events test', () => {
    describe('Min price tests', () => {
      it('should set minPrice placeholder from store minCatalogPrice', () => {
        const filterData = fakeStore.getState()[NameSpace.FilterData];

        render(fakeApp);

        const minPrice = screen.getByTestId('filter-min-price');
        expect(minPrice.getAttribute('placeholder')).toEqual(filterData.minCatalogPrice.toString());
      });

      it('should dispatch query min_price "" if value < 0', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);

        const minPrice = screen.getByTestId('filter-min-price');
        fireEvent.input(minPrice, {
          target: {value: '-1'}
        });
        fireEvent.blur(minPrice);

        expect(fakeSetStoreSearchParams).toHaveBeenCalledWith('');
      });

      it('should dispatch query min_price "minCatalogPrice" if value < minCatalogPrice', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);

        const minPrice = screen.getByTestId('filter-min-price');
        fireEvent.input(minPrice, {
          target: {value: '1000'}
        });
        fireEvent.blur(minPrice);

        expect(fakeSetStoreSearchParams).toHaveBeenCalledWith('price_gte=1990');
      });
    });
  });
});

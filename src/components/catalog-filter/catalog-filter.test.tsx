import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { FilterValue, NameSpace, QueryParameter } from '../../const';
import * as appProcessActions from '../../store/app-process/app-process';
import * as filterSelectors from '../../store/filter-data/selectors';
import thunk from 'redux-thunk';
import CatalogFilter from './catalog-filter';

const mockStore = configureMockStore([thunk]);

let fakeStore = mockStore({
  [NameSpace.CameraData]: {
    camerasTotalCount: 10,
  },
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
        <Route path='/catalog/1' element={
          <CatalogFilter />
        }
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);

describe('Component: CatalogFilter', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    fakeStore = mockStore({
      [NameSpace.CameraData]: {
        camerasTotalCount: 10,
      },
      [NameSpace.App]: {
        searchParams: '',
      },
      [NameSpace.FilterData]: {
        minPrice: 3000,
        maxPrice: 190000,
        minCatalogPrice: 1990,
        maxCatalogPrice: 200000,
      }
    });
  });

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
  });

  it('should set maxPrice placeholder from store maxCatalogPrice', () => {
    const filterData = fakeStore.getState()[NameSpace.FilterData];

    render(fakeApp);

    const maxPrice = screen.getByTestId('filter-max-price');
    expect(maxPrice.getAttribute('placeholder')).toEqual(filterData.maxCatalogPrice.toString());
  });

  it('should set minPrice placeholder from store minCatalogPrice', () => {
    render(fakeApp);
    const minPrice = screen.getByTestId('filter-min-price');
    const filterData = fakeStore.getState()[NameSpace.FilterData];

    expect(minPrice.getAttribute('placeholder')).toEqual(filterData.minCatalogPrice.toString());
  });

  describe('User events test', () => {
    describe('Min price tests', () => {
      it('should set "" when value < 0', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');

        render(fakeApp);
        const minPrice = screen.getByTestId('filter-min-price');

        fireEvent.input(minPrice, {
          target: {value: '-1'}
        });
        fireEvent.blur(minPrice);

        expect(fakeSetStoreSearchParams).lastCalledWith('');
      });

      it('should set minCatalogPrice if value < minCatalogPrice', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');

        render(fakeApp);
        const minPrice = screen.getByTestId('filter-min-price');

        fireEvent.input(minPrice, {
          target: {value: '1000'}
        });
        fireEvent.blur(minPrice);

        expect(fakeSetStoreSearchParams).lastCalledWith('price_gte=1990');
      });

      it('should set minPrice if value < minPrice', () => {
        render(fakeApp);
        const minPrice : HTMLInputElement = screen.getByTestId('filter-min-price');

        const fakeGetMinPrice = jest.spyOn(filterSelectors, 'getMinPrice');
        fakeGetMinPrice.mockReturnValue(3000);

        fireEvent.input(minPrice, {
          target: {value: '2000'}
        });
        fireEvent.blur(minPrice);

        expect(minPrice.value).toEqual('3000');
      });

      it('should set maxPrice if value > maxPrice', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');

        render(fakeApp);
        const minPrice = screen.getByTestId('filter-min-price');
        const maxPrice = screen.getByTestId('filter-max-price');

        fireEvent.input(maxPrice, {
          target: {value: '1000'}
        });
        fireEvent.blur(maxPrice);

        fireEvent.input(minPrice, {
          target: {value: '2000'}
        });
        fireEvent.blur(minPrice);

        expect(fakeSetStoreSearchParams).lastCalledWith('price_lte=2000&price_gte=2000');
      });

    });

    describe('Max price tests', () => {
      it('should set "" to store if value < 0', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);
        const maxPrice = screen.getByTestId('filter-max-price');

        fireEvent.input(maxPrice, {
          target: {value: '-1'}
        });
        fireEvent.blur(maxPrice);

        expect(fakeSetStoreSearchParams).lastCalledWith('');
      });

      it('should set maxCatalogPrice if value > maxCatalogPrice', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);
        const maxPrice = screen.getByTestId('filter-max-price');

        fireEvent.input(maxPrice, {
          target: {value: '500000'}
        });
        fireEvent.blur(maxPrice);

        expect(fakeSetStoreSearchParams).lastCalledWith('price_lte=200000');
      });

      it('should set maxPrice if value > maxPrice', () => {
        render(fakeApp);
        const maxPrice : HTMLInputElement = screen.getByTestId('filter-max-price');
        const fakeGetMaxPrice = jest.spyOn(filterSelectors, 'getMaxPrice');
        fakeGetMaxPrice.mockReturnValue(199000);

        fireEvent.input(maxPrice, {
          target: {value: '500000'}
        });
        fireEvent.blur(maxPrice);

        expect(maxPrice.value).toEqual('199000');
      });

      it('should set minPrice if value < minPrice', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');

        render(fakeApp);
        const minPrice : HTMLInputElement = screen.getByTestId('filter-min-price');
        const maxPrice : HTMLInputElement = screen.getByTestId('filter-max-price');

        fireEvent.input(minPrice, {
          target: {value: '2000'}
        });
        fireEvent.blur(minPrice);

        fireEvent.input(maxPrice, {
          target: {value: '1000'}
        });
        fireEvent.blur(maxPrice);

        expect(maxPrice.value).toEqual(minPrice.value);
        expect(fakeSetStoreSearchParams).lastCalledWith('price_gte=2000&price_lte=2000');
      });
    });

    describe('Checkboxes test', () => {
      it('should set category to Camera', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);
        const filterPhoto = screen.getByTestId('filter-photo');

        fireEvent.click(filterPhoto);

        expect(fakeSetStoreSearchParams).lastCalledWith(`${QueryParameter.Category}=${encodeURI(FilterValue.Photo)}`);
      });

      it('should set category to video', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);
        const filterVideo = screen.getByTestId('filter-video');

        fireEvent.click(filterVideo);

        expect(fakeSetStoreSearchParams).lastCalledWith(`${QueryParameter.Category}=${encodeURI(FilterValue.Video)}`);
      });

      it('should set type to digital', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);
        const filterDigital = screen.getByTestId('filter-digital');

        fireEvent.click(filterDigital);

        expect(fakeSetStoreSearchParams).lastCalledWith(`${QueryParameter.Type}=${encodeURI(FilterValue.Digital)}`);
      });

      it('should set type to film', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);
        const filterFilm = screen.getByTestId('filter-film');

        fireEvent.click(filterFilm);

        expect(fakeSetStoreSearchParams).lastCalledWith(`${QueryParameter.Type}=${encodeURI(FilterValue.Film)}`);
      });

      it('should set type to snapshot', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);
        const filterSnapshot = screen.getByTestId('filter-snapshot');

        fireEvent.click(filterSnapshot);

        expect(fakeSetStoreSearchParams).lastCalledWith(`${QueryParameter.Type}=${encodeURI(FilterValue.Snapshot)}`);
      });

      it('should set type to collection', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);
        const filterCollection = screen.getByTestId('filter-collection');

        fireEvent.click(filterCollection);

        expect(fakeSetStoreSearchParams).lastCalledWith(`${QueryParameter.Type}=${encodeURI(FilterValue.Collection)}`);
      });

      it('should set level to zero', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);
        const filterZero = screen.getByTestId('filter-zero');

        fireEvent.click(filterZero);

        expect(fakeSetStoreSearchParams).lastCalledWith(`${QueryParameter.Level}=${encodeURI(FilterValue.Zero)}`);
      });

      it('should set level to non-professional', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);
        const filterNonProfessional = screen.getByTestId('filter-non-professional');

        fireEvent.click(filterNonProfessional);

        expect(fakeSetStoreSearchParams).lastCalledWith(`${QueryParameter.Level}=${encodeURI(FilterValue.NonProfessional)}`);
      });

      it('should set level to professional', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);
        const filterProfessional = screen.getByTestId('filter-professional');

        fireEvent.click(filterProfessional);

        expect(fakeSetStoreSearchParams).lastCalledWith(`${QueryParameter.Level}=${encodeURI(FilterValue.Professional)}`);
      });
    });

    describe('Reset test', () => {
      it('should set searchParams to "" when reset without sort', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(fakeApp);
        const filterReset = screen.getByTestId('filter-reset');

        fireEvent.click(filterReset);

        expect(fakeSetStoreSearchParams).lastCalledWith('');
      });

      it('should set searchParams to "sortParams" when reset', () => {
        const fakeSetStoreSearchParams = jest.spyOn(appProcessActions, 'setSearchParams');
        render(
          <Provider store={fakeStore}>
            <MemoryRouter initialEntries={['/?_sort=price&_order=asc']}>
              <Routes>
                <Route
                  path='/' element={
                    <CatalogFilter />
                  }
                />
                <Route path='/catalog/1' element={
                  <CatalogFilter />
                }
                />
              </Routes>
            </MemoryRouter>
          </Provider>
        );

        const filterReset = screen.getByTestId('filter-reset');

        fireEvent.click(filterReset);

        expect(fakeSetStoreSearchParams).lastCalledWith('_sort=price&_order=asc');
      });
    });
  });
});

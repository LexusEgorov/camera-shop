import { FilterData } from '../../types/types';
import { fetchMaxCatalogPriceAction, fetchMaxPriceAction, fetchMinCatalogPriceAction, fetchMinPriceAction } from '../api-actions';
import { filterData } from './filter-data';

describe('Reducer: filterData', () => {
  let state: FilterData;

  beforeEach(() => {
    state = {
      minPrice: -1,
      minCatalogPrice: 0,
      maxPrice: -1,
      maxCatalogPrice: 0,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filterData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({...state});
  });

  it('should update minPrice', () => {
    expect(filterData.reducer(state, {type: fetchMinPriceAction.fulfilled.type, payload: 100}))
      .toEqual({
        ...state,
        minPrice: 100
      });
  });

  it('should update minCatalogPrice', () => {
    expect(filterData.reducer(state, {type: fetchMinCatalogPriceAction.fulfilled.type, payload: 100}))
      .toEqual({
        ...state,
        minCatalogPrice: 100
      });
  });

  it('should update maxPrice', () => {
    expect(filterData.reducer(state, {type: fetchMaxPriceAction.fulfilled.type, payload: 100}))
      .toEqual({
        ...state,
        maxPrice: 100
      });
  });

  it('should update maxCatalogPrice', () => {
    expect(filterData.reducer(state, {type: fetchMaxCatalogPriceAction.fulfilled.type, payload: 100}))
      .toEqual({
        ...state,
        maxCatalogPrice: 100
      });
  });
});

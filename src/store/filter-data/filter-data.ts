import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilterData } from '../../types/types';
import { fetchMaxCatalogPriceAction, fetchMaxPriceAction, fetchMinCatalogPriceAction, fetchMinPriceAction } from '../api-actions';

const initialState : FilterData = {
  minPrice: 0,
  maxPrice: 0,
  minCatalogPrice: 0,
  maxCatalogPrice: 0,
};

export const filterData = createSlice({
  name: NameSpace.FilterData,
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMinPriceAction.fulfilled, (state, action) => {
        state.minPrice = action.payload;
      })
      .addCase(fetchMaxPriceAction.fulfilled, (state, action) => {
        state.maxPrice = action.payload;
      })
      .addCase(fetchMinCatalogPriceAction.fulfilled, (state, action) => {
        state.minCatalogPrice = action.payload;
      })
      .addCase(fetchMaxCatalogPriceAction.fulfilled, (state, action) => {
        state.maxCatalogPrice = action.payload;
      });
  },
});

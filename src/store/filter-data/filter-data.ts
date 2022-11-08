import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilterData } from '../../types/types';
import { fetchMaxPriceAction, fetchMinPriceAction } from '../api-actions';

const initialState : FilterData = {
  minPrice: 0,
  maxPrice: 0,
  category: [],
  level: [],
  type: [],
};

export const filterData = createSlice({
  name: NameSpace.FilterData,
  initialState: initialState,
  reducers: {
    clearFilters: (state) => {
      state.minPrice = 0;
      state.maxPrice = 0;
      state.level = [];
      state.type = [];
      state.category = [];
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMinPriceAction.fulfilled, (state, action) => {
        state.minPrice = action.payload;
      })
      .addCase(fetchMaxPriceAction.fulfilled, (state, action) => {
        state.maxPrice = action.payload;
      });
  },
});

export const {clearFilters, setCategory, setLevel, setType} = filterData.actions;

import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ShoppingCartData } from '../../types/types';

const NOT_FOUND = -1;

const initialState : ShoppingCartData = {
  products: [],
};

export const shoppingCartData = createSlice({
  name: NameSpace.FilterData,
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      const deleteIndex = state.products.findIndex((camera) => camera.id === action.payload);
      if(deleteIndex !== NOT_FOUND){
        state.products = [...state.products.slice(0, deleteIndex), ...state.products.slice(deleteIndex + 1)];
      }
    }
  },
});

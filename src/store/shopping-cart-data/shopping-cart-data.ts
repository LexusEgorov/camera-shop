import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ShoppingCartData } from '../../types/types';

const NOT_FOUND = -1;

const initialState : ShoppingCartData = {
  products: [],
  discount: 0,
};

export const shoppingCartData = createSlice({
  name: NameSpace.FilterData,
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      const findIndex = state.products.findIndex((product) => product.camera.id === action.payload.id);
      if(findIndex !== NOT_FOUND){
        state.products[findIndex].count++;
      } else {
        state.products.push({
          camera: action.payload,
          count: 1,
        });
      }
    },
    updateProductCount: (state, action) => {
      const {id, count} = action.payload;
      const findIndex = state.products.findIndex((product) => product.camera.id === id);

      if(findIndex !== NOT_FOUND){
        state.products[findIndex].count = count;
      }
    },
    deleteProduct: (state, action) => {
      const deleteIndex = state.products.findIndex((product) => product.camera.id === action.payload);
      if(deleteIndex !== NOT_FOUND){
        state.products = [...state.products.slice(0, deleteIndex), ...state.products.slice(deleteIndex + 1)];
      }
    },
  },
});

export const {addProduct, deleteProduct, updateProductCount} = shoppingCartData.actions;

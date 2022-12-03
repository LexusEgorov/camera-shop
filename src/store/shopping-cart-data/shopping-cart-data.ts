import { createSlice } from '@reduxjs/toolkit';
import { CouponStatus, NameSpace } from '../../const';
import { ShoppingCartData } from '../../types/types';
import { getDiscountAction } from '../api-actions';

const NOT_FOUND = -1;

const initialState : ShoppingCartData = {
  products: [],
  discount: 0,
  coupon: '',
  couponStatus: CouponStatus.NoCoupon,
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
    resetCoupon: (state) => {
      state.coupon = '';
      state.couponStatus = CouponStatus.NoCoupon;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getDiscountAction.rejected, (state) => {
        state.couponStatus = CouponStatus.Reject;
        state.coupon = '';
        state.discount = 0;
      })
      .addCase(getDiscountAction.fulfilled, (state, action) => {
        const {data, coupon} = action.payload;
        state.couponStatus = CouponStatus.Accept;
        state.discount = data;
        state.coupon = coupon;
      });
  },
});

export const {addProduct, deleteProduct, updateProductCount, resetCoupon} = shoppingCartData.actions;

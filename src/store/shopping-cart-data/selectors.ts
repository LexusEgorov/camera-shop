import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { ShoppingCartItem, State } from '../../types/types';

const NOT_FOUND = -1;

export const getCartProducts = (state: State) : ShoppingCartItem[] => state[NameSpace.ShoppingCartData].products;

export const getCartProductsIds = createSelector([getCartProducts], (products) => products.map((product) => product.camera.id));

export const getCartProductCount = (id: number) => createSelector([
  getCartProducts,
], (products) => {
  const findIndex = products.findIndex((product) => product.camera.id === id);

  if(findIndex !== NOT_FOUND){
    return products[findIndex].count;
  }

  return 0;
});

export const getCartCountItems = createSelector([
  getCartProducts
], (products) => {
  let totalCount = 0;

  for(const product of products){
    totalCount += product.count;
  }

  return totalCount;
});

export const getCartTotalPrice = createSelector ([
  getCartProducts
], (products) => {
  let totalPrice = 0;

  for(const product of products){
    totalPrice += product.count * product.camera.price;
  }

  return totalPrice;
});

export const getCartDiscount = (state: State) : number => state[NameSpace.ShoppingCartData].discount;

export const getCartHasProduct = (id: number) => createSelector([getCartProducts], (products) => products.findIndex((product) => product.camera.id === id) !== NOT_FOUND);

export const getCoupon = (state: State) : string => state[NameSpace.ShoppingCartData].coupon;

export const getCouponStatus = (state: State) : string => state[NameSpace.ShoppingCartData].couponStatus;

import { CouponStatus } from '../../const';
import { FISH_PRODUCTS } from '../../fish/fish';
import { ShoppingCartData } from '../../types/types';
import { getDiscountAction } from '../api-actions';
import { addProduct, deleteProduct, resetCoupon, shoppingCartData, updateProductCount } from './shopping-cart-data';

const fakeCamera = FISH_PRODUCTS[0];
const fakeCameraNew = FISH_PRODUCTS[1];

describe('Reducer: shoppingCartData', () => {
  let state: ShoppingCartData;

  beforeEach(() => {
    state = {
      products: [{
        camera: fakeCamera,
        count: 5,
      }],
      discount: 0,
      coupon: '',
      couponStatus: CouponStatus.NoCoupon,
    };
  });

  describe('getDiscountAction test', () => {
    it('should update discount, coupon, couponStatus if getDiscountAction fulfilled', () => {
      expect(shoppingCartData.reducer(state, {type: getDiscountAction.fulfilled.type, payload: {data: 15, coupon: 'camera-333'}}))
        .toEqual({
          ...state,
          discount: 15,
          coupon: 'camera-333',
          couponStatus: CouponStatus.Accept
        });
    });

    it('should update couponStatus to REJECT if getDiscountAction rejected', () => {
      expect(shoppingCartData.reducer(state, {type: getDiscountAction.rejected.type,}))
        .toEqual({
          ...state,
          couponStatus: CouponStatus.Reject
        });
    });
  });

  describe('resetCoupon test', () => {
    it('should update to initialState', () => {
      expect(shoppingCartData.reducer(state, {type: resetCoupon.type}))
        .toEqual({
          ...state,
          coupon: '',
          couponStatus: CouponStatus.NoCoupon,
          discount: 0,
        });
    });
  });

  describe('deleteProduct test', () => {
    it('should delete product if products includes product.id', () => {
      expect(shoppingCartData.reducer(state, {type: deleteProduct.type, payload: 1}))
        .toEqual({
          ...state,
          products: [],
        });
    });

    it('shouldn\'t delete product if products doesn\'t include product.id', () => {
      expect(shoppingCartData.reducer(state, {type: deleteProduct.type, payload: 2}))
        .toEqual({
          ...state,
        });
    });
  });

  describe('updateProductCount test', () => {
    it('should update product.count if products includes product.id', () => {
      expect(shoppingCartData.reducer(state, {type: updateProductCount.type, payload: {id: 1, count: 15}}))
        .toEqual({
          ...state,
          products: [{
            camera: fakeCamera,
            count: 15,
          }],
        });
    });

    it('shouldn\'t update product.count if products doesn\'t include product.id', () => {
      expect(shoppingCartData.reducer(state, {type: updateProductCount.type, payload: 2}))
        .toEqual({
          ...state,
        });
    });
  });

  describe('addProduct test', () => {
    it('should add product if products doesn\'t include product.id', () => {
      expect(shoppingCartData.reducer(state, {type: addProduct.type, payload: fakeCameraNew}))
        .toEqual({
          ...state,
          products: [
            {
              camera: fakeCamera,
              count: 5,
            },
            {
              camera: fakeCameraNew,
              count: 1,
            },
          ],
        });
    });

    it('should update product.count if products includes product.id', () => {
      expect(shoppingCartData.reducer(state, {type: addProduct.type, payload: fakeCamera}))
        .toEqual({
          ...state,
          products: [{
            camera: fakeCamera,
            count: 6,
          }],
        });
    });
  });
});

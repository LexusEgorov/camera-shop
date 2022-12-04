import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { CouponStatus, NameSpace } from '../../const';
import * as apiActions from '../../store/api-actions';
import * as shoppingCartActions from '../../store/shopping-cart-data/shopping-cart-data';
import ShoppingCartCouponForm from './shopping-cart-coupon-form';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const fakeStore = (coupon: string, couponStatus: string) => mockStore({
  [NameSpace.ShoppingCartData]: {
    coupon: coupon,
    couponStatus: couponStatus,
  }
});

const fakeApp = (coupon: string, couponStatus: string) => (
  <Provider store={fakeStore(coupon, couponStatus)}>
    <ShoppingCartCouponForm />
  </Provider>
);

describe('Component: ShoppingCartCouponForm', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  it('should render correctly', () => {
    render(fakeApp('', CouponStatus.NoCoupon));

    expect(screen.getByText('Промокод')).toBeInTheDocument();
  });

  it('should set coupon if value don\'t have spaces', () => {
    render(fakeApp('', CouponStatus.NoCoupon));
    const couponInput : HTMLInputElement = screen.getByTestId('coupon-input');

    fireEvent.input(couponInput, {
      target: {value: 'camera-333'}
    });

    expect(couponInput.value).toEqual('camera-333');
  });

  it('shouldn\'t set coupon if value have spaces', () => {
    render(fakeApp('', CouponStatus.NoCoupon));
    const couponInput : HTMLInputElement = screen.getByTestId('coupon-input');

    fireEvent.input(couponInput, {
      target: {value: ' camera-333'}
    });

    expect(couponInput.value).toEqual('');
  });

  it('should dispatch resetCoupon if value is empty', () => {
    const fakeResetCoupon = jest.spyOn(shoppingCartActions, 'resetCoupon');
    render(fakeApp('camera-333', CouponStatus.Accept));
    const couponInput : HTMLInputElement = screen.getByTestId('coupon-input');

    fireEvent.input(couponInput, {
      target: {value: ''}
    });

    expect(fakeResetCoupon).toHaveBeenCalled();
  });

  it('should dispatch getDiscountAction when click submit', () => {
    const fakeGetDiscountAction = jest.spyOn(apiActions, 'getDiscountAction');
    render(fakeApp('', CouponStatus.NoCoupon));
    const couponInput : HTMLInputElement = screen.getByTestId('coupon-input');
    const submitButton = screen.getByText('Применить');

    fireEvent.input(couponInput, {
      target: {value: 'camera-333'}
    });
    fireEvent.click(submitButton);

    expect(fakeGetDiscountAction).toHaveBeenCalledWith('camera-333');
  });

  it('shouldn\'t dispatch getDiscountAction when click submit and value is empty', () => {
    const fakeGetDiscountAction = jest.spyOn(apiActions, 'getDiscountAction');
    render(fakeApp('', CouponStatus.NoCoupon));
    const couponInput : HTMLInputElement = screen.getByTestId('coupon-input');
    const submitButton = screen.getByText('Применить');

    fireEvent.input(couponInput, {
      target: {value: ''}
    });
    fireEvent.click(submitButton);

    expect(fakeGetDiscountAction).toHaveBeenCalledTimes(0);
  });
});

import { useState } from 'react';
import { CouponStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getDiscountAction } from '../../store/api-actions';
import { getCoupon, getCouponStatus } from '../../store/shopping-cart-data/selectors';
import { resetCoupon } from '../../store/shopping-cart-data/shopping-cart-data';

function ShoppingCartCouponForm() : JSX.Element {
  const dispatch = useAppDispatch();

  const couponStore = useAppSelector(getCoupon);
  const couponStatus = useAppSelector(getCouponStatus);

  const [coupon, setCoupon] = useState(couponStore);

  const handleCouponInput = (evt: React.FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;

    if(!value.includes(' ')){
      setCoupon(value);

      if(!value){
        dispatch(resetCoupon());
      }
    }
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(coupon){
      dispatch(getDiscountAction(coupon));
    }
  };

  const getCouponMessage = (status: string, value: string) : string => {
    if(!value || status === CouponStatus.NoCoupon){
      return '';
    }

    return status === CouponStatus.Accept ? 'is-valid' : 'is-invalid';
  };

  return (
    <div className="basket-form">
      <form
        action="#"
        onSubmit={handleSubmit}
      >
        <div className={`custom-input ${getCouponMessage(couponStatus, coupon)}`}>
          <label>
            <span className="custom-input__label">Промокод</span>
            <input
              type="text"
              name="promo"
              placeholder="Введите промокод"
              onInput={handleCouponInput}
              value={coupon}
            />
          </label>
          <p className="custom-input__error">Промокод неверный</p>
          <p className="custom-input__success">Промокод принят!</p>
        </div>
        <button className="btn" type="submit">
          Применить
        </button>
      </form>
    </div>

  );
}

export default ShoppingCartCouponForm;

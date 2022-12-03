import { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ModalDeleteItem from '../../components/modal-delete-item/modal-delete-item';
import ShoppingCartCouponForm from '../../components/shopping-cart-coupon-form/shopping-cart-coupon-form';
import ShoppingCartList from '../../components/shopping-cart-list/shopping-cart-list';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setSearchParams } from '../../store/app-process/app-process';
import { getCartDiscount, getCartTotalPrice } from '../../store/shopping-cart-data/selectors';
import { Camera } from '../../types/types';

function ShoppingCart() : JSX.Element {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(getCartTotalPrice);
  const discount = useAppSelector(getCartDiscount);

  const [isModalDeleteOpened, setIsModalDeleteOpened] = useState(false);
  const [choosenCamera, setChoosenCamera] = useState(undefined as unknown as Camera);

  useEffect(() => {
    dispatch(setSearchParams(''));
    window.scrollTo(0, 0);
  }, [dispatch]);

  return(
    <>
      <Breadcrumbs />
      <section className="basket">
        <div className="container">
          <h1 className="title title--h2">Корзина</h1>
          <ShoppingCartList openModal={setIsModalDeleteOpened} setCamera={setChoosenCamera}/>
          <div className="basket__summary">
            <div className="basket__promo">
              <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
              <ShoppingCartCouponForm />
            </div>
            <div className="basket__summary-order">
              <p className="basket__summary-item">
                <span className="basket__summary-text">Всего:</span>
                <span className="basket__summary-value">{totalPrice} ₽</span>
              </p>
              {
                discount !== 0 && (
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className="basket__summary-value basket__summary-value--bonus">{discount} ₽</span>
                  </p>
                )
              }
              <p className="basket__summary-item">
                <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                <span className="basket__summary-value basket__summary-value--total">111 390 ₽</span>
              </p>
              <button className="btn btn--purple" type="submit">
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </section>
      {
        choosenCamera && <ModalDeleteItem isOpened={isModalDeleteOpened} setIsOpened={setIsModalDeleteOpened} camera={choosenCamera}/>
      }
    </>
  );
}

export default ShoppingCart;

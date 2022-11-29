import { useState } from 'react';

type ModalAddToCartProps = {
  isOpened: boolean,
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

function ModalAddToCart({isOpened, setIsOpened} : ModalAddToCartProps) : JSX.Element {
  const [isSuccess] = useState(false);

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          {
            isSuccess ?
              <>
                <p className="title title--h4">Товар успешно добавлен в корзину</p>
                <svg className="modal__icon" width={86} height={80} aria-hidden="true">
                  <use xlinkHref="#icon-success" />
                </svg>
                <div className="modal__buttons">
                  <a className="btn btn--transparent modal__btn" href="/catalog">Продолжить покупки</a>
                  <button className="btn btn--purple modal__btn modal__btn--fit-width">Перейти в корзину</button>
                </div>
                <button className="cross-btn" type="button" aria-label="Закрыть попап">
                  <svg width={10} height={10} aria-hidden="true">
                    <use xlinkHref="#icon-close" />
                  </svg>
                </button>
              </> :
              <>
                <p className="title title--h4">Добавить товар в корзину</p>
                <div className="basket-item basket-item--short">
                  <div className="basket-item__img">
                    <picture>
                      <source type="image/webp" srcSet="img/content/img9.webp, img/content/img9@2x.webp 2x" /><img src="img/content/img9.jpg" srcSet="img/content/img9@2x.jpg 2x" width={140} height={120} alt="Фотоаппарат «Орлёнок»" />
                    </picture>
                  </div>
                  <div className="basket-item__description">
                    <p className="basket-item__title">Фотоаппарат «Орлёнок»</p>
                    <ul className="basket-item__list">
                      <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">O78DFGSD832</span>
                      </li>
                      <li className="basket-item__list-item">Плёночная фотокамера</li>
                      <li className="basket-item__list-item">Любительский уровень</li>
                    </ul>
                    <p className="basket-item__price"><span className="visually-hidden">Цена:</span>18 970 ₽</p>
                  </div>
                </div>
                <div className="modal__buttons">
                  <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
                    <svg width={24} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-add-basket" />
                    </svg>Добавить в корзину
                  </button>
                </div>
                <button className="cross-btn" type="button" aria-label="Закрыть попап">
                  <svg width={10} height={10} aria-hidden="true">
                    <use xlinkHref="#icon-close" />
                  </svg>
                </button>
              </>
          }
        </div>
      </div>
    </div>
  );
}

export default ModalAddToCart;

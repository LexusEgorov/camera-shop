import { useCallback, useEffect, useState } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { Link, useLocation } from 'react-router-dom';
import { FilterValue } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { addProduct } from '../../store/shopping-cart-data/shopping-cart-data';
import { Camera } from '../../types/types';

const MODAL_DELAY = 500;

type ModalAddToCartProps = {
  isOpened: boolean,
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
  camera: Camera,
}

function ModalAddToCart({isOpened, setIsOpened, camera} : ModalAddToCartProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const currentLocation = useLocation().pathname;

  const {
    name,
    vendorCode,
    level,
    type,
    category,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = camera;

  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddToShoppingCart = () => {
    dispatch(addProduct(camera));
    setIsSuccess(true);
  };

  const handleContentClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    evt.stopPropagation();
  };

  const handleCloseModalClick = () => {
    setIsOpened(false);
    document.body.style.overflow = 'visible';
    document.removeEventListener('keydown', handleCloseModalKeydown);
    setTimeout(() => {
      setIsSuccess(false);
    }, MODAL_DELAY);
  };

  const handleContinueShopping = (evt : React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    handleCloseModalClick();

    if(currentLocation.includes('catalog')){
      evt.preventDefault();
    }
  };

  const handleCloseModalKeydown = useCallback((evt : KeyboardEvent) => {
    if(isOpened && evt.key === 'Escape'){
      setIsOpened(false);
      document.removeEventListener('keydown', handleCloseModalKeydown);
      setTimeout(() => {
        setIsSuccess(false);
      }, MODAL_DELAY);
    }
  }, [isOpened, setIsOpened]);

  useEffect(() => {
    if(isOpened){
      document.addEventListener('keydown', handleCloseModalKeydown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [handleCloseModalKeydown, isOpened]);

  return (
    <div className={`modal ${isOpened ? 'is-active' : ''}`} onClick={handleCloseModalClick}>
      <ReactFocusLock>
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div
            className="modal__content"
            onClick={handleContentClick}
          >
            {
              isSuccess ?
                <>
                  <p className="title title--h4">Товар успешно добавлен в корзину</p>
                  <svg className="modal__icon" width={86} height={80} aria-hidden="true">
                    <use xlinkHref="#icon-success" />
                  </svg>
                  <div className="modal__buttons">
                    <Link
                      className="btn btn--transparent modal__btn"
                      to="/catalog/1"
                      onClick={handleContinueShopping}
                    >
                      Продолжить покупки
                    </Link>
                    <Link
                      className="btn btn--purple modal__btn modal__btn--fit-width"
                      to="/cart"
                      onClick={handleCloseModalClick}
                    >
                      Перейти в корзину
                    </Link>
                  </div>
                </> :
                <>
                  <p className="title title--h4">Добавить товар в корзину</p>
                  <div className="basket-item basket-item--short">
                    <div className="basket-item__img">
                      <picture>
                        <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}/>
                        <img src={previewImg} srcSet={`${previewImg2x} 2x`} width={140} height={120} alt={name} />
                      </picture>
                    </div>
                    <div className="basket-item__description">
                      <p className="basket-item__title">{name}</p>
                      <ul className="basket-item__list">
                        <li className="basket-item__list-item">
                          <span className="basket-item__article">Артикул: </span>
                          <span className="basket-item__number">{vendorCode}</span>
                        </li>
                        <li className="basket-item__list-item">{type} {category === FilterValue.Photo ? 'фотокамера' : category.toLowerCase()}</li>
                        <li className="basket-item__list-item">{level} уровень</li>
                      </ul>
                      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
                    </div>
                  </div>
                  <div className="modal__buttons">
                    <button
                      className="btn btn--purple modal__btn modal__btn--fit-width"
                      type="button"
                      onClick={handleAddToShoppingCart}
                    >
                      <svg width={24} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-add-basket" />
                      </svg>
                      Добавить в корзину
                    </button>
                  </div>
                </>
            }
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCloseModalClick}>
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </div>
      </ReactFocusLock>
    </div>
  );
}

export default ModalAddToCart;

import { useState } from 'react';
import { FilterValue } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getCartProductCount } from '../../store/shopping-cart-data/selectors';
import { updateProductCount } from '../../store/shopping-cart-data/shopping-cart-data';
import { Camera } from '../../types/types';

const MAX_PRODUCT_COUNT = 99;
const MIN_PRODUCT_COUNT = 1;

type ShoppingCartItemProps = {
  product: Camera,
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCamera: React.Dispatch<React.SetStateAction<Camera>>,
}

function ShoppingCartItem({product, openModal, setCamera} : ShoppingCartItemProps) : JSX.Element {
  const dispatch = useAppDispatch();

  const {
    id,
    name,
    price,
    vendorCode,
    category,
    type,
    level,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = product;

  const productCount = useAppSelector(getCartProductCount(id));

  const [currentCount, setCurrentCount] = useState(productCount);
  const [currentInputCount, setCurrentInputCount] = useState(productCount.toString());

  const updateCount = (count : number) => {
    dispatch(updateProductCount({id: id, count: count}));
    setCurrentCount(count);
    setCurrentInputCount(count.toString());
  };

  const handleProductIncrement = () => {
    if(currentCount + 1 <= MAX_PRODUCT_COUNT){
      updateCount(currentCount + 1);
    }
  };

  const handleProductDecrement = () => {
    if(currentCount - 1 >= MIN_PRODUCT_COUNT){
      updateCount(currentCount - 1);
    }
  };

  const handleProductCountInput = (evt: React.FormEvent<HTMLInputElement>) => setCurrentInputCount(evt.currentTarget.value);

  const handleProductCountBlur = () => {
    const count = Number(currentInputCount);

    if(count < MIN_PRODUCT_COUNT){
      return updateCount(MIN_PRODUCT_COUNT);
    }

    if(count > MAX_PRODUCT_COUNT){
      return updateCount(MAX_PRODUCT_COUNT);
    }

    dispatch(updateProductCount({id: id, count: count}));
    setCurrentCount(count);
  };

  const handleDeleteProduct = () => {
    setCamera(product);
    openModal(true);
  };

  return (
    <li
      className="basket-item"
      data-testid='shopping-cart-item'
    >
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}/>
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width={140} height={120} alt={name} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{type} {category === FilterValue.Photo ? 'фотокамера' : category.toLowerCase()}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={handleProductDecrement}
          disabled={currentCount === MIN_PRODUCT_COUNT}
          data-testid='count-decrement'
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="number"
          id="counter1"
          min={1}
          max={99}
          aria-label="количество товара"
          value={currentInputCount}
          onInput={handleProductCountInput}
          onBlur={handleProductCountBlur}
          data-testid='count-input'
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleProductIncrement}
          disabled={currentCount === MAX_PRODUCT_COUNT}
          data-testid='count-increment'
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{price * currentCount} ₽</div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleDeleteProduct}
        data-testid='delete-btn'
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}

export default ShoppingCartItem;

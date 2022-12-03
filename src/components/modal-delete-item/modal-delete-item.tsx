import { useCallback, useEffect } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { Link } from 'react-router-dom';
import { FilterValue } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { deleteProduct } from '../../store/shopping-cart-data/shopping-cart-data';
import { Camera } from '../../types/types';

type ModalDeleteItemProps = {
  isOpened: boolean,
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
  camera: Camera,
}

function ModalDeleteItem({isOpened, setIsOpened, camera} : ModalDeleteItemProps) : JSX.Element {
  const dispatch = useAppDispatch();

  const {
    id,
    name,
    vendorCode,
    level,
    type,
    category,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = camera;

  const handleDelete = () => {
    dispatch(deleteProduct(id));
    handleCloseModalClick();
  };

  const handleContentClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    evt.stopPropagation();
  };

  const handleCloseModalClick = () => {
    setIsOpened(false);
    document.removeEventListener('keydown', handleCloseModalKeydown);
  };

  const handleContinueShopping = (evt : React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    handleCloseModalClick();
  };

  const handleCloseModalKeydown = useCallback((evt : KeyboardEvent) => {
    if(isOpened && evt.key === 'Escape'){
      setIsOpened(false);
      document.removeEventListener('keydown', handleCloseModalKeydown);
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

  return(
    <div className={`modal ${isOpened ? 'is-active' : ''}`} onClick={handleCloseModalClick}>
      <ReactFocusLock>
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div
            className="modal__content"
            onClick={handleContentClick}
          >
            <p className="title title--h4">Удалить этот товар?</p>
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
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--half-width"
                type="button"
                onClick={handleDelete}
              >
                Удалить
              </button>
              <Link
                className="btn btn--transparent modal__btn modal__btn--half-width"
                to='/cart'
                onClick={handleContinueShopping}
              >
                Продолжить покупки
              </Link>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={handleCloseModalClick}
            >
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

export default ModalDeleteItem;

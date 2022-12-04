import { useCallback, useEffect } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { Link, Navigate } from 'react-router-dom';
import { OrderStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { resetOrderStatus } from '../../store/app-process/app-process';
import { getOrderStatus } from '../../store/app-process/selectors';

type ModalOrderResultProps = {
  isOpened: boolean,
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

function ModalOrderResult({isOpened, setIsOpened} : ModalOrderResultProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const orderStatus = useAppSelector(getOrderStatus);

  const handleContentClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    evt.stopPropagation();
  };

  const handleCloseModalClick = () => {
    dispatch(resetOrderStatus());
    setIsOpened(false);
    document.body.style.overflow = 'visible';
    document.removeEventListener('keydown', handleCloseModalKeydown);
  };

  const handleContinueShopping = () => handleCloseModalClick();

  const handleCloseModalKeydown = useCallback((evt : KeyboardEvent) => {
    if(isOpened && evt.key === 'Escape'){
      dispatch(resetOrderStatus());
      setIsOpened(false);
      document.removeEventListener('keydown', handleCloseModalKeydown);
    }
  }, [dispatch, isOpened, setIsOpened]);

  useEffect(() => {
    if(isOpened){
      document.addEventListener('keydown', handleCloseModalKeydown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [handleCloseModalKeydown, isOpened]);

  if(orderStatus === OrderStatus.Reject){
    return <Navigate to='/error' />;
  }

  return(
    <div className={`modal ${isOpened ? 'is-active' : ''}`} onClick={handleCloseModalClick}>
      <ReactFocusLock>
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div
            className="modal__content"
            onClick={handleContentClick}
          >
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width={80} height={78} aria-hidden="true">
              <use xlinkHref="#icon-review-success" />
            </svg>
            <div className="modal__buttons">
              <Link
                className="btn btn--purple modal__btn modal__btn--fit-width"
                to='/catalog/1'
                onClick={handleContinueShopping}
              >
                Вернуться к покупкам
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

export default ModalOrderResult;

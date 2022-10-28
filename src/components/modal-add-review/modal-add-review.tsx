import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { sendReviewAction } from '../../store/api-actions';
import { getCamera } from '../../store/camera-data/selectors';

const RATINGS = [
  {
    rate: 5,
    title: 'Отлично'
  },
  {
    rate: 4,
    title: 'Хорошо'
  },
  {
    rate: 3,
    title: 'Нормально'
  },
  {
    rate: 2,
    title: 'Плохо'
  },
  {
    rate: 1,
    title: 'Ужасно'
  }
];

const X_SCROLL = 1150;
const MODAL_DELAY = 500;

const EMPTY_FIELD = '';
const EMPTY_RATE = 0;

type ModalAddReviewProps = {
  isOpened: boolean,
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

function ModalAddReview({isOpened, setIsOpened} : ModalAddReviewProps) : JSX.Element {
  const {id} = useAppSelector(getCamera);
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [isSuccess, setIsSuccess] = useState(false);

  const [rate, setRate] = useState(0);
  const [name, setName] = useState('');
  const [advantages, setAdvantages] = useState('');
  const [disadvantages, setDisadvantages] = useState('');
  const [comment, setComment] = useState('');

  const [isRateError, setIsRateError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isAdvantagesError, setIsAdvantagesError] = useState(false);
  const [isDisadvantagesError, setIsDisadvantagesError] = useState(false);
  const [isCommentError, setIsCommentError] = useState(false);

  const clearForm = () => {
    setRate(EMPTY_RATE);
    setName(EMPTY_FIELD);
    setAdvantages(EMPTY_FIELD);
    setDisadvantages(EMPTY_FIELD);
    setComment(EMPTY_FIELD);

    setIsRateError(false);
    setIsNameError(false);
    setIsAdvantagesError(false);
    setIsDisadvantagesError(false);
    setIsCommentError(false);

    formRef.current?.reset();
  };

  const handleRateChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if(evt.target.value){
      setIsRateError(false);
    }
    setRate(Number(evt.target.value));
  };

  const handleNameInput = (evt: React.FormEvent<HTMLInputElement>) => {
    if(evt.currentTarget.value){
      setIsNameError(false);
    }
    setName(evt.currentTarget.value);
  };

  const handleAdvantagesInput = (evt: React.FormEvent<HTMLInputElement>) => {
    if(evt.currentTarget.value){
      setIsAdvantagesError(false);
    }
    setAdvantages(evt.currentTarget.value);
  };

  const handleDisadvantagesInput = (evt: React.FormEvent<HTMLInputElement>) => {
    if(evt.currentTarget.value){
      setIsDisadvantagesError(false);
    }
    setDisadvantages(evt.currentTarget.value);
  };

  const handleCommentInput = (evt: React.FormEvent<HTMLTextAreaElement>) => {
    if(evt.currentTarget.value){
      setIsCommentError(false);
    }
    setComment(evt.currentTarget.value);
  };

  const handleSubmitModal = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    let isValid = true;

    if(!rate){
      setIsRateError(true);
      isValid = false;

    }
    else{
      setIsRateError(false);
    }

    if(!name){
      setIsNameError(true);
      isValid = false;
    }
    else{
      setIsNameError(false);
    }

    if(!advantages){
      setIsAdvantagesError(true);
      isValid = false;
    }
    else{
      setIsAdvantagesError(false);
    }

    if(!disadvantages){
      setIsDisadvantagesError(true);
      isValid = false;
    }
    else{
      setIsDisadvantagesError(false);
    }

    if(!comment){
      setIsCommentError(true);
      isValid = false;
    }
    else {
      setIsCommentError(false);
    }

    if(isValid){
      dispatch(sendReviewAction({
        rating: rate,
        userName: name,
        cameraId: id,
        advantage: advantages,
        disadvantage: disadvantages,
        review: comment,
      }));
      setIsSuccess(true);
      clearForm();
    }
  };

  const handleContentClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    evt.stopPropagation();
  };

  const handleCloseModalClick = () => {
    setIsOpened(false);
    clearForm();
    document.removeEventListener('keydown', handleCloseModalKeydown);
    setTimeout(() => {
      setIsSuccess(false);
    }, MODAL_DELAY);
  };

  const handleCloseModalKeydown = useCallback((evt : KeyboardEvent) => {
    if(isOpened && evt.key === 'Escape'){
      setIsOpened(false);
      clearForm();
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
      window.scrollTo(0, X_SCROLL);
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [handleCloseModalKeydown, isOpened]);

  return (
    <div className={`modal ${isOpened ? 'is-active' : ''}`} onClick={handleCloseModalClick}>
      <ReactFocusLock>
        <div className="modal__wrapper">
          <div className="modal__overlay"/>
          <div className="modal__content" onClick={handleContentClick}>
            {
              isSuccess ?
                (
                  <>
                    <p className="title title--h4">Спасибо за отзыв</p>
                    <svg className="modal__icon" width="80" height="78" aria-hidden="true">
                      <use xlinkHref="#icon-review-success"></use>
                    </svg>
                    <div className="modal__buttons">
                      <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
                        onClick={handleCloseModalClick}
                      >
                        Вернуться к покупкам
                      </button>
                    </div>
                  </>
                ) :
                (
                  <>
                    <p className="title title--h4">Оставить отзыв</p>
                    <div className="form-review">
                      <form method="post" onSubmit={handleSubmitModal} ref={formRef}>
                        <div className="form-review__rate">
                          <fieldset className={`rate form-review__item ${isRateError ? 'is-invalid' : ''}`}>
                            <legend className="rate__caption">Рейтинг
                              <svg width={9} height={9} aria-hidden="true">
                                <use xlinkHref="#icon-snowflake" />
                              </svg>
                            </legend>
                            <div className="rate__bar">
                              <div className="rate__group">
                                {
                                  RATINGS.map((rating) => (
                                    <Fragment key={rating.rate}>
                                      <input
                                        className="visually-hidden"
                                        id={`star-${rating.rate}`}
                                        name="rate"
                                        type="radio"
                                        defaultValue={rating.rate}
                                        onChange={handleRateChange}
                                        checked={rate === rating.rate}
                                      />
                                      <label className="rate__label" htmlFor={`star-${rating.rate}`} title={rating.title} />
                                    </Fragment>
                                  ))
                                }
                              </div>
                              <div className="rate__progress"><span className="rate__stars">{rate}</span> <span>/</span> <span className="rate__all-stars">5</span>
                              </div>
                            </div>
                            <p className="rate__message">Нужно оценить товар</p>
                          </fieldset>
                          <div className={`custom-input form-review__item ${isNameError ? 'is-invalid' : ''}`}>
                            <label>
                              <span className="custom-input__label">Ваше имя
                                <svg width={9} height={9} aria-hidden="true">
                                  <use xlinkHref="#icon-snowflake" />
                                </svg>
                              </span>
                              <input type="text" name="user-name" placeholder="Введите ваше имя" onInput={handleNameInput}/>
                            </label>
                            <p className="custom-input__error">Нужно указать имя</p>
                          </div>
                          <div className={`custom-input form-review__item ${isAdvantagesError ? 'is-invalid' : ''}`}>
                            <label>
                              <span className="custom-input__label">Достоинства
                                <svg width={9} height={9} aria-hidden="true">
                                  <use xlinkHref="#icon-snowflake" />
                                </svg>
                              </span>
                              <input type="text" name="user-plus" placeholder="Основные преимущества товара" onInput={handleAdvantagesInput}/>
                            </label>
                            <p className="custom-input__error">Нужно указать достоинства</p>
                          </div>
                          <div className={`custom-input form-review__item ${isDisadvantagesError ? 'is-invalid' : ''}`}>
                            <label>
                              <span className="custom-input__label">Недостатки
                                <svg width={9} height={9} aria-hidden="true">
                                  <use xlinkHref="#icon-snowflake" />
                                </svg>
                              </span>
                              <input type="text" name="user-minus" placeholder="Главные недостатки товара" onInput={handleDisadvantagesInput}/>
                            </label>
                            <p className="custom-input__error">Нужно указать недостатки</p>
                          </div>
                          <div className={`custom-textarea form-review__item ${isCommentError ? 'is-invalid' : ''}`}>
                            <label>
                              <span className="custom-textarea__label">Комментарий
                                <svg width={9} height={9} aria-hidden="true">
                                  <use xlinkHref="#icon-snowflake" />
                                </svg>
                              </span>
                              <textarea name="user-comment" placeholder="Поделитесь своим опытом покупки" defaultValue={''} onInput={handleCommentInput}/>
                            </label>
                            <div className="custom-textarea__error">Нужно добавить комментарий</div>
                          </div>
                        </div>
                        <button className="btn btn--purple form-review__btn" type="submit" data-testid='submit-modal-button'>Отправить отзыв</button>
                      </form>
                    </div>
                  </>
                )
            }
            <button className="cross-btn" type="button" aria-label="Закрыть попап"
              onClick={handleCloseModalClick}
              data-testid='close-modal-button'
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

export default ModalAddReview;

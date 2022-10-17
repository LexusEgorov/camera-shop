import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductReview from '../../components/product-review/product-review';
import ProductSimilar from '../../components/product-similar/product-similar';
import UpButton from '../../components/up-btn/up-btn';
import { Tab } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCameraAction, fetchCamerasAction, fetchReviewsAction, fetchSimilarAction } from '../../store/api-actions';
import { getIsServerError } from '../../store/app-process/selectors';
import { setCurrent } from '../../store/camera-data/camera-data';
import { getCamera, getSimilar } from '../../store/camera-data/selectors';

function Product() : JSX.Element {
  const dispatch = useAppDispatch();
  const {id, tab} = useParams();
  const productId = Number(id);
  const isError = useAppSelector(getIsServerError);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSimilarAction(productId));
    dispatch(fetchReviewsAction(productId));
    dispatch(setCurrent(productId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  let product = useAppSelector(getCamera);

  useEffect(() => {
    if(!product.id){
      dispatch(fetchCamerasAction());
      dispatch(fetchCameraAction(productId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  product = useAppSelector(getCamera);
  const similarProducts = useAppSelector(getSimilar);

  const {
    name,
    category,
    type,
    description,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    level,
    price,
    vendorCode,
  } = product;

  const getTab = (currentTab: string | undefined) => {
    if(currentTab === Tab.Description){
      return (
        <div className="tabs__element is-active">
          <div className="product__tabs-text">
            {description}
          </div>
        </div>
      );
    }

    return (
      <div className="tabs__element is-active">
        <ul className="product__tabs-list">
          <li className="item-list"><span className="item-list__title">Артикул:</span>
            <p className="item-list__text">{vendorCode}</p>
          </li>
          <li className="item-list"><span className="item-list__title">Категория:</span>
            <p className="item-list__text">{category}</p>
          </li>
          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
            <p className="item-list__text">{type}</p>
          </li>
          <li className="item-list"><span className="item-list__title">Уровень:</span>
            <p className="item-list__text">{level}</p>
          </li>
        </ul>
      </div>
    );
  };

  if(isError){
    return <Navigate to='*' />;
  }

  return (
    <>
      <Breadcrumbs productName={name}/>
      <div className="page-content__section fade-in">
        <section className="product">
          <div className="container">
            <div className="product__img">
              <picture>
                <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
                <img src={previewImg} srcSet={`${previewImg2x} 2x`} width={560} height={480} alt={name} />
              </picture>
            </div>
            <div className="product__content">
              <h1 className="title title--h3">{name}</h1>
              <div className="rate product__rate">
                <svg width={17} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={17} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={17} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={17} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={17} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Рейтинг: 4</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
              </div>
              <p className="product__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
              <button className="btn btn--purple" type="button">
                <svg width={24} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-add-basket" />
                </svg>
                Добавить в корзину
              </button>
              <div className="tabs product__tabs">
                <div className="tabs__controls product__tabs-controls">
                  <Link to={`/product/${id}/${Tab.Characteristics}`} className={`tabs__control ${tab === Tab.Characteristics ? 'is-active' : ''}`} type="button">Характеристики</Link>
                  <Link to={`/product/${id}/${Tab.Description}`} className={`tabs__control ${tab === Tab.Description ? 'is-active' : ''}`} type="button">Описание</Link>
                </div>
                <div className="tabs__content">
                  {getTab(tab)}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {
        similarProducts.length > 0 && <ProductSimilar productsSimilar={similarProducts}/>
      }
      <ProductReview />
      <UpButton />
    </>
  );
}

export default Product;

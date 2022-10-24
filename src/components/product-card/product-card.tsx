import { Link } from 'react-router-dom';
import { Tab } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { setCurrent } from '../../store/camera-data/camera-data';
import { Camera } from '../../types/types';
import ProductCardRating from '../product-card-rating/product-card-rating';

type ProductCardProps = {
  product: Camera;
  isActive?: boolean;
};

function ProductCard({product, isActive} : ProductCardProps) : JSX.Element {
  const dispatch = useAppDispatch();

  const {
    id,
    name,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    reviewCount,
    rating,
  } = product;

  const handleShowCameraClick = () => dispatch(setCurrent(id));

  return (
    <div className={`product-card ${isActive ? 'is-active' : ''}`}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}/>
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width={280} height={240} alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <ProductCardRating rating={rating} reviewCount={reviewCount} />
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span> {price} ₽</p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить</button>
        <Link className="btn btn--transparent" to={`/product/${id}/${Tab.Description}`}
          onClick={handleShowCameraClick}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;

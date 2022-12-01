import { Link } from 'react-router-dom';
import { Tab } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setCurrent } from '../../store/camera-data/camera-data';
import { getCartHasProduct } from '../../store/shopping-cart-data/selectors';
import { Camera } from '../../types/types';
import AddToCartButton from '../add-to-cart-button/add-to-cart-button';
import ProductCardRating from '../product-card-rating/product-card-rating';

type ProductCardProps = {
  product: Camera;
  isActive?: boolean;
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCamera: React.Dispatch<React.SetStateAction<Camera>>,
};

function ProductCard({product, isActive, openModal, setCamera} : ProductCardProps) : JSX.Element {
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

  const isAdded = useAppSelector(getCartHasProduct(id));

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
        <AddToCartButton isAdded={isAdded} currentCamera={product} setCamera={setCamera} openModal={openModal}/>
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

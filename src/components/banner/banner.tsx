import { Link } from 'react-router-dom';
import { Promo } from '../../types/types';

type BannerProps = {
  promo: Promo;
}

function Banner({promo} : BannerProps) : JSX.Element{
  const {
    name,
    id,
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x
  } = promo;

  return (
    <div className="banner fade-in">
      <picture>
        <source type="image/webp" srcSet={`${String(previewImgWebp)}, ${String(previewImgWebp2x)} 2x`} />
        <img src={previewImg} srcSet={`${String(previewImg2x)} 2x`} width="1280" height="280" alt="баннер" />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`/product/${id}`}>Подробнее</Link>
      </p>
    </div>
  );
}

export default Banner;

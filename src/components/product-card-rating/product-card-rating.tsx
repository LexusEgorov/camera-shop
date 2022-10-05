const MIN_RATE = 1;
const MAX_RATE = 5;

type ProductCardRatingProps = {
  rating: number;
  reviewCount: number;
}

function ProductCardRating({rating, reviewCount} : ProductCardRatingProps ) : JSX.Element {
  const stars = [];
  for(let i = MIN_RATE; i <= MAX_RATE; i++){
    stars.push(
      <svg width={17} height={16} aria-hidden="true" key={i}>
        {
          i <= rating ? (<use xlinkHref="#icon-full-star"/>) : (<use xlinkHref="#icon-star"/>)
        }
      </svg>
    );
  }

  return (
    <div className="rate product-card__rate">
      {stars}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
    </div>
  );
}

export default ProductCardRating;

const MIN_RATE = 1;
const MAX_RATE = 5;

type ProductCardRatingProps = {
  rating: number;
  reviewCount?: number;
  blockClass?: string;
}

function ProductCardRating({rating, reviewCount, blockClass} : ProductCardRatingProps ) : JSX.Element {
  const stars = [];

  const className = blockClass ? blockClass : 'rate product-card__rate';

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
    <div className={className}>
      {stars}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      {
        reviewCount && <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
      }
    </div>
  );
}

export default ProductCardRating;

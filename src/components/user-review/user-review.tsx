import { Months } from '../../const';
import { Review } from '../../types/types';
import ProductCardRating from '../product-card-rating/product-card-rating';

type UserReviewProps = {
  reviewData: Review,
}

function UserReview({reviewData} : UserReviewProps) : JSX.Element {
  const {
    userName,
    rating,
    advantage,
    disadvantage,
    review,
    createAt
  } = reviewData;

  const formattedDate = new Date(createAt);

  const day = formattedDate.getDate();
  const month = formattedDate.getMonth();
  const year = formattedDate.getFullYear();

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={`${year}-${day}-${month + 1}`}>{day} {Months[month]}</time>
      </div>
      <ProductCardRating rating={rating} blockClass='rate review-card__rate'/>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default UserReview;

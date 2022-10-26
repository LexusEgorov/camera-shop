import { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { getReviews } from '../../store/camera-data/selectors';
import UserReview from '../user-review/user-review';

const REVIEWS_BLOCK = 3;

type ProductReviewProps = {
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

function ProductReview({setIsModalOpened} : ProductReviewProps) : JSX.Element {
  const reviews = useAppSelector(getReviews);

  const [reviewsCount, setReviewsCount] = useState(REVIEWS_BLOCK);

  const handleMoreButtonClick = () => {
    setReviewsCount(reviewsCount + REVIEWS_BLOCK);
  };

  return (
    <div className="page-content__section fade-in">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button"
              onClick={() => setIsModalOpened(true)}
              data-testid='open-modal-button'
            >
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list" data-testid='review-block'>
            {
              reviews.map((review) => <UserReview key={review.id} reviewData={review}/>).slice(0, reviewsCount)
            }
          </ul>
          {
            reviewsCount < reviews.length && (
              <div className="review-block__buttons">
                <button
                  className="btn btn--purple"
                  type="button"
                  onClick={handleMoreButtonClick}
                  data-testid='show-more-button'
                >
                  Показать больше отзывов
                </button>
              </div>
            )
          }
        </div>
      </section>
    </div>
  );
}

export default ProductReview;

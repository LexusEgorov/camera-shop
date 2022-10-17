import { useState } from 'react';
import { Cameras } from '../../types/types';
import ProductCard from '../product-card/product-card';
import './style.css';

const SLIDER_START = 0;
const SLIDER_END = 2;

type ProductSimilarProps = {
  productsSimilar: Cameras,
}

function ProductSimilar({productsSimilar} : ProductSimilarProps) : JSX.Element {
  const [leftProductIndex, setLeftProductIndex] = useState(SLIDER_START);
  const [rightProductIndex, setRightProductIndex] = useState(SLIDER_END);

  const handlePrevElementClick = () => {
    // eslint-disable-next-line no-console
    console.log('тыцк-');
    if(rightProductIndex - 1 >= SLIDER_END){
      setRightProductIndex(rightProductIndex - 1);
      setLeftProductIndex(leftProductIndex - 1);
    }
  };

  const handleNextElementClick = () => {
    // eslint-disable-next-line no-console
    console.log('тыцк+');
    if(rightProductIndex + 1 <= productsSimilar.length - 1){
      setRightProductIndex(rightProductIndex + 1);
      setLeftProductIndex(leftProductIndex + 1);
    }
  };

  return (
    <div className="page-content__section fade-in">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {
                productsSimilar.map((product, index) => (
                  index >= leftProductIndex && index <= rightProductIndex && <ProductCard isActive product={product} key={product.id}/>
                ))
              }
            </div>
            <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд"
              disabled={ productsSimilar.length <= SLIDER_END || leftProductIndex <= SLIDER_START}
              onClick={handlePrevElementClick}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <button
              onClick={handleNextElementClick}
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              disabled={ productsSimilar.length <= SLIDER_END || rightProductIndex >= productsSimilar.length - 1}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>

  );
}

export default ProductSimilar;

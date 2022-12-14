import { useState } from 'react';
import { Camera, Cameras } from '../../types/types';
import ProductCard from '../product-card/product-card';
import './style.css';

const SLIDER_START = 0;
const SLIDER_END = 2;

type ProductSimilarProps = {
  productsSimilar: Cameras,
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCamera: React.Dispatch<React.SetStateAction<Camera>>,
}

function ProductSimilar({productsSimilar, openModal, setCamera} : ProductSimilarProps) : JSX.Element | null {
  const [leftProductIndex, setLeftProductIndex] = useState(SLIDER_START);
  const [rightProductIndex, setRightProductIndex] = useState(SLIDER_END);

  const handlePrevElementClick = () => {

    if(rightProductIndex - 1 >= SLIDER_END){
      setRightProductIndex(rightProductIndex - 1);
      setLeftProductIndex(leftProductIndex - 1);
    }
  };

  const handleNextElementClick = () => {
    if(rightProductIndex + 1 <= productsSimilar.length - 1){
      setRightProductIndex(rightProductIndex + 1);
      setLeftProductIndex(leftProductIndex + 1);
    }
  };

  if(productsSimilar.length === 0){
    return null;
  }

  return (
    <div className="page-content__section fade-in">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {
                productsSimilar.map((product, index) => (
                  index >= leftProductIndex && index <= rightProductIndex && <ProductCard isActive product={product} key={product.id} setCamera={setCamera} openModal={openModal}/>
                ))
              }
            </div>
            <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд"
              disabled={ productsSimilar.length <= SLIDER_END || leftProductIndex <= SLIDER_START}
              onClick={handlePrevElementClick}
              data-testid='prev-button'
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
              data-testid='next-button'
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

import { Navigate } from 'react-router-dom';
import { Cameras } from '../../types/types';
import ProductCard from '../product-card/product-card';

type CatalogListProps = {
  products: Cameras;
  currentPage: number,
  outputCount: number,
}

function CatalogList({products, currentPage, outputCount} : CatalogListProps) : JSX.Element {
  const startIndex = (currentPage - 1) * outputCount;
  const endIndex = startIndex + outputCount;

  if(products.length > 0 && (startIndex >= products.length || startIndex < 0)){
    return <Navigate to='/*' />;
  }

  return (
    <div className="cards catalog__cards fade-in">
      {
        products.slice(startIndex, endIndex).map((product) => <ProductCard product={product} key={product.id}/>)
      }
    </div>
  );
}

export default CatalogList;

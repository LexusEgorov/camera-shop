import { Cameras } from '../../types/types';
import ProductCard from '../product-card/product-card';

type CatalogListProps = {
  products: Cameras;
}

function CatalogList({products} : CatalogListProps) : JSX.Element {
  return (
    <div className="cards catalog__cards">
      {
        products.map((product) => <ProductCard product={product} key={product.id}/>)
      }
    </div>
  );
}

export default CatalogList;

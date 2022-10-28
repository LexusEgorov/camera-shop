import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { PAGINATION_OUTPUT_COUNT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCamerasAction } from '../../store/api-actions';
import { getCameras, getCamerasCount } from '../../store/camera-data/selectors';
import ProductCard from '../product-card/product-card';

type CatalogListProps = {
  currentPage: number,
}

function CatalogList({currentPage} : CatalogListProps) : JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction(currentPage));
  }, [currentPage, dispatch]);

  const products = useAppSelector(getCameras);
  const totalCamerasCount = useAppSelector(getCamerasCount);

  const startIndex = (currentPage - 1) * PAGINATION_OUTPUT_COUNT;

  if(products.length > 0 && (startIndex >= totalCamerasCount || startIndex < 0)){
    return <Navigate to='/*' />;
  }

  return (
    <div className="cards catalog__cards fade-in" data-testid='catalog-list'>
      {
        products.map((product) => <ProductCard product={product} key={product.id}/>)
      }
    </div>
  );
}

export default CatalogList;

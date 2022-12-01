import { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { PAGINATION_OUTPUT_COUNT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCamerasAction } from '../../store/api-actions';
import { getSearchParams } from '../../store/app-process/selectors';
import { getCameras, getCamerasCount } from '../../store/camera-data/selectors';
import { setSearchParams as setStoreSearchParams} from '../../store/app-process/app-process';
import ProductCard from '../product-card/product-card';
import EmptyFilter from '../empty-filter/empty-filter';
import { getMinPrice } from '../../store/filter-data/selectors';
import { Camera } from '../../types/types';

type CatalogListProps = {
  currentPage: number,
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCamera: React.Dispatch<React.SetStateAction<Camera>>,
}

function CatalogList({currentPage, openModal, setCamera} : CatalogListProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const storeSearchParams = useAppSelector(getSearchParams);
  const minCurrentPrice = useAppSelector(getMinPrice);

  const [searchParams, setSearchParams] = useSearchParams();

  /*Срабатывает только при изменении в хранилище*/
  useEffect(() => {
    setSearchParams(new URLSearchParams(storeSearchParams));
  }, [storeSearchParams, searchParams, setSearchParams]);

  /*Срабатывает только при изменении URL и абсолютно не должен реагировать на хранилище*/
  useEffect(() => {
    if(searchParams.toString() !== storeSearchParams){
      if(searchParams.toString() !== ''){
        dispatch(setStoreSearchParams(searchParams.toString()));
      } else {
        setSearchParams(new URLSearchParams(storeSearchParams));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if(searchParams.toString() === storeSearchParams || minCurrentPrice < 0){
      dispatch(fetchCamerasAction({page: currentPage, queryParams: searchParams}));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dispatch, searchParams]);

  const products = useAppSelector(getCameras);
  const totalCamerasCount = useAppSelector(getCamerasCount);

  const startIndex = (currentPage - 1) * PAGINATION_OUTPUT_COUNT;

  if(products.length > 0 && (startIndex >= totalCamerasCount || startIndex < 0)){
    return <Navigate to='/*' />;
  }

  if(products.length === 0){
    return <EmptyFilter />;
  }

  return (
    <div className="cards catalog__cards fade-in" data-testid='catalog-list'>
      {
        products.map((product) => <ProductCard product={product} key={product.id} openModal={openModal} setCamera={setCamera} />)
      }
    </div>
  );
}

export default CatalogList;

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogList from '../../components/catalog-list/catalog-list';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Pagination from '../../components/pagination/pagination';
import { PAGINATION_OUTPUT_COUNT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { resetError } from '../../store/app-process/app-process';
import { getIsCamerasLoading, getIsPromoLoading } from '../../store/app-process/selectors';
import { getCameras, getPromo } from '../../store/camera-data/selectors';
import './style.css';

function Catalog() : JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const isPromoLoading = useAppSelector(getIsPromoLoading);
  const isCamerasLoading = useAppSelector(getIsCamerasLoading);

  const products = useAppSelector(getCameras);
  const promo = useAppSelector(getPromo);

  const currentPage = Number(useParams().page);
  const pagesCount = Math.ceil(products.length / PAGINATION_OUTPUT_COUNT);

  return (
    <>
      {
        !isPromoLoading && promo.id && <Banner promo={promo}/>
      }
      <Breadcrumbs />
      <section className="catalog">
        <div className="container">
          <h2 className="title title--h2">Каталог фото- и видеотехники</h2>
          <div className="page-content__columns">
            <CatalogFilter />
            <div className="catalog__content">
              <CatalogSort />
              {
                !isCamerasLoading && products[0] && <CatalogList products={products} currentPage={currentPage} outputCount={PAGINATION_OUTPUT_COUNT}/>
              }
              {
                !isCamerasLoading && products[0] && <Pagination pagesCount={pagesCount} currentPage={currentPage}/>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Catalog;

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogList from '../../components/catalog-list/catalog-list';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import ModalAddToCart from '../../components/modal-add-to-cart/modal-add-to-cart';
import Pagination from '../../components/pagination/pagination';
import { PAGINATION_OUTPUT_COUNT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchMaxCatalogPriceAction, fetchMinCatalogPriceAction, fetchPromoAction } from '../../store/api-actions';
import { resetError } from '../../store/app-process/app-process';
import { getIsCamerasLoading, getIsPromoLoading } from '../../store/app-process/selectors';
import { clearCurrent } from '../../store/camera-data/camera-data';
import { getCamerasCount, getPromo } from '../../store/camera-data/selectors';
import { Camera } from '../../types/types';
import './style.css';

function Catalog() : JSX.Element {
  const dispatch = useAppDispatch();
  const currentPage = Number(useParams().page);
  const promo = useAppSelector(getPromo);

  useEffect(() => {
    dispatch(resetError());
    dispatch(clearCurrent());
    dispatch(fetchPromoAction());
    dispatch(fetchMinCatalogPriceAction());
    dispatch(fetchMaxCatalogPriceAction());
  }, [dispatch]);

  const isPromoLoading = useAppSelector(getIsPromoLoading);
  const isCamerasLoading = useAppSelector(getIsCamerasLoading);

  const [isModalCartOpened, setIsModalCartOpened] = useState(false);
  const [choosenCamera, setChoosenCamera] = useState(undefined as unknown as Camera);

  const productsCount = useAppSelector(getCamerasCount);

  const pagesCount = useMemo(() => Math.ceil(productsCount / PAGINATION_OUTPUT_COUNT), [productsCount]);

  return (
    <>
      {
        !isPromoLoading && promo.id && <Banner promo={promo}/>
      }
      <Breadcrumbs />
      <section className="catalog">
        <div className="container">
          <h2 className="title title--h2">?????????????? ????????- ?? ????????????????????????</h2>
          <div className="page-content__columns">
            <CatalogFilter />
            <div className="catalog__content">
              <CatalogSort />
              <CatalogList currentPage={currentPage} openModal={setIsModalCartOpened} setCamera={setChoosenCamera} />
              {
                !isCamerasLoading && <Pagination pagesCount={pagesCount} currentPage={currentPage}/>
              }
            </div>
          </div>
        </div>
      </section>
      {
        choosenCamera && <ModalAddToCart isOpened={isModalCartOpened} setIsOpened={setIsModalCartOpened} camera={choosenCamera}/>
      }
    </>
  );
}

export default Catalog;

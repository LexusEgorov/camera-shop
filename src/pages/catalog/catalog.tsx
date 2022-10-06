import { useParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogList from '../../components/catalog-list/catalog-list';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Pagination from '../../components/pagination/pagination';
import { PAGINATION_OUTPUT_COUNT } from '../../const';
import { products, promo } from '../../fish/fish';

function Catalog() : JSX.Element {
  const currentPage = Number(useParams().page);
  const pagesCount = Math.ceil(products.length / PAGINATION_OUTPUT_COUNT);

  return (
    <>
      <Banner promo={promo}/>
      <Breadcrumbs />
      <section className="catalog">
        <div className="container">
          <h2 className="title title--h2">Каталог фото- и видеотехники</h2>
          <div className="page-content__columns">
            <CatalogFilter />
            <div className="catalog__content">
              <CatalogSort />
              <CatalogList products={products} currentPage={currentPage} outputCount={PAGINATION_OUTPUT_COUNT}/>
              <Pagination pagesCount={pagesCount} currentPage={currentPage}/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Catalog;

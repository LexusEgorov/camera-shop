import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogList from '../../components/catalog-list/catalog-list';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Pagination from '../../components/pagination/pagination';
import { products, promo } from '../../fish/fish';

function Catalog() : JSX.Element {
  return (
    <>
      <Banner promo={promo}/>
      <Breadcrumbs />
      <section className="catalog">
        <div className="container">
          <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
          <div className="page-content__columns">
            <CatalogFilter />
            <div className="catalog__content">
              <CatalogSort />
              <CatalogList products={products}/>
              <Pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Catalog;

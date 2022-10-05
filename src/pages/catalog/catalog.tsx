import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import { promo } from '../../fish/fish';

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
              <div className="cards catalog__cards">
                <ProductCard />
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Catalog;

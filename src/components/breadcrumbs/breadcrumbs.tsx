import { Link } from 'react-router-dom';

type BreadcrumbsProps = {
  productName?: string,
}

function Breadcrumbs({productName} : BreadcrumbsProps) : JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to="/catalog/1">
              Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            {
              productName ?
                <Link className="breadcrumbs__link" to="/catalog/1">
                  Каталог
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </Link> :
                <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
            }
          </li>
          {
            productName &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link--active">{productName}</span>
            </li>
          }
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;

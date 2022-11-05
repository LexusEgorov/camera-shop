import { Link } from 'react-router-dom';
import HeaderSearchForm from '../header-search-form/header-search-form';

function Header() : JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to="/catalog/1" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to="/catalog/1">Каталог</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="/garanties">Гарантии</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="/delivery">Доставка</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="/about">О компании</Link>
            </li>
          </ul>
        </nav>
        <HeaderSearchForm />
        <Link className="header__basket-link" to="/cart">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}

export default Header;

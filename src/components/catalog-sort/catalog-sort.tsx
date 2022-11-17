import { useSearchParams } from 'react-router-dom';
import { QueryParameter, SortBy, SortType } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { setSearchParams as setStoreSearchParams} from '../../store/app-process/app-process';
import './style.css';

function CatalogSort() : JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get(QueryParameter.Sort) || SortBy.NotSorted;
  const sortType = searchParams.get(QueryParameter.Order) || SortType.NotSorted;

  const handlePriceCheck = () => {
    searchParams.set(QueryParameter.Sort, SortBy.Price);

    if(!searchParams.has(QueryParameter.Order)){
      searchParams.append(QueryParameter.Order, SortType.Asc);
    }

    dispatch(setStoreSearchParams(searchParams.toString()));
  };

  const handleRateCheck = () => {
    searchParams.set(QueryParameter.Sort, SortBy.Rating);

    if(!searchParams.has(QueryParameter.Order)){
      searchParams.append(QueryParameter.Order, SortType.Asc);
    }

    dispatch(setStoreSearchParams(searchParams.toString()));
  };

  const handleAscCheck = () => {
    if(!searchParams.has(QueryParameter.Sort)){
      searchParams.append(QueryParameter.Sort, SortBy.Price);
    }

    searchParams.set(QueryParameter.Order, SortType.Asc);
    dispatch(setStoreSearchParams(searchParams.toString()));
  };

  const handleDescCheck = () => {
    if(!searchParams.has(QueryParameter.Sort)){
      searchParams.append(QueryParameter.Sort, SortBy.Price);
    }

    searchParams.set(QueryParameter.Order, SortType.Desc);
    dispatch(setStoreSearchParams(searchParams.toString()));
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={sortBy === SortBy.Price}
                onChange={handlePriceCheck}
                data-testid='sort-type-price'
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={sortBy === SortBy.Rating}
                onChange={handleRateCheck}
                data-testid='sort-type-rating'
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={sortType === SortType.Asc}
                onChange={handleAscCheck}
                data-testid='sort-order-asc'
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={sortType === SortType.Desc}
                onChange={handleDescCheck}
                data-testid='sort-order-desc'
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;

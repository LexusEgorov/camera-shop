import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryParameter, SortBy, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setSearchParams as setStoreSearchParams} from '../../store/app-process/app-process';
import { getSearchParams } from '../../store/app-process/selectors';
import './style.css';

function CatalogSort() : JSX.Element {
  const dispatch = useAppDispatch();

  const storeSearchParams = useAppSelector(getSearchParams);
  const convertedStoreSearchParams = useMemo(() => new URLSearchParams(storeSearchParams), [storeSearchParams]);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get(QueryParameter.Sort) || SortBy.NotSorted;
  const sortType = searchParams.get(QueryParameter.Order) || SortType.Asc;

  useEffect(() => {
    if(searchParams.has(QueryParameter.Sort) || searchParams.has(QueryParameter.Order)){
      dispatch(setStoreSearchParams(searchParams.toString()));
    } else {
      setSearchParams(convertedStoreSearchParams);
    }
  }, [convertedStoreSearchParams, dispatch, searchParams, setSearchParams]);

  const handlePriceCheck = () => {
    searchParams.set(QueryParameter.Sort, SortBy.Price);
    if(!searchParams.has(QueryParameter.Order)){
      searchParams.append(QueryParameter.Order, sortType);
    }
    setSearchParams(searchParams);
  };

  const handleRateCheck = () => {
    searchParams.set(QueryParameter.Sort, SortBy.Rating);
    if(!searchParams.has(QueryParameter.Order)){
      searchParams.append(QueryParameter.Order, sortType);
    }
    setSearchParams(searchParams);
  };

  const handleAscCheck = () => {
    searchParams.set(QueryParameter.Order, SortType.Asc);
    setSearchParams(searchParams);
  };

  const handleDescCheck = () => {
    searchParams.set(QueryParameter.Order, SortType.Desc);
    setSearchParams(searchParams);
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPrice" name="sort" checked={sortBy === SortBy.Price} onChange={handlePriceCheck}/>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" name="sort" checked={sortBy === SortBy.Rating} onChange={handleRateCheck}/>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" checked={sortType === SortType.Asc} onChange={handleAscCheck}/>
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={sortType === SortType.Desc} onChange={handleDescCheck}/>
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

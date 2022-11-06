import { useParams, useSearchParams } from 'react-router-dom';
import { SortBy, SortType } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchCamerasAction } from '../../store/api-actions';
import './style.css';

function CatalogSort() : JSX.Element {
  const dispatch = useAppDispatch();
  const currentPage = Number(useParams().page);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || SortBy.NotSorted;
  const sortType = searchParams.get('sortType') || SortType.Asc;

  const handlePriceCheck = () => {
    dispatch(fetchCamerasAction({
      page: currentPage,
      sortBy: SortBy.Price,
      sortType: sortType
    }));
    setSearchParams({
      sortBy: SortBy.Price,
      sortType: sortType
    });
  };

  const handleRateCheck = () => {
    dispatch(fetchCamerasAction({
      page: currentPage,
      sortBy: SortBy.Rating,
      sortType: sortType
    }));
    setSearchParams({
      sortBy: SortBy.Rating,
      sortType: sortType
    });
  };

  const handleAscCheck = () => {
    dispatch(fetchCamerasAction({
      page: currentPage,
      sortBy: sortBy,
      sortType: SortType.Asc,
    }));
    setSearchParams({
      sortBy: sortBy,
      sortType: SortType.Asc
    });
  };

  const handleDescCheck = () => {
    dispatch(fetchCamerasAction({
      page: currentPage,
      sortBy: sortBy,
      sortType: SortType.Desc,
    }));
    setSearchParams({
      sortBy: sortBy,
      sortType: SortType.Desc
    });
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

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FilterType, FilterValue, QueryParameter } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchMaxCatalogPriceAction, fetchMaxPriceAction, fetchMinCatalogPriceAction, fetchMinPriceAction } from '../../store/api-actions';
import { setSearchParams as setStoreSearchParams} from '../../store/app-process/app-process';
import { getMaxCatalogPrice, getMaxPrice, getMinCatalogPrice, getMinPrice } from '../../store/filter-data/selectors';
import { updateParameter } from '../../utils';

function CatalogFilter() : JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const minCatalogPrice = useAppSelector(getMinCatalogPrice);
  const maxCatalogPrice = useAppSelector(getMaxCatalogPrice);

  const minCurrentPrice = useAppSelector(getMinPrice);
  const maxCurrentPrice = useAppSelector(getMaxPrice);

  const priceMinQuery = searchParams.get(QueryParameter.PriceMin) || '';
  const priceMaxQuery = searchParams.get(QueryParameter.PriceMax) || '';

  const [minPrice, setMinPrice] = useState(priceMinQuery);
  const [maxPrice, setMaxPrice] = useState(priceMaxQuery);

  const isQuery = (params : URLSearchParams, key: string, value: string) : boolean => params.getAll(key).findIndex((paramValue) => paramValue === value) !== -1;

  const isPhoto = isQuery(searchParams, QueryParameter.Category, FilterValue.Photo);
  const isVideo = isQuery(searchParams, QueryParameter.Category, FilterValue.Video);

  const isDigital = isQuery(searchParams, QueryParameter.Type, FilterValue.Digital);
  const isFilm = isQuery(searchParams, QueryParameter.Type, FilterValue.Film);
  const isSnapshot = isQuery(searchParams, QueryParameter.Type, FilterValue.Snapshot);
  const isCollection = isQuery(searchParams, QueryParameter.Type, FilterValue.Collection);

  const isZero = isQuery(searchParams, QueryParameter.Level, FilterValue.Zero);
  const isNonProfessional = isQuery(searchParams, QueryParameter.Level, FilterValue.NonProfessional);
  const isProfessional = isQuery(searchParams, QueryParameter.Level, FilterValue.Professional);

  useEffect(() => {
    dispatch(fetchMinCatalogPriceAction());
    dispatch(fetchMaxCatalogPriceAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMinPriceAction({queryParams: searchParams}));
    dispatch(fetchMaxPriceAction({queryParams: searchParams}));
  }, [dispatch, searchParams]);

  /*Должен срабатывать только при изменении минимальной стоимости в каталоге*/
  useEffect(() => {
    if(minPrice){
      setMinPrice(minCurrentPrice.toString());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minCurrentPrice]);

  /*Должен срабатывать только при изменении максимальной стоимости в каталоге*/
  useEffect(() => {
    if(maxPrice){
      setMaxPrice(maxCurrentPrice.toString());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxCurrentPrice]);

  const handleFilterChange = () => navigate('/catalog/1');

  const handleMinPriceInput = (evt: React.FormEvent<HTMLInputElement>) => setMinPrice(evt.currentTarget.value);

  const handleMaxPriceInput = (evt: React.FormEvent<HTMLInputElement>) => setMaxPrice(evt.currentTarget.value);

  const handleMinPriceBlur = () => {
    const value = Number(minPrice);

    if(value < 0){
      searchParams.delete(QueryParameter.PriceMin);
      dispatch(setStoreSearchParams(searchParams.toString()));
      return setMinPrice('');
    }

    if(value < minCatalogPrice){
      searchParams.set(QueryParameter.PriceMin, minCatalogPrice.toString());
      dispatch(setStoreSearchParams(searchParams.toString()));
      return setMinPrice(minCatalogPrice.toString());
    }

    searchParams.set(QueryParameter.PriceMin, minPrice);
    dispatch(setStoreSearchParams(searchParams.toString()));
  };

  const handleMaxPriceBlur = () => {
    const value = Number(maxPrice);

    if(value < 0){
      searchParams.delete(QueryParameter.PriceMax);
      dispatch(setStoreSearchParams(searchParams.toString()));
      return setMaxPrice('');
    }

    if(value > maxCatalogPrice){
      searchParams.set(QueryParameter.PriceMax, maxCatalogPrice.toString());
      dispatch(setStoreSearchParams(searchParams.toString()));
      return setMaxPrice(maxCatalogPrice.toString());
    }

    if(value < Number(minPrice)){
      searchParams.set(QueryParameter.PriceMax, minPrice);
      dispatch(setStoreSearchParams(searchParams.toString()));
      return setMaxPrice(minPrice);
    }

    searchParams.set(QueryParameter.PriceMax, maxPrice);
    dispatch(setStoreSearchParams(searchParams.toString()));
  };

  const handleCheckboxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange();
    switch (evt.target.name) {
      case FilterType.Photo : {
        const updatedParams = updateParameter(isPhoto, searchParams, QueryParameter.Category, FilterValue.Photo);
        return dispatch(setStoreSearchParams(updatedParams.toString()));
      }
      case FilterType.Video : {
        const updatedParams = updateParameter(isVideo, searchParams, QueryParameter.Category, FilterValue.Video);
        return dispatch(setStoreSearchParams(updatedParams.toString()));
      }
      case FilterType.Digital : {
        const updatedParams = updateParameter(isDigital, searchParams, QueryParameter.Type, FilterValue.Digital);
        return dispatch(setStoreSearchParams(updatedParams.toString()));
      }
      case FilterType.Film : {
        const updatedParams = updateParameter(isFilm, searchParams, QueryParameter.Type, FilterValue.Film);
        return dispatch(setStoreSearchParams(updatedParams.toString()));
      }
      case FilterType.Snapshot : {
        const updatedParams = updateParameter(isSnapshot, searchParams, QueryParameter.Type, FilterValue.Snapshot);
        return dispatch(setStoreSearchParams(updatedParams.toString()));
      }
      case FilterType.Collection : {
        const updatedParams = updateParameter(isCollection, searchParams, QueryParameter.Type, FilterValue.Collection);
        return dispatch(setStoreSearchParams(updatedParams.toString()));
      }
      case FilterType.Zero : {
        const updatedParams = updateParameter(isZero, searchParams, QueryParameter.Level, FilterValue.Zero);
        return dispatch(setStoreSearchParams(updatedParams.toString()));
      }
      case FilterType.NonProfessional : {
        const updatedParams = updateParameter(isNonProfessional, searchParams, QueryParameter.Level, FilterValue.NonProfessional);
        return dispatch(setStoreSearchParams(updatedParams.toString()));
      }
      case FilterType.Professional : {
        const updatedParams = updateParameter(isProfessional, searchParams, QueryParameter.Level, FilterValue.Professional);
        return dispatch(setStoreSearchParams(updatedParams.toString()));
      }
    }
  };

  const handleResetFilters = () => {
    const sortBy = searchParams.get(QueryParameter.Sort);
    const sortType = searchParams.get(QueryParameter.Order);

    const updatedSearchParams = new URLSearchParams();

    if(sortBy){
      updatedSearchParams.set(QueryParameter.Sort, sortBy);
    }

    if(sortType){
      updatedSearchParams.set(QueryParameter.Order, sortType);
    }

    setMinPrice('');
    setMaxPrice('');
    dispatch(setStoreSearchParams(updatedSearchParams.toString()));
  };

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#" >
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="price"
                    placeholder={minCatalogPrice.toString()}
                    value={minPrice}
                    onInput={handleMinPriceInput}
                    onBlur={handleMinPriceBlur}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    placeholder={maxCatalogPrice.toString()}
                    value={maxPrice}
                    onInput={handleMaxPriceInput}
                    onBlur={handleMaxPriceBlur}
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="photocamera"
                  checked={isPhoto}
                  onChange={handleCheckboxChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="videocamera"
                  checked={isVideo}
                  onChange={handleCheckboxChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="digital"
                  checked={isDigital}
                  onChange={handleCheckboxChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="film"
                  disabled={isVideo && !isPhoto}
                  checked={isFilm}
                  onChange={handleCheckboxChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="snapshot"
                  disabled={isVideo && !isPhoto}
                  checked={isSnapshot}
                  onChange={handleCheckboxChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="collection"
                  checked={isCollection}
                  onChange={handleCheckboxChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="zero"
                  checked={isZero}
                  onChange={handleCheckboxChange}
                />
                <span className="custom-checkbox__icon" /><span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="non-professional"
                  checked={isNonProfessional}
                  onChange={handleCheckboxChange}
                />
                <span className="custom-checkbox__icon" /><span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="professional"
                  checked={isProfessional}
                  onChange={handleCheckboxChange}
                />
                <span className="custom-checkbox__icon" /><span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={handleResetFilters}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatalogFilter;

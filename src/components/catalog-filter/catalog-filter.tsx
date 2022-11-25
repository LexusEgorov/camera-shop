import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FilterType, FilterValue, QueryParameter } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchMaxPriceAction, fetchMinPriceAction } from '../../store/api-actions';
import { setSearchParams as setStoreSearchParams} from '../../store/app-process/app-process';
import { getCamerasCount } from '../../store/camera-data/selectors';
import { getMaxCatalogPrice, getMaxPrice, getMinCatalogPrice, getMinPrice } from '../../store/filter-data/selectors';
import { updateParameter } from '../../utils';

function CatalogFilter() : JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const totalCount = useAppSelector(getCamerasCount);
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

  /*Должен срабатывать только при изменении минимальной стоимости из данных сервера*/
  useEffect(() => {
    if(minPrice && totalCount !== 0){
      setMinPrice(minCurrentPrice.toString());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minCurrentPrice]);

  /*Должен срабатывать только при изменении максимальной стоимости из данных сервера*/
  useEffect(() => {
    if(maxPrice && totalCount !== 0){
      setMaxPrice(maxCurrentPrice.toString());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxCurrentPrice]);

  const handleFilterChange = () => {
    navigate('/catalog/1');
    dispatch(fetchMinPriceAction({queryParams: searchParams}));
    dispatch(fetchMaxPriceAction({queryParams: searchParams}));
  };

  const handleMinPriceInput = (evt: React.FormEvent<HTMLInputElement>) => setMinPrice(evt.currentTarget.value);

  const handleMaxPriceInput = (evt: React.FormEvent<HTMLInputElement>) => setMaxPrice(evt.currentTarget.value);

  const handleMinPriceBlur = () => {
    const value = Number(minPrice);

    if(value < 0 || minPrice === ''){
      searchParams.delete(QueryParameter.PriceMin);
      dispatch(setStoreSearchParams(searchParams.toString()));
      handleFilterChange();
      return setMinPrice('');
    }

    if(value < minCatalogPrice){
      searchParams.set(QueryParameter.PriceMin, minCatalogPrice.toString());
      dispatch(setStoreSearchParams(searchParams.toString()));
      handleFilterChange();
      return setMinPrice(minCatalogPrice.toString());
    }

    if(value > maxCatalogPrice){
      searchParams.set(QueryParameter.PriceMin, maxCatalogPrice.toString());
      if(maxPrice && value > Number(maxPrice)){
        searchParams.set(QueryParameter.PriceMax, maxCatalogPrice.toString());
        setMaxPrice(maxCatalogPrice.toString());
      }
      dispatch(setStoreSearchParams(searchParams.toString()));
      handleFilterChange();
      return setMinPrice(maxCatalogPrice.toString());
    }

    if(maxPrice && value > Number(maxPrice)){
      searchParams.set(QueryParameter.PriceMin, value.toString());
      searchParams.set(QueryParameter.PriceMax, value.toString());
      dispatch(setStoreSearchParams(searchParams.toString()));
      handleFilterChange();
      return setMaxPrice(value.toString());
    }

    searchParams.set(QueryParameter.PriceMin, minPrice);
    dispatch(setStoreSearchParams(searchParams.toString()));
    handleFilterChange();
  };

  const handleMaxPriceBlur = () => {
    const value = Number(maxPrice);

    if(value < 0 || maxPrice === ''){
      searchParams.delete(QueryParameter.PriceMax);
      dispatch(setStoreSearchParams(searchParams.toString()));
      handleFilterChange();
      return setMaxPrice('');
    }

    if(value < Number(minPrice)){
      searchParams.set(QueryParameter.PriceMax, minPrice);
      dispatch(setStoreSearchParams(searchParams.toString()));
      handleFilterChange();
      return setMaxPrice(minPrice);
    }

    if(value < minCatalogPrice){
      searchParams.set(QueryParameter.PriceMax, minCatalogPrice.toString());
      dispatch(setStoreSearchParams(searchParams.toString()));
      handleFilterChange();
      return setMaxPrice(minCatalogPrice.toString());
    }

    if(value > maxCatalogPrice){
      searchParams.set(QueryParameter.PriceMax, maxCatalogPrice.toString());
      dispatch(setStoreSearchParams(searchParams.toString()));
      handleFilterChange();
      return setMaxPrice(maxCatalogPrice.toString());
    }

    searchParams.set(QueryParameter.PriceMax, maxPrice);
    dispatch(setStoreSearchParams(searchParams.toString()));
    handleFilterChange();
  };

  const handleCheckboxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let updatedParams = new URLSearchParams();
    switch (evt.target.name) {
      case FilterType.Photo : {
        updatedParams = updateParameter(isPhoto, searchParams, QueryParameter.Category, FilterValue.Photo);
        break;
      }
      case FilterType.Video : {
        updatedParams = updateParameter(isVideo, searchParams, QueryParameter.Category, FilterValue.Video);
        break;
      }
      case FilterType.Digital : {
        updatedParams = updateParameter(isDigital, searchParams, QueryParameter.Type, FilterValue.Digital);
        break;
      }
      case FilterType.Film : {
        updatedParams = updateParameter(isFilm, searchParams, QueryParameter.Type, FilterValue.Film);
        break;
      }
      case FilterType.Snapshot : {
        updatedParams = updateParameter(isSnapshot, searchParams, QueryParameter.Type, FilterValue.Snapshot);
        break;
      }
      case FilterType.Collection : {
        updatedParams = updateParameter(isCollection, searchParams, QueryParameter.Type, FilterValue.Collection);
        break;
      }
      case FilterType.Zero : {
        updatedParams = updateParameter(isZero, searchParams, QueryParameter.Level, FilterValue.Zero);
        break;
      }
      case FilterType.NonProfessional : {
        updatedParams = updateParameter(isNonProfessional, searchParams, QueryParameter.Level, FilterValue.NonProfessional);
        break;
      }
      case FilterType.Professional : {
        updatedParams = updateParameter(isProfessional, searchParams, QueryParameter.Level, FilterValue.Professional);
        break;
      }
    }
    handleFilterChange();
    dispatch(setStoreSearchParams(updatedParams.toString()));
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
                    placeholder={minCurrentPrice < 0 ? minCatalogPrice.toString() : minCurrentPrice.toString()}
                    value={minPrice}
                    onInput={handleMinPriceInput}
                    onBlur={handleMinPriceBlur}
                    data-testid='filter-min-price'
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    placeholder={maxCurrentPrice < 0 ? maxCatalogPrice.toString() : maxCurrentPrice.toString()}
                    value={maxPrice}
                    onInput={handleMaxPriceInput}
                    onBlur={handleMaxPriceBlur}
                    data-testid='filter-max-price'
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
                  data-testid='filter-photo'
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
                  data-testid='filter-video'
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
                  data-testid='filter-digital'
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
                  data-testid='filter-film'
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
                  data-testid='filter-snapshot'
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
                  data-testid='filter-collection'
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
                  data-testid='filter-zero'
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
                  data-testid='filter-non-professional'
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
                  data-testid='filter-professional'
                />
                <span className="custom-checkbox__icon" /><span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={handleResetFilters}
            data-testid='filter-reset'
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatalogFilter;

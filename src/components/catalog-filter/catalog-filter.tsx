import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterType, FilterValue, QueryParameter } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchMaxPriceAction, fetchMinPriceAction } from '../../store/api-actions';
import { setSearchParams as setStoreSearchParams} from '../../store/app-process/app-process';
import { getSearchParams } from '../../store/app-process/selectors';
import { getMaxPrice, getMinPrice } from '../../store/filter-data/selectors';

function CatalogFilter() : JSX.Element {
  const dispatch = useAppDispatch();
  const minCatalogPrice = useAppSelector(getMinPrice);
  const maxCatalogPrice = useAppSelector(getMaxPrice);

  const storeSearchParams = useAppSelector(getSearchParams);
  const convertedStoreSearchParams = useMemo(() => new URLSearchParams(storeSearchParams), [storeSearchParams]);

  useEffect(() => {
    dispatch(fetchMinPriceAction({queryParams: convertedStoreSearchParams}));
    dispatch(fetchMaxPriceAction({queryParams: convertedStoreSearchParams}));
  }, [convertedStoreSearchParams, dispatch]);

  const [searchParams, setSearchParams] = useSearchParams();

  const priceMinQuery = searchParams.get(QueryParameter.PriceMin) || '';
  const priceMaxQuery = searchParams.get(QueryParameter.PriceMax) || '';

  const isQuery = (params : URLSearchParams, key: string, value: string) : boolean => params.getAll(key).findIndex((paramValue) => paramValue === value) !== -1;

  const isPhotoQuery = isQuery(searchParams, QueryParameter.Category, FilterValue.Photo);
  const isVideoQuery = isQuery(searchParams, QueryParameter.Category, FilterValue.Video);

  const isDigitalQuery = isQuery(searchParams, QueryParameter.Type, FilterValue.Digital);
  const isFilmQuery = isQuery(searchParams, QueryParameter.Type, FilterValue.Film);
  const isSnapshotQuery = isQuery(searchParams, QueryParameter.Type, FilterValue.Snapshot);
  const isCollectionQuery = isQuery(searchParams, QueryParameter.Type, FilterValue.Collection);

  const isZeroQuery = isQuery(searchParams, QueryParameter.Level, FilterValue.Zero);
  const isNonProfessionalQuery = isQuery(searchParams, QueryParameter.Level, FilterValue.NonProfessional);
  const isProfessionalQuery = isQuery(searchParams, QueryParameter.Level, FilterValue.Professional);

  /*Должен срабатывать только при изменении минимальной и максимальной стоимости в каталоге*/
  useEffect(() => {
    if(minPrice){
      searchParams.set(QueryParameter.PriceMin, minCatalogPrice.toString());
      setMinPrice(minCatalogPrice.toString());
      setSearchParams(searchParams);
    }

    if(maxPrice){
      searchParams.set(QueryParameter.PriceMax, maxCatalogPrice.toString());
      setMaxPrice(maxCatalogPrice.toString());
      setSearchParams(searchParams);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minCatalogPrice, maxCatalogPrice]);

  const [minPrice, setMinPrice] = useState(priceMinQuery);
  const [maxPrice, setMaxPrice] = useState(priceMaxQuery);

  const [isPhoto, setIsPhoto] = useState(isPhotoQuery);
  const [isVideo, setIsVideo] = useState(isVideoQuery);

  const [isDigital, setIsDigital] = useState(isDigitalQuery);
  const [isFilm, setIsFilm] = useState(isFilmQuery);
  const [isSnapshot, setIsSnapshot] = useState(isSnapshotQuery);
  const [isCollection, setIsCollection] = useState(isCollectionQuery);

  const [isZero, setIsZero] = useState(isZeroQuery);
  const [isNonProfessional, setIsNonProfessional] = useState(isNonProfessionalQuery);
  const [isProfessional, setIsProfessional] = useState(isProfessionalQuery);

  const handleMinPriceInput = (evt: React.FormEvent<HTMLInputElement>) => setMinPrice(evt.currentTarget.value);

  const handleMaxPriceInput = (evt: React.FormEvent<HTMLInputElement>) => setMaxPrice(evt.currentTarget.value);

  const handleMinPriceBlur = () => {
    const value = Number(minPrice);

    if(!value){
      searchParams.delete(QueryParameter.PriceMin);
      setSearchParams(searchParams);
      dispatch(setStoreSearchParams(searchParams.toString()));
      return setMinPrice('');
    }

    if(value < minCatalogPrice){
      searchParams.set(QueryParameter.PriceMin, minCatalogPrice.toString());
      setSearchParams(searchParams);
      return setMinPrice(minCatalogPrice.toString());
    }
    if(value > maxCatalogPrice){
      searchParams.set(QueryParameter.PriceMax, value.toString());
      setSearchParams(searchParams);
      return setMaxPrice(value.toString());
    }

    searchParams.set(QueryParameter.PriceMin, value.toString());
    setSearchParams(searchParams);
  };

  const handleMaxPriceBlur = () => {
    const valueMax = Number(maxPrice);
    const valueMin = Number(minPrice) > 0 ? Number(minPrice) : minCatalogPrice;

    if(!valueMax){
      searchParams.delete(QueryParameter.PriceMax);
      setSearchParams(searchParams);
      dispatch(setStoreSearchParams(searchParams.toString()));
      return setMaxPrice('');
    }

    if(valueMax < valueMin){
      searchParams.set(QueryParameter.PriceMax, valueMin.toString());
      setSearchParams(searchParams);
      return setMaxPrice(valueMin.toString());
    }
    if(valueMax > maxCatalogPrice){
      searchParams.set(QueryParameter.PriceMax, maxCatalogPrice.toString());
      setSearchParams(searchParams);
      return setMaxPrice(maxCatalogPrice.toString());
    }

    searchParams.set(QueryParameter.PriceMax, valueMax.toString());
    setSearchParams(searchParams);
  };

  const deleteParameter = (params: URLSearchParams, queryParameter: string, value: string) : URLSearchParams => {
    if(params.getAll(queryParameter).length === 1){
      params.delete(queryParameter);
      return params;
    }

    let deleteIndex = 0;
    const convertedParams = [...params];
    for(const parameter of convertedParams){
      if(parameter[0] === queryParameter && parameter[1] === value){
        break;
      }

      deleteIndex++;
    }

    return new URLSearchParams(convertedParams.slice(0, deleteIndex).concat(convertedParams.slice(deleteIndex + 1)));
  };

  const updateParameter = (currentState: boolean, params: URLSearchParams, queryParameter: string, value: string) : URLSearchParams => {
    if(!currentState){
      if(params.has(queryParameter)){
        params.append(queryParameter, value);
        return params;
      }

      params.set(queryParameter, value);
      return params;
    }

    return deleteParameter(params, queryParameter, value);
  };

  const handleCheckboxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    switch (evt.target.name) {
      case FilterType.Photo : {
        const updatedParams = updateParameter(isPhoto, searchParams, QueryParameter.Category, FilterValue.Photo);
        setSearchParams(updatedParams);
        dispatch(setStoreSearchParams(updatedParams.toString()));
        return setIsPhoto(!isPhoto);
      }
      case FilterType.Video : {
        const updatedParams = updateParameter(isVideo, searchParams, QueryParameter.Category, FilterValue.Video);
        setSearchParams(updatedParams);
        dispatch(setStoreSearchParams(updatedParams.toString()));
        return setIsVideo(!isVideo);
      }
      case FilterType.Digital : {
        const updatedParams = updateParameter(isDigital, searchParams, QueryParameter.Type, FilterValue.Digital);
        setSearchParams(updatedParams);
        dispatch(setStoreSearchParams(updatedParams.toString()));
        return setIsDigital(!isDigital);
      }
      case FilterType.Film : {
        const updatedParams = updateParameter(isFilm, searchParams, QueryParameter.Type, FilterValue.Film);
        setSearchParams(updatedParams);
        dispatch(setStoreSearchParams(updatedParams.toString()));
        return setIsFilm(!isFilm);
      }
      case FilterType.Snapshot : {
        const updatedParams = updateParameter(isSnapshot, searchParams, QueryParameter.Type, FilterValue.Snapshot);
        setSearchParams(updatedParams);
        dispatch(setStoreSearchParams(updatedParams.toString()));
        return setIsSnapshot(!isSnapshot);
      }
      case FilterType.Collection : {
        const updatedParams = updateParameter(isCollection, searchParams, QueryParameter.Type, FilterValue.Collection);
        setSearchParams(updatedParams);
        dispatch(setStoreSearchParams(updatedParams.toString()));
        return setIsCollection(!isCollection);
      }
      case FilterType.Zero : {
        const updatedParams = updateParameter(isZero, searchParams, QueryParameter.Level, FilterValue.Zero);
        setSearchParams(updatedParams);
        dispatch(setStoreSearchParams(updatedParams.toString()));
        return setIsZero(!isZero);
      }
      case FilterType.NonProfessional : {
        const updatedParams = updateParameter(isNonProfessional, searchParams, QueryParameter.Level, FilterValue.NonProfessional);
        setSearchParams(updatedParams);
        dispatch(setStoreSearchParams(updatedParams.toString()));
        return setIsNonProfessional(!isNonProfessional);
      }
      case FilterType.Professional : {
        const updatedParams = updateParameter(isProfessional, searchParams, QueryParameter.Level, FilterValue.Professional);
        setSearchParams(updatedParams);
        dispatch(setStoreSearchParams(updatedParams.toString()));
        return setIsProfessional(!isProfessional);
      }
    }
  };

  const handleReset = () => {
    setIsPhoto(false);
    setIsVideo(false);
    setIsDigital(false);
    setIsFilm(false);
    setIsSnapshot(false);
    setIsCollection(false);
    setIsZero(false);
    setIsNonProfessional(false);
    setIsProfessional(false);
  };

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
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
            onClick={handleReset}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatalogFilter;

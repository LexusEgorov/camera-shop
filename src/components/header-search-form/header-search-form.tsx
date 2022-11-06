import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { findLikeCamerasAction } from '../../store/api-actions';
import { clearSearched } from '../../store/camera-data/camera-data';
import { getSearchedCameras } from '../../store/camera-data/selectors';
import HeaderSearchList from '../header-search-list/header-search-list';

function HeaderSearchForm() : JSX.Element {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');

  const searchedCameras = useAppSelector(getSearchedCameras);

  const handleSearchChange = (evt : React.FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setSearchValue(value);

    if(value.length !== 0){
      dispatch(findLikeCamerasAction(value));
    }

    dispatch(clearSearched());
  };

  const handleSearchReset = () => {
    setSearchValue('');
    dispatch(clearSearched());
  };

  return (
    <div className={`form-search ${searchedCameras.length !== 0 && searchValue !== '' ? 'list-opened' : ''}`}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={handleSearchChange}
            value={searchValue}
          />
        </label>
        <HeaderSearchList searchedCameras={searchedCameras} resetSearch={handleSearchReset}/>
      </form>
      <button className="form-search__reset" type="reset"
        onClick={handleSearchReset}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default HeaderSearchForm;

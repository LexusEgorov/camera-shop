import { Link } from 'react-router-dom';
import { Tab } from '../../const';
import { Cameras } from '../../types/types';
import { generator} from '../../utils';
import './style.css';

type HeaderSearchListProps = {
  searchedCameras: Cameras,
  resetSearch: () => void,
}

function HeaderSearchList({searchedCameras, resetSearch} : HeaderSearchListProps) : JSX.Element {
  const tabIndexGenerator = generator();

  return(
    <ul className="form-search__select-list" data-testid='header-search-list'>
      {
        searchedCameras.map(({name, id}) =>
          (
            <li className="form-search__select-item" tabIndex={tabIndexGenerator()} key={id}>
              <Link to={`/product/${id}/${Tab.Description}`}
                onClick={resetSearch}
              >
                {name}
              </Link>
            </li>
          )
        )
      }
    </ul>
  );
}

export default HeaderSearchList;

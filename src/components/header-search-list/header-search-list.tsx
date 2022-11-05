import { Link } from 'react-router-dom';
import { Tab } from '../../const';
import { Cameras } from '../../types/types';
import generator from '../../utils';

type HeaderSearchListProps = {
  searchedCameras: Cameras,
}

function HeaderSearchList({searchedCameras} : HeaderSearchListProps) : JSX.Element {
  const tabIndexGenerator = generator();

  return(
    <ul className="form-search__select-list">
      {
        searchedCameras.map(({name, id}) =>
          (
            <li className="form-search__select-item" tabIndex={tabIndexGenerator()} key={id}>
              <Link to={`/product/${id}/${Tab.Description}`}>
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

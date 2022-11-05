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
        searchedCameras.map((camera) => <li className="form-search__select-item" tabIndex={tabIndexGenerator()} key={camera.id}>{camera.name}</li>)
      }
    </ul>
  );
}

export default HeaderSearchList;

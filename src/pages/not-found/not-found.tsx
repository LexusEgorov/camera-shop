import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFound() : JSX.Element {
  return (
    <div className="not-found">
      <p>404 страница не найдена</p>
      <Link to={AppRoute.Root}>На главную</Link>
    </div>
  );
}

export default NotFound;

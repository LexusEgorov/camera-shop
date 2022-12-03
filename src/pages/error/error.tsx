import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFound() : JSX.Element {
  return (
    <div className="not-found">
      <p>Произошла ошибка</p>
      <Link to={AppRoute.Root}>На главную</Link>
    </div>
  );
}

export default NotFound;

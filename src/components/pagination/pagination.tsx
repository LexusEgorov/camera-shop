import { Link } from 'react-router-dom';

const FIRST_PAGE = 1;

type PaginationProps = {
  pagesCount: number,
  currentPage: number,
};

function Pagination({pagesCount, currentPage} : PaginationProps) : JSX.Element {
  const paginationOutput = [];

  for(let i = FIRST_PAGE; i <= pagesCount; i++){
    paginationOutput.push(
      <li className="pagination__item" key={i}>
        <Link className={`pagination__link ${i === currentPage ? 'pagination__link--active' : ''}`} to={`/catalog/${i}`}>{i}</Link>
      </li>
    );
  }

  if(currentPage > FIRST_PAGE){
    const previewPage = currentPage - 1;
    paginationOutput.unshift(
      <li className="pagination__item" key={0}>
        <Link className="pagination__link pagination__link--text" to={`/catalog/${previewPage}`}>Назад</Link>
      </li>
    );
  }

  if(currentPage < pagesCount){
    const nextPage = currentPage + 1;
    paginationOutput.push(
      <li className="pagination__item" key={++pagesCount}>
        <Link className="pagination__link pagination__link--text" to={`/catalog/${nextPage}`}>Далее</Link>
      </li>
    );
  }

  return (
    <div className="pagination fade-in">
      <ul className="pagination__list">
        {paginationOutput}
      </ul>
    </div>
  );
}

export default Pagination;

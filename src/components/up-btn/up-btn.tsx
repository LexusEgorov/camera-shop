import { MouseEvent } from 'react';

function UpButton() : JSX.Element {
  const goToUp = (evt: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    evt.preventDefault();
    window.scrollTo(0, 0);
  };

  return (
    <a className="up-btn" href="#header"
      onClick={(evt) => goToUp(evt)}
    >
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </a>
  );
}

export default UpButton;

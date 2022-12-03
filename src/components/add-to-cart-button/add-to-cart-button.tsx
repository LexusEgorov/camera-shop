import { Link } from 'react-router-dom';
import { Camera } from '../../types/types';

type AddToCartButtonProps = {
  isAdded: boolean,
  currentCamera: Camera,
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCamera: React.Dispatch<React.SetStateAction<Camera>>,
}

function AddToCartButton({isAdded, currentCamera, openModal, setCamera} : AddToCartButtonProps) : JSX.Element {
  return (
    isAdded ? (
      <Link
        className='btn product-card__btn btn--purple-border'
        type="button"
        to='/cart'
      >
        <svg width={16} height={16} aria-hidden="true">
          <use xlinkHref="#icon-basket"></use>
        </svg>В корзине
      </Link>
    ) : (
      <button
        className='btn product-card__btn btn--purple'
        type="button"
        onClick={() => {
          setCamera(currentCamera);
          openModal(true);
        }}
      >
        Купить
      </button>
    )
  );
}

export default AddToCartButton;

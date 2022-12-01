import { Camera } from '../../types/types';

type AddToCartButtonProps = {
  isAdded: boolean,
  currentCamera: Camera,
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCamera: React.Dispatch<React.SetStateAction<Camera>>,
}

function AddToCartButton({isAdded, currentCamera, openModal, setCamera} : AddToCartButtonProps) : JSX.Element {
  return (
    <button
      className={`btn product-card__btn ${isAdded ? 'btn--purple-border' : 'btn--purple'}`}
      type="button"
      onClick={() => {
        setCamera(currentCamera);
        openModal(true);
      }}
    >
      {
        isAdded ?
          <>
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </> :
          <>Купить</>
      }
    </button>
  );
}

export default AddToCartButton;

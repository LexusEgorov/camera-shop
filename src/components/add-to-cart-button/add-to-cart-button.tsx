type AddToCartButtonProps = {
  isAdded: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
}

function AddToCartButton({isAdded, onClick} : AddToCartButtonProps) : JSX.Element {
  return (
    <button
      className={`btn ${isAdded ? 'btn--purple-border' : 'btn--purple'}`}
      type="button"
      onClick={onClick}
    >
      {
        isAdded ?
          <>
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </> :
          <>
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
            Добавить в корзину
          </>
      }
    </button>
  );
}

export default AddToCartButton;

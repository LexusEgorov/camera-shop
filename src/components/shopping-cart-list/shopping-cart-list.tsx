import { useAppSelector } from '../../hooks/hooks';
import { getCartProducts } from '../../store/shopping-cart-data/selectors';
import { Camera } from '../../types/types';
import ShoppingCartItem from '../shopping-cart-item/shopping-cart-item';

type ShoppingCartListProps = {
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCamera: React.Dispatch<React.SetStateAction<Camera>>,
}

function ShoppingCartList({openModal, setCamera} : ShoppingCartListProps) : JSX.Element {
  const shoppingCartItems = useAppSelector(getCartProducts);

  return (
    <ul className="basket__list">
      {
        shoppingCartItems.length > 0 && shoppingCartItems.map((product) =>
          (
            <ShoppingCartItem
              product={product.camera}
              key={product.camera.id}
              openModal={openModal}
              setCamera={setCamera}
            />
          ))
      }
    </ul>
  );
}

export default ShoppingCartList;

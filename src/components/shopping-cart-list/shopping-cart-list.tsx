import { useAppSelector } from '../../hooks/hooks';
import { getCartProducts } from '../../store/shopping-cart-data/selectors';
import ShoppingCartItem from '../shopping-cart-item/shopping-cart-item';

function ShoppingCartList() : JSX.Element {
  const shoppingCartItems = useAppSelector(getCartProducts);

  return (
    <ul className="basket__list">
      {
        shoppingCartItems.length > 0 && shoppingCartItems.map((product) => <ShoppingCartItem product={product.camera} key={product.camera.id}/>)
      }
    </ul>
  );
}

export default ShoppingCartList;

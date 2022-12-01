import { NameSpace } from '../../const';
import { ShoppingCartItem, State } from '../../types/types';

const NOT_FOUND = -1;

export const getCartProducts = (state: State) : ShoppingCartItem[] => state[NameSpace.ShoppingCartData].products;

export const getCartCountItems = (state: State) : number => {
  const products = state[NameSpace.ShoppingCartData].products;

  return 0;
};

export const getCartHasProduct = (id: number) => (state: State) : boolean => state[NameSpace.ShoppingCartData].products.findIndex((product) => product.id === id) !== NOT_FOUND;

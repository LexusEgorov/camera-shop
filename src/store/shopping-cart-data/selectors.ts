import { NameSpace } from '../../const';
import { ShoppingCartItem, State } from '../../types/types';

const NOT_FOUND = -1;

export const getCartProducts = (state: State) : ShoppingCartItem[] => state[NameSpace.ShoppingCartData].products;

export const getCartProductCount = (id: number) => (state: State) : number => {
  const products = state[NameSpace.ShoppingCartData].products;
  const findIndex = products.findIndex((product) => product.camera.id === id);

  if(findIndex !== NOT_FOUND){
    return products[findIndex].count;
  }

  return 0;
};

export const getCartCountItems = (state: State) : number => {
  const products = state[NameSpace.ShoppingCartData].products;
  let totalCount = 0;

  for(const product of products){
    totalCount += product.count;
  }

  return totalCount;
};

export const getCartTotalPrice = (state: State) : number => {
  const products = state[NameSpace.ShoppingCartData].products;
  let totalPrice = 0;

  for(const product of products){
    totalPrice += product.count * product.camera.price;
  }

  return totalPrice;
};

export const getCartDiscount = (state: State) : number => state[NameSpace.ShoppingCartData].discount;

export const getCartHasProduct = (id: number) => (state: State) : boolean => state[NameSpace.ShoppingCartData].products.findIndex((product) => product.camera.id === id) !== NOT_FOUND;

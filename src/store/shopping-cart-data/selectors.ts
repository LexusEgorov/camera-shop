import { NameSpace } from '../../const';
import { Cameras, State } from '../../types/types';

const NOT_FOUND = -1;

export const getCartProducts = (state: State) : Cameras => state[NameSpace.ShoppingCartData].products;

export const getCartCountItems = (state: State) : number => state[NameSpace.ShoppingCartData].products.length;

export const getCartHasProduct = (id: number) => (state: State) : boolean => state[NameSpace.ShoppingCartData].products.findIndex((product) => product.id === id) !== NOT_FOUND;

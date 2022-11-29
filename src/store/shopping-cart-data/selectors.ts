import { NameSpace } from '../../const';
import { Cameras, State } from '../../types/types';

export const getCartProducts = (state: State) : Cameras => state[NameSpace.ShoppingCartData].products;

export const getCartCountItems = (state: State) : number => state[NameSpace.ShoppingCartData].products.length;

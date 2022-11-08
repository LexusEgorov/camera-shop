import { NameSpace } from '../../const';
import { State } from '../../types/types';

export const getMinPrice = (state: State) : number => state[NameSpace.FilterData].minPrice;

export const getMaxPrice = (state: State) : number => state[NameSpace.FilterData].maxPrice;

import { NameSpace } from '../../const';
import { State } from '../../types/types';

export const getMinPrice = (state: State) : number => state[NameSpace.FilterData].minPrice;

export const getMinCatalogPrice = (state: State) : number => state[NameSpace.FilterData].minCatalogPrice;

export const getMaxPrice = (state: State) : number => state[NameSpace.FilterData].maxPrice;

export const getMaxCatalogPrice = (state: State) : number => state[NameSpace.FilterData].maxCatalogPrice;

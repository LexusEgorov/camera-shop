import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appProcess } from './app-process/app-process';
import { cameraData } from './camera-data/camera-data';
import { filterData } from './filter-data/filter-data';
import { shoppingCartData } from './shopping-cart-data/shopping-cart-data';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.CameraData]: cameraData.reducer,
  [NameSpace.FilterData]: filterData.reducer,
  [NameSpace.ShoppingCartData]: shoppingCartData.reducer,
});

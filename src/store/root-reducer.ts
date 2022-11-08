import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appProcess } from './app-process/app-process';
import { cameraData } from './camera-data/camera-data';
import { filterData } from './filter-data/filter-data';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.CameraData]: cameraData.reducer,
  [NameSpace.FilterData]: filterData.reducer,
});

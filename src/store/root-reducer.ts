import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appProcess } from './app-process/app-process';
import { cameraData } from './camera-data/camera-data';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.CameraData]: cameraData.reducer,
});

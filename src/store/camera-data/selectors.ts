import { NameSpace } from '../../const';
import { Camera, Cameras, Promo, Reviews, State } from '../../types/types';

export const getCameras = (state: State) : Cameras => state[NameSpace.CameraData].cameras;

export const getPromo = (state: State) : Promo => state[NameSpace.CameraData].promo;

export const getCamera = (state: State) : Camera => state[NameSpace.CameraData].currentCamera;

export const getReviews = (state: State) : Reviews => state[NameSpace.CameraData].currentCameraReviews;

export const getSimilar = (state: State) : Cameras => state[NameSpace.CameraData].currentCameraSimilar;

export const getCamerasCount = (state: State) : number => state[NameSpace.CameraData].camerasTotalCount;

export const getSearchedCameras = (state: State) : Cameras => state[NameSpace.CameraData].searchedCameras;

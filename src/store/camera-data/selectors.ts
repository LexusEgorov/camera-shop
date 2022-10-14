import { NameSpace } from '../../const';
import { Camera, Cameras, Promo, Reviews, State } from '../../types/types';

export const getCameras = (state: State) : Cameras => state[NameSpace.CameraData].cameras;

export const getPromo = (state: State) : Promo => state[NameSpace.CameraData].promo;

export const getCamera = (state: State, id: number) : Camera | undefined => state[NameSpace.CameraData].cameras.find((camera) => camera.id === id);

export const getReviews = (state: State) : Reviews => state[NameSpace.CameraData].currentCameraReviews;

export const getSimilar = (state: State) : Cameras => state[NameSpace.CameraData].currentCameraSimilar;
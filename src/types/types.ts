import { rootReducer } from '../store/root-reducer';
import { store } from '../store/store';

/*Структуры данных*/

export type Promo = {
  id: number,
  name: string,
  previewImg: string,
  previewImg2x: string,
  previewImgWebp: string,
  previewImgWebp2x: string,
};

export type Camera = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  category: string,
  description: string,
  level: string,
  rating: number,
  price: number,
  previewImg: string,
  previewImg2x: string,
  previewImgWebp: string,
  previewImgWebp2x: string,
  reviewCount: number,
}

export type Review = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  review: string,
  rating: number,
  createAt: string,
  cameraId: number,
}

export type ReviewPost = {
  cameraId: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  review: string,
  rating: number,
}

export type CamerasRequest = {
  page: number,
  queryParams?: URLSearchParams,
}

export type ParamsRequest = {
  queryParams: URLSearchParams,
}

/*Псевдонимы типов*/

export type Cameras = Camera[];
export type Reviews = Review[];

export type CamerasResponse = {
  data: Cameras,
  totalCount: number,
}

export type IsLoading = boolean;
export type IsServerError = boolean;

/*Типы хранилища*/

export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof store.getState>;
export type Reducer = ReturnType<typeof rootReducer>;

/*Инициализация состояний*/

export type AppProcess = {
  isCamerasLoading: IsLoading,
  isPromoLoading: IsLoading,
  isCameraLoading: IsLoading,
  isSimilarLoading: IsLoading,
  isReviewsLoading: IsLoading,
  isServerError: IsServerError,
  searchParams: string,
}

export type CameraData = {
  cameras: Cameras,
  currentCamera: Camera,
  currentCameraReviews: Reviews,
  currentCameraSimilar: Cameras,
  promo: Promo,
  camerasTotalCount: number,
  searchedCameras: Cameras,
}

export type FilterData = {
  minPrice: number,
  maxPrice: number,
  minCatalogPrice: number,
  maxCatalogPrice: number,
};

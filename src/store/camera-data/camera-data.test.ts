import { FISH_PRODUCTS, FISH_PROMO, FISH_REVIEWS } from '../../fish/fish';
import { Camera, CameraData, Cameras, Promo, Reviews } from '../../types/types';
import { fetchCameraAction, fetchCamerasAction, fetchPromoAction, fetchReviewsAction, fetchSimilarAction, sendReviewAction } from '../api-actions';
import { cameraData, clearCurrent, setCurrent } from './camera-data';

describe('Reducer: cameraData', () => {
  let state: CameraData;

  const fakeCameras = FISH_PRODUCTS;
  const fakePromo = FISH_PROMO;
  const fakeCamera = FISH_PRODUCTS[0];
  const fakeReviews = FISH_REVIEWS;
  const fakeReview = FISH_REVIEWS[0];

  beforeEach(() => {
    state = {
      cameras: [] as Cameras,
      currentCamera: {} as Camera,
      currentCameraReviews: [] as Reviews,
      currentCameraSimilar: [] as Cameras,
      promo: {} as Promo,
      camerasTotalCount: 0,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(cameraData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({...state});
  });

  describe('fetchCameras test', () => {
    it('should update cameras to [<Camera>], camerasTotalCount to [<Camera>].length if fetchCameras fulfilled', () => {
      expect(cameraData.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: {data: fakeCameras, totalCount: fakeCameras.length}}))
        .toEqual({
          ...state,
          cameras: fakeCameras,
          camerasTotalCount: fakeCameras.length,
        });
    });
  });

  describe('fetchCamera test', () => {
    it('should update currentCamera to <Camera> if fetchCamera fulfilled', () => {
      expect(cameraData.reducer(state, {type: fetchCameraAction.fulfilled.type, payload: fakeCamera}))
        .toEqual({
          ...state,
          currentCamera: fakeCamera,
        });
    });
  });

  describe('fetchPromo test', () => {
    it('should update promo to <Promo> if fetchPromo fulfilled', () => {
      expect(cameraData.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: fakePromo}))
        .toEqual({
          ...state,
          promo: fakePromo,
        });
    });
  });

  describe('fetchSimilar test', () => {
    it('should update currentCameraSimilar to [<Camera>] if fetchSimilar fulfilled', () => {
      expect(cameraData.reducer(state, {type: fetchSimilarAction.fulfilled.type, payload: fakeCameras}))
        .toEqual({
          ...state,
          currentCameraSimilar: fakeCameras,
        });
    });
  });

  describe('fetchReviews test', () => {
    it('should update currentCameraReviews to [<Review>] if fetchReviews fulfilled', () => {
      expect(cameraData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: fakeReviews}))
        .toEqual({
          ...state,
          currentCameraReviews: fakeReviews,
        });
    });
  });

  describe('clearCurrent test', () => {
    it('should clear current fields', () => {
      expect(cameraData.reducer(state, {type: clearCurrent.type}))
        .toEqual({...state,});
    });
  });

  describe('setCurrent test', () => {
    it('should set currentCamera if cameras contains camera.id', () => {
      state.cameras = fakeCameras;
      expect(cameraData.reducer(state, {type: setCurrent.type, payload: 1}))
        .toEqual({
          ...state,
          currentCamera: fakeCameras[0],
        });
    });

    it('should clear currentCamera if cameras did not contains camera.id', () => {
      expect(cameraData.reducer(state, {type: setCurrent.type, payload: 0}))
        .toEqual({...state,});
    });
  });

  describe('sendReview test', () => {
    it('should add review to currentCameraReviews if sendReviewAction fulfilled', () => {
      expect(cameraData.reducer(state, {type: sendReviewAction.fulfilled.type, payload: {...fakeReview}}))
        .toEqual({
          ...state,
          currentCameraReviews: [{...fakeReview}, ...state.currentCameraSimilar],
        });
    });
  });
});

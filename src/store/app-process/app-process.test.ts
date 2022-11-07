import { AppProcess } from '../../types/types';
import { fetchCameraAction, fetchCamerasAction, fetchPromoAction, fetchReviewsAction, fetchSimilarAction, sendReviewAction } from '../api-actions';
import { appProcess, resetError } from './app-process';

describe('Reducer: app', () => {
  let state: AppProcess;

  beforeEach(() => {
    state = {
      isCamerasLoading: false,
      isPromoLoading: false,
      isCameraLoading: false,
      isSimilarLoading: false,
      isReviewsLoading: false,
      isServerError: false,
      searchParams: '',
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        ...state
      });
  });

  describe('fetchCamerasAction test', () => {
    it('should update isCamerasLoading to "true" if fetchCameras pending', () => {
      expect(appProcess.reducer(state, {type: fetchCamerasAction.pending.type}))
        .toEqual({
          ...state,
          isCamerasLoading: true
        });
    });

    it('should update isCamerasLoading to "false" if fetchCameras fulfilled', () => {
      expect(appProcess.reducer(state, {type: fetchCamerasAction.fulfilled.type}))
        .toEqual({
          ...state,
          isCamerasLoading: false
        });
    });

    it('should update isCamerasLoading to "false", isServerError to "true" if fetchCameras rejected', () => {
      expect(appProcess.reducer(state, {type: fetchCamerasAction.rejected.type}))
        .toEqual({
          ...state,
          isCamerasLoading: false,
          isServerError: true,
        });
    });
  });
  describe('fetchCameraAction test', () => {
    it('should update isCameraLoading to "true" if fetchCamera pending', () => {
      expect(appProcess.reducer(state, {type: fetchCameraAction.pending.type}))
        .toEqual({
          ...state,
          isCameraLoading: true,
        });
    });

    it('should update isCameraLoading to "false" if fetchCamera fulfilled', () => {
      expect(appProcess.reducer(state, {type: fetchCameraAction.fulfilled.type}))
        .toEqual({
          ...state,
          isCameraLoading: false,
        });
    });

    it('should update isCameraLoading to "false", isServerError to "true" if fetchCamera rejected', () => {
      expect(appProcess.reducer(state, {type: fetchCameraAction.rejected.type}))
        .toEqual({
          ...state,
          isCameraLoading: false,
          isServerError: true,
        });
    });
  });
  describe('fetchPromoAction test', () => {
    it('should update isPromoLoading to "true" if fetchPromo pending', () => {
      expect(appProcess.reducer(state, {type: fetchPromoAction.pending.type}))
        .toEqual({
          ...state,
          isPromoLoading: true,
        });
    });

    it('should update isPromoLoading to "false" if fetchPromo fulfilled', () => {
      expect(appProcess.reducer(state, {type: fetchPromoAction.fulfilled.type}))
        .toEqual({
          ...state,
          isPromoLoading: false,
        });
    });

    it('should update isPromoLoading to "false" if fetchPromo rejected', () => {
      expect(appProcess.reducer(state, {type: fetchPromoAction.rejected.type}))
        .toEqual({
          ...state,
          isPromoLoading: false,
        });
    });
  });
  describe('fetchSimilarAction test', () => {
    it('should update isSimilarLoading to "true" if fetchSimilar pending', () => {
      expect(appProcess.reducer(state, {type: fetchSimilarAction.pending.type}))
        .toEqual({
          ...state,
          isSimilarLoading: true,
        });
    });

    it('should update isSimilarLoading to "false" if fetchSimilar fulfilled', () => {
      expect(appProcess.reducer(state, {type: fetchSimilarAction.fulfilled.type}))
        .toEqual({
          ...state,
          isSimilarLoading: false,
        });
    });

    it('should update isSimilarLoading to "false" if fetchSimilar rejected', () => {
      expect(appProcess.reducer(state, {type: fetchSimilarAction.rejected.type}))
        .toEqual({
          ...state,
          isSimilarLoading: false
        });
    });
  });
  describe('fetchReviewsAction test', () => {
    it('should update isReviewsLoading to "true" if fetchReviews pending', () => {
      expect(appProcess.reducer(state, {type: fetchReviewsAction.pending.type}))
        .toEqual({
          ...state,
          isReviewsLoading: true,
        });
    });

    it('should update isReviewsLoading to "false" if fetchReviews fulfilled', () => {
      expect(appProcess.reducer(state, {type: fetchReviewsAction.fulfilled.type}))
        .toEqual({
          ...state,
          isReviewsLoading: false,
        });
    });

    it('should update isReviewsLoading to "false" if fetchReviews rejected', () => {
      expect(appProcess.reducer(state, {type: fetchReviewsAction.rejected.type}))
        .toEqual({
          ...state,
          isReviewsLoading: false,
        });
    });
  });

  describe('sendReviewAction test', () => {
    it('should return initial state if sendReviewAction pending', () => {
      expect(appProcess.reducer(state, {type: sendReviewAction.pending}))
        .toEqual({
          ...state,
        });
    });

    it('should return initial state if sendReviewAction fulfilled', () => {
      expect(appProcess.reducer(state, {type: sendReviewAction.fulfilled}))
        .toEqual({
          ...state,
        });
    });

    it('should return initial state if sendReviewAction rejected', () => {
      expect(appProcess.reducer(state, {type: sendReviewAction.rejected}))
        .toEqual({
          ...state,
        });
    });
  });

  describe('resetError test', () => {
    it('should update isServerError to "false"', () => {
      expect(appProcess.reducer(state, {type: resetError.type}))
        .toEqual({
          ...state,
          isServerError: false
        });
    });
  });
});

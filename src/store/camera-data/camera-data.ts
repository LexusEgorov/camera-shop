import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Camera, CameraData, Promo } from '../../types/types';
import { fetchCameraAction, fetchCamerasAction, fetchPromoAction, fetchReviewsAction, fetchSimilarAction } from '../api-actions';

const initialState : CameraData = {
  cameras: [],
  currentCamera: {} as Camera,
  currentCameraReviews: [],
  currentCameraSimilar: [],
  promo: {} as Promo,
};

export const cameraData = createSlice({
  name: NameSpace.CameraData,
  initialState: initialState,
  reducers: {
    clearCurrent: (state) => {
      state.currentCamera = {} as Camera;
      state.currentCameraReviews = [];
      state.currentCameraSimilar = [];
    },
    setCurrent: (state, action) => {
      state.currentCamera = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.currentCamera = action.payload;
      })
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.currentCameraSimilar = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.currentCameraReviews = action.payload;
      });
  },
});

export const {clearCurrent} = cameraData.actions;

import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Camera, CameraData, Promo } from '../../types/types';
import { fetchCameraAction, fetchCamerasAction, fetchPromoAction, fetchReviewsAction, fetchSimilarAction, sendReviewAction } from '../api-actions';

const initialState : CameraData = {
  cameras: [],
  currentCamera: {} as Camera,
  currentCameraReviews: [],
  currentCameraSimilar: [],
  promo: {} as Promo,
  camerasTotalCount: 0,
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
      const product = state.cameras.find((camera) => camera.id === action.payload);
      state.currentCamera = product ? product : {} as Camera;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        const {data, totalCount} = action.payload;
        state.cameras = data;
        state.camerasTotalCount = totalCount;
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
        const reviews = action.payload;

        reviews.sort((a, b) => {
          const dateA = new Date(a.createAt).valueOf();
          const dateB = new Date(b.createAt).valueOf();

          return dateB - dateA;
        });
        state.currentCameraReviews = reviews;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.currentCameraReviews.unshift(action.payload);
      });
  },
});

export const {clearCurrent, setCurrent} = cameraData.actions;

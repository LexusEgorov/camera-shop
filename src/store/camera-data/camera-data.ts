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
      if(product){
        state.currentCamera = product;
      } else {
        state.currentCamera = {} as Camera;
      }
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
        const reviews = action.payload;

        reviews.sort((a, b) => {
          const fullDateA = new Date(a.createAt);
          const fullDateB = new Date(b.createAt);

          const dateA = {
            year: fullDateA.getFullYear(),
            month: fullDateA.getMonth(),
            day: fullDateA.getDate(),
          };

          const dateB = {
            year: fullDateB.getFullYear(),
            month: fullDateB.getMonth(),
            day: fullDateB.getDate(),
          };

          if(dateA.year !== dateB.year){
            return dateB.year - dateA.year;
          }

          if(dateA.month !== dateB.month){
            return dateB.month - dateA.month;
          }

          return dateB.day - dateA.day;
        });

        state.currentCameraReviews = reviews;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.currentCameraReviews.unshift(action.payload);
      });
  },
});

export const {clearCurrent, setCurrent} = cameraData.actions;

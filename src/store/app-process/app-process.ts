import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppProcess } from '../../types/types';
import { fetchCameraAction, fetchCamerasAction, fetchPromoAction, fetchReviewsAction, fetchSimilarAction } from '../api-actions';

const initialState : AppProcess = {
  isCamerasLoading: false,
  isPromoLoading: false,
  isCameraLoading: false,
  isSimilarLoading: false,
  isReviewsLoading: false,
  isServerError: false,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    resetError: (state) => {
      state.isServerError = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCameraAction.pending, (state) => {
        state.isCameraLoading = true;
      })
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasLoading = true;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoLoading = true;
      })
      .addCase(fetchSimilarAction.pending, (state) => {
        state.isSimilarLoading = true;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchCameraAction.fulfilled, (state) => {
        state.isCameraLoading = false;
      })
      .addCase(fetchCamerasAction.fulfilled, (state) => {
        state.isCamerasLoading = false;
      })
      .addCase(fetchPromoAction.fulfilled, (state) => {
        state.isPromoLoading = false;
      })
      .addCase(fetchSimilarAction.fulfilled, (state) => {
        state.isSimilarLoading = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state) => {
        state.isReviewsLoading = false;
      })
      .addCase(fetchCameraAction.rejected, (state) => {
        state.isCameraLoading = false;
        state.isServerError = true;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isCamerasLoading = false;
        state.isServerError = true;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isPromoLoading = false;
        state.isServerError = true;
      })
      .addCase(fetchSimilarAction.rejected, (state) => {
        state.isSimilarLoading = false;
        state.isServerError = true;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsLoading = false;
        state.isServerError = true;
      });
  },
});

export const {resetError} = appProcess.actions;

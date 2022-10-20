import { createSlice } from '@reduxjs/toolkit';
import { Id, toast } from 'react-toastify';
import { NameSpace } from '../../const';
import { AppProcess } from '../../types/types';
import { fetchCameraAction, fetchCamerasAction, fetchPromoAction, fetchReviewsAction, fetchSimilarAction, sendReviewAction } from '../api-actions';

const initialState : AppProcess = {
  isCamerasLoading: false,
  isPromoLoading: false,
  isCameraLoading: false,
  isSimilarLoading: false,
  isReviewsLoading: false,
  isServerError: false,
};

let cameraToast : Id;
let camerasToast : Id;
let promoToast : Id;
let reviewsToast : Id;
let similarToast : Id;
let sendReviewToast : Id;

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
        cameraToast = toast.loading('Загружаем камеру');
        state.isCameraLoading = true;
      })
      .addCase(fetchCamerasAction.pending, (state) => {
        camerasToast = toast.loading('Загружаем камеру');
        state.isCamerasLoading = true;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        promoToast = toast.loading('Загружаем промо');
        state.isPromoLoading = true;
      })
      .addCase(fetchSimilarAction.pending, (state) => {
        similarToast = toast.loading('Загружаем похожие камеры');
        state.isSimilarLoading = true;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        reviewsToast = toast.loading('Загружаем отзывы');
        state.isReviewsLoading = true;
      })
      .addCase(sendReviewAction.pending, () => {
        sendReviewToast = toast.loading('Отправляем отзыв');
      })
      .addCase(fetchCameraAction.fulfilled, (state) => {
        toast.dismiss(cameraToast);
        state.isCameraLoading = false;
      })
      .addCase(fetchCamerasAction.fulfilled, (state) => {
        toast.dismiss(camerasToast);
        state.isCamerasLoading = false;
      })
      .addCase(fetchPromoAction.fulfilled, (state) => {
        toast.dismiss(promoToast);
        state.isPromoLoading = false;
      })
      .addCase(fetchSimilarAction.fulfilled, (state) => {
        toast.dismiss(similarToast);
        state.isSimilarLoading = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state) => {
        toast.dismiss(reviewsToast);
        state.isReviewsLoading = false;
      })
      .addCase(sendReviewAction.fulfilled, () => {
        toast.dismiss(sendReviewToast);
      })
      .addCase(fetchCameraAction.rejected, (state) => {
        toast.update(cameraToast, {render: 'Не удалось загрузить камеру', type: 'error'});
        state.isCameraLoading = false;
        state.isServerError = true;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        toast.update(camerasToast, {render: 'Не удалось загрузить камеры', type: 'error'});
        state.isCamerasLoading = false;
        state.isServerError = true;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        toast.update(promoToast, {render: 'Не удалось загрузить промо', type: 'error'});
        state.isPromoLoading = false;
        state.isServerError = true;
      })
      .addCase(fetchSimilarAction.rejected, (state) => {
        toast.update(similarToast, {render: 'Не удалось загрузить похожие камеры', type: 'error'});
        state.isSimilarLoading = false;
        state.isServerError = true;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        toast.update(reviewsToast, {render: 'Не удалось загрузить отзывы', type: 'error'});
        state.isReviewsLoading = false;
        state.isServerError = true;
      })
      .addCase(sendReviewAction.rejected, () => {
        toast.update(sendReviewToast, {render: 'Не удалось отправить отзыв', type: 'error'});
      });
  },
});

export const {resetError} = appProcess.actions;

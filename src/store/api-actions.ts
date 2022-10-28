import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, PAGINATION_OUTPUT_COUNT } from '../const';
import { AppDispatch, Camera, Cameras, CamerasResponse, Promo, Review, ReviewPost, Reviews, State } from '../types/types';

export const fetchCamerasAction = createAsyncThunk<CamerasResponse, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'camera/get-all',
  async (page, {extra: api}) => {
    const startIndex = (page - 1) * PAGINATION_OUTPUT_COUNT;
    const response = await api.get<Cameras>(APIRoute.Cameras, {
      params: {
        '_limit': PAGINATION_OUTPUT_COUNT,
        '_start': startIndex,
      }
    });
    return {
      data: response.data,
      totalCount: Number(response.headers['x-total-count']),
    };
  }
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'camera/get-promo',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Promo>(APIRoute.Promo);
    return data;
  }
);

export const fetchCameraAction = createAsyncThunk<Camera, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'camera/get-camera',
  async (id, {extra: api}) => {
    const {data} = await api.get<Camera>(`${APIRoute.Cameras}${id}`);
    return data;
  }
);

export const fetchSimilarAction = createAsyncThunk<Cameras, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'camera/get-similar',
  async (id, {extra: api}) => {
    const {data} = await api.get<Cameras>(`${APIRoute.Cameras}${id}${APIRoute.Similar}`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'camera/get-reviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Cameras}${id}${APIRoute.Reviews}`);
    return data;
  }
);

export const sendReviewAction = createAsyncThunk<Review, ReviewPost, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'films/send-review',
  async ({cameraId, userName, advantage, disadvantage, rating, review}, {extra: api}) => {
    const {data} = await api.post(APIRoute.Reviews, ({cameraId, userName, advantage, disadvantage, rating, review}));
    return data;
  }
);

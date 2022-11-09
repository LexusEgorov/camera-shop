import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosResponse } from 'axios';
import { APIRoute, FilterValue, PAGINATION_OUTPUT_COUNT, QueryParameter, SortBy, SortType } from '../const';
import { AppDispatch, Camera, Cameras, CamerasRequest, CamerasResponse, ParamsRequest, Promo, Review, ReviewPost, Reviews, State } from '../types/types';
import { deleteParameter } from '../utils';

export const fetchCamerasAction = createAsyncThunk<CamerasResponse, CamerasRequest, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'camera/get-all',
  async ({page, queryParams}, {extra: api}) => {
    if(queryParams?.getAll(QueryParameter.Category).length === 1 && queryParams?.get(QueryParameter.Category) === FilterValue.Video) {
      queryParams = deleteParameter(queryParams, QueryParameter.Type, FilterValue.Snapshot);
      queryParams = deleteParameter(queryParams, QueryParameter.Type, FilterValue.Film);
    }
    const startIndex : number = (page - 1) * PAGINATION_OUTPUT_COUNT;
    const response : AxiosResponse = await api.get<Cameras>(`${APIRoute.Cameras}?${queryParams?.toString()}`, {
      params: {
        [QueryParameter.Limit]: PAGINATION_OUTPUT_COUNT,
        [QueryParameter.Start]: startIndex,
      }
    });
    return {
      data: response.data,
      totalCount: Number(response.headers['x-total-count']),
    };
  }
);

export const fetchMinPriceAction = createAsyncThunk<number, ParamsRequest, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'camera/get-min',
  async ({queryParams}, {extra: api}) => {
    if(queryParams?.getAll(QueryParameter.Category).length === 1 && queryParams?.get(QueryParameter.Category) === FilterValue.Video) {
      queryParams = deleteParameter(queryParams, QueryParameter.Type, FilterValue.Snapshot);
      queryParams = deleteParameter(queryParams, QueryParameter.Type, FilterValue.Film);
    }
    const priceMax = queryParams?.get(QueryParameter.PriceMax);
    const priceMin = queryParams?.get(QueryParameter.PriceMin);
    queryParams.delete(QueryParameter.PriceMax);
    queryParams.delete(QueryParameter.PriceMin);
    queryParams.delete(QueryParameter.Sort);
    queryParams.delete(QueryParameter.Order);
    queryParams.delete(QueryParameter.Limit);
    queryParams.delete(QueryParameter.Start);
    const {data} : AxiosResponse = await api.get<Camera>(`${APIRoute.Cameras}?${queryParams?.toString()}`, {
      params: {
        [QueryParameter.Limit]: 1,
        [QueryParameter.Start]: 0,
        [QueryParameter.Sort]: SortBy.Price,
        [QueryParameter.Order]: SortType.Asc,
        [QueryParameter.PriceMax]: priceMax,
        [QueryParameter.PriceMin]: priceMin,
      }
    });
    return data[0].price;
  }
);

export const fetchMaxPriceAction = createAsyncThunk<number, ParamsRequest, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'camera/get-max',
  async ({queryParams}, {extra: api}) => {
    if(queryParams?.getAll(QueryParameter.Category).length === 1 && queryParams?.get(QueryParameter.Category) === FilterValue.Video) {
      queryParams = deleteParameter(queryParams, QueryParameter.Type, FilterValue.Snapshot);
      queryParams = deleteParameter(queryParams, QueryParameter.Type, FilterValue.Film);
    }
    const priceMax = queryParams?.get(QueryParameter.PriceMax);
    const priceMin = queryParams?.get(QueryParameter.PriceMin);
    queryParams.delete(QueryParameter.PriceMax);
    queryParams.delete(QueryParameter.PriceMin);
    queryParams.delete(QueryParameter.Sort);
    queryParams.delete(QueryParameter.Order);
    queryParams.delete(QueryParameter.Limit);
    queryParams.delete(QueryParameter.Start);
    const {data} : AxiosResponse = await api.get<Camera>(`${APIRoute.Cameras}?${queryParams?.toString()}`, {
      params: {
        [QueryParameter.Limit]: 1,
        [QueryParameter.Start]: 0,
        [QueryParameter.Sort]: SortBy.Price,
        [QueryParameter.Order]: SortType.Desc,
        [QueryParameter.PriceMax]: priceMax,
        [QueryParameter.PriceMin]: priceMin,
      }
    });
    return data[0].price;
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
  'camera/send-review',
  async ({cameraId, userName, advantage, disadvantage, rating, review}, {extra: api}) => {
    const {data} = await api.post(APIRoute.Reviews, ({cameraId, userName, advantage, disadvantage, rating, review}));
    return data;
  }
);

export const findLikeCamerasAction = createAsyncThunk<Cameras, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'camera/find-like',
  async (name, {extra: api}) => {
    const {data} = await api.get(APIRoute.Cameras, {
      params: {
        [QueryParameter.NameLike]: name,
      }
    });
    return data;
  }
);

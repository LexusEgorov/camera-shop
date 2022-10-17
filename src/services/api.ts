import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Id, toast } from 'react-toastify';
import { APIRoute } from '../const';

const ErrorStatusCodeMapping : Record<number, boolean> = {
  [StatusCodes.NOT_FOUND]: true,
};

const WarningStatusCodeMapping : Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
};

const shouldDisplayError = (response : AxiosResponse) => !!ErrorStatusCodeMapping[response.status];
const shouldDisplayWarning = (response : AxiosResponse) => !!WarningStatusCodeMapping[response.status];

const getToast = (requestURL : string) => {
  if(requestURL.includes(APIRoute.Reviews)){
    toast.error('Ошибка: не удалось загрузить отзывы', {
      pauseOnHover: true,
      progress: undefined,
      isLoading: false,
    });
  } else if(requestURL.includes(APIRoute.Similar)){
    toast.error('Ошибка: не удалось загрузить список похожих камер', {
      pauseOnHover: true,
      progress: undefined,
      isLoading: false,
    });
  } else if(requestURL.includes(APIRoute.Cameras)){
    toast.error('Ошибка: не удалось загрузить камеру', {
      pauseOnHover: true,
      progress: undefined,
      isLoading: false,
    });
  }
};

const URL_API = 'https://camera-shop.accelerator.pages.academy/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = () : AxiosInstance => {
  const api = axios.create({
    baseURL: URL_API,
    timeout: REQUEST_TIMEOUT,
  });

  const toastId : Id = toast.loading('Загрузка');

  api.interceptors.response.use(
    (response) => {
      toast.dismiss(toastId);

      return response;
    },
    (error : AxiosError) => {
      if(error.response && shouldDisplayError(error.response)){
        getToast(error.response?.request.responseURL);

        throw error;
      }

      if(error.response && shouldDisplayWarning(error.response)){
        getToast(error.response?.request.responseURL);

        throw error;
      }
    }
  );

  return api;
};

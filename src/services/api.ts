import axios, { AxiosInstance } from 'axios';
import { Id, toast } from 'react-toastify';

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
  );

  return api;
};

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const TIMEOUT_IN_MILISECOND = 10000;

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: TIMEOUT_IN_MILISECOND,
});

export const setBearerToken = (token: string) =>
  (instance.defaults.headers.common["Authorization"] = "Bearer " + token);

const getUrlFromConfig = (config: AxiosRequestConfig) => {
  const { baseURL, url } = config;

  return baseURL ? url?.replace(baseURL, "") : url;
};

const useRequestCongif = (config: AxiosRequestConfig) => {
  const { method, params, data } = config || {};

  console.log(
    `%c ${method?.toUpperCase()} - ${getUrlFromConfig(config)}:`,
    "color: #0086b3; font-weight: bold",
    { params, data }
  );

  return config;
};

const useRequestConfigError = (error: AxiosError) => Promise.reject(error);

instance.interceptors.request.use(useRequestCongif, useRequestConfigError);

const useResponseSuccess = (response: AxiosResponse) => {
  const { data, status, config } = response || {};

  console.log(
    `%c ${status} - ${getUrlFromConfig(config)}:`,
    "color: #008000; font-weight: bold",
    data
  );

  return response;
};

const useResponseError = (error: AxiosError) => {
  const { isAxiosError, response } = error || {};

  if (isAxiosError && response) {
    const { config, status, data } = response || {};

    console.log(
      `%c ${status} - ${getUrlFromConfig(config)}:`,
      "color: #a71d5d; font-weight: bold",
      data
    );

    switch (status) {
      case 401: {
        // TRIGGER TOKEN ROTATION HERE
        // TOAST statusText
        break;
      }
      default:
        break;
    }
  } else {
    console.log("Lỗi không xác định!");
  }

  return Promise.reject(error);
};

instance.interceptors.response.use(useResponseSuccess, useResponseError);

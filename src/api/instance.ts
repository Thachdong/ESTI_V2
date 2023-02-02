import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const TIMEOUT_IN_MILISECOND = 10000;

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "api/",
  timeout: TIMEOUT_IN_MILISECOND,
});

export const setBearerToken = (token: string) =>
  (instance.defaults.headers.common["Authorization"] = "Bearer " + token);

const getUrlFromConfig = (config: AxiosRequestConfig) => {
  const { baseURL, url } = config;

  return baseURL ? url?.replace(baseURL, "") : url;
};

const useRequestCongif = async (config: AxiosRequestConfig) => {
  const { method, params, data } = config || {};

  const url = getUrlFromConfig(config);

  const bearerToken = instance.defaults.headers.common["Authorization"];

  // TRY TO GET TOKEN WHEN IT ABSENT FROM HEADER
  if (!bearerToken) {
    const accessToken = localStorage.getItem("accessToken");

    config.headers = {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    };
  }

  console.log(
    `%c ${method?.toUpperCase()} - ${url}:`,
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
  const { isAxiosError } = error || {};

  const response: any = error?.response;

  if (isAxiosError && response) {
    const { config, status, data } = response || {};

    const url = getUrlFromConfig(config);

    const errorMessage = response?.data?.resultMessage;

    console.log(
      `%c ${status} - ${url}:`,
      "color: #a71d5d; font-weight: bold",
      data
    );

    // ABORT ALL REQUEST IF 401 | 408 | 403 MEET TWICE
    if (isAbort) {
      throw new axios.Cancel("401 trigger more than twice!");
    }

    if (window === undefined) {
      return Promise.reject(error);
    }

    switch (status) {
      case 401:
      case 408: {
        // IGNORE WITH SOME ROUTES
        if (url?.includes("Authenticate/login")) {
          break;
        }

        const { pathname } = window.location;

        // TURN ON ABORT FLAG
        isAbort = true;

        // ALERT SOME INFO TO USER
        window?.alert?.(errorMessage || "Phiên đăng nhập hết hạn!");

        // LOGOUT
        localStorage.clear();

        window.location.replace(`/auth/login?callbackUrl=${pathname}`);

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

// THIS FLAG WILL TRIGGER ABORT ALL REQUEST IF 401 | 408 | 403 MEET TWICE
let isAbort = false;

instance.interceptors.response.use(useResponseSuccess, useResponseError);

import { AxiosError, AxiosResponse } from "axios";
import { instance } from "./instance";

const handleResponse = <TData>(response: AxiosResponse<TBaseResponse<TData>>) =>
  response.data;

const handleError = (error: AxiosError) => Promise.reject(error.response);

export const request = {
  getPagination: <TItem>(url: string, params?: any) =>
    instance
      .get<TBaseResponse<TPaginationResponse<TItem>>>(url, { params })
      .then((response) => response.data)
      .catch(handleError),

  get: <TData>(url: string, params?: any) =>
    instance
      .get<TBaseResponse<TData>>(url, { params })
      .then(handleResponse)
      .catch(handleError),

  post: <TPayload, TData>(url: string, payload: TPayload, params?: any) =>
    instance
      .post<TBaseResponse<TData>>(url, payload, { params })
      .then(handleResponse)
      .catch(handleError),

  put: <TPayload, TData>(url: string, payload: TPayload, params?: any) =>
    instance
      .put<TBaseResponse<TData>>(url, payload, { params })
      .then(handleResponse)
      .catch(handleError),

  patch: <TPayload, TData>(url: string, payload: TPayload, params?: any) =>
    instance
      .patch<TBaseResponse<TData>>(url, payload, { params })
      .then(handleResponse)
      .catch(handleError),

  delete: (url: string, params?: any) =>
    instance.delete(url, { params }).then(handleResponse).catch(handleError),
};
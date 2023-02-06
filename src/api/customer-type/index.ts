import { request } from "../method";

export type TCustomerType = {
  levelName: string;
  discount: string;
  point: number;
  accountType: number;
  totalItem: number;
  id: string;
  created: number;
  createdBy: string;
  updated: number;
  updatedBy: string;
  deleted: boolean;
  active: boolean;
};

export type TCreateCustomerType = {
  levelName: string;
  discount: string;
  point: number;
  accountType: number;
};

export type TUpdateCustomerType = TCreateCustomerType & {
  id: string
}

const BASE_URL = "AccountLevel";

export const customerType = {
  getAll: (params?: any) =>
    request.get<TCustomerType[]>(BASE_URL, { ...params }),

  create: (payload: TCreateCustomerType) => request.post<TCreateCustomerType, any>(BASE_URL, payload),

  update: (payload: TUpdateCustomerType) => request.put<TUpdateCustomerType, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`)
};

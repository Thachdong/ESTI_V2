import { request } from "../method";

export type TCreateLot = {
  productId: string;
  lotNumber: string;
  importPrice: number;
  dateManufacture: number;
  dateExpiration: number;
};

export type TUpdateLot = {
  id: string;
  importPrice: number;
};

const BASE_URL = "ProductBatch";

export const productLot = {
  create: (payload: TCreateLot) =>
    request.post<TCreateLot, any>(BASE_URL, payload),

  update: (payload: TUpdateLot) =>
    request.put<TUpdateLot, any>(BASE_URL, payload),

  // api đổi từ api/ProductBatch/ => api/ProductBatch/GetListLot' và bỏ phân trang
  getList: (params: any) =>
    request.get<any>(`${BASE_URL}/GetListLot`, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

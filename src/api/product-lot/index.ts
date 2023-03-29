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
  // update1:
  // api/ProductBatch/ => dùng cho trang danh sách "quản lý lô"
  // api/ProductBatch/GetListLot dùng cho lấy danh sách select trong màn nhập kho
  getAll: (params: any) =>
    request.get<any>(`${BASE_URL}/GetListLot`, { ...params }),

  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

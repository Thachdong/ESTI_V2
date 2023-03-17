import { request } from "../method";

export type TCreateStockPlan = {
  warehouseConfigProductId: string;
  salesId: string; // lấy id của user đang đăng nhập
  customerId: string;
  estimatedQuantity: {
    time: number; // cho chọn theo tháng lấy milisecond cuối tháng
    estimatedQuantity: number;
  }[];
};

export type TUpdateStockPlan = Omit<TCreateStockPlan, "warehouseConfigProductId"> & {
  id: string;
};

const BASE_URL = "StockPlan";

export const suppliers = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  create: (payload: TCreateStockPlan) =>
    request.post<TCreateStockPlan, null>(BASE_URL, payload),

  delete: (supplierId: string) => request.delete(`${BASE_URL}/${supplierId}`),

  update: (payload: TUpdateStockPlan) => request.put(BASE_URL, payload),
};

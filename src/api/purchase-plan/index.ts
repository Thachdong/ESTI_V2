import { request } from "../method";

export type TCreatePurchasePlan = {
  branchId: string;
  supplierId: string;
  productId: string;
  quantity: number;
  price: number;
  vat: string;
  totalPrice: number;
  note: string;
};

export type TUpdatePurchasePlan = TCreatePurchasePlan & {
  id: string;
};

const BASE_URL = "NeedToBuy";

export const purchasePlan = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  create: (payload: TCreatePurchasePlan[]) =>
    request.post<TCreatePurchasePlan[], any>(BASE_URL, payload),

  update: (payload: TUpdatePurchasePlan) =>
    request.put<TUpdatePurchasePlan, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),

  export: (params?: any) =>
    request.get<any>(`${BASE_URL}/ExportExcel`, { ...params }),
};

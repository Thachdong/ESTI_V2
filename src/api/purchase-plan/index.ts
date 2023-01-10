import { request } from "../method";

export type TCreatePurchasePlan = {
  branchId: string;
  supplierId: string;
  productId: string;
  referencePriceId: string;
  quantity: number;
  price: number;
  vat: string;
  totalPrice: number;
  note: string;
};

const BASE_URL = "NeedToBuy";

export const purchasePlan = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  create: (payload: TCreatePurchasePlan) =>
    request.post<TCreatePurchasePlan, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`)
};

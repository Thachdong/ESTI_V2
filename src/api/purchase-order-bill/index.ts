import { request } from "../method";

export type TCreatePurchaseOrderBill = {
  productOrderId: string;
  billNumber: string;
  attachFile: string;
  vat: string;
  billDetailCreate: TCreatePurchaseOrderBillProduct[];
};

export type TCreatePurchaseOrderBillProduct = {
  productId: string;
  quantity: number;
  price: number;
  vat: string;
  totalPrice: number;
};

const BASE_URL = "/ProductOrderBill";

export const purchaseOrderBill = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  create: (payload: TCreatePurchaseOrderBill) =>
    request.post<TCreatePurchaseOrderBill, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

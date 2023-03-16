import { request } from "../method";

const BASE_URL = "AdvancePayment";

export type TCreateAdvancePayment = {
  productOrderId?: string;
  mainOrderId?: string;
  advancePaymentDate: number;
  payments: number;
  contentBilling: string;
  attachFile: string;
};

export type TUpdateAdvancePayment = Partial<TCreateAdvancePayment> & {
  id: string;
};

export const advancePayment = {
  create: (payload: TCreateAdvancePayment) =>
    request.post<TCreateAdvancePayment, any>(BASE_URL, payload),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  getByOrder: (orderId: string) =>
    request.get<any>(`${BASE_URL}/GetByMainOrder?mainOrderId=${orderId}`),

  getByPurchaseOrder: (purchaseOrderId: string) =>
    request.get<any>(
      `${BASE_URL}/GetByProductOrder?productOrderId=${purchaseOrderId}`
    ),

  update: (payload: TUpdateAdvancePayment) =>
    request.patch<TUpdateAdvancePayment, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

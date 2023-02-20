import { instance } from "../instance";
import { request } from "../method";

export type TBillUpdateStatus = {
  id: string;
  status: number;
};

export type TBillAddbill = {
  billId: string;
  paid: number;
  paymentDate: number;
  nextPaymentDate: number;
};

export type TCreateBill = {
  mainOrderId: string;
  billNumber: string;
  billRecipientName: string;
  billRecipientPhone: string;
  billRecipientEmail: string;
  billRecipientAddress: string;
  attachFile: string;
  billDetailCreate: TCreateBillProduct[];
};

export type TCreateBillProduct = {
  productId: string;
  quantity: number;
  price: number;
  vat: string;
  totalPrice: number;
};

const BASE_URL = "Bill";

export const bill = {
  create: (payload: TCreateBill) =>
    request.post<TCreateBill, any>(BASE_URL, payload),

  getList: (params: any) => request.getPagination<any>(BASE_URL, params),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),

  getStatistic: () => request.get<any>(`${BASE_URL}/GetHeaderBill`),

  updateStatus: (payload: TBillUpdateStatus) =>
    request.post<any, any>(
      `${BASE_URL}/UpdateStatus?id=${payload.id}&status=${payload.status}`,
      {}
    ),

  addBill: (payload: TBillAddbill) =>
    request.post<TBillAddbill, any>("PaymentHistory", payload),

  sendMail: (payload: TSendMailProps) => {
    instance.defaults.timeout = undefined;
    return request.post<TSendMailProps, any>(`${BASE_URL}/SendMail`, payload)
  },
};

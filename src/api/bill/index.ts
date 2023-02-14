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

const BASE_URL = "Bill";

export const bill = {
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
};

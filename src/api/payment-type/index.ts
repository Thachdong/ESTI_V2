import { request } from "../method";

const BASE_URL = "PaymentType";

export const paymentType = {
  getList: (params?: any) => request.get<any>(BASE_URL, params),

  create: (payload: { paymentTypeName: string }) =>
    request.post<{ paymentTypeName: string }, any>(BASE_URL, payload),

  update: (payload: { paymentTypeName: string; id: string }) =>
    request.put<{ paymentTypeName: string; id: string }, any>(
      BASE_URL,
      payload
    ),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`)
};

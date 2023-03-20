import { request } from "../method";

export type TCreateCommission = {};

const BASE_URL = "PaymentCommission";

export const commission = {
  create: (payload: TCreateCommission) => request.post<TCreateCommission, any>(BASE_URL, payload),

  getByOrderId: (id: string) => request.get<any>(`${BASE_URL}/GetByMainOrder/${id}`),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

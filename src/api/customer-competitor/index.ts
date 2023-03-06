import { request } from "../method";

const BASE_URL = "Competitor";

export type TCreateCustomerDemand = {
  uid: string;
  demand: string;
  turnover: number;
};

export type TUpdateCustomerDemand = TCreateCustomerDemand & {
  id: string;
};

export const customerDemand = {
  create: (payload: TCreateCustomerDemand) =>
    request.post<TCreateCustomerDemand, any>(BASE_URL, payload),

  getByCustomerId: (customerId: string) =>
    request.get<any>(`${BASE_URL}/GetByIdCustomer/${customerId}`),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  update: (payload: TUpdateCustomerDemand) =>
    request.put<TUpdateCustomerDemand, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

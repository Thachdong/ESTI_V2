import { request } from "../method";

const BASE_URL = "Opinion";

export type TCreateCustomerOpinion = {
  uid: string;
  opinionGroup: string;
  level: string;
};

export type TUpdateCustomerOpinion = TCreateCustomerOpinion & {
  id: string;
};

export const customerOpinion = {
  create: (payload: TCreateCustomerOpinion) =>
    request.post<TCreateCustomerOpinion, any>(BASE_URL, payload),

  getByCustomerId: (customerId: string) =>
    request.get<any>(`${BASE_URL}/GetByIdCustomer/${customerId}`),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  update: (payload: TUpdateCustomerOpinion) =>
    request.put<TUpdateCustomerOpinion, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

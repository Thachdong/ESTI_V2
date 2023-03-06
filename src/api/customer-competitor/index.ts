import { request } from "../method";

const BASE_URL = "Competitor";

export type TCreateCustomerCompetitor = {
  uid: string;
  competitorName: string;
  description: string;
};

export type TUpdateCustomerCompetitor = TCreateCustomerCompetitor & {
  id: string;
};

export const customerCompetitor = {
  create: (payload: TCreateCustomerCompetitor) =>
    request.post<TCreateCustomerCompetitor, any>(BASE_URL, payload),

  getByCustomerId: (customerId: string) =>
    request.get<any>(`${BASE_URL}/GetByIdCustomer/${customerId}`),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  update: (payload: TUpdateCustomerCompetitor) =>
    request.put<TUpdateCustomerCompetitor, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

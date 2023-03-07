import { request } from "../method";

const BASE_URL = "TicketAction";

export type TCreateCustomerCareGroup = {
  actionName: string;
};

export type TUpdateCustomerCareGroup = TCreateCustomerCareGroup & {
  id: string;
};

export const customerCareGroup = {
  getAll: () => request.get<any>(`${BASE_URL}/GetAll`),

  create: (payload: TCreateCustomerCareGroup) =>
    request.post<TCreateCustomerCareGroup, any>(BASE_URL, payload),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  update: (payload: TUpdateCustomerCareGroup) =>
    request.put<TUpdateCustomerCareGroup, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};
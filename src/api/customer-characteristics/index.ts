import { request } from "../method";

const BASE_URL = "Characteristics";

export type TCreateCustomerCharacteristics = {
  uid: string;
  demand: string;
  turnover: number;
};

export type TUpdateCustomerCharacteristics = TCreateCustomerCharacteristics & {
  id: string;
};

export const customerCharacteristics = {
  create: (payload: TCreateCustomerCharacteristics) =>
    request.post<TCreateCustomerCharacteristics, any>(BASE_URL, payload),

  getByCustomerId: (customerId: string) =>
    request.get<any>(`${BASE_URL}/GetByIdCustomer/${customerId}`),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  update: (payload: TUpdateCustomerCharacteristics) =>
    request.put<TUpdateCustomerCharacteristics, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

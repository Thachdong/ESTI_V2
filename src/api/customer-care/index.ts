import { request } from "../method";

const BASE_URL = "TicketSupport";

export type TCreateCustomerCare = {
  salesId: string;
  customerId: string;
  curatorId: string;
  action: string;
  plan: string;
  result?: string;
  status?: number;
  performDate?: number;
};

export type TUpdateCustomerCare = TCreateCustomerCare & {
  id: string;
};

export const customerCare = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  getStatisticByMonth: (params?: any) =>
    request.get<any>(`${BASE_URL}/GetTicketSupportInMonthAndWeek`, {
      ...params,
    }),

  getStatisticByYear: (params?: any) =>
    request.get<any>(`${BASE_URL}/GetTicketSupportInYear`, { ...params }),

  getStatistic: (params?: any) =>
    request.get<any>(`${BASE_URL}/GetTicketSupport`, { ...params }),

  create: (payload: TCreateCustomerCare) =>
    request.post<TCreateCustomerCare, any>(BASE_URL, payload),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  update: (payload: TUpdateCustomerCare) =>
    request.put<TUpdateCustomerCare, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

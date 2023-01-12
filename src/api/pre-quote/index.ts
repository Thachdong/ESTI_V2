import { request } from "../method";

const BASE_URL = "PreQuote";

export const preQuote = {
  getList: (params: any) => request.getPagination(BASE_URL, { ...params }),
  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),
};

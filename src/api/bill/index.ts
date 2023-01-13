import { request } from "../method";

const BASE_URL = "Bill";

export const Bill = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, params),
  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),
};

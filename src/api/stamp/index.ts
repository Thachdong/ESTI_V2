import { request } from "../method";

export type TCreateStamp = {
  labelType: number;
  productId: string;
  chemicalName: string;
  casCode: string;
};

const BASE_URL = "ProductLabel";

export const stamp = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  create: (payload: TCreateStamp) =>
    request.post<TCreateStamp, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

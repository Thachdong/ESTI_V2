import { request } from "../method";

export type TCreateAttribute = {
  productAttributesName: string;
  productAttributesCode: string;
};

export type TUpdateAttribute = TCreateAttribute & {
  id: string;
};

const BASE_URL = "ProductAttributes";

export const productAtribute = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  create: (payload: TCreateAttribute) =>
    request.post<TCreateAttribute, any>(BASE_URL, payload),

  update: (payload: Partial<TUpdateAttribute>) =>
    request.put<Partial<TUpdateAttribute>, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

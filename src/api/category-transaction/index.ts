import { request } from "../method";

export type TCategoryTransaction = {
  categoryName: string;
  type: number;
  typeName: string;
  id: string;
  created: number;
  createdBy: string;
  updated: number;
  updatedBy: string;
  active: boolean;
};

export type TCategoryTransactionUpdate = {
  categoryName: string;
  type: number;
};

const BASE_URL = "CategoryTransaction";

export const categoryTransaction = {
  getList: (params: any) =>
    request.getPagination<TCategoryTransaction>(BASE_URL, { ...params }),
  create: (params: TCategoryTransactionUpdate) =>
    request.post(BASE_URL, params),
  update: (params: { id: string; categoryName: string; type: number }) =>
    request.put(BASE_URL, params),
  delete: (id: string) => request.delete(BASE_URL + "/" + id),
};

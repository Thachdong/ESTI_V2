import { request } from "../method";

export type TAccountManager = {
  branchId: string;
  branchCode: string;
  account: string;
  goal: number;
  percent: number;
  balance: number;
  id: string;
  created: number;
  createdBy: string;
  updated: number;
  updatedBy: string;
  active: boolean;
};

export type TAccountManagerUpdate = {
  id: string;
  branchId: string;
  account: string;
  goal: number;
  percent: number;
};

const BASE_URL = "AccountManagement";

export const accountManagement = {
  getList: (params: any) =>
    request.getPagination<TAccountManager>(BASE_URL, { ...params }),
  create: (params: TAccountManagerUpdate) => request.post(BASE_URL, params),
  update: (params: TAccountManagerUpdate) => request.put(BASE_URL, params),
  delete: (id: string) => request.delete(BASE_URL + "/" + id),
};

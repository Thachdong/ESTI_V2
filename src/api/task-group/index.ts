import { request } from "../method";

export type TJobGroup = {
  jobGroupName: string;
  totalItem: number;
  id: string;
  created: number;
  createdBy: string;
  updated: number;
  updatedBy: string;
  deleted: boolean;
  active: boolean;
};

const BASE_URL = "JobGroup";

export const taskGroup = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  create: (payload: { jobGroupName: string }) =>
    request.post(BASE_URL, payload),

  update: (payload: { jobGroupName: string; id: string }) =>
    request.put(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

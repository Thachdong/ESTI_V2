import { request } from "../method";

export type TTopic = {
  topicName: string;
  totalItem: number;
  id: string;
  created: number;
  createdBy: string;
  updated: number;
  updatedBy: string;
  deleted: boolean;
  active: boolean;
};

const BASE_URL = "Topic";

export const topic = {
  getList: (params: any) =>
    request.getPagination<TTopic>(BASE_URL, { ...params }),
  create: (unit: any) => request.post(BASE_URL, unit),
  update: (params: { topicName: string; id: string }) =>
    request.put(BASE_URL, params),
  delete: (id: string) => request.delete(BASE_URL + "/" + id),
};

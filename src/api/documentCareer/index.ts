import { request } from "../method";

export type TTechnicalDocument = {name: string, id: string};

const BASE_URL = "DocumentCareer";

export const documentCareer = {
  getList: (params?: any) => request.get<any>(BASE_URL, { ...params }),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),

  create: (name: string) => request.post(BASE_URL, {name}),

  update: (payload: TTechnicalDocument) => request.put(BASE_URL, payload)
};

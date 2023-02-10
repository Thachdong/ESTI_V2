import { request } from "../method";

const BASE_URL = "MainOrder";

export const mainOrder = {
  getList: (params?: any) => request.getPagination<any>(BASE_URL, { ...params }),

  getStatistic: (params?: any) => request.get<any>(`${BASE_URL}/GetHeaderMainOrder`)
};

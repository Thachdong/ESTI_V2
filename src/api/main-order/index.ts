import { request } from "../method";

const BASE_URL = "MainOrder";

export const mainOrder = {
  getList: (params: any) => request.getPagination(BASE_URL, { ...params }),
};

import { request } from "./method";

const BASE_URL = "Category";

export const category = {
  getList: (params?: any) => request.getPagination(BASE_URL, { ...params }),
};

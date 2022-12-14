import { request } from "../method";

const BASE_URL = "Category";

export const category = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),
};

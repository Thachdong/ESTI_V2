import { request } from "../method";

const BASE_URL = "Warehouse";
export const warehouse = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),
};

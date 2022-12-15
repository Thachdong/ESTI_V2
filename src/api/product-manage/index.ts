import { request } from "../method";

export const productManage = {
  getList: (params?: any) =>
    request.getPagination<any>("Product/ProductSearchGetAll", { ...params }),
  statistics: () => request.get<any>("Product/GetProductSearchHeader"),
};

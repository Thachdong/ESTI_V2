import { request } from "../method";

const BASE_URL = "PreOrder";

export const qouteRequest = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),
};

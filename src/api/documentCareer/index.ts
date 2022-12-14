import { request } from "../method";

const BASE_URL = "DocumentCareer";

export const documentCareer = {
  getList: (params?: any) => request.get<any>(BASE_URL, { ...params }),
};

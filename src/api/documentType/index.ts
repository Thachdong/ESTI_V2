import { request } from "../method";

const BASE_URL = "DocumentType";

export const documentType = {
  getList: (params?: any) => request.get<any>(BASE_URL, { ...params }),
};

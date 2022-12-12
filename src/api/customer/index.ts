import { request } from "../method";

const BASE_URL = "Customer";

export const customer = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),
  uploadAvatar: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-image`, file),
};

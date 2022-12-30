import { request } from "../method";

const BASE_URL = "Customer";

export const customer = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  uploadAvatar: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-image`, file),
};

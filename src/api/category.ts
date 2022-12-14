import { request } from "./method";

export type TCategory = {
  name: string;
  description: string;
  thumbnail: string;
  template: number;
  templateBanner: string;
  parentId: string;
  id: string;
};

type TCreatePayload = Omit<TCategory, "id">;

const BASE_URL = "Category";

export const category = {
  getList: (params?: any) =>
    request.getPagination<TCategory>(BASE_URL, { ...params }),
  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
  uploadImage: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-image`, file),
  create: (payload: TCreatePayload) =>
    request.post<TCreatePayload, any>(BASE_URL, payload),
  update: (payload: TCategory) =>
    request.put<TCategory, any>(BASE_URL, payload),
};

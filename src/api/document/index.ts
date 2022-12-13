import { request } from "../method";

export type TDocument = {
  productId: string;
  categoryId: string;
  lotNumber: string;
  documentType: string;
  documentCareer: string;
  attachFile: string;
  thumbnail: string;
  id: string;
  created: number;
};

type TCreateDocument = Omit<TDocument, "id" | "created">;

const BASE_URL = "Document";

export const productDocument = {
  getList: (params?: any) =>
    request.getPagination<TDocument>(BASE_URL, { ...params }),
  getById: (id: string) => request.get<TDocument>(`${BASE_URL}/${id}`),
  create: (payload: TCreateDocument) =>
    request.post<TCreateDocument, any>(BASE_URL, payload),
  update: (payload: TDocument) =>
    request.put<TDocument, any>(BASE_URL, payload),
  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
  uploadFile: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-file`, file),
};

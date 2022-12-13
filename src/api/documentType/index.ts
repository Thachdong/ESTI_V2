import { request } from "../method";

export type TDocumentType = {
  name: string;
  paramSearch: string;
  id: string;
}

type TCreatePayload = Omit<TDocumentType, "id">;

const BASE_URL = "DocumentType";

export const documentType = {
  getList: (params?: any) => request.get<TDocumentType[]>(BASE_URL, { ...params }),
  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
  create: (payload: TCreatePayload) => request.post<TCreatePayload, any>(BASE_URL, payload),
  update: (payload: TDocumentType) => request.put<TDocumentType, any>(BASE_URL, payload)
};
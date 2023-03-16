import { request } from "../method";

const BASE_URL = "ReferencePrice";

export type TCreateReferencePrice = {
  supplierId: string;
  productId: string;
  quantity: number;
  vat: string;
  price: number;
  productStatus: string;
  expireDate: number;
  productStatusType: number;
};

export type TUpdateReferencePrice = Partial<TCreateReferencePrice> & {
  id: string;
};

export const referencePrice = {
  create: (payload: TCreateReferencePrice) =>
    request.post<TCreateReferencePrice, any>(BASE_URL, payload),

  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),
  
  getByProductId: (productId: string) => request.get<any>(`${BASE_URL}/GetByNeedtoBuyProduct/${productId}`),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  update: (payload: TUpdateReferencePrice) =>
    request.put<TUpdateReferencePrice, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),

  uploadFile: (file: FormData) => request.post<FormData, any>(`${BASE_URL}/import-excel`, file)
};

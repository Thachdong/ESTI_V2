import { request } from "../method";

export type ProductWebsiteCreate = {
  description: string;
  summary: string;
  videoUrl: string;
  gallery: string;
  specifications: string;
  categorys: string;
};

export type TProduct = {
  id: string;
  productName: string;
  productCode: string;
  manufactor: string;
  origin: string;
  specs: string;
  unitId: string;
  image: string;
  suppliers: string;
  productGroup: string;
  casCode: string;
  chemicalName: string;
  productWebsiteCreate: ProductWebsiteCreate;
};

export type TProductPayload = Omit<TProduct, "id">;

const BASE_URL = "Product";

export const products = {
  getList: (params: any) =>
    request.getPagination<TProduct>(BASE_URL, { ...params }),
  getById: (id: string) => request.get<TProduct>(`${BASE_URL}/${id}`),
  getProductGroups: () => request.get<any>(BASE_URL + "/ProductGroupList"),
  uploadImage: (file: FormData) =>
    request.post<FormData, string>(BASE_URL + "/upload-image", file),
  create: (payload: TProductPayload) =>
    request.post<TProductPayload, any>(BASE_URL, payload),
  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
  importExcel: (file: FormData) =>
    request.post<FormData, any>(`${BASE_URL}/import-excel`, file),
    update: (payload: TProduct) => request.put<TProduct, any>(BASE_URL, payload)
};

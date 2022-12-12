import { request } from "../method";

type TWebsiteInfo = {
  description: string
  summary: string
  videoUrl: string
  gallery: string
  specifications: string
  documents: string
  categorys: string
}

export type TProduct = {
  productName: string;
  productCode: string;
  manufactor: string;
  origin: string;
  specs: string;
  unitId: string;
  image: string;
  suppliers: string[];
  productGroup: string;
  casCode: string;
  chemicalName: string;
  id: string;
  productWebsiteCreate:TWebsiteInfo
};

export type TProductPayload = Omit<TProduct, "id">

const BASE_URL = "Product";

export const products = {
  getList: (params: any) => request.getPagination<TProduct>(BASE_URL, { ...params }),
  getById: (id: string) => request.get<TProduct>(`${BASE_URL}/${id}`),
  getProductGroups: () => request.get<any>(BASE_URL + "/ProductGroupList"),
  uploadImage: (file: FormData) =>
    request.post<FormData, string>(BASE_URL + "/upload-image", file),
  create: (payload: TProductPayload) =>
    request.post<TProductPayload, any>(BASE_URL, payload),
  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
  importExcel: (file: FormData) => request.post<FormData, any>(`${BASE_URL}/import-excel`, file)
};

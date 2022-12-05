import { request } from "../method";

export type TProductPayload = {
  productName: string;
  productCode: string;
  manufactor: string;
  origin: string;
  specs: string;
  unitId: string;
  image: string;
  imageThumbnail: string;
  suppliers: string;
  productGroup: string;
  productGroupName: string;
  casCode: string;
  chemicalName: string;
};

const BASE_URL = "Product";

export const products = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),
  getProductGroups: () => request.get<any>(BASE_URL + "/ProductGroupList"),
  uploadImage: (file: FormData) =>
    request.post<FormData, string>(BASE_URL + "/upload-image", file),
  create: (payload: TProductPayload) =>
    request.post<TProductPayload, any>(BASE_URL, payload),
};

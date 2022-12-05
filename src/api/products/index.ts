import { request } from "../method";

const BASE_URL = "Product";

export const products = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),
  getProductGroups: () => request.get<any>(BASE_URL + "/ProductGroupList"),
  uploadImage: (file: FormData) => request.post<FormData, string>(BASE_URL + "/upload-image", file),
  create: (payload: any) => request.post<any, any>(BASE_URL, payload)
};

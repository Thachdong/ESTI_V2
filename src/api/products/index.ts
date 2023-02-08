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
  // PRODUCT CRUD OPERATORS
  getList: (params: any) =>
    request.getPagination<TProduct>(BASE_URL, { ...params }),
  create: (payload: TProductPayload) =>
    request.post<TProductPayload, any>(BASE_URL, payload),
  update: (payload: TProduct) => request.put<TProduct, any>(BASE_URL, payload),
  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
  getById: (id: string) => request.get<TProduct>(`${BASE_URL}/${id}`),

  // DANH SÁCH NHÓM SẢN PHẨM
  getProductGroups: () => request.get<any>(BASE_URL + "/ProductGroupList"),
  // UPLOAD HÌNH ẢNH SẢN PHẨM (1 HÌNH)
  uploadImage: (file: FormData) =>
    request.post<FormData, string>(BASE_URL + "/upload-image", file),
  // UPLOAD FILE EXCEL
  importExcel: (file: FormData) =>
    request.post<FormData, any>(`${BASE_URL}/import-excel`, file),
  // GET LOTS
  getLot: (productId: string, warehouseConfigId: string) =>
    request.get<any>(
      `${BASE_URL}/GetLot?productId=${productId}&warehouseConfigId=${warehouseConfigId}`
    ),

  getProductBySupplier: (supplierId: string) =>
    request.get<any>(`${BASE_URL}/ProductInSupplier?supplierId=${supplierId}`),
};

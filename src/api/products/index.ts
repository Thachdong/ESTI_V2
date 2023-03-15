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

export type TCreateProduct = {
  productCode: string;
  productName: string;
  manufactor: string;
  origin: string;
  specs: string;
  unitId: string;
  vat: string;
  chemicalAppendix: string;
  image: string;
  imageThumbnail: string;
  suppliers: string;
  productGroup: string;
  // productGroupName: string; api kiêu bỏ
  casCode: string;
  chemicalName: string;
  categorys: string;
  salePrice: string;
  warrantyAddress: string;
  warrantyMonth: number;
  warrantyContent: string;
  productAttributes: string;
  productWebsiteCreate: ProductWebsiteCreate;
};

export type TCreateProductWebsite = {
  // productId: string; api kiêu bỏ
  description: string;
  summary: string;
  videoUrl: string;
  gallery: string;
  specifications: string;
  categorys: string;
  metaTitle: string;
  metaDescriptions: string;
  metaKeyWords: string;
};

export type TUpdateProduct = Omit<TCreateProduct, "productWebsiteCreate"> & {
  id: string;
  productWebsiteUpdate: TCreateProductWebsite & {
    id: string;
  };
};

export type TProductPayload = Omit<TProduct, "id">;

const BASE_URL = "Product";

export const products = {
  // PRODUCT CRUD OPERATORS
  getList: (params: any) =>
    request.getPagination<TProduct>(BASE_URL, { ...params }),

  create: (payload: TCreateProduct) =>
    request.post<TCreateProduct, any>(BASE_URL, payload),

  update: (payload: TUpdateProduct) => request.put<TUpdateProduct, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),

  getById: (id: string) => request.get<TProduct>(`${BASE_URL}/${id}`),

  getBySupplierId: (id: string) =>
    request.get<TProduct[]>(`${BASE_URL}/ProductInSupplier?supplierId=${id}`),

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

  export: (params?: any) =>
    request.get<any>(`${BASE_URL}/export-excel`, { ...params }),
};

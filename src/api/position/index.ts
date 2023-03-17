import { request } from "../method";

export type TCreatePosition = {
  warehouseConfigID: string;
  positionName: string;
  positionSize: string;
  note: string;
  positionStatus: number;
  positionMaxSlot: number;
  productMaterial: number;
  productType: number;
  mass: string;
  volume: string;
  storageConditions: number;
};

export type TUpdatePosition = TCreatePosition & {
  id: string;
};

const BASE_URL = "position";

export const position = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  create: (payload: TCreatePosition) =>
    request.post<TCreatePosition, any>(BASE_URL, payload),

  update: (payload: TUpdatePosition) =>
    request.put<TUpdatePosition, any>(BASE_URL, payload),

  getProductByPositionId: (params?: any) =>
    request.getPagination<any>(`${BASE_URL}/GetByProduct`, { ...params }), // response: products list

  getImportProduct: (params?: any) =>
    request.getPagination<any>(`${BASE_URL}/GetImportHistory`, { ...params }), // response: products list

  getExportProduct: (params?: any) =>
    request.getPagination<any>(`${BASE_URL}/GetExportHistory`, { ...params }), // response: products list

  getPositionByProduct: (params?: any) =>
    request.getPagination<any>(`${BASE_URL}/GetByProduct`, { ...params }), // response: position list

  getHistoryByPositionId: (params?: any) =>
    request.getPagination<any>(`${BASE_URL}/GetHistory`, { ...params }),
};

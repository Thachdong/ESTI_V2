import { request } from "../method";

export type TPosition = {
  warehouseConfigID: string;
  warehouseConfigCode: string;
  positionName: string;
  positionSize: string;
  note: string;
  positionStatus: number;
  positionStatusName: string;
  positionMaxSlot: number;
  id: string;
  created: number;
  createdBy: string;
  updated: number;
  updatedBy: string;
  active: boolean;
};

export type TCreatePosition = {
  warehouseConfigID: string;
  positionName: string;
  positionSize: string;
  note: string;
  positionStatus: number;
};

const BASE_URL = "position";

export const position = {
  getList: (params?: any) =>
    request.getPagination<TPosition>(BASE_URL, { ...params }),

  create: (payload: TCreatePosition) =>
    request.post<TCreatePosition, any>(BASE_URL, payload),

  update: (payload: Partial<TPosition>) =>
    request.put<Partial<TPosition>, any>(BASE_URL, payload),

  getProductsByPositionId: (params?: any) =>
    request.getPagination<any>(`${BASE_URL}/GetByProduct`, { ...params }), // positionId is required

  getHistoryByPositionId: (params?: any) => request.getPagination<any>(`${BASE_URL}/GetHistory`, {...params})
};

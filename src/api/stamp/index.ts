// Logic tạo lịch sử tem
// 1. Có thể tạo tem mà không cần tạo lịch sử
// 2. Trong màn nhập kho:
//    + SP chưa có tem => tạo tem + lịch sử (dựa trên thông tin nhập kho)
//    + SP đã có tem
//      - check lịch sử: call api: LabelHistory, params: productLabelId + lotNumber
//      - chưa có lịch sử: tạo lịch sử khi click nút xem tem
//      - đã có lịch sử: không cần thao tác thêm
import { request } from "../method";

export type TCreateStampHistory = {
  // productLabelId: string; api bỏ trường này
  warehouseSessionId: string;
  lotNumber: string;
  quantity: number;
  positionId: string;
  dateManufacture: number;
  dateExpiration: number;
  // qrCode: string; api bỏ trường này
};

export type TCreateStamp = {
  labelType: number;
  productId: string;
  chemicalName: string;
  casCode: string;
  labelHistoryCreate?: TCreateStampHistory;
};

export type TUpdateStamp = {
  id: string;
  chemicalName: string;
  casCode: string;
};

const BASE_URL = "ProductLabel";

export const stamp = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  create: (payload: TCreateStamp) =>
    request.post<TCreateStamp, any>(BASE_URL, payload),

  update: (payload: TUpdateStamp) =>
    request.put<TUpdateStamp, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

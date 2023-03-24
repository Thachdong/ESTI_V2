import { request } from "../method";

type TCreateLabelHistory = {
  labelHistoryCreate: {
    productLabelId: string;
    warehouseSessionId: string;
    lotNumber: string;
    quantity: number;
    positionId: string;
    dateManufacture: number;
    dateExpiration: number;
    // qrCode: string; api bỏ trường này
  };
};

const BASE_URL = "LabelHistory";

export const labelHistory = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),

  create: (payload: TCreateLabelHistory) =>
    request.post<TCreateLabelHistory, any>("ProductLabel", payload),

  getHistoryDetail: (id: string) => request.get<any>(`${BASE_URL}/${id}`),
};

import { request } from "../method";

export type TWarehouseExport = {
  exportStatus: number;
  exportStatusName: string;
  branchCode: string;
  mainOrderCode: string;
  warehouseSessionCode: string;
  customerCode: string;
  companyName: string;
  totalPrice: number;
  deliveryCode: string;
  salesAdminNote: string;
  deliveryNote: string;
  smgNote: string;
  id: string;
  created: number;
  createdBy: string;
  updated: number;
  updatedBy: string;
  active: boolean;
  exportPrice: number;
  totalBillPrice: number;
  paid: number;
  unPaid: number;
  importTotalPrice: number;
};

export type TExportWarehouseStatusPayload = {
  warehouseSessionId: string;
  status: number;
};

const BASE_URL = "ExportWarehouse";

export const exportWarehouse = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  updateStatus: (payload: TExportWarehouseStatusPayload) =>
    request.post<null, any>(
      `Warehouse/UpdateExportStatus?warehouseSessionId=${payload?.warehouseSessionId}&status=${payload.status}`,
      null
    ),
};

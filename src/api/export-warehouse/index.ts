import { request } from "../method";

export type TWarehouseExport = {
  exportStatus: number;
  exportStatusName: string;
  branchCode: string;
  mainOrderCode: string;
  warehouseSessionCode: string;
  customerCode: string;
  companyName: string;
  totalPrice: 24840000;
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
};

const BASE_URL = "ExportWarehouse";

export const exportWarehouse = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),
};

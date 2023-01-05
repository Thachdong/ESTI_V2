import { request } from "../method";

const BASE_URL = "Warehouse";

export type TCreateImportWarehouseProduct = {
  productOrderDetailId: string | null;
  productId: string;
  lotNumber: string;
  dateManufacture: number;
  dateExpiration: number;
  quantity: number;
  price: number;
  vat: string;
  positionId: string;
};

export type TCreateImportWarehouse = {
  productOrderId: string;
  branchId: string;
  deliveryId: string;
  supplierId: string;
  stockerId: string;
  purchaseId: string;
  warehouseCreate: TCreateImportWarehouseProduct[];
};

export type TCreateExportWarehouse = {
  mainOrderId: string;
  deliveryDate: number;
  paymentDocument: string;
  codeVD: string;
  deliveryUnit: string;
  packageNumber: string;
  packageWeight: string;
  shippingFee: number;
  exportWarehouseCreate: TCreateExportWarehouseProduct[];
};

export type TCreateExportWarehouseProduct = {
  productId: string;
  lotNumber: string;
  dateManufacture: number;
  dateExpiration: number;
  quantity: number;
  price: number;
  vat: string;
  positionId: string;
};

export const warehouse = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  createImportWarehouse: (payload: TCreateImportWarehouse) =>
    request.post<TCreateImportWarehouse, string>(
      `${BASE_URL}/ImportWarehouse`,
      payload
    ),

  getImportSessionById: (id: string) =>
    request.get<any>(`${BASE_URL}/ImportWarehouse/${id}`),

  updateImportSessionStatus: (id: string, status: number) =>
    request.post<any, any>(
      `${BASE_URL}/UpdateImportStatus?warehouseSessionId=${id}&status=${status}`,
      {}
    ),

  createExportWarehouse: (payload: TCreateExportWarehouse) =>
    request.post<TCreateExportWarehouse, string>(
      `${BASE_URL}/ExportWarehouse`,
      payload
    ),
  getExportSessionById: (id: string) =>
    request.get<any>(`${BASE_URL}/ExportWarehouse/${id}`),

  getExportStatisticalData: () =>
    request.get<any>(`${BASE_URL}/GetHeaderExportWarehouse`),

  updateExportSessionStatus: (id: string, status: number) =>
    request.post<any, any>(
      `${BASE_URL}/UpdateExportStatus?warehouseSessionId=${id}&status=${status}`,
      {}
    ),

  updateReceivedBill: (id: string) =>
    request.post<any, any>(
      `${BASE_URL}/UpdateReceivedBill?warehouseSessionId=${id}`,
      {}
    ),

  deleteTransaction: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

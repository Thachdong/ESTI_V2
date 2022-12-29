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

  createExportWarehouse: (payload: TCreateExportWarehouse) =>
    request.post<TCreateExportWarehouse, string>(
      `${BASE_URL}/ExportWarehouse`,
      payload
    ),

  deleteTransaction: (id: string) => request.delete(`${BASE_URL}/${id}`),
};

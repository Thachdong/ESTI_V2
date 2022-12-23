import { request } from "../method";

const BASE_URL = "Warehouse";

export type TCreateImportWarehouseProduct = {
  productOrderDetailId: string;
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
  warehouseCreate: TCreateImportWarehouseProduct[];
};

export const warehouse = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  createWarehouseImport: (payload: TCreateImportWarehouse) =>
    request.post<TCreateImportWarehouse, string>(`${BASE_URL}/ImportWarehouse`, payload),
};

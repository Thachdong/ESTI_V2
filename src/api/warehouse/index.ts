import { TWarehouseExport } from "../export-warehouse";
import { request } from "../method";

const BASE_URL = "Warehouse";

type TWarehouseCreate = {
  id: string;
  codeVD: string;
  deliveryUnit: string;
  packageNumber: string;
  packageWeight: string;
  shippingFee: number;
  warehouseUpdate: [
    {
      id: string;
      quantity: number;
      price: number;
      lotNumber: string;
      dateManufacture: number;
      dateExpiration: number;
      vat: string;
      positionId: string;
    }
  ];
};

export const warehouse = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),
  createWarehouseImport: (payload: TWarehouseCreate) =>
    request.post<TWarehouseCreate, string>(BASE_URL, payload),
};

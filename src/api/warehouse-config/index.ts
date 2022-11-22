import { request } from "../method";

export type TWarehouseConfig = {
    code: string;
    position: number;
    branchCode: string;
    branchId: string;
    id: string;
}

const BASE_PATH = "WarehouseConfig";

export const warehouseConfig = {
    getList: (params?: any) => request.getPagination<TWarehouseConfig>(BASE_PATH, {...params}),
    getById: (id: string) => request.get<TWarehouseConfig>(BASE_PATH + "/" + id),
    update: (payload: TWarehouseConfig) => request.put<TWarehouseConfig, null>(BASE_PATH, payload),
    create: (payload: Omit<TWarehouseConfig, "id">) => request.post<Omit<TWarehouseConfig, "id">, null>(BASE_PATH, payload)
}
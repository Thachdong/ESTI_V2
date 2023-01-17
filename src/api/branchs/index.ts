import { request } from "../method";

export type TBranch = {
    address: string;
    code: string;
    email: string;
    phone: string;
    taxCode: string;
    name: string;
    id: string;
    warehouseConfigCode?: string | null;
}

const BASE_PATH = "BranchConfig";

export const branchs = {
    getList: (params?: any) => request.getPagination<TBranch>(BASE_PATH, {...params}),
    getById: (id: string) => request.get<TBranch>(BASE_PATH + "/" + id),
    update: (payload: TBranch) => request.put<TBranch, null>(BASE_PATH, payload),
    create: (payload: Omit<TBranch, "id">) => request.post<Omit<TBranch, "id">, null>(BASE_PATH, payload)
}
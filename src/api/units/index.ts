import { request } from "../method";

export type TUnit = {
    unitName: string;
    id: string;
}

const BASE_URL = "Unit";

export const units = {
    getList: (params: any) => request.getPagination<TUnit>(BASE_URL, {...params}),
    create: (unit: Pick<TUnit, "unitName">) => request.post<Pick<TUnit, "unitName">, TUnit>(BASE_URL, unit),
    update: (unit: TUnit) => request.put<TUnit, null>(BASE_URL, unit),
    delete: (id: string) => request.delete(BASE_URL + "/" + id)
}
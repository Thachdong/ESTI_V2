import { request } from "../method";

const BASE_URL = "Supplier"

export const suppliers = {
    getList: (params: any) => request.getPagination<any>(BASE_URL, {...params}),
}
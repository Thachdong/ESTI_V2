import { request } from "../method"

const BASE_URL = "Customer"
export const customer = {
    getList: (params?: any) => request.getPagination<any>(BASE_URL, {...params})
}
import { request } from "../method";

const BASE_URL = "ProductOrder";

export const orders = {
    getList: (params: any) => request.getPagination<any>(BASE_URL, {...params}),

    getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`)
}
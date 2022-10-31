import { request } from "../method";

const BASE_URL = "Staff";

export const staff = {
    getList: (params: any) => request.getPagination<any>(BASE_URL, {...params}),
    getListSale: () => request.get<any>(`${BASE_URL}/SaleList`),
    getListSaleAdmin: () => request.get<any>(`${BASE_URL}/SaleAdminList`),
    getListDeliveryStaff: () => request.get<any>(`${BASE_URL}/DeliveryList`)
}
import { request } from "../method";

const BASE_URL = "PaymentDocument";

export const paymentDocument = {
    getList: (params?: any) => request.get<any>(BASE_URL, params)
}
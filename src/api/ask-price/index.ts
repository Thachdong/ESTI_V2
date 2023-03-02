import { request } from "../method";

const BASE_URL = "NeedToAskPrice";

export type TCreateAskPrice = {
    supplierId: string
    productId: string
    quantity: number
    // availabilityQuantity: number ====== swagger thừa
    price?: number
    vat?: string
    totalPrice?: number
    requirement?: number
    productStatus?: string
    note?: string
    // expireDate?: number ====== swagger thừa
  }

export type TUpdateAskPrice = Partial<TCreateAskPrice> & {
    id: string;
}

export const askPrice = {
    create: (payload: TCreateAskPrice[]) => request.post<TCreateAskPrice[], any>(BASE_URL, payload),

    getList: (params?: any) => request.getPagination<any>(BASE_URL, {...params}),

    getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

    update: (payload: TUpdateAskPrice) => request.patch<TUpdateAskPrice, any>(BASE_URL, payload),

    cancel: (id: string) => request.post<any, any>(`${BASE_URL}/CancelNeedToPrice?id=${id}`, {})
}
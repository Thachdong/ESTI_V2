import { IPostProductOrderPayment } from '~types/productOrderPayment'
import { request } from '../method'

const BASE_URL = 'ProductOrderPayment'

export const productOrderPaymentApi = {
	create: (payload: IPostProductOrderPayment) => request.post<IPostProductOrderPayment, null>(BASE_URL, payload)
	// display: (id: string) => request.post(`${BASE_URL}/isHide?productId=${id}`, {}),
	// getList: (params: any) => request.getPagination(BASE_URL, { ...params })
}

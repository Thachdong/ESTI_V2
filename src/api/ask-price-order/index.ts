import { instance } from "../instance";
import { request } from "../method";

const BASE_URL = "AskPriceOrder";

export type TCreateAskPriceOrder = {
  supplierId: string;
  receiverAddress: string;
  paymentType: string;
  paymentDocument: string;
  expireDate: number;
  askPriceOrderDetailCreate: TCreateAskPriceOrderProduct[];
};

export type TCreateAskPriceOrderProduct = {
  needToPriceId: string;
  productId: string;
  quantity: number;
  availabilityQuantity: number;
  price: number;
  vat: string;
  totalPrice: number;
  statusProduct: string;
  note: string;
  productStatusType: number;
};

export type TUpdateAskPriceOrder = {
  id: string;
  receiverAddress?: string;
  paymentType?: string;
  paymentDocument?: string;
  expireDate?: number;
  askPriceOrderDetailUpdate?: TUpdateAskPriceOrderProduct[];
};

export type TUpdateAskPriceOrderProduct = {
  id: string;
  quantity: number;
  availabilityQuantity: number;
  price: number;
  vat: string;
  totalPrice: number;
  statusProduct: string;
  note: string;
  productStatusType: number;
};

export const askPriceOrder = {
  create: (payload: TCreateAskPriceOrder) =>
    request.post<TCreateAskPriceOrder, any>(BASE_URL, payload),

  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  update: (payload: TUpdateAskPriceOrder) =>
    request.patch<TUpdateAskPriceOrder, any>(BASE_URL, payload),

  updateStatus: (id: string, status: number) =>
    request.post<any, any>(
      `${BASE_URL}/UpdateStatus?id=${id}&status=${status}`,
      {}
    ),

  sendMail: (payload: TSendMailProps) => {
    instance.defaults.timeout = undefined;
    return request.post<TSendMailProps, any>(`${BASE_URL}/SendMail`, payload);
  },
};

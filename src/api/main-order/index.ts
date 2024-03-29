import { request } from "../method";

export type TCreateOrder = {
  preQuoteId: string;
  branchId: string;
  customerId: string;
  curatorId: string;
  salesAdminId: string;
  salesId: string;
  deliveryId: string;
  receiverFullName: string;
  receiverPhone: string;
  receiverAddress: string;
  paymentType: string;
  paymentLimit: string;
  curatorName: string;
  curatorDepartmentId: number;
  curatorPhone: string;
  curatorEmail: string;
  attachFile: string;
  requirements: string;
  totalPrice: number;
  totalTax: number;
  totalPriceNotTax: number;
  mainOrderDetail: TCreateOrderProduct[];
};

export type TCreateOrderProduct = {
  productId: string;
  quantity: number;
  price: number;
  vat: string;
  totalPrice: number;
  note: string;
};

export type TUpdateOrder = {
  id: string;
  salesAdminId: string;
  salesId: string;
  deliveryId: string;
  curatorPhone: string;
  curatorEmail: string;
  receiverFullName: string;
  receiverPhone: string;
  paymentType: string;
  paymentLimit: string;
  receiverAddress: string;
  requirements: string;
};

export type TUpdateOrderStatus = {
  id: string;
  status: number;
};

const BASE_URL = "MainOrder";

export const mainOrder = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  getStatistic: () => request.get<any>(`${BASE_URL}/GetHeaderMainOrder`),

  create: (payload: TCreateOrder) =>
    request.post<TCreateOrder, any>(BASE_URL, payload),

  update: (payload: TUpdateOrder) =>
    request.put<TUpdateOrder, any>(BASE_URL, payload),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  sendMail: (payload: TSendMailProps) =>
    request.post<TSendMailProps, any>(`${BASE_URL}/SendMail`, payload),

  updateStatus: (payload: TUpdateOrderStatus) =>
    request.post<any, any>(
      `${BASE_URL}/UpdateStatus?mainOrderId=${payload.id}&status=${payload.status}`,
      {}
    ),
  getMainOrderDetail: (id: string) =>
    request.get<any>(`${BASE_URL}/MainOrderDetail`, { id }),

  uploadFile: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-file`, file),

  export: (params?: any) =>
    request.get<any>(`${BASE_URL}/ExportExcel`, { ...params }),
};

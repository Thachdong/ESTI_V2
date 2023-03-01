import { request } from "../method";

export type TCreatePurchase = {
  branchId: string;
  supplierId: string;
  salesAdminId: string;
  purchaseId: string;
  deliveryId: string;
  stockerId: string;
  deliverDate: number;
  receiverAddress: string;
  paymentType: string;
  paymentDocument: string;
  note: string;
  productOrderDetailCreate: TCreatePurchaseProduct[];
};

export type TCreatePurchaseProduct = {
  needToBuyId: string;
  productId: string;
  quantity: number;
  price: number;
  vat: string;
  note: string;
};

export type TUpdatePurchase = Omit<
  TCreatePurchase,
  "productOrderDetailCreate"
> & {
  id: string;
};

export type TUpdatePurchaseStatus = {
  id: string;
  status: number;
};

const BASE_URL = "ProductOrder";

export const purchaseOrder = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  create: (payload: TCreatePurchase) =>
    request.post<TCreatePurchase, any>(BASE_URL, payload),

  update: (payload: TUpdatePurchase) =>
    request.put<TUpdatePurchase, any>(BASE_URL, payload),

  updateStatus: (payload: TUpdatePurchaseStatus) =>
    request.post<any, any>(
      `${BASE_URL}/UpdateStatus?id=${payload?.id}&status=${payload?.status}`,
      {}
    ),

  getStatistic: () => request.get<any>(`${BASE_URL}/GetHeaderProductOrder`),

  sendMail: (payload: TSendMailProps) =>
    request.post<TSendMailProps, any>(`${BASE_URL}/SendMail`, payload),
  getProductOrderDetail: (id: string) =>
    request.get<any>(`${BASE_URL}/ProductOrderDetail`, { id }),
};

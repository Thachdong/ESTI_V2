import { request } from "../method";

export type TSupplier = {
  supplierName: string;
  address: string;
  paymentLimit: number;
  phone: string;
  avatar: string;
  taxCode: string;
  paymentType: string;
  cardOwner: string;
  bankName: string;
  cardNumber: string;
  productSupply: string | number[];
  salesAdminID: string;
  deliveryID: string;
  id?: string;
  created?: number;
  // curator fields
  curatorPosition: string;
  curatorPhone: string;
  curatorName: string;
  curatorGender: string;
  curatorAddress: string;
  curatorEmail: string;
};

const BASE_URL = "Supplier";

export const suppliers = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),
  uploadAvatar: (payload: string) =>
    request.post(`${BASE_URL}/upload-image`, payload),
  create: (payload: TSupplier) => request.post<TSupplier, null>(BASE_URL, payload),
  delete: (supplierId: string) => request.delete(`${BASE_URL}/${supplierId}`),
  update: (payload: TSupplier) => request.put(BASE_URL, payload)
};

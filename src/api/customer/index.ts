import { request } from "../method";

export type TCreateCustomer = {
  salesId: string;
  salesAdminId: string;
  deliveryId: string;
  avatar: string;
  companyInfo: TCreateCustomerCompanyInfo;
  curatorCreate: TCreateCustomerCurator[];
};

export type TCreateCustomerCompanyInfo = {
  name: string;
  professionId: number;
  taxCode: string;
  address: string;
  hotline: string;
  email: string;
  website: string;
  paymentLimit: number;
  paymentType: number;
  identityCard: string;
  identityCardImage: string;
};

export type TCreateCustomerCurator = {
  userName: string;
  uid: string;
  curatorName: string;
  curatorDepartment: number;
  curatorGender: number;
  birthDay: number;
  curatorPhone: string;
  zaloNumber: string;
  curatorEmail: string;
  curatorAddress: string;
  typeDiscount: number;
  receiver: Receiver;
  billRecipientCreate: BillRecipientCreate;
};

type Receiver = {
  fullName: string;
  phone1: string;
  phone2: string;
  address: string;
  email: string;
  note: string;
};

type BillRecipientCreate = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  note: string;
};

export type TActivateCustomer = {
  id: string;
  status: number;
};

export type TUpdateCustomer = any;

const BASE_URL = "Customer";

export const customer = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  getStatisticById: (customerId: string) =>
    request.get<any>(
      `${BASE_URL}/GetValueMainOrderInYear?customerId=${customerId}`
    ),

  uploadImage: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-image`, file),

  create: (payload: TCreateCustomer) =>
    request.post<TCreateCustomer, any>(BASE_URL, payload),

  update: (payload: TUpdateCustomer) =>
    request.patch<TUpdateCustomer, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),

  updateStatus: (payload: TActivateCustomer) =>
    request.post<TActivateCustomer, any>(`${BASE_URL}/IsActive`, payload),

  resetPassword: (id: string) =>
    request.post<any, any>(`${BASE_URL}/ResetPassword?id=${id}`, {}),
};

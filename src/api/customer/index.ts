import { request } from "../method";

export type TCreateCustomer = {
  userName: string;
  branchID: string;
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
  // cuartorName: string;
  // curatorDepartment: number;
  // curatorGender: number;
  // curatorPhone: string;
  // curatorEmail: string;
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

export type TUpdateCustomer = Partial<TCreateCustomer> & {
  id: string;
};

const BASE_URL = "Customer";

export const customer = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  uploadAvatar: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-image`, file),

  create: (payload: TCreateCustomer) =>
    request.post<TCreateCustomer, any>(BASE_URL, payload),

  update: (payload: TUpdateCustomer) =>
    request.patch<TUpdateCustomer, any>(BASE_URL, payload),
};

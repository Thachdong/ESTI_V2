import { request } from "../method";

export type TStaff = {
  code: string;
  avatar: string;
  username: string;
  password: string;
  repeatPassword: string;
  fullName: string;
  branchId: string;
  branchCode: string;
  roleCode: string;
  roleName: string;
  birthday: number;
  email: string;
  phone: string;
  address: string;
  statusName: string;
  id: string;
  created: number;
};

export type TUpdateStaffStatus = {
  id: string;
  status: number;
};

const BASE_URL = "Staff";

export const staff = {
  getList: (params: any) =>
    request.getPagination<TStaff>(BASE_URL, { ...params }),

  getListSale: () => request.get<any>(`${BASE_URL}/SaleList`),

  getListSaleAdmin: () => request.get<any>(`${BASE_URL}/SaleAdminList`),

  getListDeliveryStaff: () => request.get<any>(`${BASE_URL}/DeliveryList`),

  getListPurchaseStaff: () => request.get<any>(`${BASE_URL}/PurchaseList`),

  getListStockerStaff: () => request.get<any>(`${BASE_URL}/StockerList`),

  uploadAvatar: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-image`, file),

  createStaff: (payload: TStaff) =>
    request.post<TStaff, string>(BASE_URL, payload),

  updateStaff: (payload: TStaff) =>
    request.patch<TStaff, string>(BASE_URL, payload),

  deleteStaff: (id: string) => request.delete(`${BASE_URL}/${id}`),

  updateStatus: (payload: TUpdateStaffStatus) =>
    request.post<TUpdateStaffStatus, any>(`${BASE_URL}/IsActive`, payload),
};

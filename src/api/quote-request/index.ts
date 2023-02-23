import { request } from "../method";

export type TCreateQuoteRequest = {
  customerId?: string;
  companyName: string;
  companyTaxCode: string;
  companyProfession: number;
  companyAddress: string;
  companyEmail: string;
  receiverAddress: string;
  curatorId: string;
  curatorName: string;
  curatorDepartmentId: number;
  curatorPhone: string;
  curatorEmail: string;
  requirements: string;
  attachFile: string;
  preOrderDetailCreate: TCreateQuoteRequestProduct[];
};

export type TCreateQuoteRequestProduct = {
  productId: string;
  quantity: number;
  note: string;
};

export type TUpdateQuoteRequest = {
  id: string;
  salesId: string;
  customerId: string;
  curatorId: string;
};

const BASE_URL = "PreOrder";

export const quoteRequest = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),

  getHeaderOrder: () => request.get<any>(`${BASE_URL}/GetHeaderOrder`),

  cancel: (preOrderId: string) =>
    request.post<any, any>(
      `${BASE_URL}/CancelOrder?preOrderId=${preOrderId}&status=4`,
      {}
    ),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),

  uploadFile: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-file`, file),

  create: (payload: TCreateQuoteRequest) =>
    request.post<TCreateQuoteRequest, any>(BASE_URL, payload),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  update: (payload: TUpdateQuoteRequest) => request.put<TUpdateQuoteRequest, any>(`${BASE_URL}/UpdateBranch`, payload)
};

import { request } from "../method";

export type TCreatePreQuote = {
  preOrderId: string;
  branchId: string;
  salesId: string;
  customerId: string;
  curatorId: string;
  curatorName: string;
  curatorDepartmentId: number;
  curatorPhone: string;
  curatorEmail: string;
  requirements: string;
  attachFile: string;
  paymentType: string;
  deliverDate: number;
  expireDate: number;
  receiverAddress: string;
  paymentDocument: string;
  smgNote: string;
  salesNote: string;
  preQuoteDetail: TCreatePreQuoteProduct[];
};

export type TCreatePreQuoteProduct = {
  productId: string;
  quantity: number;
  price: number;
  vat: string;
  totalPrice: number;
  note: string;
};

export type TUpdatePreQuote = Omit<TCreatePreQuote, "preQuoteDetail"> & {
  id: string;
  preQuoteDetailUpdate: TUpdatePreQuoteProduct;
};

export type TUpdatePreQuoteProduct = Omit<
  TCreatePreQuoteProduct,
  "totalPrice"
> & {
  id: string;
};

export type TPreQuoteMailConfirm = {
  code: string;
  title?: string;
  note?: string;
  attachFile?: string;
};

const BASE_URL = "PreQuote";

export const preQuote = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  cancel: (preQuoteId: string) =>
    request.post<any, any>(
      `${BASE_URL}/CancelQuote?preQuoteId=${preQuoteId}`,
      {}
    ),

  getFeedbacks: (preQuoteId: string) =>
    request.get<any>(`${BASE_URL}/GetResponseMail?preQuoteId=${preQuoteId}`),

  create: (payload: TCreatePreQuote) =>
    request.post<TCreatePreQuote, any>(BASE_URL, payload),

  update: (payload: TUpdatePreQuote) =>
    request.put<TUpdatePreQuote, any>(BASE_URL, payload),

  getProductStock: (query: string[]) =>
    request.get<any>(
      `${BASE_URL}/GetProductStock?productIds=${query.join("&productIds=")}`,
      { productIds: query }
    ),

  sendMail: (payload: TSendMailProps) =>
    request.post<TSendMailProps, any>(`${BASE_URL}/SendMail`, payload),

  checkMailCode: (code: string) =>
    request.get<any>(`${BASE_URL}/CheckCodeResponse?code=${code}`),

  mailConfirm: (payload: TPreQuoteMailConfirm) =>
    request.post<any, any>(
      `${BASE_URL}/MailResponse?code=${payload.code}&title=${payload?.title}&note=${payload?.note}&attachFile=${payload?.attachFile}`,
      {}
    ),

  uploadFile: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-file`, file),

  getPreQuoteDetail: (id: string) =>
    request.get<any>(`${BASE_URL}/PreQuoteDetail`, { id }),

  selectProduct: (payload: { id: string; selected: boolean }) =>
    request.post<any, any>(`${BASE_URL}/Selected`, [payload]),
};

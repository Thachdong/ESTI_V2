import { request } from "../method";

export type TCreateMail = {
  subject: string;
  content: string;
  cc: string;
  bcc: string;
};

const BASE_URL = "Notifications";

export const mailToCustomer = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  create: (payload: TCreateMail) =>
    request.post<TCreateMail, any>(BASE_URL, payload),
};

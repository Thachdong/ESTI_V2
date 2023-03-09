import { request } from "../method";

export type TCreateTransaction = {
  accountManagementId: string;
  partner: string;
  explain: string;
  categoryTransactionId: string;
  billNumber: string;
  owe: number;
  moneyCollect: number;
};

const BASE_URL = "Transaction";

export const transaction = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),

  create: (payload: TCreateTransaction) =>
    request.post<TCreateTransaction, any>(BASE_URL, payload),
};

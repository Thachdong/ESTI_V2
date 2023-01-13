import { request } from "../method";

const BASE_URL = "PreOrder";

export const quoteRequest = {
  getList: (params: any) => request.getPagination<any>(BASE_URL, { ...params }),

  getHeaderOrder: () => request.get<any>(`${BASE_URL}/GetHeaderOrder`),

  cancel: (preOrderId: string) =>
    request.post<any, any>(
      `${BASE_URL}/CancelOrder?preOrderId=${preOrderId}&status=4`,
      {}
    ),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`)
};

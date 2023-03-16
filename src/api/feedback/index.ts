import { request } from "../method";

const BASE_URL = "ProductReview";

export const feedback = {
  getList: (params: any) => request.get<any>(BASE_URL, { ...params }),

  approve: (payload: {id: string}) => request.put<{id: string}, any>(`${BASE_URL}/AcceptReview`, payload)
};
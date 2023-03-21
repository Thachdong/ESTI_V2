import { request } from "../method";

const BASE_URL = "Role";

export const role = {
  getAll: () => request.get<any>(BASE_URL),

  getByCode: (code: string) =>
    request.get<any>(`${BASE_URL}/permission/${code}`),
};

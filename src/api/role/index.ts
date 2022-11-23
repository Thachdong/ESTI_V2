import { request } from "../method";

const BASE_URL = "Role";

export const role = {
    getAll: () => request.get(BASE_URL),
}
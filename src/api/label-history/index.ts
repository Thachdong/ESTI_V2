import { request } from "../method";

const BASE_URL = "LabelHistory";

export const labelHistory = {
    getList: (params: any) => request.getPagination(BASE_URL, {...params})
}
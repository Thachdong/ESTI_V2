import { request } from "../method";

type TGetOrderByDaysParams = {
  userId?: string;
  branchId: string;
  fromDate: number;
  toDate: number;
};

const BASE_URL = "Dashboard";

export const dashboard = {
  getSale: (branchId: string) =>
    request.get<any>(`${BASE_URL}/GetHeaderSales?branchId=${branchId}`),

  getOrderByYear: (params: any) =>
    request.get<any>(`${BASE_URL}/GetOrdersInYear`, { ...params }),

  getOrderByDays: (params: TGetOrderByDaysParams) =>
    request.get<any>(`${BASE_URL}/GetOrdersInMonthAndWeek`, { ...params }),

  // API YÊU CẦU KHÔNG TRUYỀN WAREHOUSE CODE
  getWarehouse: (branchId: string) =>
    request.get<any>(`${BASE_URL}/GetWareHouseReport?branchId=${branchId}`),

  getWarehouseByYear: (branchId: string) =>
    request.get<any>(`${BASE_URL}/GetIEWarehouseInYear?branchId=${branchId}`),

  getWarehouseByDays: (params: any) =>
    request.get<any>(`${BASE_URL}/GetIEWarehouseInMonthAndWeek`, { ...params }),

  getProducts: (query: any) =>
    request.getPagination<any>(`${BASE_URL}/GetProductReport`, { ...query }),

  getFinance: (query: any) =>
    request.getPagination<any>(`${BASE_URL}/GetFinancialStatement`, {
      ...query,
    }),
};

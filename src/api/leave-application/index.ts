import { request } from "../method";

export type TLeaveApplication = {
  applicantId: string;
  applicantCode: string;
  applicantName: string;
  startTime: number;
  endTime: number;
  numberOfDay: number;
  season: string;
  headOfDepartment: string;
  headOfDepartmentName: string;
  status: number;
  statusName: string;
  id: string;
  created: number;
  createdBy: string;
  updated: number;
  updatedBy: string;
  active: boolean;
};

export type TLeaveApplicationUpdate = {
  // applicantId: string; api yêu cầu bỏ (danh sách bugs 31/03/2023)
  startTime: number;
  endTime: number;
  numberOfDay: number;
  season: string;
  contentSeason: string;
  headOfDepartment: string;
  status: number;
  attachFile: string;
};

const BASE_URL = "LeaveApplication";

export const leaveApplication = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  create: (payload: TLeaveApplicationUpdate) =>
    request.post<TLeaveApplicationUpdate, any>(BASE_URL, payload),

  update: (payload: TLeaveApplicationUpdate) =>
    request.put<TLeaveApplicationUpdate, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
  confirmLeaveApplication: (params?: { leaveApplicationId: string }) =>
    request.post(`${BASE_URL}/ConfirmLeaveApplication`, undefined, {
      ...params,
    }),

  updateStatus: (payload: { leaveApplicationId: string; status: number }) =>
    request.post<any, any>(
      `${BASE_URL}/ConfirmLeaveApplication?leaveApplicationId=${payload?.leaveApplicationId}&status=${payload?.status}`,
      {}
    ),
};

import { request } from "../method";

export type TRegisterMission = {
  applicant: string;
  applicantCode: string;
  applicantName: string;
  startTime: number;
  endTime: number;
  numberOfDay: number;
  seasonMission: string;
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

export type TRegisterMissionUpdate = {
  // applicantId: string; api yêu cầu bỏ (ds bugs 31/003/2023)
  startTime: number;
  endTime: number;
  numberOfDay: number;
  seasonMission: string;
  contentSeasonMission: string;
  headOfDepartment: string;
  status: number;
  attachFile: string;
};

const BASE_URL = "RegisterMission";

export const registerMission = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  create: (payload: TRegisterMissionUpdate) =>
    request.post<TRegisterMissionUpdate, any>(BASE_URL, payload),

  update: (payload: TRegisterMissionUpdate) =>
    request.put<TRegisterMissionUpdate, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),

  confirmLeaveApplication: (params?: {
    registerMissionId: string;
    status: 1 | 2 | 3 | 4;
  }) =>
    request.post(`${BASE_URL}/ConfirmRegisterMission`, undefined, {
      ...params,
    }),

  getListMailReponse: (params?: { registerMissionId: string }) =>
    request.get<any>(
      `${BASE_URL}/MissionResponseList/${params?.registerMissionId}`,
      {
        ...params,
      }
    ),

  createMailReponse: (params?: { registerMissionId: string }) =>
    request.post(`${BASE_URL}/RegisterMissionResponse`, undefined, {
      ...params,
    }),

  uploadFile: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-file`, file),
};

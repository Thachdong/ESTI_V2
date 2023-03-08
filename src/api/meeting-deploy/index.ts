import { request } from "../method";

export type TMeetingDeploy = {
  status: number;
  statusName: string;
  department: number;
  departmentName: string;
  startTime: number;
  endTime: number;
  descriptionJob: string;
  proposer: string;
  proposerName: string;
  secretary: string;
  secretaryName: string;
  participant: string;
  numberOfpt: number;
  isPaticipate: number;
  confirmParticipation: string;
  id: string;
  created: number;
  createdBy: string;
  updated: number;
  updatedBy: string;
  active: boolean;
};

export type TMeetingDeployUpdate = {
  department: number;
  startTime: number;
  endTime: number;
  descriptionJob: string;
  contentDescriptionJob: string;
  proposer: string;
  secretary: string;
  participant: string;
  attachFile: string;
};

const BASE_URL = "MeetingDeploy";

export const meetingDeploy = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  create: (payload: TMeetingDeployUpdate) =>
    request.post<TMeetingDeployUpdate, any>(BASE_URL, payload),

  update: (payload: TMeetingDeployUpdate) =>
    request.put<TMeetingDeployUpdate, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
  uploadFile: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-file`, file),
  updateStatus: (payload: { meetingDeployId: string; status: number }) =>
    request.post(`${BASE_URL}/UpdateStatus`, undefined, payload),
  getListMailReponse: (params?: { meetingDeployId: string }) =>
    request.get<any>(
      `${BASE_URL}/DiscussionResponseList/${params?.meetingDeployId}`,
      {
        ...params,
      }
    ),
  createMailReponse: (params?: { meetingDeployId: string }) =>
    request.post(`${BASE_URL}/MeetingDeployResponse`, undefined, {
      ...params,
    }),
  acceptMetting: (params?: { meetingDeployId: string }) =>
    request.post(`${BASE_URL}/IsConfimPaticipate`, undefined, {
      ...params,
    }),
};

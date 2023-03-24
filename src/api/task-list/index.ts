import { request } from "../method";

export type TTaskList = {
  status: number;
  statusName: string;
  jobGroup: string;
  jobGroupName: string;
  level: number;
  performDate: number;
  descriptionsJob: string;
  petitioner: string;
  petitionerName: string;
  inChargeOfPerson: string;
  inChargeOfPersonName: string;
  co_Participant: string;
  completeDate: number;
  id: string;
  created: number;
  createdBy: string;
  updated: number;
  updatedBy: string;
  active: boolean;
};

export type TTaskListUpdate = {
  status: number;
  jobGroup: string;
  level: number;
  performDate: number;
  descriptionsJob: string;
  contentDescriptions: string;
  attachFile: string;
  petitioner: string;
  inChargeOfPerson: string;
  co_Participant: string;
  completeDate: number;
};

const BASE_URL = "TaskList";

export const taskList = {
  getList: (params?: any) =>
    request.getPagination<any>(BASE_URL, { ...params }),

  getById: (id: string) => request.get<any>(`${BASE_URL}/${id}`),

  create: (payload: TTaskListUpdate) =>
    request.post<TTaskListUpdate, any>(BASE_URL, payload),

  update: (payload: TTaskListUpdate) =>
    request.put<TTaskListUpdate, any>(BASE_URL, payload),

  delete: (id: string) => request.delete(`${BASE_URL}/${id}`),

  uploadFile: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-file`, file),

  updateStatus: (payload: { id: string; status: number }) =>
    request.post(`${BASE_URL}/UpdateStatus`, undefined, payload),

  getListMailReponse: (params?: { taskListId: string }) =>
    request.get<any>(`${BASE_URL}/MailResponseList/${params?.taskListId}`, {
      ...params,
    }),
  createMailReponse: (params?: any) =>
    request.post(`${BASE_URL}/MailResponse`, undefined, {
      ...params,
    }),
};

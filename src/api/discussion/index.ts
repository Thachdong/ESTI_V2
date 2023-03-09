import { request } from "../method";

export type TDiscussion = {
  topic: string;
  topicName: string;
  level: number;
  levelName: string;
  startTime: number;
  endTime: number;
  descriptionJob: string;
  proposer: string;
  proposerName: string;
  participants: string;
  status: number;
  statusName: string;
  id: string;
  created: number;
  createdBy: string;
  updated: number;
  updatedBy: number;
  active: boolean;
};

export type TDiscussionUpdate = {
  topic: string;
  level: number;
  startTime: number;
  endTime: number;
  descriptionJob: string;
  contentDescriptionJob: string;
  proposer: string;
  participants: string;
  status: number;
  attachFile: string;
};

const BASE_URL = "Discussion";

export const discussion = {
  getList: (params: any) =>
    request.getPagination<TDiscussion>(BASE_URL, { ...params }),
  create: (params: TDiscussionUpdate) => request.post(BASE_URL, params),
  update: (params: TDiscussionUpdate) =>
    request.put<TDiscussionUpdate, null>(BASE_URL, params),
  delete: (id: string) => request.delete(BASE_URL + "/" + id),
  cancelDiscussion: (params: { discussionId: string }) =>
    request.post(BASE_URL + "/" + "CancelDiscussion", undefined, {
      ...params,
    }),
  uploadFile: (file: FormData) =>
    request.post<FormData, string>(`${BASE_URL}/upload-file`, file),
  getListMailReponse: (params?: { discussionId: string }) =>
    request.get<any>(
      `${BASE_URL}/DiscussionResponseList/${params?.discussionId}`,
      {
        ...params,
      }
    ),
  createMailReponse: (params?: { discussionId: string }) =>
    request.post(`${BASE_URL}/DiscussResponse`, undefined, {
      ...params,
    }),
};

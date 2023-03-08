import { request } from "../method";

export type TCreateCurator = {
    userName: string
    uid: string // id of customer that contact belong to
    curatorName: string
    curatorDepartment: number
    curatorGender: number
    birthDay: number
    curatorPhone: string
    zaloNumber: string
    curatorEmail: string
    curatorAddress: string
    typeAccount: string
    typeDiscount: number
    receiver: TCreateCuratorReceiver
    billRecipientCreate: TCreateCuratorBill
  }
  
  export type TCreateCuratorReceiver = {
    fullName: string
    phone1: string
    phone2: string
    address: string
    email: string
    note: string
  }
  
  export type TCreateCuratorBill = {
    fullName: string
    phone: string
    email: string
    note: string
  }

const BASE_URL = "Curator";


export const curator = {
    create: (payload: any) => request.post<any, any>(BASE_URL, payload),

    delete: (id: string) => request.delete(`${BASE_URL}/${id}`),
}
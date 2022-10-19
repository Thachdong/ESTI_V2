type TBaseResponse<TData> = {
  Data: TData;
  ResultCode: number;
  ResultMessage: string;
  Success: boolean;
};

type TPaginationResponse<TItem> = {
  Items: TItem[];
  PageIndex: number;
  PageSize: number;
  TotalItem: number;
  TotalPage: number;
};
type TBaseResponse<TData> = {
  data: TData;
  resultCode: number;
  resultMessage: string;
  success: boolean;
};

type TPaginationResponse<TItem> = {
  items: TItem[];
  pageIndex: number;
  pageSize: number;
  totalItem: number;
  totalPage: number;
};
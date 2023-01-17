import { TBranch } from "src/api";
import { TGridColDef } from "~types/data-grid";

export const branchColumns: TGridColDef<TBranch>[] = [
  {
    field: "code",
    headerName: "MÃ CN",
    flex: 1,
    isFilter: false,
    isSort: false,
  },
  {
    field: "name",
    headerName: "TÊN CN",
    flex: 1,
    isFilter: false,
    isSort: false,
  },
  {
    field: "address",
    headerName: "ĐỊA CHỈ",
    flex: 2,
    isFilter: false,
    isSort: false,
  },
  {
    field: "phone",
    headerName: "SỐ ĐIỆN THOẠI",
    flex: 1,
    isFilter: false,
    isSort: false,
  },
  {
    field: "email",
    headerName: "EMAIL",
    flex: 1,
    isFilter: false,
    isSort: false,
  },
];

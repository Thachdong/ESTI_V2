import { TBranch } from "src/api";
import { TGridColDef } from "~types/data-grid";

export const branchColumns: TGridColDef<TBranch>[] = [
  {
    field: "code",
    headerName: "MÃ CN",
    minWidth: 100,
    isFilter: false,
    isSort: false,
  },
  {
    field: "name",
    headerName: "TÊN CN",
    flex: 1,
    minWidth: 200,
    isFilter: false,
    isSort: false,
  },
  {
    field: "address",
    headerName: "ĐỊA CHỈ",
    flex: 1,
    minWidth: 200,
    isFilter: false,
    isSort: false,
  },
  {
    field: "phone",
    headerName: "SỐ ĐIỆN THOẠI",
    minWidth: 150,
    isFilter: false,
    isSort: false,
  },
  {
    field: "email",
    headerName: "EMAIL",
    minWidth: 200,
    isFilter: false,
    isSort: false,
  },
];

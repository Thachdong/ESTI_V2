import { TBranch } from "src/api";
import { TGridColDef } from "~types/data-grid";

export const warehouseColumns: TGridColDef<TBranch>[] = [
  {
    field: "code",
    headerName: "MÃ KHO",
    flex: 1,
    isFilter: false,
    isSort: false,
  },
  {
    field: "branchCode",
    headerName: "MÃ CN",
    flex: 1,
    isFilter: false,
    isSort: false,
  },
  {
    field: "position",
    headerName: "SỐ VỊ TRÍ",
    flex: 1,
    isFilter: false,
    isSort: false,
  },
];

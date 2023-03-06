import moment from "moment";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const opinionColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    minWidth: 50,
    renderCell: ({ row }) =>
      row?.created ? moment(row?.created).format("DD/MM/YYYY") : "",
  },
  {
    field: "opinionGroup",
    headerName: "Nhóm nhu cầu",
    flex: 1,
  },
  {
    field: "level",
    headerName: "Mức độ (tính trên thang điểm 10)",
    flex: 1,
  },
];

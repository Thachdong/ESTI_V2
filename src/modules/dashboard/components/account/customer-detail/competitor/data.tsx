import moment from "moment";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const competitorColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    minWidth: 50,
    renderCell: ({ row }) =>
      row?.created ? moment(row?.created).format("DD/MM/YYYY") : "",
  },
  {
    field: "competitorName",
    headerName: "Tên",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Mô tả",
    flex: 2,
  },
];

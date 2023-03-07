import moment from "moment";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const demandColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    minWidth: 50,
    renderCell: ({ row }) =>
      row?.created ? moment(row?.created).format("DD/MM/YYYY") : "",
  },
  {
    field: "demand",
    headerName: "Nhu cầu",
    flex: 1,
  },
  {
    field: "turnover",
    headerName: "Doanh thu năm",
    flex: 1,
    renderCell: ({ row }) => _format.getVND(row?.turnover),
  },
];

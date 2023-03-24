import moment from "moment";
import { TCustomerType } from "src/api/customer-type";
import { accountTypeOptions } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const customerTypeColumns: TGridColDef<TCustomerType>[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    flex: 1,
    renderCell: ({ row }) => moment(row.created).format("DD/MM/YYYY"),
  },
  {
    field: "levelName",
    headerName: "Tên",
    flex: 1,
  },
  {
    field: "accountType",
    headerName: "Nhóm",
    flex: 1,
    renderCell: ({ row }) =>
      row.accountType
        ? accountTypeOptions[row.accountType - 1]?.name
        : "Không xác định",
  },
  {
    field: "discount",
    headerName: "Giảm giá (%)",
    flex: 1,
  },
  {
    field: "point",
    headerName: "Điểm",
    flex: 1,
  },
];

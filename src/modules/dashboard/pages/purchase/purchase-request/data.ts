import moment from "moment";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const purchaseRequestColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "NGÀY TẠO",
    minWidth: 100,
    renderCell: ({ row }) =>
      row.created ? moment(row.created).format("DD/MM/YYYY") : "__",
  },
  { field: "code", headerName: "Mã MH", minWidth: 100 },
  { field: "supplierCode", headerName: "Mã NCC", minWidth: 100 },
  { field: "supplierName", headerName: "Tên NCC", minWidth: 200, flex: 1 },
  {
    field: "totalPrice",
    headerName: "Giá trị đơn hàng",
    minWidth: 160,
    renderCell: ({ row }) => _format.getVND(row?.totalPrice),
  },
  {
    field: "importPrice",
    headerName: "Giá trị nhập kho",
    minWidth: 160,
    renderCell: ({ row }) => _format.getVND(row?.importPrice),
  },
  {
    field: "totalBillPrice",
    headerName: "Đã thanh toán",
    minWidth: 160,
    renderCell: ({ row }) => _format.getVND(row?.totalBillPrice),
  },
  { field: "branchCode", headerName: "Chi nhánh", minWidth: 120 },
  { field: "salesAdminCode", headerName: "Sale admin", minWidth: 120 },
  { field: "statusName", headerName: "Trạng thái", minWidth: 120 },
];

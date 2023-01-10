import moment from "moment";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const purchasePlanColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "NGÀY TẠO",
    minWidth: 100,
    renderCell: ({ row }) =>
      row.created ? moment(row.created).format("DD/MM/YYYY") : "__",
  },
  { field: "branchCode", headerName: "Chi nhánh", minWidth: 100 },
  { field: "mainOrderCodes", headerName: "Mã đơn hàng", minWidth: 100 },
  { field: "productCode", headerName: "Mã SP", minWidth: 120 },
  {
    field: "productName",
    headerName: "Tên SP",
    minWidth: 200,
  },
  {
    field: "quantity",
    headerName: "SL",
    minWidth: 50,
  },
  {
    field: "supplierCode",
    headerName: "Mã NCC",
    minWidth: 120,
  },
  { field: "statusName", headerName: "Trạng thái", minWidth: 120 },
  { field: "supplierName", headerName: "Tên NCC", minWidth: 200, flex: 1 },
];

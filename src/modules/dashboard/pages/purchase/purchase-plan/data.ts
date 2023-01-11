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

export const dialogColumns: TGridColDef[] = [
  {
    field: "no",
    headerName: "STT",
    align: "center",
    width: 50
  },
  { field: "productCode", headerName: "MÃ SP", minWidth: 120 },
  { field: "productName", headerName: "TÊN SP", minWidth: 120, flex: 1 },
  { field: "manufactor", headerName: "HÃNG SẢN XUẤT", minWidth: 150 },
  { field: "specs", headerName: "QUY CÁCH", minWidth: 100 },
  { field: "unitName", headerName: "ĐƠN VỊ", minWidth: 100 },
  { field: "quantity", headerName: "SỐ LƯỢNG", minWidth: 100 },
  { field: "price", headerName: "ĐƠN GIÁ", minWidth: 100, renderCell: ({row}) => _format.getVND(row?.price) },
  { field: "vat", headerName: "VAT %", minWidth: 75 },
  { field: "totalPrice", headerName: "THÀNH TIỀN", minWidth: 120 },
  { field: "note", headerName: "GHI CHÚ", minWidth: 120 },
];

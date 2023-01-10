import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { TWarehouseExport } from "src/api";
import { _format } from "~modules-core/utility/fomat";

export const orderColumns: GridColDef<TWarehouseExport>[] = [
  {
    field: "created",
    headerName: "NGÀY TẠO",
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
    minWidth: 200,
  },
  { field: "mainOrderCode", headerName: "MÃ ĐƠN HÀNG", minWidth: 200 },
  { field: "customerCode", headerName: "MÃ KHÁCH HÀNG", minWidth: 200 },
  {
    field: "companyName",
    headerName: "TÊN KHÁCH HÀNG",
    minWidth: 200,
  },
  {
    field: "totalPrice",
    headerName: "TỔNG GIÁ TRỊ",
    minWidth: 200,
    renderCell: (params) => _format.getVND(params?.row?.totalPrice),
  },
  {
    field: "exportPrice",
    headerName: "GIÁ TRỊ ĐÃ GIAO",
    minWidth: 200,
    renderCell: (params) => _format.getVND(params?.row?.exportPrice),
  },
  {
    field: "totalBillPrice",
    headerName: "GIÁ TRỊ ĐÃ XUẤT HĐ",
    minWidth: 200,
    renderCell: (params) => _format.getVND(params?.row?.totalBillPrice),
  },
  { field: "branchCode", headerName: "CHI NHÁNH", minWidth: 100 },
  { field: "salesCode", headerName: "SALES", minWidth: 200 },
  { field: "statusName", headerName: "TRẠNG THÁI", minWidth: 200 },
];

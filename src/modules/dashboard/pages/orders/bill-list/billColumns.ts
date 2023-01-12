import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { TWarehouseExport } from "src/api";
import { _format } from "~modules-core/utility/fomat";

export const billColumns: GridColDef<TWarehouseExport>[] = [
  {
    field: "code",
    headerName: "NGÀY TẠO",
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
    minWidth: 200,
  },
  { field: "billCode", headerName: "MÃ HOÁ ĐƠN", minWidth: 200 },
  { field: "customerCode", headerName: "MÃ KHÁCH HÀNG", minWidth: 200 },
  {
    field: "companyName",
    headerName: "TÊN KHÁCH HÀNG",
    minWidth: 200,
  },
  {
    field: "totalPrice",
    headerName: "GIÁ TRỊ HOÁ ĐƠN",
    minWidth: 200,
    renderCell: (params) => _format.getVND(params?.row?.totalPrice),
  },
  {
    field: "paid",
    headerName: "ĐÃ THANH TOÁN",
    minWidth: 200,
    renderCell: (params) => _format.getVND(params?.row?.paid),
  },
  {
    field: "unPaid",
    headerName: "CÒN PHẢI THU",
    minWidth: 200,
    renderCell: (params) => _format.getVND(params?.row?.unPaid),
  },
  { field: "branchCode", headerName: "CHI NHÁNH", minWidth: 200 },
  { field: "accountCode", headerName: "NHÂN VIÊN KD", minWidth: 200 },
  { field: "statusName", headerName: "TRẠNG THÁI", minWidth: 200 },
];

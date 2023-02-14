import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { TWarehouseExport } from "src/api";
import { _format } from "~modules-core/utility/fomat";

export const billColumns: GridColDef<TWarehouseExport>[] = [
  {
    field: "created",
    headerName: "NGÀY TẠO",
    renderCell: ({row}) =>
      row.created
        ? moment(row.created).format("DD/MM/YYYY")
        : "__",
    minWidth: 100,
  },
  { field: "billCode", headerName: "MÃ HOÁ ĐƠN", minWidth: 150 },
  { field: "customerCode", headerName: "MÃ KHÁCH HÀNG", minWidth: 150 },
  {
    field: "companyName",
    headerName: "TÊN KHÁCH HÀNG",
    minWidth: 250,
    flex: 1
  },
  {
    field: "totalPrice",
    headerName: "GIÁ TRỊ HOÁ ĐƠN",
    minWidth: 150,
    renderCell: ({row}) => _format.getVND(row?.totalPrice),
  },
  {
    field: "paid",
    headerName: "ĐÃ THANH TOÁN",
    minWidth: 150,
    renderCell: ({row}) => _format.getVND(row?.paid),
  },
  {
    field: "unPaid",
    headerName: "CÒN PHẢI THU",
    minWidth: 150,
    renderCell: ({row}) => _format.getVND(row?.unPaid),
  },
  { field: "branchCode", headerName: "CHI NHÁNH", minWidth: 150 },
  { field: "salesCode", headerName: "NHÂN VIÊN KD", minWidth: 150 },
  { field: "statusName", headerName: "TRẠNG THÁI", minWidth: 150 },
];

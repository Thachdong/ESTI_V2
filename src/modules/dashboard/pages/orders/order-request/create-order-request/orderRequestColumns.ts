import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";

export const orderRequestColumns: GridColDef<any>[] = [
  {
    field: "code",
    headerName: "STT",
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
    minWidth: 150,
  },
  { field: "branchCode", headerName: "Mã SP", minWidth: 150 },
  { field: "mainOrderCode", headerName: "Hãng SX", minWidth: 200 },
  {
    field: "warehouseSessionCode",
    headerName: "Quy cách",
    minWidth: 200,
  },
  { field: "nameProduct", headerName: "Đơn vị", minWidth: 150 },
  { field: "count", headerName: "Số lượng", minWidth: 150 },
  { field: "codeSupplier", headerName: "Giá", minWidth: 200 },
  { field: "branchId", headerName: "Thuế GTGT", minWidth: 150 },
  { field: "nameSupplier", headerName: "Thành tiền", minWidth: 200 },
  { field: "status", headerName: "Ghi chú", minWidth: 150 },
];

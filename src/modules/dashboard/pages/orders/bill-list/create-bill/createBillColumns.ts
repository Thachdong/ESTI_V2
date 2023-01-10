import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";

export const createBillColumns: GridColDef<any>[] = [
  {
    field: "code",
    headerName: "STT",
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
    minWidth: 50,
  },
  { field: "branchCode", headerName: "Mã sản phẩm", minWidth: 200 },
  { field: "mainOrderCode", headerName: "Tên sản phẩm", minWidth: 200 },
  { field: "warehouseSessionCode", headerName: "Nơi sản xuất", minWidth: 200 },
  { field: "nameProduct", headerName: "Xuất sứ", minWidth: 200 },
  { field: "count", headerName: "Quy cách", minWidth: 200 },
  { field: "codeSupplier", headerName: "Đơn vị tính", minWidth: 200 },
  { field: "branchId", headerName: "Số lượng", minWidth: 200 },
  { field: "nameSupplier", headerName: "Đơn giá", minWidth: 200 },
  { field: "status", headerName: "Thuế GTGT", minWidth: 200 },
  { field: "monney", headerName: "Thành tiền", minWidth: 200 },
];

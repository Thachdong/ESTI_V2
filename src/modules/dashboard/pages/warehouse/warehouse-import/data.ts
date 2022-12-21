import moment from "moment";
import { TWarehouseExport } from "src/api";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const importWarehouseColumns: TGridColDef<TWarehouseExport>[] = [
  {
    field: "code",
    headerName: "NGÀY TẠO",
    type: "date",
    minWidth: 150,
    filterKey: "createdAt",
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
  },
  { field: "branchCode", headerName: "CHI NHÁNH", minWidth: 120 },
  { field: "productOrderCode", headerName: "MÃ ĐƠN MUA HÀNG", minWidth: 170 },
  { field: "warehouseSessionCode", headerName: "MÃ NHẬP KHO", minWidth: 150 },
  { field: "supplierCode", headerName: "MÃ NCC", minWidth: 120 },
  {
    field: "supplierName",
    headerName: "TÊN NHÀ CUNG CẤP",
    minWidth: 170,
    flex: 1,
  },
  {
    field: "totalPrice",
    headerName: "GIÁ TRỊ NHẬP KHO",
    minWidth: 170,
    renderCell: (params) => _format.getVND(params.row.totalPrice),
  },
  { field: "deliveryCode", headerName: "GIAO NHẬN", minWidth: 120 },
  {
    field: "receiverBillName",
    headerName: "TRẠNG THÁI HOÁ ĐƠN",
    minWidth: 180,
  },
  {
    field: "importStatusName",
    headerName: "TRẠNG THÁI NHẬP KHO",
    minWidth: 190,
  },
];

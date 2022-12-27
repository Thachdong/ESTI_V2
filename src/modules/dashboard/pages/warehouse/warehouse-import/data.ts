import moment from "moment";
import { TWarehouseExport } from "src/api";
import { warehouseImportStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const importWarehouseColumns: TGridColDef<TWarehouseExport>[] = [
  {
    field: "code",
    headerName: "NGÀY TẠO",
    type: "date",
    minWidth: 150,
    filterKey: "createdDate",
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "branchCode",
    headerName: "CHI NHÁNH",
    minWidth: 120,
    filterKey: "branchCode",
  },
  {
    field: "productOrderCode",
    headerName: "MÃ ĐƠN MUA HÀNG",
    minWidth: 170,
    filterKey: "productOrderCode",
  },
  {
    field: "warehouseSessionCode",
    headerName: "MÃ NHẬP KHO",
    minWidth: 150,
    filterKey: "sessionCode",
  },
  {
    field: "supplierCode",
    headerName: "MÃ NCC",
    minWidth: 120,
    filterKey: "supplierCode",
  },
  {
    field: "supplierName",
    headerName: "TÊN NHÀ CUNG CẤP",
    minWidth: 170,
    flex: 1,
    filterKey: "supplierName",
  },
  {
    field: "totalPrice",
    headerName: "GIÁ TRỊ NHẬP KHO",
    minWidth: 170,
    filterKey: "totalPrice",
    renderCell: (params) => _format.getVND(params.row.totalPrice),
  },
  {
    field: "deliveryCode",
    headerName: "GIAO NHẬN",
    minWidth: 120,
    filterKey: "deliveryCode",
  },
  {
    field: "receiverBillName",
    headerName: "TRẠNG THÁI HOÁ ĐƠN",
    minWidth: 180,
    filterKey: "receivedBill",
    type: "select",
    options: [
      { value: "true", label: "Đã nhận" },
      { value: "false", label: "Chưa nhận" },
    ],
  },
  {
    field: "importStatusName",
    headerName: "TRẠNG THÁI NHẬP KHO",
    minWidth: 190,
    filterKey: "importStatus",
    type: "select",
    options: warehouseImportStatus
  },
];

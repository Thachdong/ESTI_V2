import moment from "moment";
import { StatusChip } from "~modules-core/components";
import { warehouseImportStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const importWarehouseColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "NGÀY TẠO",
    type: "date",
    minWidth: 150,
    filterKey: "createdDate",
    sortAscValue: 12,
    sortDescValue: 2,
    renderCell: ({ row }) =>
      row.created ? moment(row.created).format("DD/MM/YYYY") : "__",
  },
  {
    field: "branchCode",
    headerName: "CHI NHÁNH",
    minWidth: 120,
    filterKey: "branchCode",
    sortAscValue: 11,
    sortDescValue: 1,
  },
  {
    field: "productOrderCode",
    headerName: "MÃ ĐƠN MUA HÀNG",
    minWidth: 170,
    filterKey: "productOrderCode",
    sortAscValue: 13,
    sortDescValue: 3,
  },
  {
    field: "warehouseSessionCode",
    headerName: "MÃ NHẬP KHO",
    minWidth: 150,
    filterKey: "sessionCode",
    sortAscValue: 14,
    sortDescValue: 4,
  },
  {
    field: "supplierCode",
    headerName: "MÃ NCC",
    minWidth: 120,
    filterKey: "supplierCode",
    sortAscValue: 15,
    sortDescValue: 5,
  },
  {
    field: "supplierName",
    headerName: "TÊN NHÀ CUNG CẤP",
    minWidth: 170,
    flex: 1,
    filterKey: "supplierName",
    sortAscValue: 16,
    sortDescValue: 6,
  },
  {
    field: "totalPrice",
    headerName: "GIÁ TRỊ NHẬP KHO",
    minWidth: 170,
    filterKey: "totalPrice",
    renderCell: (params) => _format.getVND(params.row.totalPrice),
    sortAscValue: 17,
    sortDescValue: 7,
  },
  {
    field: "stockerCode",
    headerName: "Thủ kho",
    minWidth: 120,
    filterKey: "stockerCode",
    sortAscValue: 21,
    sortDescValue: 20,
  },
  {
    field: "deliveryCode",
    headerName: "GIAO NHẬN",
    minWidth: 120,
    filterKey: "deliveryCode",
    sortAscValue: 18,
    sortDescValue: 8,
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
    sortAscValue: 19,
    sortDescValue: 9,
  },
  {
    field: "importStatusName",
    headerName: "TRẠNG THÁI NHẬP KHO",
    minWidth: 190,
    filterKey: "importStatus",
    type: "select",
    options: warehouseImportStatus,
    isSort: false,
    renderCell: ({row}) => <StatusChip status={row?.importStatus} label={row?.importStatusName} />
  },
];

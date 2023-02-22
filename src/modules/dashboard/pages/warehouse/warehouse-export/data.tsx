import moment from "moment";
import { TWarehouseExport } from "src/api";
import { StatusChip } from "~modules-core/components";
import { warehouseExportStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const warehouseExportColumns: TGridColDef<TWarehouseExport>[] = [
  {
    field: "created",
    headerName: "NGÀY TẠO",
    minWidth: 110,
    type: "date",
    sortAscValue: 12,
    sortDescValue: 2,
    filterKey: "createdDate",
    renderCell: ({ row }) =>
      row.created ? moment(row.created).format("DD/MM/YYYY") : "__",
  },
  {
    field: "branchCode",
    headerName: "CHI NHÁNH",
    minWidth: 120,
    sortAscValue: 11,
    sortDescValue: 1,
    filterKey: "branchCode",
  },
  {
    field: "mainOrderCode",
    headerName: "MÃ ĐƠN HÀNG",
    minWidth: 140,
    sortAscValue: 13,
    sortDescValue: 3,
    filterKey: "mainOrderCode",
  },
  {
    field: "warehouseSessionCode",
    headerName: "MÃ XUẤT KHO",
    minWidth: 130,
    sortAscValue: 14,
    sortDescValue: 4,
    filterKey: "sessionCode",
  },
  {
    field: "customerCode",
    headerName: "MÃ KH",
    minWidth: 100,
    sortAscValue: 15,
    sortDescValue: 5,
    filterKey: "customerCode",
  },
  {
    field: "companyName",
    headerName: "TÊN KHÁCH HÀNG",
    minWidth: 160,
    flex: 1,
    sortAscValue: 16,
    sortDescValue: 6,
    filterKey: "companyName",
  },
  {
    field: "totalPrice",
    headerName: "GIÁ TRỊ XUẤT KHO",
    renderCell: ({ row }) => _format.getVND(row.totalPrice),
    minWidth: 150,
    sortAscValue: 17,
    sortDescValue: 7,
    filterKey: "totalPrice",
  },
  {
    field: "deliveryCode",
    headerName: "GIAO NHẬN",
    minWidth: 110,
    sortAscValue: 18,
    sortDescValue: 8,
    filterKey: "deliveryCode",
  },
  {
    field: "exportStatusName",
    headerName: "TRẠNG THÁI",
    minWidth: 150,
    type: "select",
    options: warehouseExportStatus,
    sortAscValue: 19,
    sortDescValue: 9,
    filterKey: "exportStatus",
    renderCell: ({row}) => {
      const {exportStatusName, exportStatus = 0} = row || {};

      const colors = ["default", "primary", "secondary", "success", "warning", "error"]
      
      return <StatusChip status={exportStatus} label={exportStatusName} color={colors[+exportStatus] as any} />
    }
  },
];

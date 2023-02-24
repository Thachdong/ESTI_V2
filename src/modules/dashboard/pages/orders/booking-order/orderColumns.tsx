import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { StatusChip } from "~modules-core/components";
import { orderStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const orderColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "NGÀY TẠO",
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
    minWidth: 150,
    sortAscValue: 12,
    sortDescValue: 0,
    filterKey: "created",
  },
  {
    field: "mainOrderCode",
    headerName: "MÃ ĐH",
    minWidth: 120,
    sortAscValue: 11,
    sortDescValue: 1,
    filterKey: "mainOrderCode",
  },
  {
    field: "customerCode",
    headerName: "MÃ KH",
    minWidth: 120,
    sortAscValue: 13,
    sortDescValue: 2,
    filterKey: "code",
  },
  {
    field: "companyName",
    headerName: "TÊN KH",
    minWidth: 120,
    flex: 1,
    sortAscValue: 14,
    sortDescValue: 3,
    filterKey: "name",
  },
  {
    field: "totalPrice",
    headerName: "TỔNG GT",
    minWidth: 150,
    renderCell: (params) => _format.getVND(params?.row?.totalPrice),
    sortAscValue: 15,
    sortDescValue: 4,
    filterKey: "",
  },
  {
    field: "exportPrice",
    headerName: "GT ĐÃ GIAO",
    minWidth: 150,
    renderCell: (params) => _format.getVND(params?.row?.exportPrice),
    sortAscValue: 16,
    sortDescValue: 5,
    filterKey: "exportPrice",
  },
  {
    field: "totalBillPrice",
    headerName: "GT ĐÃ XUẤT HĐ",
    minWidth: 150,
    renderCell: (params) => _format.getVND(params?.row?.totalBillPrice),
    sortAscValue: 17,
    sortDescValue: 6,
    filterKey: "totalBillPrice",
  },
  {
    field: "branchCode",
    headerName: "CHI NHÁNH",
    minWidth: 120,
    sortAscValue: 19,
    sortDescValue: 8,
    filterKey: "branchCode",
  },
  {
    field: "salesCode",
    headerName: "SALES",
    minWidth: 120,
    sortAscValue: 20,
    sortDescValue: 9,
    filterKey: "salesId",
  },
  {
    field: "statusName",
    headerName: "TRẠNG THÁI",
    minWidth: 120,
    sortAscValue: 21,
    sortDescValue: 10,
    filterKey: "status",
    type: "select",
    options: orderStatus,
    renderCell: ({ row }) => {
      const colors = ["default", "info", "success", "error"];
      return (
        <StatusChip
          label={row?.statusName}
          status={row?.status}
          color={colors[row?.status - 1] as any}
        />
      );
    },
  },
];

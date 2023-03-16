import moment from "moment";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const financeColumns: TGridColDef[] = [
  {
    field: "userCreated",
    headerName: "Ngày tạo TK",
    minWidth: 100,
    isSort: false,
    renderCell: ({ row }) =>
      !!row?.userCreated ? moment(row?.userCreated).format("DD/MM/YYYY") : "__",
  },
  {
    field: "customerCode",
    headerName: "Mã KH",
    minWidth: 150,
    flex: 1,
    isSort: false,
  },
  {
    field: "customerName",
    headerName: "Tên KH",
    minWidth: 150,
    isSort: false,
  },
  {
    field: "lastPurchaseDate",
    headerName: "Ngày mua hàng gần đây",
    minWidth: 175,
    isSort: false,
    renderCell: ({ row }) =>
      !!row?.lastPurchaseDate
        ? moment(row?.lastPurchaseDate).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "totalMainOrder",
    headerName: "SL đơn hàng",
    minWidth: 100,
    isSort: false,
  },
  {
    field: "totalPrice",
    headerName: "Tổng GT giao dịch",
    minWidth: 150,
    isSort: false,
    renderCell: ({ row }) => _format.getVND(row?.sold),
  },
  {
    field: "totalSales",
    headerName: "Tổng công nợ",
    minWidth: 150,
    isSort: false,
    renderCell: ({ row }) => _format.getVND(row?.totalSales),
  },
];

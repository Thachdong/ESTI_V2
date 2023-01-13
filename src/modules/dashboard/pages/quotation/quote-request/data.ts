import moment from "moment";
import { quoteOrderStatus } from "~modules-core/constance";
import { TGridColDef } from "~types/data-grid";

export const quotationRequestColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    type: "date",
    minWidth: 100,
    filterKey: "createdDate",
    sortAscValue: 0,
    sortDescValue: 9,
    renderCell: ({ row }) =>
      row.created ? moment(row.created).format("DD/MM/YYYY") : "__",
  },
  {
    field: "preOrderCode",
    headerName: "Mã yêu cầu",
    minWidth: 125,
    filterKey: "preOrderCode",
    sortAscValue: 8,
    sortDescValue: 1,
  },
  {
    field: "customerCode",
    headerName: "Mã KH",
    minWidth: 125,
    filterKey: "customerCode",
    sortAscValue: 10,
    sortDescValue: 2,
  },
  {
    field: "companyName",
    headerName: "Tên KH",
    flex: 1,
    minWidth: 125,
    filterKey: "companyName",
    sortAscValue: 11,
    sortDescValue: 3,
  },
  {
    field: "branchCode",
    headerName: "Chi nhánh",
    minWidth: 125,
    filterKey: "branchCode",
    sortAscValue: 13,
    sortDescValue: 5,
  },
  {
    field: "preOrderStatusName",
    headerName: "Trạng thái YC",
    minWidth: 150,
    filterKey: "status",
    sortAscValue: 15,
    sortDescValue: 7,
    type: "select",
    options: quoteOrderStatus
  },
];

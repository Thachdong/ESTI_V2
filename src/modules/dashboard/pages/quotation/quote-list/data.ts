import moment from "moment";
import { quoteStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const quoteListColumns: TGridColDef[] = [
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
    field: "preQuoteCode",
    headerName: "Mã báo giá",
    minWidth: 125,
    filterKey: "quoteCode",
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
    field: "totalPrice",
    headerName: "Tổng giá trị",
    minWidth: 125,
    isFilter: false,
    sortAscValue: 12,
    sortDescValue: 4,
    renderCell: ({row}) => _format.getVND(row.totalPrice)
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
    field: "salesCode",
    headerName: "Nhân viên sale",
    minWidth: 125,
    filterKey: "salesCode",
    sortAscValue: 13,
    sortDescValue: 5,
  },
  {
    field: "status",
    headerName: "Trạng thái YC",
    minWidth: 150,
    filterKey: "status",
    sortAscValue: 15,
    sortDescValue: 7,
    type: "select",
    options: quoteStatus,
    renderCell: ({row}) => quoteStatus.find(status => status.value === row?.status)?.label
  },
];

import moment from "moment";
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
    flex: 1,
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
    field: "accountCode",
    headerName: "Mã NLH",
    flex: 1,
    minWidth: 125,
    filterKey: "curatorAccount",
    sortAscValue: 19,
    sortDescValue: 16,
  },
  {
    field: "curatorName",
    headerName: "Tên NLH",
    flex: 1,
    minWidth: 125,
    filterKey: "curatorName",
    sortAscValue: 20,
    sortDescValue: 17,
  },
];

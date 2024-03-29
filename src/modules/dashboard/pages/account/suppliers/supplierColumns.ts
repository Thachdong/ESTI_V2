import moment from "moment";
import { TSupplier } from "src/api";
import { TGridColDef } from "~types/data-grid";

export const supplierColumns: TGridColDef<TSupplier>[] = [
  {
    isSort: false,
    field: "created",
    headerName: "Ngày tạo",
    width: 125,
    type: "date",
    filterKey: "createdDate",
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "supplierCode",
    headerName: "Mã NCC",
    minWidth: 150,
    sortAscValue: 9,
    sortDescValue: 1,
    filterKey: "code",
  },
  {
    field: "supplierName",
    headerName: "Tên NCC",
    minWidth: 150,
    sortAscValue: 10,
    sortDescValue: 2,
    filterKey: "name",
    flex: 1,
  },
  {
    field: "curatorName",
    headerName: "Tên người liên hệ",
    minWidth: 170,
    sortAscValue: 11,
    sortDescValue: 3,
    filterKey: "curatorName",
  },
];

export const supplider2Columns: TGridColDef<TSupplier>[] = [
  {
    field: "curatorPhone",
    headerName: "Số điện thoại",
    minWidth: 150,
    sortAscValue: 13,
    sortDescValue: 5,
    filterKey: "curatorPhone",
  },
  {
    field: "curatorEmail",
    headerName: "Email",
    minWidth: 150,
    sortAscValue: 14,
    sortDescValue: 6,
    filterKey: "curatorEmail",
  },
  {
    field: "createdByName",
    headerName: "Người tạo",
    minWidth: 150,
    sortAscValue: 15,
    sortDescValue: 7,
    isFilter: false,
  },
];

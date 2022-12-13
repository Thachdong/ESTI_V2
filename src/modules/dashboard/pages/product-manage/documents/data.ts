import moment from "moment";
import { TDocument } from "src/api";
import { TGridColDef } from "~types/data-grid";

export const documentColumns: TGridColDef<TDocument>[] = [
  {
    sortAscValue: 13,
    sortDescValue: 1,
    filterKey: "createdDate",
    field: "created",
    headerName: "Ngày tạo",
    type: "date",
    width: 150,
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "categoryId",
    headerName: "Nhóm SP",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "categoryId",
    width: 150,
  },
  {
    field: "productId",
    headerName: "Mã SP",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "productId",
    width: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "productName",
    width: 150,
  },
  {
    field: "productName1",
    headerName: "Nhà sản xuất",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "productName",
    width: 150,
  },
  {
    field: "productName2",
    headerName: "LOT",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "productName",
    width: 150,
  },
  {
    field: "productName3",
    headerName: "Loại tài liệu",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "productName",
    width: 150,
  },
  {
    field: "productName4",
    headerName: "Tài liệu chuyên ngành",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "productName",
    width: 150,
  },
  {
    field: "productName5",
    headerName: "File",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "productName",
    width: 150,
  },
];

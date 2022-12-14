import moment from "moment";
import { TGridColDef } from "~types/data-grid";

export const productColumns: TGridColDef[] = [
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
    field: "productGroupName",
    headerName: "Nhóm SP",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "productGroup",
    width: 150,
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 15,
    sortDescValue: 3,
    filterKey: "code",
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 16,
    sortDescValue: 4,
    filterKey: "name",
    minWidth: 150,
  },
  {
    field: "manufactor",
    headerName: "Hãng sản xuất",
    sortAscValue: 17,
    sortDescValue: 5,
    filterKey: "manufactor",
    width: 150,
  },
  {
    field: "origin",
    headerName: "Xuất xứ",
    sortAscValue: 18,
    sortDescValue: 6,
    filterKey: "origin",
  },
  {
    field: "specs",
    headerName: "Quy cách",
    sortAscValue: 19,
    sortDescValue: 7,
    filterKey: "specs",
  },
  {
    field: "unitName",
    headerName: "ĐVT",
    sortAscValue: 20,
    sortDescValue: 8,
    filterKey: "unitName",
  },
  {
    field: "casCode",
    headerName: "Mã CAS",
    sortAscValue: 21,
    sortDescValue: 9,
    filterKey: "casCode",
  },
  {
    field: "chemicalName",
    headerName: "Công thức hóa học",
    sortAscValue: 22,
    sortDescValue: 10,
    filterKey: "chemicalName",
    width: 180,
  },
  {
    field: "createdByName",
    headerName: "Người tạo",
    sortAscValue: 23,
    sortDescValue: 11,
    filterKey: "createdBy",
    width: 120,
  },
  { field: "numberOfReviews", headerName: "Đánh giá mới", isSort: false, width: 120, },
];

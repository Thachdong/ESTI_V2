import { TGridColDef } from "~types/data-grid";

export const stampColumns: TGridColDef[] = [
  {
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 9,
    sortDescValue: 1,
    filterKey: "productCode",
    width: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 10,
    sortDescValue: 2,
    filterKey: "productName",
    minWidth: 150,
    flex: 1
  },
  {
    field: "chemicalName",
    headerName: "Công thức hóa học",
    sortAscValue: 11,
    sortDescValue: 3,
    filterKey: "chemicalName",
    width: 200,
  },
  {
    field: "casCode",
    headerName: "Mã CAS",
    sortAscValue: 15,
    sortDescValue: 7,
    filterKey: "productCAS",
    width: 150,
  },
  {
    field: "specs",
    headerName: "Quy cách",
    sortAscValue: 14,
    sortDescValue: 6,
    filterKey: "specs",
    width: 150,
  },
  {
    field: "manufactor",
    headerName: "Hãng SX",
    sortAscValue: 12,
    sortDescValue: 4,
    filterKey: "manufactor",
    width: 150,
  },
];

export const stampHistoryColumns: TGridColDef[] = [
  {
    field: "q1",
    headerName: "Ngày tạo",
    isFilter: false,
    isSort: false,
    width: 150,
  },
  {
    field: "q2",
    headerName: "Mã nhập kho",
    isFilter: false,
    isSort: false,
    width: 150,
  },
  {
    field: "q3",
    headerName: "LOT",
    isFilter: false,
    isSort: false,
    width: 150,
  },
  {
    field: "q4",
    headerName: "Ngày sản xuất",
    isFilter: false,
    isSort: false,
    width: 150,
  },
  {
    field: "q5",
    headerName: "Ngày hết hạn",
    isFilter: false,
    isSort: false,
    width: 150,
  },
  {
    field: "q6",
    headerName: "Người tạo",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    flex: 1
  },
]

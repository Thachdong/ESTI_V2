import { TGridColDef } from "~types/data-grid";

export const stampColumns: TGridColDef[] = [
  {
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "productCode",
    width: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "productName",
    minWidth: 150,
    flex: 1
  },
  {
    field: "chemicalName",
    headerName: "Công thức hóa học",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "chemicalName",
    width: 200,
  },
  {
    field: "",
    headerName: "Mã CAS",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "productCAS",
    width: 150,
  },
  {
    field: "specs",
    headerName: "Quy cách",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "specs",
    width: 150,
  },
  {
    field: "manufactor",
    headerName: "Hãng SX",
    sortAscValue: 14,
    sortDescValue: 2,
    filterKey: "manufactor",
    width: 150,
  },
];

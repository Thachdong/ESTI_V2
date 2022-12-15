import { TGridColDef } from "~types/data-grid";

export const productManageColumns: TGridColDef[] = [
  {
    field: "warehouseConfigCode",
    headerName: "Mã Kho",
    sortAscValue: 10,
    sortDescValue: 2,
    filterKey: "warehouseConfigCode",
    width: 150,
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 10,
    sortDescValue: 2,
    filterKey: "productCode",
    width: 150,
  },
];

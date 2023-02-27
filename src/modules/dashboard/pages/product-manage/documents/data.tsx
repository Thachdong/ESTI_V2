import { Button } from "@mui/material";
import moment from "moment";
import { TDocument } from "src/api";
import { TGridColDef } from "~types/data-grid";

export const documentColumns: TGridColDef<TDocument>[] = [
  {
    sortAscValue: 8,
    sortDescValue: 0,
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
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 10,
    sortDescValue: 2,
    filterKey: "productCode",
    width: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 11,
    sortDescValue: 3,
    filterKey: "productName",
    width: 150,
  },
  {
    field: "productManufactor",
    headerName: "Nhà sản xuất",
    sortAscValue: 12,
    sortDescValue: 4,
    filterKey: "productManufactor",
    width: 150,
  },
  {
    field: "lotNumber",
    headerName: "LOT#",
    sortAscValue: 13,
    sortDescValue: 5,
    filterKey: "lotNumber",
    width: 150,
  },
];

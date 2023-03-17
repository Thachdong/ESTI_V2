import moment from "moment";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const lotColumns: TGridColDef[] = [
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
    field: "lotNumber",
    headerName: "LOT#",
    sortAscValue: 13,
    sortDescValue: 5,
    filterKey: "lotNumber",
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
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 11,
    sortDescValue: 3,
    filterKey: "productName",
    width: 150,
  },
  {
    field: "importPrice",
    headerName: "Giá nhập kho",
    sortAscValue: 11,
    sortDescValue: 3,
    filterKey: "importPrice",
    width: 150,
    renderCell: ({row}) => _format.getVND(row?.importPrice)
  },
  {
    sortAscValue: 8,
    sortDescValue: 0,
    filterKey: "dateManufacture",
    field: "dateManufacture",
    headerName: "Ngày SX",
    type: "date",
    width: 150,
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
  },
  {
    sortAscValue: 8,
    sortDescValue: 0,
    filterKey: "dateExpiration",
    field: "dateExpiration",
    headerName: "Hạn sử dụng",
    type: "date",
    width: 150,
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
  },
];

import moment from "moment";
import { TGridColDef } from "~types/data-grid";

export const positionProductColumns: TGridColDef[] = [
  {
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 14,
    sortDescValue: 1,
    filterKey: "productCode",
    width: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 15,
    sortDescValue: 2,
    filterKey: "productName",
    width: 150,
  },
  {
    field: "manufactor",
    headerName: "Hãng SX",
    sortAscValue: 17,
    sortDescValue: 4,
    filterKey: "",
    width: 150,
  },
  {
    field: "specs",
    headerName: "Quy cách",
    sortAscValue: 21,
    sortDescValue: 8,
    filterKey: "specs",
    width: 150,
  },
  {
    field: "unitName",
    headerName: "ĐVT",
    sortAscValue: 22,
    sortDescValue: 9,
    filterKey: "",
    width: 150,
  },
  {
    field: "quantity",
    headerName: "SL",
    sortAscValue: 23,
    sortDescValue: 10,
    filterKey: "",
    width: 150,
  },
  {
    field: "lotNumber",
    headerName: "Lô SX",
    sortAscValue: 16,
    sortDescValue: 3,
    filterKey: "lotNumber",
    width: 150,
  },
  {
    field: "dateManufacture",
    headerName: "Ngày SX",
    sortAscValue: 17,
    sortDescValue: 4,
    filterKey: "dateManufacture",
    type: "date",
    width: 150,
    renderCell: ({ row }) =>
      row?.dateManufacture
        ? moment(row?.dateManufacture).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "dateExpiration",
    headerName: "Hạn sử dụng",
    sortAscValue: 18,
    sortDescValue: 5,
    type: "date",
    filterKey: "dateExpiration",
    width: 150,
    renderCell: ({ row }) =>
      row?.dateExpiration
        ? moment(row?.dateExpiration).format("DD/MM/YYYY")
        : "__",
  },
];

export const positionHistoryColumns: TGridColDef[] = [
  {
    field: "importDate",
    headerName: "Ngày nhập",
    sortAscValue: 11,
    sortDescValue: 1,
    sortKey: "history_order",
    filterKey: "history_importDate",
    type: "date",
    width: 150,
    renderCell: ({ row }) =>
      row?.importDate ? moment(row?.importDate).format("DD/MM/YYYY") : "__",
  },
  {
    field: "exportDate",
    headerName: "Ngày xuất",
    sortAscValue: 12,
    sortDescValue: 2,
    sortKey: "history_order",
    filterKey: "history_exportDate",
    type: "date",
    width: 150,
    renderCell: ({ row }) =>
      row?.exportDate ? moment(row?.exportDate).format("DD/MM/YYYY") : "__",
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 14,
    sortDescValue: 2,
    sortKey: "history_order",
    filterKey: "history_productCode",
    width: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 13,
    sortDescValue: 3,
    sortKey: "history_order",
    filterKey: "history_productName",
    width: 150,
  },
  {
    field: "lotNumber",
    headerName: "Mã lô SX",
    sortAscValue: 15,
    sortDescValue: 5,
    sortKey: "history_order",
    filterKey: "history_lotNumber",
    width: 150,
  },
  {
    field: "dateManufacture",
    headerName: "Ngày SX",
    sortAscValue: 16,
    sortDescValue: 6,
    sortKey: "history_order",
    filterKey: "history_dateManufacture",
    width: 150,
    renderCell: ({ row }) =>
      row?.dateManufacture
        ? moment(row?.dateManufacture).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "dateExpiration",
    headerName: "Hạn sử dụng",
    sortAscValue: 17,
    sortDescValue: 7,
    sortKey: "history_order",
    filterKey: "history_dateExpiration",
    type: "date",
    width: 150,
  },
  {
    field: "quantity",
    headerName: "SL",
    sortAscValue: 18,
    sortDescValue: 8,
    sortKey: "history_order",
    filterKey: "history_quantity",
    width: 75,
  },
  {
    field: "createdByName",
    headerName: "Người tạo",
    isFilter: false,
    isSort: false,
    width: 150,
  },
];
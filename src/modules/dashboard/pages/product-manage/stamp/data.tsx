import moment from "moment";
import { productTypesStamp } from "~modules-core/constance";
import { TGridColDef } from "~types/data-grid";

export const stampColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    isFilter: false,
    isSort: false,
    width: 150,
    renderCell: ({ row }) =>
      row?.created ? moment(row?.created).format("DD/MM/YYYY") : "__",
  },
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
    flex: 1,
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
    field: "created",
    headerName: "Ngày tạo",
    isFilter: false,
    isSort: false,
    width: 150,
    renderCell: ({ row }) =>
      row?.created ? moment(row?.created).format("DD/MM/YYYY") : "__",
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    isFilter: false,
    isSort: false,
    width: 150,
  },
  {
    field: "warehouseSessionCode",
    headerName: "Mã nhập kho",
    isFilter: false,
    isSort: false,
    width: 150,
  },
  {
    field: "lotNumber",
    headerName: "LOT",
    isFilter: false,
    isSort: false,
    width: 150,
  },
  {
    field: "dateManufacture",
    headerName: "Ngày sản xuất",
    isFilter: false,
    isSort: false,
    width: 150,
    renderCell: ({ row }) =>
      row?.dateManufacture
        ? moment(row?.dateManufacture).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "dateExpiration",
    headerName: "Ngày hết hạn",
    isFilter: false,
    isSort: false,
    width: 150,
    renderCell: ({ row }) =>
      row?.dateExpiration
        ? moment(row?.dateExpiration).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "createdByName",
    headerName: "Người tạo",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    flex: 1,
  },
];

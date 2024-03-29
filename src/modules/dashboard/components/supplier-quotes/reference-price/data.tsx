import moment from "moment";
import { referencePriceProductStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const referencePriceColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    minWidth: 100,
    renderCell: ({ row }) =>
      row?.created ? moment(row?.created).format("DD/MM/YYYY") : "",
    filterKey: "createdDate",
    type: "date",
    sortAscValue: 10,
    sortDescValue: 0,
  },
  {
    field: "supplierName",
    headerName: "Tên NCC",
    minWidth: 200,
    flex: 1,
    filterKey: "supplierName",
    sortAscValue: 17,
    sortDescValue: 6,
  },
  {
    field: "supplierCode",
    headerName: "Mã NCC",
    minWidth: 200,
    flex: 1,
    filterKey: "supplierCode",
    sortAscValue: 16,
    sortDescValue: 5,
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    minWidth: 75,
    filterKey: "productCode",
    sortAscValue: 11,
    sortDescValue: 1,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    minWidth: 200,
    flex: 1,
    filterKey: "productName",
    sortAscValue: 12,
    sortDescValue: 3,
  },
  {
    field: "manufactor",
    headerName: "Hãng SX",
    minWidth: 100,
    filterKey: "productManufacture",
    sortAscValue: 13,
    sortDescValue: 3,
  },
  {
    field: "origin",
    headerName: "Xuất xứ",
    minWidth: 100,
    filterKey: "productOrigin",
    sortAscValue: 14,
    sortDescValue: 4,
  },
  {
    field: "specs",
    headerName: "Quy cách",
    minWidth: 75,
    filterKey: "productSpecs",
    isFilter: false,
    isSort: false,
  },
  {
    field: "unitName",
    headerName: "Đơn vị",
    minWidth: 75,
    isFilter: false,
    isSort: false,
  },
  {
    field: "price",
    headerName: "Đơn giá",
    minWidth: 100,
    renderCell: ({ row }) => _format.getVND(row.price),
    filterKey: "price",
    isSort: false,
  },
  {
    field: "productStatus",
    headerName: "Tình trạng HH",
    minWidth: 140,
    filterKey: "productStatus",
    sortAscValue: 19,
    sortDescValue: 9,
  },
  {
    field: "expireDate",
    headerName: "Hạn sử dụng",
    minWidth: 120,
    renderCell: ({ row }) =>
      row?.expireDate ? moment(row?.expireDate).format("DD/MM/YYYY") : "",
    filterKey: "expireDate",
    sortAscValue: 18,
    sortDescValue: 7,
  },
  {
    field: "productStatusTypeName",
    headerName: "Trạng thái HH",
    minWidth: 150,
    filterKey: "productStatusType",
    type: "select",
    sortAscValue: 20,
    sortDescValue: 9,
    options: referencePriceProductStatus
  },
  {
    field: "expireDateStatusName",
    headerName: "Trạng thái hỏi giá",
    minWidth: 150,
    filterKey: "expireDateStatus",
    type: "select",
    isSort: false,
    options: [
      {label: "Còn hiệu lực", value: 0},
      {label: "Hết hiệu lực", value: 1},
    ]
  },
];

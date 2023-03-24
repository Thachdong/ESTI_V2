import moment from "moment";
import { StatusChip } from "~modules-core/components";
import { lotStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const lotColumns: TGridColDef[] = [
  {
    sortAscValue: 10,
    sortDescValue: 0,
    filterKey: "dateManufacture",
    type: "date",
    field: "created",
    headerName: "Ngày tạo",
    minWidth: 150,
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "lotNumber",
    headerName: "LOT#",
    sortAscValue: 12,
    sortDescValue: 2,
    filterKey: "lotNumber",
    minWidth: 150,
    flex: 1
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 13,
    sortDescValue: 3,
    filterKey: "productCode",
    minWidth: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 14,
    sortDescValue: 4,
    filterKey: "productName",
    minWidth: 150,
    flex: 1
  },
  {
    field: "importPrice",
    headerName: "Giá nhập kho",
    sortAscValue: 16,
    sortDescValue: 6,
    isFilter: false,
    minWidth: 150,
    renderCell: ({row}) => _format.getVND(row?.importPrice)
  },
  {
    sortAscValue: 17,
    sortDescValue: 7,
    filterKey: "dateManufacture",
    field: "dateManufacture",
    headerName: "Ngày SX",
    type: "date",
    minWidth: 150,
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
  },
  {
    sortAscValue: 18,
    sortDescValue: 8,
    filterKey: "dateExpiration",
    field: "dateExpiration",
    headerName: "Hạn sử dụng",
    type: "date",
    minWidth: 150,
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "status",
    headerName: "Giá nhập kho",
    sortAscValue: 15,
    sortDescValue: 5,
    isFilter: false,
    minWidth: 150,
    renderCell: ({row}) => <StatusChip status={row?.status} label={row?.statusName} />,
    type: "select",
    options: lotStatus
  },
];

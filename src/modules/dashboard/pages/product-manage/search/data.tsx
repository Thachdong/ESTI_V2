import { GridColumnGroupingModel } from "@mui/x-data-grid";
import moment from "moment";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const productManageColumns: TGridColDef[] = [
  {
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 8,
    sortDescValue: 1,
    filterKey: "code",
    width: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 9,
    sortDescValue: 2,
    filterKey: "name",
    width: 150,
  },
  {
    field: "manufactor",
    headerName: "Hãng sản xuất",
    sortAscValue: 10,
    sortDescValue: 3,
    filterKey: "manufactor",
    width: 150,
  },
  {
    field: "specs",
    headerName: "Quy cách",
    sortAscValue: 12,
    sortDescValue: 5,
    filterKey: "specs",
    width: 150,
  },
  {
    field: "unitName",
    headerName: "DVT",
    sortAscValue: 13,
    sortDescValue: 6,
    filterKey: "unitName",
    width: 150,
  },
  {
    field: "importQuantity",
    headerName: "Số lượng",
    isSort: false,
    isFilter: false,
    width: 150,
  },
  {
    field: "importTotalPrice",
    headerName: "giá trị",
    isSort: false,
    isFilter: false,
    width: 150,
    renderCell: (({row}) => _format.getVND(row?.importTotalPrice))
  },
  {
    field: "exportQuantity",
    headerName: "Số lượng",
    isSort: false,
    isFilter: false,
    width: 150,
  },
  {
    field: "exportTotalPrice",
    headerName: "giá trị",
    isSort: false,
    isFilter: false,
    width: 150,
    renderCell: (({row}) => _format.getVND(row?.exportTotalPrice))
  },
  {
    field: "lastQuantity",
    headerName: "Số lượng",
    isSort: false,
    isFilter: false,
    width: 150,
  },
  {
    field: "lastTotalPrice",
    headerName: "giá trị",
    isSort: false,
    isFilter: false,
    width: 150,
    renderCell: (({row}) => _format.getVND(row?.lastTotalPrice))
  },
];

export const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: "warehouse-import",
    headerName: "NHẬP KHO",
    children: [{ field: "importQuantity" }, { field: "importTotalPrice" }],
  },
  {
    groupId: "warehouse-export",
    headerName: "XUẤT KHO",
    children: [{ field: "exportQuantity" }, { field: "exportTotalPrice" }],
  },
  {
    groupId: "warehouse-final",
    headerName: "CUỐI KỲ",
    children: [{ field: "lastQuantity" }, { field: "lastTotalPrice" }],
  },
];

export const productHistoryColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({row}) => moment(row?.created).format("DD/MM/YYYY"),
  },
  {
    field: "importCode",
    headerName: "Mã nhập kho",
    isFilter: false,
    isSort: false,
    minWidth: 150
  },
  {
    field: "exportCode",
    headerName: "Mã xuất kho",
    isFilter: false,
    isSort: false,
    minWidth: 150
  },
  {
    field: "quantity",
    headerName: "SL",
    isFilter: false,
    isSort: false,
    minWidth: 50
  },
  {
    field: "price",
    headerName: "Đơn giá",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({row}) => _format.getVND(row?.price)
  },
  {
    field: "totalPrice",
    headerName: "Thành tiền",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({row}) => _format.getVND(row?.price)
  },
  {
    field: "lotNumber",
    headerName: "Số LOT #",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({row}) => _format.getVND(row?.price)
  },
  {
    field: "dateManufacture",
    headerName: "Ngày SX",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({row}) => moment(row?.dateManufacture).format("DD/MM/YYYY")
  },
  {
    field: "dateExpiration",
    headerName: "Ngày hết hạn",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({row}) => moment(row?.dateExpiration).format("DD/MM/YYYY")
  },
]

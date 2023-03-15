import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const productColumns: TGridColDef[] = [
  {
    field: "productCode",
    headerName: "Mã sản phẩm",
    minWidth: 150,
    flex: 1,
    isSort: false,
  },
  {
    field: "productName",
    headerName: "Tên sản phẩm",
    minWidth: 150,
    flex: 1,
    isSort: false,
  },
  {
    field: "minPrice",
    headerName: "MIN",
    minWidth: 150,
    isSort: false,
    renderCell: ({ row }) => _format.getVND(row?.minPrice),
  },
  {
    field: "maxPrice",
    headerName: "MAX",
    minWidth: 150,
    isSort: false,
    renderCell: ({ row }) => _format.getVND(row?.maxPrice),
  },
  {
    field: "avgPrice",
    headerName: "AVG",
    minWidth: 150,
    isSort: false,
    renderCell: ({ row }) => _format.getVND(row?.avgPrice),
  },
  {
    field: "sold",
    headerName: "Đã bán",
    minWidth: 150,
    isSort: false,
    renderCell: ({ row }) => _format.getVND(row?.sold),
  },
  {
    field: "totalSales",
    headerName: "Tổng giá trị bán",
    minWidth: 150,
    isSort: false,
    renderCell: ({ row }) => _format.getVND(row?.totalSales),
  },
];

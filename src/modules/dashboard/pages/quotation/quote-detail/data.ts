import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const productColumns: TGridColDef[] = [
  {
    field: "no",
    headerName: "STT",
    width: 50,
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    minWidth: 75,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "manufactor",
    headerName: "Hãng SX",
    minWidth: 100,
  },
  {
    field: "specs",
    headerName: "Quy cách",
    minWidth: 100,
  },
  {
    field: "unitName",
    headerName: "    vị",
    minWidth: 75,
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    minWidth: 75,
    flex: 1,
  },
  {
    field: "price",
    headerName: "Giá",
    minWidth: 75,
    flex: 1,
    renderCell: ({ row }) => _format.getVND(row.price),
  },
  {
    field: "vat",
    headerName: "Thuế GTGT",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "totalPrice",
    headerName: "Thành tiền",
    minWidth: 100,
    flex: 1,
    renderCell: ({ row }) => _format.getVND(row.totalPrice),
  },
  {
    field: "note",
    headerName: "Ghi chú",
    minWidth: 100,
    flex: 1,
  },
];
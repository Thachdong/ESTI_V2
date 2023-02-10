import { TGridColDef } from "~types/data-grid";

export const detailColumns: TGridColDef[] = [
  {
    field: "no",
    headerName: "STT",
    width: 50,
    align: "center",
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    minWidth: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    minWidth: 150,
    flex: 1
  },
  { field: "manufactor", headerName: "Hãng SX", minWidth: 100 },
  {
    field: "origin",
    headerName: "Quy cách",
    minWidth: 100,
  },
  { field: "unitName", headerName: "Đơn vị", minWidth: 100 },
  {
    field: "quantity",
    headerName: "Số lượng",
    minWidth: 150,
  },
  {
    field: "price",
    headerName: "Giá",
    minWidth: 150,
  },
  {
    field: "vat",
    headerName: "Thuế GTGT",
    minWidth: 150,
  },
  {
    field: "totalPrice",
    headerName: "Thành tiền",
    minWidth: 150,
  },
  {
    field: "note",
    headerName: "Ghi chú",
    minWidth: 150,
    flex: 1
  },
];

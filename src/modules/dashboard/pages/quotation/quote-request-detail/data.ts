import { TGridColDef } from "~types/data-grid";

export const productColumns: TGridColDef[] = [
  {
    field: "no",
    headerName: "STT",
    width: 75,
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    minWidth: 75,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    minWidth: 75,
    flex: 1
  },
  {
    field: "manufactor",
    headerName: "Hãng SX",
    minWidth: 100,
    flex: 1
  },
  {
    field: "specs",
    headerName: "Quy cách",
    minWidth: 75,
    flex: 1
  },
  {
    field: "unitName",
    headerName: "Đơn vị",
    minWidth: 75,
    flex: 1
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    minWidth: 75,
    flex: 1
  },
  {
    field: "note",
    headerName: "Ghi chú",
    minWidth: 100,
    flex: 1
  },             
];

import { TGridColDef } from "~types/data-grid";

export const productColumns: TGridColDef[] = [
  {
    field: "no",
    headerName: "STT",
    minWidth: 50,
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
  },
  {
    field: "manufactor",
    headerName: "Hãng SX",
    minWidth: 150,
  },
  {
    field: "specs",
    headerName: "Quy cách",
    minWidth: 150,
  },
  {
    field: "unitName",
    headerName: "Đơn vị",
    minWidth: 150,
  },
  {
    field: "quantity",
    headerName: "SL",
    minWidth: 150,
  },
  {
    field: "price",
    headerName: "Giá",
    minWidth: 150,
  },
  {
    field: "totalPrice",
    headerName: "Thành tiền",
    minWidth: 150,
  },
  {
    field: "lotNo",
    headerName: "Số LOT",
    minWidth: 150,
  },
  {
    field: "dateManufacture",
    headerName: "Ngày SX",
    minWidth: 150,
  },
  {
    field: "dateExpiration",
    headerName: "Hạn SD",
    minWidth: 150,
  },
  {
    field: "positionId",
    headerName: "Vị trí",
    minWidth: 150,
  },
];
import { TGridColDef } from "~types/data-grid";

export const detailColumns: TGridColDef[] = [
  {
    field: "no",
    headerName: "STT",
    minWidth: 120,
    flex: 1,
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

export const deliveryColumns: TGridColDef[] = [
  {
    field: "no1",
    headerName: "Lần giao",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "no2",
    headerName: "Ngày gửi hàng",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "no3",
    headerName: "Mã phiếu xuất kho",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "no4",
    headerName: "Giá trị hàng bán",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "no5",
    headerName: "Đơn vị vận chuyển",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "no6",
    headerName: "Số vận đơn",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "no7",
    headerName: "Trạng thái",
    minWidth: 120,
    flex: 1,
  },
]

export const invoiceColumns: TGridColDef[] = [
  {
    field: "no1",
    headerName: "Lần xuất",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "no2",
    headerName: "Ngày hóa đơn",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "no3",
    headerName: "Mã hóa đơn",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "no4",
    headerName: "Hạn thanh toán",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "no5",
    headerName: "Giá trị hóa đơn",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "no6",
    headerName: "Đã thanh toán",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "no7",
    headerName: "Trạng thái",
    minWidth: 120,
    flex: 1,
  },
]
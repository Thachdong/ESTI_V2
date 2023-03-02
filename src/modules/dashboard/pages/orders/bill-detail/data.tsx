import moment from "moment";
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
    minWidth: 100,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    minWidth: 250,
    flex: 1,
  },
  {
    field: "productManufactor",
    headerName: "Hãng SX",
    minWidth: 80,
  },
  {
    field: "productSpecs",
    headerName: "Quy cách",
    minWidth: 80,
  },
  {
    field: "unitName",
    headerName: " Đơn vị",
    minWidth: 50,
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    minWidth: 50,
  },
  {
    field: "price",
    headerName: "Giá",
    minWidth: 80,
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
    minWidth: 220,
    flex: 1,
    renderCell: ({ row }) => _format.getVND(row.totalPrice),
  },
];

export const paymentHistoryColumns: TGridColDef[] = [
  {
    field: "no",
    headerName: "STT",
    width: 50,
  },
  {
    field: "created",
    headerName: "Ngày tạo",
    minWidth: 100,
    flex: 1,
    renderCell: ({ row }) =>
      row?.created ? moment(row?.created).format("DD/MM/YYYY") : "__",
  },
  {
    field: "createdByName",
    headerName: "Người tạo",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "paymentDate",
    headerName: "Ngày thanh toán",
    minWidth: 100,
    flex: 1,
    renderCell: ({ row }) =>
      row?.paymentDate ? moment(row?.paymentDate).format("DD/MM/YYYY") : "__",
  },
  {
    field: "paid",
    headerName: "Số tiền thanh toán",
    minWidth: 100,
    flex: 1,
    renderCell: ({ row }) => _format.getVND(row?.paid),
  },
];

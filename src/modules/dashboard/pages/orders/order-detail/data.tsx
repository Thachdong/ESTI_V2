import moment from "moment";
import Link from "next/link";
import { StatusChip } from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
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
    flex: 1,
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
    flex: 1,
  },
];

export const deliveryColumns: TGridColDef[] = [
  {
    field: "no",
    headerName: "Lần giao",
    minWidth: 80,
    flex: 1,
  },
  {
    field: "created",
    headerName: "Ngày gửi hàng",
    minWidth: 120,
    flex: 1,
    renderCell: ({ row }) => moment(row?.created).format("DD/MM/YYYY"),
  },
  {
    field: "warehouseSessionCode",
    headerName: "Mã phiếu xuất kho",
    minWidth: 120,
    flex: 1,
    renderCell: ({ row }) => (
      <Link href={`/dashboard/warehouse/export-detail/?id=${row?.id}`}>
        <a className="no-underline">
          <StatusChip status={row?.status} label={row?.warehouseSessionCode} className="cursor-pointer" />
        </a>
      </Link>
    ),
  },
  {
    field: "importTotalPrice",
    headerName: "Giá trị hàng bán",
    minWidth: 120,
    flex: 1,
    renderCell: ({ row }) => _format.getVND(row?.importTotalPrice),
  },
  {
    field: "deliveryCode",
    headerName: "Đơn vị vận chuyển",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "codeVD",
    headerName: "Số vận đơn",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "exportStatusName",
    headerName: "Trạng thái",
    minWidth: 120,
    flex: 1,
  },
];

export const invoiceColumns: TGridColDef[] = [
  {
    field: "no",
    headerName: "Lần xuất",
    minWidth: 80,
    flex: 1,
  },
  {
    field: "created",
    headerName: "Ngày hóa đơn",
    minWidth: 120,
    flex: 1,
    renderCell: ({ row }) => moment(row?.created).format("DD/MM/YYYY"),
  },
  {
    field: "billCode",
    headerName: "Số hóa đơn",
    minWidth: 120,
    flex: 1,
    renderCell: ({ row }) => (
      <Link href={`/dashboard/orders/bill-detail/?id=${row?.id}`}>
        <a className="no-underline">
          <StatusChip status={row?.status} label={row?.billCode} className="cursor-pointer" />
        </a>
      </Link>
    ),
  },
  {
    field: "nextPaymentDate",
    headerName: "Hạn thanh toán",
    minWidth: 120,
    flex: 1,
    renderCell: ({ row }) =>
      row?.nextPaymentDate
        ? moment(row?.nextPaymentDate).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "totalPrice",
    headerName: "Giá trị hóa đơn",
    minWidth: 120,
    flex: 1,
    renderCell: ({ row }) => _format.getVND(row?.totalPrice),
  },
  {
    field: "paid",
    headerName: "Đã thanh toán",
    minWidth: 120,
    flex: 1,
    renderCell: ({ row }) => _format.getVND(row?.totalPrice),
  },
  {
    field: "statusName",
    headerName: "Trạng thái",
    minWidth: 120,
    flex: 1,
  },
];

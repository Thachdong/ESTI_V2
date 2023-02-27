import { Box, Tooltip } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { StatusChip } from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const detailColumns: TGridColDef[] = [
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
    flex: 1,
  },
  { field: "manufactor", headerName: "Hãng SX", minWidth: 100 },
  {
    field: "productOrigin",
    headerName: "xuất xứ",
    minWidth: 100,
  },
  { field: "productSpecs", headerName: "Quy cách", minWidth: 100 },
  { field: "unitName", headerName: "Đơn vị tính", minWidth: 100 },
  {
    field: "quantity",
    headerName: "SL yêu cầu",
    minWidth: 100,
  },
  {
    field: "delivered",
    headerName: "SL đã giao",
    minWidth: 100,
  },
  {
    field: "billQuantity",
    headerName: "SL xuất HĐ",
    minWidth: 100,
  },
  {
    field: "price",
    headerName: "Giá",
    minWidth: 120,
    renderCell: ({row}) => _format.getVND(row?.price)
  },
  {
    field: "vat",
    headerName: "Thuế GTGT",
    minWidth: 100,
  },
  {
    field: "totalPrice",
    headerName: "Thành tiền",
    minWidth: 150,
    renderCell: ({ row }) => {
      const {quantity, price, vat} = row || {};

      const total = quantity * price;

      const tax = total * (+vat) / 100;

      return (
        <Tooltip title={ "Sau thuế: " + _format.getVND(total + tax)}>
          <Box>{_format.getVND(row.totalPrice)}</Box>
        </Tooltip>
      );
    },
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
          <StatusChip
            status={row?.status}
            label={row?.warehouseSessionCode}
            className="cursor-pointer"
          />
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
          <StatusChip
            status={row?.status}
            label={row?.billCode}
            className="cursor-pointer"
          />
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

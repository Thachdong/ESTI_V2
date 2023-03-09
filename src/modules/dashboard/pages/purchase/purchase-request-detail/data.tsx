import { Box, Stack } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { StatusChip } from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const purchaseDetailImportColumns: TGridColDef[] = [
  {
    field: "no",
    headerName: "Lần nhập",
    minWidth: 80,
  },
  {
    field: "created",
    headerName: "Ngày nhập hàng",
    minWidth: 150,
    flex: 1,
    renderCell: ({ row }) => moment(row?.created).format("DD/MM/YYYY"),
  },
  {
    field: "warehouseSessionCode",
    headerName: "Mã phiếu nhập kho",
    minWidth: 150,
    flex: 1,
    renderCell: ({ row }) => (
      <Link href={`/dashboard/warehouse/import-detail/?id=${row?.id}`}>
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
    headerName: "Giá trị hàng nhập",
    minWidth: 150,
    flex: 1,
    renderCell: ({ row }) => _format.getVND(row?.importTotalPrice),
  },
  {
    field: "deliveryCode",
    headerName: "Nhân viên thực hiện",
    minWidth: 150,
    flex: 1,
  },
];

export const purchaseDetailBillColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày thanh toán",
    minWidth: 150,
    renderCell: ({ row }) => moment(row?.created).format("DD/MM/YYYY"),
  },
  {
    field: "billNumber",
    headerName: "MÃ HOÁ ĐƠN",
    minWidth: 150,
    flex: 1,
    renderCell: ({ row }) => (
      <Link href={`/dashboard/purchase/purchase-bill-detail/?id=${row?.id}`}>
        <a className="no-underline">
          <StatusChip
            status={row?.status}
            label={row?.billNumber}
            className="cursor-pointer"
          />
        </a>
      </Link>
    ),
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
    headerName: "Đã nhận",
    minWidth: 120,
    flex: 1,
    renderCell: ({ row }) => _format.getVND(row?.paid),
  },
];

export const addvancePaymentColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạm ứng",
    minWidth: 150,
    renderCell: ({ row }) => moment(row?.created).format("DD/MM/YYYY"),
  },
  {
    field: "payments",
    headerName: "Số tiền chuyển",
    minWidth: 150,
    flex: 1,
    renderCell: ({ row }) => _format.getVND(row?.payments),
  },
  {
    field: "contentBilling",
    headerName: "Nội dung thanh toán",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "attachFile",
    headerName: "File chuyển tiền",
    minWidth: 120,
    renderCell: ({ row }) => {
      const {attachFile} = row || {};

      let files: string[] = [];

      if (!!attachFile && typeof attachFile === "string") {
        files = attachFile.split(",");
      }
      
      return (
        <Stack>
          {files.map?.((file: string, index: number) => (
            <Box key={index} className="truncate">
              <a className="truncate" href={file}>{`File ${index + 1}`}</a>
            </Box>
          ))}
        </Stack>
      )
    },
  },
];

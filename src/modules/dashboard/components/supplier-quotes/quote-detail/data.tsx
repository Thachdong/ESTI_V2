import { Box, Tooltip } from "@mui/material";
import { StatusChip } from "~modules-core/components";
import { supplierQuotesDetailStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const dialogColumns: TGridColDef[] = [
  {
    field: "no",
    headerName: "STT",
    align: "center",
    width: 50,
  },
  { field: "productCode", headerName: "MÃ SP", minWidth: 120 },
  { field: "productName", headerName: "TÊN SP", minWidth: 120, flex: 1 },
  { field: "manufactor", headerName: "HÃNG SẢN XUẤT", minWidth: 150 },
  { field: "specs", headerName: "QUY CÁCH", minWidth: 100 },
  { field: "unitName", headerName: "ĐƠN VỊ", minWidth: 100 },
  { field: "quantity", headerName: "SL", minWidth: 50 },
  {
    field: "availabilityQuantity",
    headerName: "SL có thể cung cấp",
    minWidth: 150,
  },
  {
    field: "price",
    headerName: "ĐƠN GIÁ",
    minWidth: 100,
    renderCell: ({ row }) => _format.getVND(row?.price),
  },
  { field: "vat", headerName: "VAT %", minWidth: 75 },
  {
    field: "productStatusType",
    headerName: "Trạng thái",
    minWidth: 125,
    renderCell: ({ row }) => {
      const colors = ["default", "info", "success", "error"];

      const { productStatusType } = row || {};
      return !!productStatusType ? (
        <StatusChip
          status={productStatusType}
          label={supplierQuotesDetailStatus[productStatusType - 1]?.label}
          color={colors[productStatusType - 1] as any}
        />
      ) : ""
    },
  },
  {
    field: "totalPrice",
    headerName: "THÀNH TIỀN",
    minWidth: 120,
    renderCell: ({ row }) => {
      const { quantity, price, vat } = row || {};

      const total = quantity * price;

      const tax = (total * +vat) / 100;

      return (
        <Tooltip title={"Sau thuế: " + _format.getVND(total + tax)}>
          <Box>{_format.getVND(row.totalPrice)}</Box>
        </Tooltip>
      );
    },
  },
  { field: "note", headerName: "GHI CHÚ", minWidth: 120 },
];

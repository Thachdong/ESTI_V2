import { Box, Tooltip } from "@mui/material";
import moment from "moment";
import { StatusChip } from "~modules-core/components";
import { purchasePlanStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const purchasePlanColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "NGÀY TẠO",
    minWidth: 100,
    renderCell: ({ row }) =>
      row.created ? moment(row.created).format("DD/MM/YYYY") : "__",
    sortDescValue: 3,
    sortAscValue: 15,
    filterKey: "createdDate",
    type: "date",
  },
  {
    field: "branchCode",
    headerName: "Chi nhánh",
    minWidth: 120,
    sortDescValue: 1,
    sortAscValue: 13,
    filterKey: "branchCode",
  },
  {
    field: "mainOrderCodes",
    headerName: "Mã đơn hàng",
    minWidth: 150,
    sortDescValue: 2,
    sortAscValue: 14,
    filterKey: "mainOrderCode",
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    minWidth: 120,
    sortDescValue: 4,
    sortAscValue: 16,
    filterKey: "productCode",
  },
  {
    field: "productName",
    headerName: "Tên SP",
    minWidth: 200,
    sortDescValue: 5,
    sortAscValue: 17,
    filterKey: "productName",
  },
  {
    field: "quantity",
    headerName: "SL",
    minWidth: 50,
    sortDescValue: 6,
    sortAscValue: 18,
    filterKey: "quantity",
  },
  {
    field: "supplierCode",
    headerName: "Mã NCC",
    minWidth: 120,
    sortDescValue: 9,
    sortAscValue: 21,
    filterKey: "supplierCode",
  },
  {
    field: "supplierName",
    headerName: "Tên NCC",
    minWidth: 200,
    flex: 1,
    sortDescValue: 10,
    sortAscValue: 22,
    filterKey: "supplierName",
  },
  {
    field: "statusName",
    headerName: "Trạng thái",
    minWidth: 150,
    sortDescValue: 11,
    sortAscValue: 23,
    filterKey: "status",
    type: "select",
    options: purchasePlanStatus,
    renderCell: ({row}) => <StatusChip status={row?.status} label={row?.statusName} />
  },
];

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
  { field: "quantity", headerName: "SỐ LƯỢNG", minWidth: 100 },
  {
    field: "price",
    headerName: "ĐƠN GIÁ",
    minWidth: 100,
    renderCell: ({ row }) => _format.getVND(row?.price),
  },
  { field: "vat", headerName: "VAT %", minWidth: 75 },
  {
    field: "totalPrice",
    headerName: "THÀNH TIỀN",
    minWidth: 120,
    renderCell: ({ row }) => {
      const {quantity, price, vat} = row || {};

      const total = quantity * price;

      const tax = total * (+vat) / 100;
      return (
        <Tooltip title={ "Sau thuế: " + _format.getVND(total + tax)}>
          <Box>{_format.getVND(row.totalPrice)}</Box>
        </Tooltip>
      );
    }
  },
  { field: "note", headerName: "GHI CHÚ", minWidth: 120 },
];

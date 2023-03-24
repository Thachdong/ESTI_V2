import moment from "moment";
import { StatusChip } from "~modules-core/components";
import { supplierQuotesProductStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const suplierQuotesProductColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "NGÀY TẠO",
    minWidth: 100,
    renderCell: ({ row }) =>
      row.created ? moment(row.created).format("DD/MM/YYYY") : "__",
    filterKey: "createdDate",
    sortDescValue: 0,
    sortAscValue: 9,
    type: "date",
  },
  {
    field: "askPriceOrderCode",
    headerName: "Mã hỏi giá",
    minWidth: 100,
    isFilter: false,
    isSort: false,
  },
  {
    field: "expireDate",
    headerName: "Hiệu lực hỏi giá",
    minWidth: 130,
    isFilter: false,
    isSort: false,
    renderCell: ({ row }) =>
      row?.expireDate ? moment(row?.expireDate).format("DD/MM/YYYY") : "",
  },
  {
    field: "requirementName",
    headerName: "Nội dung hỏi giá",
    minWidth: 130,
    isFilter: false,
    isSort: false,
  },
  {
    field: "supplierCode",
    headerName: "Mã NCC",
    minWidth: 100,
    filterKey: "supplierCode",
    sortDescValue: 5,
    sortAscValue: 13,
  },
  {
    field: "supplierName",
    headerName: "Tên NCC",
    minWidth: 200,
    flex: 1,
    filterKey: "supplierName",
    sortDescValue: 6,
    sortAscValue: 14,
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    minWidth: 100,
    filterKey: "productCode",
    sortDescValue: 2,
    sortAscValue: 10,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    minWidth: 200,
    filterKey: "productName",
    sortDescValue: 3,
    sortAscValue: 11,
  },
  {
    field: "availabilityQuantity",
    headerName: "SL có thể cung cấp",
    minWidth: 180,
    isFilter: false,
    isSort: false,
  },
  {
    field: "quantity",
    headerName: "SL yêu cầu",
    minWidth: 120,
    filterKey: "quantity",
    sortDescValue: 4,
    sortAscValue: 12,
  },
  {
    field: "price",
    headerName: "Đơn giá",
    minWidth: 160,
    renderCell: ({ row }) => _format.getVND(row?.price),
    filterKey: "price",
    isSort: false,
  },
  {
    field: "totalPrice",
    headerName: "Tổng giá trị",
    minWidth: 150,
    renderCell: ({ row }) => _format.getVND(row?.totalPrice),
    filterKey: "totalPrice",
    isSort: false,
  },
  {
    field: "statusName",
    headerName: "Trạng thái",
    minWidth: 150,
    type: "select",
    options: supplierQuotesProductStatus,
    renderCell: ({ row }) => {
      const colors = ["default", "info", "success", "error"];
      return (
        <StatusChip
          status={row?.status}
          label={row?.statusName}
          color={colors[row?.status - 1] as any}
        />
      );
    },
    filterKey: "status",
    sortDescValue: 7,
    sortAscValue: 15,
  },
];

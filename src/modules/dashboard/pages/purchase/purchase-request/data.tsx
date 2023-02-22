import moment from "moment";
import { StatusChip } from "~modules-core/components";
import { purchaseOrderStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const purchaseRequestColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "NGÀY TẠO",
    minWidth: 100,
    renderCell: ({ row }) =>
      row.created ? moment(row.created).format("DD/MM/YYYY") : "__",
    filterKey: "createdDate",
    sortDescValue: 3,
    sortAscValue: 15,
    type: "date"
  },
  {
    field: "code",
    headerName: "Mã MH",
    minWidth: 100,
    filterKey: "productOrderCode",
    sortDescValue: 2,
    sortAscValue: 14,
  },
  {
    field: "supplierCode",
    headerName: "Mã NCC",
    minWidth: 100,
    filterKey: "supplierCode",
    sortDescValue: 4,
    sortAscValue: 16,
  },
  {
    field: "supplierName",
    headerName: "Tên NCC",
    minWidth: 200,
    flex: 1,
    filterKey: "supplierName",
    sortDescValue: 5,
    sortAscValue: 17,
  },
  {
    field: "totalPrice",
    headerName: "Giá trị đơn hàng",
    minWidth: 160,
    renderCell: ({ row }) => _format.getVND(row?.totalPrice),
    filterKey: "totalPrice",
    sortDescValue: 6,
    sortAscValue: 18,
  },
  {
    field: "importPrice",
    headerName: "Giá trị nhập kho",
    minWidth: 160,
    renderCell: ({ row }) => _format.getVND(row?.importPrice),
    filterKey: "importPrice",
    sortDescValue: 7,
    sortAscValue: 19,
  },
  {
    field: "paid",
    headerName: "Đã thanh toán",
    minWidth: 160,
    renderCell: ({ row }) => _format.getVND(row?.paid),
    sortDescValue: 8,
    sortAscValue: 20,
    filterKey: "paid",
  },
  {
    field: "branchCode",
    headerName: "Chi nhánh",
    minWidth: 120,
    filterKey: "branchCode",
    sortDescValue: 1,
    sortAscValue: 13,
  },
  {
    field: "salesAdminCode",
    headerName: "Sale admin",
    minWidth: 120,
    filterKey: "salesAdminCode",
    sortDescValue: 9,
    sortAscValue: 21,
  },
  {
    field: "statusName",
    headerName: "Trạng thái",
    minWidth: 120,
    type: "select",
    options: purchaseOrderStatus,
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
    sortDescValue: 11,
    sortAscValue: 23,
  },
];

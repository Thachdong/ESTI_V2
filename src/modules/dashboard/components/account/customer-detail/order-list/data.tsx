import moment from "moment";
import { StatusChip } from "~modules-core/components";
import { orderStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const orderColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "NGÀY đặt hàng",
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
    minWidth: 150,
    isSort: false,
    filterKey: "createdDate",
    type: "date",
  },
  {
    field: "mainOrderCode",
    headerName: "MÃ ĐH",
    minWidth: 120,
    isSort: false,
    filterKey: "mainOrderCode",
  },
  {
    field: "totalPrice",
    headerName: "TỔNG GT",
    minWidth: 150,
    renderCell: (params) => _format.getVND(params?.row?.totalPrice),
    isSort: false,
    filterKey: "",
  },
  {
    field: "exportPrice",
    headerName: "GT ĐÃ GIAO",
    minWidth: 150,
    renderCell: (params) => _format.getVND(params?.row?.exportPrice),
    isSort: false,
    filterKey: "exportPrice",
  },
  {
    field: "totalBillPrice",
    headerName: "GT Hóa đơn",
    minWidth: 150,
    renderCell: (params) => _format.getVND(params?.row?.totalBillPrice),
    isSort: false,
    filterKey: "totalBillPrice",
  },
  {
    field: "billPaid",
    headerName: "GT thanh toán",
    minWidth: 150,
    renderCell: (params) => _format.getVND(params?.row?.totalBillPrice),
    isSort: false,
    isFilter: false,
  },
  {
    field: "__",
    headerName: "Tích điểm",
    minWidth: 150,
    renderCell: (params) => _format.getVND(params?.row?.totalBillPrice),
    isSort: false,
    isFilter: false,
  },
  {
    field: "___",
    headerName: "Lợi nhuận",
    minWidth: 150,
    renderCell: (params) => _format.getVND(params?.row?.totalBillPrice),
    isSort: false,
    isFilter: false,
  },
  {
    field: "commission",
    headerName: "Hoa hồng",
    minWidth: 150,
    renderCell: (params) => _format.getVND(params?.row?.totalBillPrice),
    isSort: false,
    isFilter: false,
  },
  {
    field: "paidCommission",
    headerName: "Đã chi",
    minWidth: 150,
    renderCell: (params) => _format.getVND(params?.row?.totalBillPrice),
    isSort: false,
    isFilter: false,
  },
  {
    field: "unPaymentComission",
    headerName: "Chưa chi",
    minWidth: 150,
    renderCell: (params) => _format.getVND(params?.row?.totalBillPrice),
    isSort: false,
    isFilter: false,
  },
  {
    field: "statusName",
    headerName: "TRẠNG THÁI",
    minWidth: 120,
    isSort: false,
    filterKey: "status",
    type: "select",
    options: orderStatus,
    renderCell: ({ row }) => {
      const colors = ["default", "info", "success", "error"];
      return (
        <StatusChip
          label={row?.statusName}
          status={row?.status}
          color={colors[row?.status - 1] as any}
        />
      );
    },
  },
];

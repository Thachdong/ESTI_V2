import moment from "moment";
import { StatusChip } from "~modules-core/components";
import { customerCareStatus } from "~modules-core/constance";
import { TGridColDef } from "~types/data-grid";

export const customerCareColumns: TGridColDef[] = [
  {
    field: "performDate",
    headerName: "Ngày thực hiện",
    minWidth: 120,
    renderCell: ({ row }) =>
      row?.performDate ? moment(row?.performDate).format("DD/MM/YYYY") : "",
    filterKey: "performDate",
    type: "date",
    sortDescValue: 5,
    sortAscValue: 12,
  },
  {
    field: "salesCode",
    headerName: "NV Sale",
    minWidth: 120,
    filterKey: "salesCode",
    sortDescValue: 1,
    sortAscValue: 8,
  },
  {
    field: "plan",
    headerName: "Kế hoạch",
    minWidth: 150,
    flex: 1,
    isFilter: false,
    isSort: false,
  },
  {
    field: "actionName",
    headerName: "Nội dung",
    minWidth: 150,
    flex: 1,
    isFilter: false,
    isSort: false,
  },
  {
    field: "result",
    headerName: "Kết quả",
    minWidth: 150,
    flex: 1,
    isFilter: false,
    isSort: false,
  },
  {
    field: "customerCode",
    headerName: "Mã KH",
    minWidth: 100,
    filterKey: "customerCode",
    sortDescValue: 2,
    sortAscValue: 9,
  },
  {
    field: "companyName",
    headerName: "Tên KH",
    minWidth: 150,
    filterKey: "customerName",
    sortDescValue: 3,
    sortAscValue: 10,
  },
  {
    field: "curatorName",
    headerName: "Tên Người liên hệ",
    minWidth: 180,
    isSort: false,
    isFilter: false,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    minWidth: 150,
    renderCell: ({ row }) => (
      <StatusChip status={row?.status} label={row?.statusName} />
    ),
    filterKey: "status",
    sortDescValue: 6,
    sortAscValue: 13,
    type: "select",
    options: customerCareStatus
  },
];

import moment from "moment";
import { StatusChip } from "~modules-core/components";
import { supplierQuotesStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const suplierQuotesColumns: TGridColDef[] = [
    {
      field: "created",
      headerName: "NGÀY TẠO",
      minWidth: 100,
      renderCell: ({ row }) =>
        row.created ? moment(row.created).format("DD/MM/YYYY") : "__",
      filterKey: "created",
      sortDescValue: 3,
      sortAscValue: 15,
      type: "date"
    },
    {
      field: "code",
      headerName: "Mã hỏi giá",
      minWidth: 100,
      filterKey: "code",
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
      filterKey: "supplierName",
      flex: 1,
      sortDescValue: 5,
      sortAscValue: 17,
    },
    {
      field: "totalPrice", // api chỉ trả totalPrice, không trả price, quantity
      headerName: "Giá",
      minWidth: 120,
      filterKey: "totalPrice",
      flex: 1,
      isSort: false,
      renderCell: ({row}) => _format.getVND(row?.totalPrice)
    },
    {
      field: "statusName",
      headerName: "Trạng thái",
      minWidth: 150,
      type: "select",
      options: supplierQuotesStatus,
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
import moment from "moment";
import { StatusChip } from "~modules-core/components";
import { accountStatus } from "~modules-core/constance";
import { TGridColDef } from "~types/data-grid";

export const staffColumns: TGridColDef[] = [
  {
    field: "code",
    headerName: "Mã",
    minWidth: 150,
    filterKey: "code",
    sortDescValue: 0,
    sortAscValue: 13,
  },
  {
    field: "username",
    headerName: "Tên tài khoản",
    minWidth: 150,
    filterKey: "userName",
    sortDescValue: 2,
    sortAscValue: 14,
  },
  {
    field: "fullName",
    headerName: "Tên nhân viên",
    minWidth: 150,
    filterKey: "fullName",
    sortDescValue: 4,
    sortAscValue: 15,
    flex: 1,
  },
  {
    field: "roleName",
    headerName: "Chức vụ",
    minWidth: 150,
    filterKey: "roleName",
    sortDescValue: 5,
    sortAscValue: 16,
  },
  {
    field: "branchCode",
    headerName: "Chi nhánh",
    minWidth: 150,
    filterKey: "branchCode",
    sortDescValue: 1,
    sortAscValue: 12,
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    minWidth: 150,
    filterKey: "phone",
    sortDescValue: 6,
    sortAscValue: 17,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    minWidth: 150,
    filterKey: "address",
    sortDescValue: 7,
    sortAscValue: 18,
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 150,
    filterKey: "email",
    sortDescValue: 8,
    sortAscValue: 19,
  },
  {
    field: "birthday",
    type: "date",
    headerName: "Ngày sinh",
    minWidth: 150,
    filterKey: "fromBirthDate",
    sortDescValue: 9,
    sortAscValue: 20,
    renderCell: ({ row }) =>
      row.birthday ? moment(row.birthday).format("DD/MM/YYYY") : "__",
  },
  {
    field: "statusName",
    headerName: "Trạng thái",
    minWidth: 150,
    filterKey: "status",
    sortDescValue: 10,
    sortAscValue: 21,
    type: "select",
    options: accountStatus,
    renderCell: ({ row }) => {
      const colors = ["success", "default", "error"];
      return (
        <StatusChip
          status={row?.status}
          label={row?.statusName}
          color={colors[row?.status] as any}
        />
      );
    },
  },
];

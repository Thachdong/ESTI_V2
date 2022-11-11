import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import { useQuery } from "react-query";
import { staff } from "src/api";
import {
  DataTable,
} from "~modules-core/components";

export const SaleAdminsList = () => {
  const { data, isLoading, isFetching } = useQuery(
    [
      "saleAdminList",
      "loading",
    ],
    () =>
      staff.getListSaleAdmin()
        .then((res) => res.data)
  );

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Mã",
    },
    { field: "fullName", headerName: "Tên nhân viên" },
    { field: "roleCode", headerName: "Chức vụ" },
    { field: "branchCode", headerName: "Chi nhánh" },
    { field: "phone", headerName: "Số điện thoại" },
    { field: "address", headerName: "Địa chỉ" },
    { field: "email", headerName: "Email" },
    {
      field: "birthday",
      headerName: "Ngày sinh",
      renderCell: ({ row }) =>
        row.birthday ? moment(row.birthday).format("DD/MM/YYYY") : "__",
    },
    { field: "statusName", headerName: "Trạng thái" },
    { field: "action", headerName: "Thao tác" },
  ];

  console.log(data);
  

  return (
    <DataTable
      rows={data}
      columns={columns}
      gridProps={{
        loading: isLoading || isFetching,
      }}
    />
  );
};

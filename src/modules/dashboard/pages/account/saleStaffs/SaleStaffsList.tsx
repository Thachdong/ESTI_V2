import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import { useQuery } from "react-query";
import { staff } from "src/api";
import { DataTable, FilterButton } from "~modules-core/components";

export const SaleStaffsList = () => {
  const { data, isLoading, isFetching } = useQuery(
    ["saleStaffsList", "loading"],
    () => staff.getListSale().then((res) => res.data)
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
    <>
      <div className="flex mb-3">
        <div className="w-1/2"></div>

        <div className="w-1/2 flex items-center justify-end">
          <FilterButton variant="contained">Lọc</FilterButton>
        </div>
      </div>
      <DataTable
        rows={data}
        columns={columns}
        gridProps={{
          loading: isLoading || isFetching,
          paginationMode: "client",
          // pagination: false,
        }}
      />
    </>
  );
};

import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { staff } from "src/api";
import {
  AddButton,
  DataTable,
  FilterButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";

type TFilterParams = {
  FromDate?: number;
  ToDate?: number;
};

export const StaffsList = () => {
  const [filterParams, setFilterPrams] = useState<TFilterParams>();

  const [pagination, setPagination] = useState(defaultPagination);

  const [searchContent, setSearchContent] = useState("");

  const { data, isLoading, isFetching } = useQuery(
    [
      "staffsList",
      "loading",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        searchContent,
        ...filterParams,
      },
    ],
    () =>
      staff
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          searchContent,
          ...filterParams,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
    }
  );

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Mã",
    },
    { field: "roleName", headerName: "Tên tài khoản" },
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

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <>
      <div className="flex mb-3">
        <div className="w-1/2">
          <SearchBox handleSearch={(val) => setSearchContent(val)} />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <AddButton variant="contained" className="mr-3">
            Tạo nhà nhân viên
          </AddButton>
          <FilterButton variant="contained">Lọc</FilterButton>
        </div>
      </div>

      <DataTable
        rows={data?.items}
        columns={columns}
        gridProps={{
          loading: isLoading || isFetching,
          ...paginationProps,
        }}
      />
    </>
  );
};

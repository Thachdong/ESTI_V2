import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { qouteRequest } from "src/api/qoute-request";
import { DataTable, generatePaginationProps } from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";

type TFilterParams = {
  FromDate?: number;
  ToDate?: number;
};

export const QuotationsRequests = () => {
  const [filterParams, setFilterPrams] = useState<TFilterParams>();

  const [pagination, setPagination] = useState(defaultPagination);

  const { data, isLoading, isFetching } = useQuery(
    [
      "qouteRequestsList",
      "loading",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        ...filterParams,
      },
    ],
    () =>
      qouteRequest
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
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
      field: "created",
      headerName: "Ngày tạo",
      type: "dateTime",
      flex: 1,
      renderCell: (params) =>
        params.row.created
          ? moment(params.row.created).format("DD/MM/YYYY")
          : "__",
    },
    { field: "preOrderCode", headerName: "Mã yêu cầu" },
    { field: "customerCode", headerName: "Mã KH" },
    { field: "companyName", headerName: "Tên KH" },
    { field: "customerStatusName", headerName: "Tài khoản" },
    { field: "branchCode", headerName: "Chi nhánh" },
    { field: "salesCode", headerName: "Nhân viên sale" },
    { field: "preOrderStatusName", headerName: "Trạng thái YC" },
    { field: "action", headerName: "Thao tác" },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="p-2 w-full h-full shadow">
      <DataTable
        rows={data?.items}
        columns={columns}
        gridProps={{
          loading: isLoading || isFetching,
          ...paginationProps,
        }}
      />
    </Paper>
  );
};

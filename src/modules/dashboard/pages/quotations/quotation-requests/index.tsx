import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { qouteRequest } from "src/api/qoute-request";
import { DataTable, generatePaginationProps } from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";

export const QuotationRequestsPage = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching } = useQuery(
    [
      "qouteRequestsList",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      qouteRequest
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          ...query,
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
      width: 125,
      renderCell: (params) =>
        params.row.created
          ? moment(params.row.created).format("DD/MM/YYYY")
          : "__",
    },
    { field: "preOrderCode", headerName: "Mã yêu cầu", width: 125, },
    { field: "customerCode", headerName: "Mã KH", width: 125, },
    { field: "companyName", headerName: "Tên KH", flex: 1, minWidth: 125 },
    { field: "customerStatusName", headerName: "Tài khoản", minWidth: 125 },
    { field: "branchCode", headerName: "Chi nhánh", minWidth: 125 },
    { field: "salesCode", headerName: "Nhân viên sale", minWidth: 150 },
    { field: "preOrderStatusName", headerName: "Trạng thái YC", minWidth: 150 },
    { field: "action", headerName: "Thao tác" },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="p-2 w-full h-full shadow">
      <DataTable
        rows={data?.items as []}
        columns={columns}
        gridProps={{
          loading: isLoading || isFetching,
          ...paginationProps,
        }}
      />
    </Paper>
  );
};

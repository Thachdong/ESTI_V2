import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { qouteRequest } from "src/api/qoute-request";
import { DataTable, generatePaginationProps } from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";

export const QuotationRequestsPage = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  // PUSH PAGINATION QUERY
  useEffect(() => {
    const initQuery = {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      ...query,
    };

    router.push({ query: initQuery });
  }, [pagination, router.isReady]);

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

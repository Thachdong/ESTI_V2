import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { exportWarehouse, TWarehouseExport } from "src/api";
import { DataTable, generatePaginationProps } from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";

export const WarehouseExportPage: React.FC = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const [searchContent, setSearchContent] = useState("");
  const columns: GridColDef<TWarehouseExport>[] = [
    {
      field: "code",
      headerName: "NGÀY TẠO",
      renderCell: (params) =>
        params.row.created
          ? moment(params.row.created).format("DD/MM/YYYY")
          : "__",
    },
    { field: "branchCode", headerName: "CHI NHÁNH" },
    { field: "mainOrderCode", headerName: "MÃ ĐƠN HÀNG" },
    { field: "warehouseSessionCode", headerName: "MÃ XUẤT KHO" },
    { field: "customerCode", headerName: "MÃ KH" },
    { field: "companyName", headerName: "TÊN KHÁCH HÀNG" },
    { field: "totalPrice", headerName: "GIÁ TRỊ XUẤT KHO" },
    { field: "deliveryNote", headerName: "GIAO NHẬN" },
    { field: "exportStatusName", headerName: "TRẠNG THÁI" },
  ];

  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "exportWarehouse",
      "loading",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        searchContent,
      },
    ],
    () =>
      exportWarehouse
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          searchContent,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
    }
  );

  console.log("exportwarehouse", data);

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <div>
      <DataTable
        rows={data?.items}
        columns={columns}
        gridProps={{
          loading: isLoading || isFetching,
          ...paginationProps,
        }}
      />
    </div>
  );
};

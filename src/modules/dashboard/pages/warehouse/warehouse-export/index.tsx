import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import router from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { exportWarehouse, TWarehouseExport } from "src/api";
import {
  AddButton,
  DataTable,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";

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
    { field: "companyName", headerName: "TÊN KHÁCH HÀNG", flex: 3 },
    {
      field: "totalPrice",
      headerName: "GIÁ TRỊ XUẤT KHO",
      renderCell: (params) => _format.getVND(params.row.totalPrice),
    },
    { field: "deliveryCode", headerName: "GIAO NHẬN" },
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

  // console.log("exportwarehouse", data);

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="p-2 w-full h-full shadow">
      <div className="mb-2">
        <AddButton
          variant="contained"
          onClick={() =>
            router.push("/dashboard/warehouse/create-warehouse-export")
          }
        >
          Tạo phiếu xuất kho
        </AddButton>
      </div>
      <div>
        <DataTable
          rows={data?.items as []}
          columns={columns}
          gridProps={{
            loading: isLoading || isFetching,
            ...paginationProps,
          }}
        />
      </div>
    </Paper>
  );
};

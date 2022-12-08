import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import router from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { exportWarehouse, TWarehouseExport, warehouse } from "src/api";
import {
  AddButton,
  DataTable,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";

export const WarehouseImportPage: React.FC = () => {
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
    { field: "branchCode", headerName: "CHI NHÁNH", flex: 1 },
    { field: "productOrderCode", headerName: "MÃ ĐƠN MUA HÀNG" },
    { field: "warehouseSessionCode", headerName: "MÃ NHẬP KHO" },
    { field: "supplierCode", headerName: "MÃ NCC" },
    { field: "supplierName", headerName: "TÊN NHÀ CUNG CẤP" },
    {
      field: "totalPrice",
      headerName: "GIÁ TRỊ NHẬP KHO",
      renderCell: (params) => _format.getVND(params.row.totalPrice),
    },
    { field: "deliveryCode", headerName: "GIAO NHẬN" },
    { field: "receiverBillName", headerName: "TRẠNG THÁI HOÁ ĐƠN" },
    { field: "importStatusName", headerName: "TRẠNG THÁI NHẬP KHO" },
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
      warehouse
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
            router.push("/dashboard/warehouse/create-warehouse-import")
          }
        >
          Tạo phiếu nhập kho
        </AddButton>
      </div>
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
    </Paper>
  );
};

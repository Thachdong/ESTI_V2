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
import { PurchaseDialog } from "~modules-dashboard/components";

export const ProductsToBuyPage: React.FC = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const [searchContent, setSearchContent] = useState("");
  const [modal, setModal] = useState(false);

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
    { field: "warehouseSessionCode", headerName: "MÃ SẢN PHẨM" },
    { field: "nameProduct", headerName: "TÊN SẢN PHẨM" },
    { field: "count", headerName: "SL" },
    { field: "codeSupplier", headerName: "MÃ NCC" },
    { field: "status", headerName: "TRẠNG THÁI" },
    { field: "nameSupplier", headerName: "TÊN NHÀ CUNG CẤP" },
    { field: "action", headerName: "" },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="p-2 w-full h-full shadow">
      <div className="mb-2">
        <AddButton variant="contained" onClick={() => setModal(true)}>
          MUA SẢN PHẨM NHẬP KHO
        </AddButton>
      </div>
      <div>
        <DataTable
          rows={[]}
          columns={columns}
          gridProps={{
            // loading: isLoading || isFetching,
            ...paginationProps,
          }}
        />
      </div>
      <PurchaseDialog onClose={() => setModal(false)} open={modal} type="Add" />
    </Paper>
  );
};

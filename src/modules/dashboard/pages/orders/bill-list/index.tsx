import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import router from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TWarehouseExport } from "src/api";
import {
  AddButton,
  DataTable,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";

export const BillListPage: React.FC = () => {
  const { control, handleSubmit } = useForm<any>({
    mode: "onBlur",
  });
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
    { field: "branchCode", headerName: "SỐ HOÁ ĐƠN" },
    { field: "mainOrderCode", headerName: "MÃ KHÁCH HÀNG" },
    { field: "warehouseSessionCode", headerName: "TÊN KHÁCH HÀNG" },
    { field: "nameProduct", headerName: "GIÁ TRỊ HOÁ ĐƠN" },
    { field: "count", headerName: "ĐÃ THANH TOÁN" },
    { field: "codeSupplier", headerName: "CÒN PHẢI THU" },
    { field: "branchId", headerName: "CHI NHÁNH" },
    { field: "nameSupplier", headerName: "NHÂN VIÊN KD" },
    { field: "status", headerName: "TRẠNG THÁI" },
    { field: "action", headerName: "" },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <>
      <div className="mb-4 grid grid-cols-4 gap-4">
        <div className="bg-[#c6c2bc] p-4 rounded-sm h-[100px] font-semibold text-white">
          <div className="mb-4 ">
            <span>TỔNG GIÁ TRỊ HOÁ ĐƠN</span>
          </div>
          <div className="flex justify-end text-xl">
            <span>0</span>
          </div>
        </div>
        <div className="bg-[#519de0] p-4 rounded-sm h-[100px] font-semibold text-white">
          <div className="mb-4 ">
            <span>TỔNG GIÁ TRỊ ĐÃ THANH TOÁN</span>
          </div>
          <div className="flex justify-end text-xl">
            <span>47</span>
          </div>
        </div>
        <div className="bg-[#48cda1] p-4 rounded-sm h-[100px] font-semibold text-[#fff]">
          <div className="mb-4 ">
            <span>TỔNG GIÁ TRỊ CÒN PHẢI THU</span>
          </div>
          <div className="flex justify-end text-xl">
            <span>29</span>
          </div>
        </div>
        <div className="bg-[#c686e8] p-4 rounded-sm h-[100px] font-semibold text-white">
          <div className="mb-4 ">
            <span>TỔNG GIÁ TRỊ QUÁ HẠN</span>
          </div>
          <div className="flex justify-end text-xl">
            <span>0 VNĐ</span>
          </div>
        </div>
      </div>
      <Paper className="p-2 w-full h-full shadow">
        <div className="flex gap-4 items-center mb-2">
          <div>
            <AddButton
              variant="contained"
              onClick={() =>
                router.push("/dashboard/orders/bill-list/create-bill")
              }
            >
              TẠO MỚI HOÁ ĐƠN
            </AddButton>
          </div>
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
      </Paper>
    </>
  );
};

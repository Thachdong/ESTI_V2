import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import {
  BaseButton,
  DataTable,
  FormDatepicker,
  FormInput,
  FormSelect,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";

type TProps = {
  control: any;
};

export const InfoProductSupplier: React.FC<TProps> = ({ control }) => {
  const [pagination, setPagination] = useState(defaultPagination);
  const columns: GridColDef<any>[] = [
    {
      field: "STT",
      headerName: "STT",
    },
    { field: "branchCode", headerName: "MÃ SẢN PHẨM" },
    { field: "mainOrderCode", headerName: "MÔ TẢ" },
    { field: "warehouseSessionCode", headerName: "HÃNG SẢN XUẤT" },
    { field: "nameProduct", headerName: "QUY CÁCH" },
    { field: "count", headerName: "ĐƠN VỊ" },
    { field: "codeSupplier", headerName: "SỐ LƯỢNG" },
    { field: "status", headerName: "ĐƠN GIÁ" },
    { field: "nameSupplier", headerName: "THÀNH TIỀN" },
    { field: "note", headerName: "GHI CHÚ" },
    { field: "action", headerName: "" },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);
  return (
    <Paper className="shadow p-4 mt-4">
      <div className="flex gap-4">
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="w-[25%] font-medium text-sm">
              <span>Từ ngày:</span>
            </div>
            <div className="w-full">
              <FormDatepicker
                controlProps={{
                  name: "code",
                  control,
                }}
                options={[]}
                label=""
                required
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[25%] font-medium text-sm">
              <span>Đến ngày:</span>
            </div>
            <div className="w-[75%] flex items-center gap-4">
              <FormDatepicker
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                required
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div>
          <BaseButton className="min-w-[50px] w-[50px] h-[40px]">
            Lọc
          </BaseButton>
        </div>
      </div>
      <div className="mt-4">
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
  );
};

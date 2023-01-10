import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  BaseButton,
  DataTable,
  FormInput,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import {
  InfoCreateBillForm,
  InfoReceipForm,
} from "~modules-dashboard/components";

export const CreateBillPage = () => {
  const { control, handleSubmit } = useForm<any>({
    mode: "onBlur",
  });
  const [pagination, setPagination] = useState(defaultPagination);

  const columns: GridColDef<any>[] = [
    {
      field: "code",
      headerName: "STT",
      renderCell: (params) =>
        params.row.created
          ? moment(params.row.created).format("DD/MM/YYYY")
          : "__",
    },
    { field: "branchCode", headerName: "Mã sản phẩm" },
    { field: "mainOrderCode", headerName: "Tên sản phẩm" },
    { field: "warehouseSessionCode", headerName: "Nơi sản xuất" },
    { field: "nameProduct", headerName: "Xuất sứ" },
    { field: "count", headerName: "Quy cách" },
    { field: "codeSupplier", headerName: "Đơn vị tính" },
    { field: "branchId", headerName: "Số lượng" },
    { field: "nameSupplier", headerName: "Đơn giá" },
    { field: "status", headerName: "Thuế GTGT" },
    { field: "monney", headerName: "Thành tiền" },
    { field: "action", headerName: "" },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <div className="h-[400px] verflow-y-auto">
      <div>
        <InfoCreateBillForm control={control} />
      </div>
      <div>
        <Paper className="shadow p-4 mt-4">
          <div className="font-medium mb-2">
            <span>THÔNG TIN SẢN PHẨM</span>
          </div>
          <div>
            <DataTable
              rows={[]}
              columns={columns}
              gridProps={{
                loading: false,
                ...paginationProps,
              }}
              hideSearchbar={true}
            />
          </div>
        </Paper>
      </div>
      <div>
        <InfoReceipForm control={control} />
      </div>
      <div className="flex justify-end py-4">
        <BaseButton className="">Lưu</BaseButton>
      </div>
    </div>
  );
};

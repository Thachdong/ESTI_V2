import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Abbreviatedable,
  BaseButton,
  FormInput,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { FormCheckbox } from "~modules-core/components/form-hooks/FormCheckbox";
import { defaultPagination } from "~modules-core/constance";
import { InfoCreateOrderRequest } from "~modules-dashboard/components";

export const CreateOrdersRequestPage = () => {
  const [pagination, setPagination] = useState(defaultPagination);
  const { control, handleSubmit } = useForm<any>({
    mode: "onBlur",
  });
  const [checkConfirm, setChecConfirm] = useState(false);

  const columns: GridColDef<any>[] = [
    {
      field: "code",
      headerName: "NGÀY TẠO",
      renderCell: (params) =>
        params.row.created
          ? moment(params.row.created).format("DD/MM/YYYY")
          : "__",
    },
    { field: "branchCode", headerName: "MÃ ĐƠN ĐẶT HÀNG" },
    { field: "mainOrderCode", headerName: "MÃ KHÁCH HÀNG" },
    { field: "warehouseSessionCode", headerName: "TÊN KHÁCH HÀNG" },
    { field: "nameProduct", headerName: "TỔNG GIÁ TRỊ" },
    { field: "count", headerName: "GIÁ TRỊ ĐÃ GIAO" },
    { field: "codeSupplier", headerName: "GIÁ TRỊ ĐÃ XUẤT HĐ" },
    { field: "branchId", headerName: "CHI NHÁNH" },
    { field: "nameSupplier", headerName: "SALES" },
    { field: "status", headerName: "TRẠNG THÁI" },
    { field: "action", headerName: "" },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <div className="h-[400px] verflow-y-auto">
      <div>
        <FormCheckbox
          label={"Đơn đặt không thông qua đơn mua"}
          controlProps={{
            name: "confirm",
            control: control,
            rules: undefined,
          }}
          onChange={(val) => setChecConfirm(val.target.checked)}
        />
      </div>
      <div>
        <InfoCreateOrderRequest control={control} checkConfirm={checkConfirm} />
      </div>
      <div>
        <Paper className="shadow p-4 mt-4">
          <div className="w-[50%] mb-4">
            <SearchBox />
          </div>
          <div>
            <Abbreviatedable
              rows={[]}
              columns={columns}
              gridProps={{
                // loading: isLoading || isFetching,
                ...paginationProps,
              }}
            />
          </div>
        </Paper>
      </div>
      <div>
        <Paper className="grid grid-cols-4 gap-4 shadow p-4 mt-4">
          <div className="">
            <div className=" font-medium text-sm mb-2">
              <span>SHOP MANAGER NOTE</span>
            </div>
            <div className="">
              <FormInput
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                required
                multiline
                minRows={3}
                disabled
              />
            </div>
          </div>
          <div className="">
            <div className=" font-medium text-sm mb-2">
              <span>SALES ADMIN NOTE</span>
            </div>
            <div className="">
              <FormInput
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                required
                multiline
                minRows={3}
                disabled
              />
            </div>
          </div>
          <div className="">
            <div className=" font-medium text-sm mb-2">
              <span>SALES NOTE</span>
            </div>
            <div className="">
              <FormInput
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                required
                multiline
                minRows={3}
                disabled
              />
            </div>
          </div>
          <div className="">
            <div className=" font-medium text-sm mb-2">
              <span>GIAO NHẬN NOTE</span>
            </div>
            <div className="">
              <FormInput
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                required
                multiline
                minRows={3}
                disabled
              />
            </div>
          </div>
        </Paper>
      </div>
      <div className="flex justify-end py-4">
        <BaseButton>Tạo đơn hàng</BaseButton>
      </div>
    </div>
  );
};

import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TWarehouseExport } from "src/api";
import {
  Abbreviatedable,
  BaseButton,
  DataTable,
  generatePaginationProps,
} from "~modules-core/components";
import { FormCheckbox } from "~modules-core/components/form-hooks/FormCheckbox";
import { defaultPagination } from "~modules-core/constance";
import { WarehouseImportForm } from "~modules-dashboard/components";
import SaveIcon from "@mui/icons-material/Save";

export const CreateWarehouseImportPage = () => {
  const [pagination, setPagination] = useState(defaultPagination);
  const { control, handleSubmit, reset } = useForm<TWarehouseExport>({
    mode: "onBlur",
  });

  const [checkImport, setCheckImport] = useState(false);

  const columns: GridColDef<TWarehouseExport>[] = [
    {
      field: "stt",
      headerName: "STT",
    },
    { field: "branchCode", headerName: "Mã SP" },
    { field: "mainOrderCode", headerName: "Tên sản phẩm" },
    { field: "warehouseSessionCode", headerName: "Hãng SX" },
    { field: "customerCode", headerName: "Quy cách" },
    { field: "companyName", headerName: "Đơn vị", flex: 3 },
    {
      field: "totalPrice",
      headerName: "Số lượng",
    },
    { field: "deliveryCode", headerName: "Giá" },
    { field: "exportStatusName", headerName: "Thuế GTGT" },
    { field: "s", headerName: "Thành tiền" },
    { field: "fd", headerName: "Số LOT" },
    { field: "d", headerName: "Ngày SX" },
    { field: "df", headerName: "Hạn SD" },
    { field: "f", headerName: "Vị trí" },
    { field: "action", headerName: "" },
  ];
  const paginationProps = generatePaginationProps(pagination, setPagination);

  const data = [
    {
      id: "sdfdsf",
      branchCode: "dfgdfh",
      warehouseSessionCode: "sdgdf",
      f: "dfhfdg",
    },
  ];

  return (
    <div className="!w-full h-[400px] verflow-y-auto">
      <div>
        <FormCheckbox
          label={"Xuất bỏ sản phẩm"}
          controlProps={{
            name: "ExportDelete",
            control: control,
            rules: undefined,
          }}
          onChange={(val) => {
            // console.log("hahaa", val.target.checked);
            setCheckImport(val.target.checked);
          }}
        />
      </div>
      <div>
        <WarehouseImportForm control={control} checkExport={checkImport} />
      </div>
      <div className="p-3 bg-white rounded-sm mt-4">
        <div className="text-sm font-medium mb-2">
          <span>SẢN PHẨM</span>
        </div>
        <div>
          <Abbreviatedable rows={[]} columns={columns} />
        </div>
      </div>
      <div className="flex justify-end">
        <BaseButton
          type="button"
          className="bg-[#2eaaa8] my-4 min-w-[80px] w-[80px]"
          onClick={() => console.log("Xuất kho")}
        >
          <SaveIcon className="mr-2" />
          Lưu
        </BaseButton>
      </div>
    </div>
  );
};

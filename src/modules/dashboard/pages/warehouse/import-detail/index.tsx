import {
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BaseButton, DataTable } from "~modules-core/components";
import {
  WarehouseImportCuratorInfo,
  WarehouseImportGeneralInfo,
  WarehouseImportSupplierInfo,
} from "~modules-dashboard/components";
import SaveIcon from "@mui/icons-material/Save";
import { productColumns } from "./data";
import { FormCheckbox } from "~modules-core/components/form-hooks/FormCheckbox";

export const ImportDetailPage = () => {
  const methods = useForm({
    mode: "onBlur",
  });

  const columns: GridColDef[] = [
    ...productColumns,
    { field: "action", headerName: "" },
  ];

  return (
    <Box>
      <FormProvider {...methods}>
        <Box className="mb-2">
          <FormCheckbox
            controlProps={{
              name: "withoutPurchaseInvoice",
              control: methods.control,
            }}
            label="Nhập hàng không thông qua đơn mua"
          />
        </Box>

        <WarehouseImportGeneralInfo />

        <Box className="grid grid-cols-2 gap-4 my-4">
          <WarehouseImportSupplierInfo />

          <WarehouseImportCuratorInfo />
        </Box>

        <Paper className="rounded-sm p-3">
          <Typography className="text-sm font-medium mb-3">SẢN PHẨM</Typography>

          <DataTable
            rows={[]}
            columns={columns}
            autoHeight={true}
            hideFooter
            hideSearchbar={true}
          />
        </Paper>
      </FormProvider>

      <Box className="flex justify-end my-4">
        <BaseButton
          type="button"
          className="bg-[#2eaaa8]"
          onClick={() => console.log("Xuất kho")}
        >
          <SaveIcon className="mr-2" />
          Lưu
        </BaseButton>
      </Box>
    </Box>
  );
};

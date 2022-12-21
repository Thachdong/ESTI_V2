import { Box, Paper, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInputBase, FormSelect } from "~modules-core/components";

export const WarehouseImportGeneralInfo = () => {
  const { control, watch } = useFormContext();

  const withoutPurchaseInvoice = watch("withoutPurchaseInvoice");

  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4">
        {!withoutPurchaseInvoice && (
          <FormSelect
            options={[]}
            controlProps={{
              control,
              name: "saleAdminId",
              rules: { required: true },
            }}
            label="Đơn mua hàng"
          />
        )}

        <FormSelect
          options={[]}
          controlProps={{
            control,
            name: "saleAdminId",
            rules: { required: true },
          }}
          label="Mã chi nhánh"
        />

        <FormSelect
          options={[]}
          controlProps={{
            control,
            name: "saleAdminId",
            rules: { required: false },
          }}
          label="Giao nhận phụ trách"
        />

        {!withoutPurchaseInvoice && (
          <FormInputBase
            name="saleAdmin"
            label="Admin phụ trách"
            value="asdfasdf"
            disabled
          />
        )}

        {!withoutPurchaseInvoice && (
          <FormInputBase
            name="createdAt"
            label="Ngày tạo"
            value="22/12/2022"
            disabled
          />
        )}
        <FormInputBase
          name="warehouseCode"
          label="Mã kho"
          value="asdf"
          disabled
        />
      </Box>
    </Paper>
  );
};

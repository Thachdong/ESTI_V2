import { Box, Paper, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInput, FormInputBase, FormSelect } from "~modules-core/components";

export const WarehouseImportSupplierInfo = () => {
  const { control, watch } = useFormContext();

  const withoutPurchaseInvoice = watch("withoutPurchaseInvoice");

  const supplier = {
    address: "dfasf",
    taxCode: "adsfasdf",
  };
  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN NHÀ CUNG CẤP
      </Typography>

      <Box className="grid gap-4">
        <FormSelect
          options={[]}
          controlProps={{
            control,
            name: "saleAdminId",
            rules: { required: true },
          }}
          label="Nhà cung cấp"
          disabled={!withoutPurchaseInvoice}
        />

        <FormInputBase name="address" label="Địa chỉ" value={supplier?.address} disabled />

        <FormInputBase name="taxCode" label="Mã số thuế" value={supplier?.taxCode} disabled />
      </Box>
    </Paper>
  );
};

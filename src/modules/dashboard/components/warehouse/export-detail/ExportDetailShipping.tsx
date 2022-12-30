import { Box, Paper, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInput, FormInputBase } from "~modules-core/components";
import { FormInputNumber } from "~modules-core/components/form-hooks/FormInputNumber";

export const ExportDetailShipping = () => {
  const { control } = useFormContext();

  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN VẬN CHUYỂN
      </Typography>

      <Box className="grid gap-4">
        <FormInput
          controlProps={{
            control,
            name: "deliveryUnit",
          }}
          label="Đơn vị v/c"
        />

        <FormInput
          controlProps={{
            control,
            name: "codeVD",
          }}
          label="Mã vận đơn"
        />
        <FormInputNumber
          controlProps={{
            control,
            name: "packageNumber",
          }}
          label="Số kiện hàng"
        />
        <FormInput
          controlProps={{
            control,
            name: "packageWeight",
          }}
          label="Khối lượng"
        />
        <FormInputNumber
          controlProps={{
            control,
            name: "shippingFee",
          }}
          label="Cước phí"
        />
      </Box>
    </Paper>
  );
};

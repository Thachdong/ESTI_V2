import { Box, Paper, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInput, FormInputBase } from "~modules-core/components";

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
            name: "",
          }}
          label="Đơn vị v/c"
        />

        <FormInput
          controlProps={{
            control,
            name: "",
          }}
          label="Mã vận đơn"
        />
        <FormInput
          controlProps={{
            control,
            name: "",
          }}
          label="Số kiện hàng"
        />
        <FormInput
          controlProps={{
            control,
            name: "",
          }}
          label="Khối lượng"
        />
        <FormInput
          controlProps={{
            control,
            name: "",
          }}
          label="Cước phí"
        />
      </Box>
    </Paper>
  );
};

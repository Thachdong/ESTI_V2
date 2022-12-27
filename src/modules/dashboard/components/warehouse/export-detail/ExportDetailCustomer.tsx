import { Box, Paper, Typography } from "@mui/material";
import { FormInputBase } from "~modules-core/components";

export const ExportDetailCustomer = () => {
  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid gap-4">
        <FormInputBase value="dfasdf " disabled={true} label="Khách hàng" />

        <FormInputBase value="dfasdf " disabled={true} label="Đ/c nhận hàng" />

        <FormInputBase value="dfasdf " disabled={true} label="Mã số thuế" />

        <FormInputBase value="dfasdf " disabled={true} label="Lĩnh vực KD" />
      </Box>
    </Paper>
  );
};

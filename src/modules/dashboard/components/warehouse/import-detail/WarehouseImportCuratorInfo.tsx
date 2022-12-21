import { Box, Paper, Typography } from "@mui/material";
import { FormInputBase } from "~modules-core/components";

export const WarehouseImportCuratorInfo = () => {
  const supplier = {
    name: "dong",
    phone: "288283939",
    email: "dong.thach@gmail.com"
  }
  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN LIÊN HỆ
      </Typography>

      <Box className="grid gap-4">
        <FormInputBase name="name" label="Người phụ trách" value={supplier?.name} disabled />

        <FormInputBase name="phone" label="Điện thoại" value={supplier?.phone} disabled />

        <FormInputBase name="email" label="Email" value={supplier?.email} disabled />
      </Box>
    </Paper>
  );
};

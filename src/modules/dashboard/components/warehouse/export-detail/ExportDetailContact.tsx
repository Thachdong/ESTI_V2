import { Box, Paper, Typography } from "@mui/material";
import { FormInputBase } from "~modules-core/components";

export const ExportDetailContact = () => {
  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN LIÊN HỆ
      </Typography>

      <Box className="grid gap-4">
        <FormInputBase value="dfasdf " disabled={true} label="Nguời phụ trách" />

        <FormInputBase value="dfasdf " disabled={true} label="Phòng ban" />

        <FormInputBase value="dfasdf " disabled={true} label="Điện thoại" />

        <FormInputBase value="dfasdf " disabled={true} label="Email" />
      </Box>
    </Paper>
  );
};

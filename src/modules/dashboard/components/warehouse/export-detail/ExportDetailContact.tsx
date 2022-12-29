import { Box, Paper, Typography } from "@mui/material";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  selectedOrder: any;
};

export const ExportDetailContact: React.FC<TProps> = ({ selectedOrder }) => {
  const {curatorName, curatorDepartmentName, curatorPhone, curatorEmail} = selectedOrder || {};
  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN LIÊN HỆ
      </Typography>

      <Box className="grid gap-4">
        <FormInputBase value={curatorName} disabled={true} label="Nguời phụ trách" />

        <FormInputBase value={curatorDepartmentName} disabled={true} label="Phòng ban" />

        <FormInputBase value={curatorPhone} disabled={true} label="Điện thoại" />

        <FormInputBase value={curatorEmail} disabled={true} label="Email" />
      </Box>
    </Paper>
  );
};

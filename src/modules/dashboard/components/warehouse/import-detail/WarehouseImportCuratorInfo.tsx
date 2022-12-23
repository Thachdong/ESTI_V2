import { Box, Paper, Typography } from "@mui/material";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  orderDetail: any;
};

export const WarehouseImportCuratorInfo: React.FC<TProps> = ({
  orderDetail,
}) => (
  <Paper className="rounded-sm p-3">
    <Typography className="text-sm font-medium mb-3">
      THÔNG TIN LIÊN HỆ
    </Typography>

    <Box className="grid gap-4">
      <FormInputBase
        name="name"
        label="Người phụ trách"
        value={orderDetail?.curatorName || ""}
        disabled
      />

      <FormInputBase
        name="phone"
        label="Điện thoại"
        value={orderDetail?.curatorPhone || ""}
        disabled
      />

      <FormInputBase
        name="email"
        label="Email"
        value={orderDetail?.curatorEmail || ""}
        disabled
      />
    </Box>
  </Paper>
);

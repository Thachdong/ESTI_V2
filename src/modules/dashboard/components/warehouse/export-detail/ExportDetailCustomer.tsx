import { Box, Paper, Typography } from "@mui/material";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  customerData: any;
};

export const ExportDetailCustomer: React.FC<TProps> = ({ customerData = {} }) => {
  return (
    <Box className="col-span-2 grid grid-cols-2 gap-4">
      <Paper className="rounded-sm p-3">
        <Typography className="text-sm font-medium mb-3">
          THÔNG TIN KHÁCH HÀNG
        </Typography>

        <Box className="grid gap-4">
          <FormInputBase value={customerData.companyName} disabled={true} label="Khách hàng" />

          <FormInputBase
            value={customerData.companyAddress}
            disabled={true}
            label="Đ/c nhận hàng"
          />

          <FormInputBase value={customerData.companyTaxCode} disabled={true} label="Mã số thuế" />

          <FormInputBase
            value={customerData.conpanyProfessionName}
            disabled={true}
            label="Lĩnh vực KD"
          />
        </Box>
      </Paper>

      <Paper className="rounded-sm p-3">
        <Typography className="text-sm font-medium mb-3">
          THÔNG TIN LIÊN HỆ
        </Typography>

        <Box className="grid gap-4">
          <FormInputBase
            value={customerData?.curatorName}
            disabled={true}
            label="Nguời phụ trách"
          />

          <FormInputBase
            value={customerData?.curatorDepartmentName}
            disabled={true}
            label="Phòng ban"
          />

          <FormInputBase
            value={customerData?.curatorPhone}
            disabled={true}
            label="Điện thoại"
          />

          <FormInputBase value={customerData?.curatorEmail} disabled={true} label="Email" />
        </Box>
      </Paper>
    </Box>
  );
};

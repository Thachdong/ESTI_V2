import { Box, Paper, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { customer } from "src/api";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  selectedOrder: any;
};

export const ExportDetailCustomer: React.FC<TProps> = ({ selectedOrder }) => {
  const { customerId } = selectedOrder || {};

  const { data: customerDetail } = useQuery(
    ["customerDetail_" + customerId],
    () => customer.getById(customerId).then((res) => res.data),
    {
      enabled: !!customerId,
    }
  );

  const {name, address, taxCode, professionName} = customerDetail?.companyInfo || {};

  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN KHÁCH HÀNG
      </Typography>

      <Box className="grid gap-4">
        <FormInputBase value={name} disabled={true} label="Khách hàng" />

        <FormInputBase value={address} disabled={true} label="Đ/c nhận hàng" />

        <FormInputBase value={taxCode} disabled={true} label="Mã số thuế" />

        <FormInputBase value={professionName} disabled={true} label="Lĩnh vực KD" />
      </Box>
    </Paper>
  );
};

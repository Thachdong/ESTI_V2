import { Box, Typography } from "@mui/material";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  data: {
    customerCode: string;
    customerName: string;
    address: string;
    taxCode: string;
  };
};

export const BillDetailCustomer: React.FC<TProps> = ({ data }) => {
  return (
    <Box>
      <Typography className="font-bold uppercase mb-3 text-sm">
        THÔNG TIN KHÁCH HÀNG
      </Typography>

      <Box className="grid gap-3 bg-white rounded p-3">
        <FormInputBase
          value={data.customerCode}
          label="Khách hàng: "
          disabled
        />

        <FormInputBase
          value={data.customerName}
          label="Tên khách hàng: "
          disabled
        />

        <FormInputBase value={data.address} label="Mã số thuế: " disabled />

        <FormInputBase value={data.taxCode} label="Địa chỉ:" disabled />
      </Box>
    </Box>
  );
};

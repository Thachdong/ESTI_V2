import { Box, Typography } from "@mui/material";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  customerData: any;
};

export const QuoteDetailViewCustomer: React.FC<TProps> = ({ customerData }) => {
  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        Thông tin doanh nghiệp
      </Typography>

      <Box className="grid gap-3 bg-white rounded p-3">
        <FormInputBase
          label="Tên khách hàng"
          disabled
          value={customerData?.companyName}
        />

        <FormInputBase
          label="Mã số thuế"
          disabled
          value={customerData?.companyTaxCode}
        />

        <FormInputBase
          label="Địa chỉ khách hàng"
          multiline
          minRows={2}
          disabled
          value={customerData?.companyAddress}
        />
      </Box>
    </Box>
  );
};

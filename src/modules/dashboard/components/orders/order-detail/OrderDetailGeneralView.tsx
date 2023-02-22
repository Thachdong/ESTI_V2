import { Box, Typography } from "@mui/material";
import moment from "moment";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  data: any;
};

export const OrderDetailGeneralView: React.FC<TProps> = ({
  data,
}) => {
  return (
    <Box className="flex flex-col col-span-2">
      <Typography className="font-bold uppercase mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded-sm p-3">
        <FormInputBase label="Mã BG" value={data?.preQuoteCode} disabled />

        <FormInputBase
          label="Mã ĐH"
          value={data?.mainOrderCode}
          disabled
        />

        <FormInputBase
          label="Ngày tạo đơn hàng"
          value={moment(data?.created).format("DD/MM/YYYY")}
          disabled
        />

        <FormInputBase
          label="CN thực hiện"
          value={data?.branchCode}
          disabled
        />
      </Box>
    </Box>
  );
};
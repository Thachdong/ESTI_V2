import { Box, Typography } from "@mui/material";
import { FormInputBase } from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";

type TProps = {
  data: {
    paid: number;
    unPaid: number;
  };
};

export const BillDetailPaymentStatus: React.FC<TProps> = ({data}) => {
  return (
    <Box className="mt-4">
      <Typography className="font-bold uppercase mb-3">
        TRẠNG THÁI THANH TOÁN
      </Typography>

      <Box className="grid gap-4 bg-white rounded-sm p-3">
        <FormInputBase value={_format.getVND(data.paid)} label="Số tiền đã thanh toán:" disabled />

        <FormInputBase value={_format.getVND(data.unPaid)} label="Số tiền còn phải thu:" disabled />
      </Box>
    </Box>
  );
};

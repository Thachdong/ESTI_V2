import { Box, Typography } from "@mui/material";
import moment from "moment";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  data: any;
};

export const PurchaseDetailGeneralView: React.FC<TProps> = ({ data }) => {
  return (
    <Box className="flex flex-col mb-4">
      <Typography className="font-bold uppercase mb-3 text-sm">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded p-3">
        <FormInputBase label="Chi nhánh:" value={data?.branchCode} disabled />

        <FormInputBase label="Mã đơn mua hàng:" value={data?.code} disabled />

        <FormInputBase
          label="Người tạo:"
          value={data?.createdByName}
          disabled
        />

        <FormInputBase
          label="Ngày tạo:"
          value={moment(data?.created).format("DD/MM/YYYY")}
          disabled
        />
      </Box>
    </Box>
  );
};

import { Box, Typography } from "@mui/material";
import moment from "moment";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  data: {
    name: string;
    phone: string;
    email: number;
    address: string;
  };
};

export const BillDetailRecieverView: React.FC<TProps> = ({ data }) => {
  return (
    <Box>
      <Typography className="font-bold uppercase mb-3 text-sm">
        THÔNG TIN NHẬN HÓA ĐƠN
      </Typography>

      <Box className="bg-white rounded p-3">
        <FormInputBase
          value={data.name}
          label="Người nhận: "
          className="mb-4"
          disabled
        />

        <FormInputBase
          value={data.email}
          label="Email:"
          className="mb-4"
          disabled
        />

        <FormInputBase
          value={data.phone}
          label="Số điện thoại:"
          className="mb-4"
          disabled
        />

        <FormInputBase value={data.address} label="Địa chỉ:" disabled />
      </Box>
    </Box>
  );
};

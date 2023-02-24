import { Box, Typography } from "@mui/material";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  data: {
    curatorName: string;
    curatorDepartmentName: string;
    curatorPhone: string;
    curatorEmail: string;
  };
};

export const BillDetailCurator: React.FC<TProps> = ({ data }) => {
  return (
    <Box>
      <Typography className="font-bold uppercase mb-3 text-sm">
        THÔNG TIN LIÊN HỆ
      </Typography>

      <Box className="grid gap-3 bg-white rounded p-3">
        <FormInputBase
          value={data.curatorName}
          label="Nguời phụ trách: "
          disabled
        />

        <FormInputBase
          value={data.curatorDepartmentName}
          label="Phòng ban: "
          disabled
        />

        <FormInputBase
          value={data.curatorPhone}
          label="Điện thoại: "
          disabled
        />

        <FormInputBase value={data.curatorEmail} label="Email:" disabled />
      </Box>
    </Box>
  );
};

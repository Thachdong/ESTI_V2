import { Box, Typography } from "@mui/material";
import moment from "moment";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  code: string;
  createdAt: number;
};

export const QuoteRequestDetailGeneral: React.FC<TProps> = ({
  code,
  createdAt,
}) => {
  return (
    <Box className="flex flex-col mb-4">
      <Typography className="font-bold uppercase mb-3 text-sm">
        thông tin chung
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded p-3">
        <FormInputBase label="Mã Y/C báo giá:" value={code} disabled />

        <FormInputBase
          label="Ngày gửi y/c:"
          value={moment(createdAt).format("DD/MM/YYYY")}
          disabled
        />
      </Box>
    </Box>
  );
};

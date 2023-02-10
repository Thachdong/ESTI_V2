import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { branchs, preQuote } from "src/api";
import { FormSelectAsync } from "~modules-core/components";

export const OrderDetailGeneral: React.FC = () => {
  const { control } = useFormContext();
  return (
    <Box>
      <Typography className="font-bold uppercase mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded-sm p-3">
        <FormSelectAsync
          controlProps={{
            name: "preQuoteCode",
            control,
            rules: {required: "Phải chọn đơn báo giá"}
          }}
          label="Đơn báo giá"
          fetcher={preQuote.getList}
          labelKey="preQuoteCode"
        />
        <FormSelectAsync
          controlProps={{
            name: "Branchs",
            control,
          }}
          label="CN thực hiện"
          labelKey="code"
          fetcher={branchs.getList}
        />
      </Box>
    </Box>
  );
};

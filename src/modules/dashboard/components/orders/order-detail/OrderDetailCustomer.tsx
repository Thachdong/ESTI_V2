import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import {
  FormCustomer,
  FormInputBase,
} from "~modules-core/components";

export const OrderDetailCustomer: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        THÔNG TIN DOANH NGHIỆP
      </Typography>

      <Box className="grid gap-4 bg-white rounded-sm flex-grow p-3">
        <FormCustomer
          controlProps={{
            name: "customerId",
            control,
          }}
        />

        <FormInputBase label="Địa chỉ:" disabled />

        <FormInputBase label="Mã số thuế:" disabled />

        <FormInputBase label="Lĩnh vực KD:" disabled />
      </Box>
    </Box>
  );
};

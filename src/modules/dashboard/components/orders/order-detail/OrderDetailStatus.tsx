import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { BaseButton, FormSelect } from "~modules-core/components";
import { orderStatus } from "~modules-core/constance";

export const OrderDetailStatus: React.FC = () => {
  const { control, watch } = useFormContext();

  const {status} = watch();

  return (
    <Box className="flex flex-col col-span-2">
      <Typography className="font-bold uppercase mb-3">
        Trạng thái đơn hàng
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded-sm p-3">
        <FormSelect
          options={orderStatus}
          controlProps={{
            control,
            name: "status",
          }}
          label=""
          shrinkLabel
          labelKey="label"
          valueKey="value"
          disabled={status > 2}
        />

        <BaseButton disabled={status > 2} className="max-w-[200px]">Cập nhật trạng thái</BaseButton>
      </Box>
    </Box>
  );
};

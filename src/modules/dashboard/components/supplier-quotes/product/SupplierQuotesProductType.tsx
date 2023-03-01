import { Box, Typography } from "@mui/material";
import _ from "lodash";
import { useFormContext } from "react-hook-form";
import { FormSelect } from "~modules-core/components";
import {
  supplierQuotesProductTypes,
} from "~modules-core/constance";

type TProps = {
  disabled: boolean;
};

export const SupplierQuotesProductType: React.FC<TProps> = ({ disabled }) => {
  const { control } = useFormContext();

  return (
    <Box className="grid grid-cols-2 gap-3">
      <Box className="mb-3">
        <Typography className="font-semibold mb-2 text-sm">
          LOẠI YÊU CẦU
        </Typography>
        <Box className="grid gap-3">
          <FormSelect
            options={supplierQuotesProductTypes}
            controlProps={{
              name: "requirement",
              control,
              rules: { required: "Phải chọn loại yêu cầu" },
            }}
            label="Chọn loại yêu cầu"
            labelKey="label"
            valueKey="value"
            disabled={disabled}
          />
        </Box>
      </Box>
    </Box>
  );
};

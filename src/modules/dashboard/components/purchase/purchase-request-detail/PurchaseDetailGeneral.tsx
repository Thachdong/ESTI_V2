import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { branchs } from "src/api";
import { FormSelectAsync } from "~modules-core/components";

type TProps = {
  disabled: boolean;
}

export const PurchaseDetailGeneral: React.FC<TProps> = ({disabled}) => {
  const { control } = useFormContext();

  return (
    <Box className="flex flex-col mb-4">
      <Typography className="font-bold uppercase mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="bg-white grid grid-cols-2 rounded-sm flex-grow p-3">
        <FormSelectAsync
          fetcher={branchs.getList}
          controlProps={{
            name: "branchId",
            control,
            rules: { required: "Phải chọn chi nhánh" },
          }}
          label="Chọn chi nhánh:"
          labelKey="code"
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};

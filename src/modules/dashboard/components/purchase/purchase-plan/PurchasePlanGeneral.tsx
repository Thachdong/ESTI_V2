import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { branchs } from "src/api";
import { FormSelectAsync } from "~modules-core/components";

export const PurchasePlanGeneral: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Box className="mb-4">
      <Typography className="font-semibold text-sm mb-2">
        THÔNG TIN CHUNG
      </Typography>
      <Box className="grid grid-cols-2 gap-4">
        <FormSelectAsync
          fetcher={branchs.getList}
          controlProps={{
            name: "branchId",
            control,
            rules: { required: "Phải chọn chi nhánh" },
          }}
          label="Chọn chi nhánh:"
          labelKey="code"
        />
      </Box>
    </Box>
  );
};

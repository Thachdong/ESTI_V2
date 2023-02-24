import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  title: string;
  value: string;
};

export const PurchaseDetailNote: React.FC<TProps> = ({ title, value }) => {
  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">{title}</Typography>

      <Box className="bg-white grid gap-4 rounded flex-grow p-3">
        <FormInputBase
          label=""
          disabled={true}
          minRows={3}
          multiline
          value={value}
          shrinkLabel
        />
      </Box>
    </Box>
  );
};

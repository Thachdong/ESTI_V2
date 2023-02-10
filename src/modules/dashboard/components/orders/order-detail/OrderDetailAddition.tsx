import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInput } from "~modules-core/components";

export const OrderDetailAddition: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        YÊU CẦU BỔ SUNG
      </Typography>

      <Box className="grid gap-4 bg-white rounded-sm flex-grow p-3">
        <FormInput
          controlProps={{
            name: "requirements",
            control,
          }}
          label=""
          multiline
          minRows={3}
          shrinkLabel
        />
      </Box>
    </Box>
  );
};

import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInput } from "~modules-core/components";

type TProps = {
  disabled: boolean;
};

export const OrderDetailAddition: React.FC<TProps> = ({ disabled }) => {
  const { control } = useFormContext();

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        YÊU CẦU BỔ SUNG
      </Typography>

      <Box className="grid gap-4 bg-white rounded flex-grow p-3">
        <FormInput
          controlProps={{
            name: "requirements",
            control,
          }}
          label=""
          multiline
          minRows={3}
          shrinkLabel
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};

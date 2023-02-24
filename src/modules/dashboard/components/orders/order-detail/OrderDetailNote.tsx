import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInput } from "~modules-core/components";

type TProps = {
  disabled: boolean;
  title: string;
  controlName: string;
};

export const OrderDetailNote: React.FC<TProps> = ({
  disabled,
  title,
  controlName,
}) => {
  const { control } = useFormContext();

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        {title}
      </Typography>

      <Box className="bg-white grid gap-4 rounded flex-grow p-3">
        <FormInput
          controlProps={{
            name: controlName,
            control: control,
          }}
          label=""
          multiline
          minRows={3}
          disabled={disabled}
          shrinkLabel
        />
      </Box>
    </Box>
  );
};

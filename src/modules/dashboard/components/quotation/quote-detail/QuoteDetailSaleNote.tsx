import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInput } from "~modules-core/components";

type TProps = {
  disabled: boolean;
}

export const QuoteDetailSaleNote: React.FC<TProps> = ({disabled}) => {
  const { control } = useFormContext();

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
      SALE NOTE
      </Typography>

      <Box className="bg-white grid gap-4 rounded-sm flex-grow p-3">
        <FormInput
          controlProps={{
            name: "salesNote",
            control: control,
          }}
          label="Nhập sale note"
          multiline
          minRows={3}
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};

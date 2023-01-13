import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInput } from "~modules-core/components";

export const QuoteRequestDetailAttatch: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        File đính kèm
      </Typography>

      <Box className="bg-white grid gap-4 rounded-sm flex-grow p-3">
        <FormInput
          controlProps={{
            name: "attachFile",
            control: control,
            rules: { required: "Phải nhập người phụ trách" },
          }}
          label="Người phụ trách"
          type="file"
        />
      </Box>
    </Box>
  );
};

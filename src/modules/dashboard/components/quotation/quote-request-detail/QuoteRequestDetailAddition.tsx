import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { FormInput } from "~modules-core/components";

export const QuoteRequestDetailAddition: React.FC = () => {
  const { control } = useFormContext();

  const { id } = useRouter().query;

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        YÊU CẦU BỔ SUNG
      </Typography>

      <Box className="bg-white grid gap-4 rounded flex-grow p-3">
        <FormInput
          controlProps={{
            name: "requirements",
            control: control,
          }}
          label="Nhập yêu cầu bổ sung"
          multiline
          minRows={3}
          disabled={!!id}
          shrinkLabel
        />
      </Box>
    </Box>
  );
};

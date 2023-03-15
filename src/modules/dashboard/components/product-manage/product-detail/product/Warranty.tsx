import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormContext } from "react-hook-form";
import { FormInput, FormInputNumber } from "~modules-core/components";

export const Warranty: React.FC = () => {
  const disabled = false;

  const { control } = useFormContext();

  return (
    <Box className="mt-4">
      <Typography className="font-bold uppercase mb-3 text-sm">
        Thông tin bảo hành
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white shadow p-4">
        <FormInputNumber
          controlProps={{
            control,
            name: "warrantyMonth",
            rules: { required: "Phải nhập số tháng bảo hành" },
          }}
          label="Số tháng bảo hành"
          disabled={disabled}
        />

        <FormInput
          controlProps={{
            control,
            name: "warrantyAddress",
            rules: { required: "Phải nhập địa chỉ bảo hành" },
          }}
          label="Địa chỉ bảo hành"
          disabled={disabled}
        />

        <FormInput
          controlProps={{
            control,
            name: "warrantyContent",
            rules: { required: "Phải nhập nội dung bảo hành" },
          }}
          label="Nội dung bảo hành"
          disabled={disabled}
          multiline
          minRows={5}
          className="col-span-2"
        />
      </Box>
    </Box>
  );
};

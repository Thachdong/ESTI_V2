import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import {
  FormInput,
  FormSelect,
} from "~modules-core/components";
import { curatorDepartments } from "~modules-core/constance";

export const QuoteDetailContact: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        thông tin liên hệ
      </Typography>

      <Box className="bg-white rounded-sm flex-grow p-3">
        <FormInput
          controlProps={{
            name: "curatorName",
            control: control,
            rules: { required: "Phải nhập người phụ trách" },
          }}
          label="Người phụ trách"
          className="mb-4"
        />

        <FormSelect
          controlProps={{
            name: "curatorDepartmentId",
            control: control,
            rules: { required: "Phải chọn phòng ban" },
          }}
          options={curatorDepartments}
          label="Phòng ban"
          className="mb-4"
        />

        <FormInput
          controlProps={{
            name: "curatorPhone",
            control: control,
            rules: { required: "Phải nhập điện thoại" },
          }}
          label="Điện thoại"
          className="mb-4"
        />

        <FormInput
          controlProps={{
            name: "curatorEmail",
            control: control,
            rules: { required: "Phải nhập Email" },
          }}
          label="Email"
        />
      </Box>
    </Box>
  );
};

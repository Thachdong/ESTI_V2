import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInput, FormSelect } from "~modules-core/components";
import { curatorDepartments } from "~modules-core/constance";

export const OrderDetailCurator: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        THÔNG TIN LIÊN HỆ
      </Typography>

      <Box className="grid gap-4 bg-white rounded-sm flex-grow p-3">
        <FormSelect
          options={[]}
          controlProps={{
            name: "curatorId",
            control,
            rules: { required: "Phải chọn người phụ trách" },
          }}
          label="Người phụ trách"
          labelKey="fullName"
        />

        <FormSelect
          controlProps={{
            name: "curatorDepartmentId",
            control,
          }}
          label="Phòng ban:"
          options={curatorDepartments}
        />

        <FormInput
          controlProps={{
            name: "curatorPhone",
            control,
          }}
          label="Điện thoại:"
        />

        <FormInput
          controlProps={{
            name: "curatorEmail",
            control,
          }}
          label="Email:"
        />
      </Box>
    </Box>
  );
};

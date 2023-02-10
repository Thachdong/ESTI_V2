import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import {  FormSelect } from "~modules-core/components";

export const OrderDetailImplement: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        PHÂN CÔNG VIỆC
      </Typography>

      <Box className="bg-white rounded-sm flex-grow p-3">
        <FormSelect
          options={[]}
          controlProps={{
            name: "salesAdminId",
            control,
            rules: {required: "Phải chọn sale admin"}
          }}
          label="Sale admin:"
          labelKey="fullName"
          className="mb-4"
        />

        <FormSelect
          options={[]}
          controlProps={{
            name: "salesId",
            control,
            rules: {required: "Phải chọn sale"}
          }}
          label="Sale"
          labelKey="fullName"
          className="mb-4"
        />

        <FormSelect
          options={[]}
          controlProps={{
            name: "deliveryId",
            control,
            rules: {required: "Phải chọn giao nhận"}
          }}
          label="Giao nhận"
          labelKey="fullName"
        />
      </Box>
    </Box>
  );
};

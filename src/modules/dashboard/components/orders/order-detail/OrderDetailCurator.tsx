import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customer } from "src/api";
import { FormInput, FormSelect } from "~modules-core/components";
import { curatorDepartments } from "~modules-core/constance";

export const OrderDetailCurator: React.FC = () => {
  const { control, watch } = useFormContext();

  const { customerId } = watch();

  // DATA FETCHING
  const { data: customerDetail = [] } = useQuery(
    ["customerDetail", customerId],
    () => customer.getById(customerId).then((res) => res.data),
    {
      enabled: !!customerId,
    }
  );

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        THÔNG TIN LIÊN HỆ
      </Typography>

      <Box className="grid gap-4 bg-white rounded-sm flex-grow p-3">
        <FormSelect
          options={customerDetail?.curatorInfo}
          controlProps={{
            name: "curatorId",
            control,
            rules: { required: "Phải chọn người phụ trách" },
          }}
          label="Người phụ trách:"
          labelKey="curatorName"
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

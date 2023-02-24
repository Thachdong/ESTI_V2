import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customer } from "src/api";
import { FormInput, FormSelect } from "~modules-core/components";
import { curatorDepartments } from "~modules-core/constance";

type TProps = {
  disabled: boolean;
};

export const OrderDetailCurator: React.FC<TProps> = ({ disabled }) => {
  const { id } = useRouter().query;

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
      <Typography className="font-bold uppercase mb-3 text-sm">
        THÔNG TIN LIÊN HỆ
      </Typography>

      <Box className="grid gap-4 bg-white rounded flex-grow p-3">
        <FormSelect
          options={customerDetail?.curatorInfo}
          controlProps={{
            name: "curatorId",
            control,
            rules: { required: "Phải chọn người phụ trách" },
          }}
          label="Người phụ trách:"
          labelKey="curatorName"
          disabled={!!id}
        />

        <FormSelect
          controlProps={{
            name: "curatorDepartmentId",
            control,
          }}
          label="Phòng ban:"
          options={curatorDepartments}
          disabled={!!id}
        />

        <FormInput
          controlProps={{
            name: "curatorPhone",
            control,
          }}
          label="Điện thoại:"
          disabled={disabled}
        />

        <FormInput
          controlProps={{
            name: "curatorEmail",
            control,
          }}
          label="Email:"
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};

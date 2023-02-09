import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { FormInput, FormSelect } from "~modules-core/components";
import { curatorDepartments } from "~modules-core/constance";
import { customer as customerApi } from "src/api";
import { useEffect, useState } from "react";

type TProps = {
  disabled: boolean;
}

export const QuoteDetailContact: React.FC<TProps> = ({disabled}) => {
  const [curator, setCurator] = useState<any>();

  const { control, watch, setValue } = useFormContext();

  const { customerId, isQuoteRequest } = watch();

  // DATA FETCHING
  const { data } = useQuery(
    ["customerDetail_", customerId],
    () => customerApi.getById(customerId).then((res) => res.data),
    {
      enabled: !!customerId,
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    const { curatorName, curatorPhone, curatorEmail, curatorDepartment } =
      curator || {};

    setValue("curatorName", curatorName);

    setValue("curatorPhone", curatorPhone);

    setValue("curatorEmail", curatorEmail);

    setValue("curatorDepartmentId", curatorDepartment);
  }, [curator]);

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        thông tin liên hệ
      </Typography>

      <Box className="bg-white rounded-sm flex-grow p-3">
        <FormSelect
          controlProps={{
            name: "curatorId",
            control: control,
            rules: { required: "Phải chọn người liên hệ" },
          }}
          options={data?.curatorInfo || []}
          label="Người phụ trách"
          className="mb-4"
          labelKey="curatorName"
          callback={(opt: any) => setCurator(opt)}
          disabled={isQuoteRequest || disabled}
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
          disabled={isQuoteRequest || disabled}
        />

        <FormInput
          controlProps={{
            name: "curatorPhone",
            control: control,
            rules: { required: "Phải nhập điện thoại" },
          }}
          label="Điện thoại"
          className="mb-4"
          disabled={isQuoteRequest || disabled}
        />

        <FormInput
          controlProps={{
            name: "curatorEmail",
            control: control,
            rules: { required: "Phải nhập Email" },
          }}
          label="Email"
          className="mb-4"
          disabled={isQuoteRequest || disabled}
        />
      </Box>
    </Box>
  );
};

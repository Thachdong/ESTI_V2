import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { FormInput, FormSelect } from "~modules-core/components";
import { curatorDepartments } from "~modules-core/constance";
import { customer as customerApi } from "src/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type TProps = {
  disabled: boolean;
};

export const QuoteDetailContact: React.FC<TProps> = ({ disabled }) => {
  const [curator, setCurator] = useState<any>();

  const { id } = useRouter().query;

  const { control, watch, setValue } = useFormContext();

  const { customerId, isQuoteRequest, curatorId } = watch();

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
    if (!id && !!curator) {
      const { curatorName, curatorPhone, curatorEmail, curatorDepartment, receiverById } =
        curator || {};

      setValue("curatorName", curatorName);

      setValue("curatorPhone", curatorPhone);

      setValue("curatorEmail", curatorEmail);

      setValue("curatorDepartmentId", curatorDepartment);

      const {address} = receiverById || {};

      setValue("receiverAddress", address);
    }
  }, [curator, id]);

  useEffect(() => {
    const {curatorInfo = []} = data || {};

    const selectedCurator = curatorInfo.find((c: any) => c.id === curatorId);

    if (!selectedCurator && !id) {
      setValue("curatorName", "");

      setValue("curatorPhone", "");

      setValue("curatorEmail", "");

      setValue("curatorDepartmentId", "");

      setValue("receiverAddress", "");
    }
  }, [data, curatorId])

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        thông tin liên hệ
      </Typography>

      <Box className="bg-white rounded grid gap-3 p-3">
        <FormSelect
          controlProps={{
            name: "curatorId",
            control: control,
            rules: { required: "Phải chọn người liên hệ" },
          }}
          options={data?.curatorInfo || []}
          label="Người phụ trách"
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
          disabled={isQuoteRequest || disabled}
        />

        <FormInput
          controlProps={{
            name: "curatorPhone",
            control: control,
            rules: { required: "Phải nhập điện thoại" },
          }}
          label="Điện thoại"
          disabled={isQuoteRequest || disabled}
        />

        <FormInput
          controlProps={{
            name: "curatorEmail",
            control: control,
            rules: { required: "Phải nhập Email" },
          }}
          label="Email"
          disabled={isQuoteRequest || disabled}
        />
      </Box>
    </Box>
  );
};

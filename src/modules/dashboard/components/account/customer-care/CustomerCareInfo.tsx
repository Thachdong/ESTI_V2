import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customer as customerApi } from "src/api";
import {
  FormCustomer,
  FormInputBase,
  FormSelect,
} from "~modules-core/components";

type TProps = {
  disabled: boolean;
}

export const CustomerCareInfo: React.FC<TProps> = ({disabled}) => {
  const [curator, setCurator] = useState<any>();

  const { control, watch, setValue } = useFormContext();

  const { curatorId, customerId } = watch();

  const { data: customerDetail } = useQuery(
    ["CustomerDetail", customerId],
    () => customerApi.getById(customerId).then((res) => res.data),
    {
      enabled: !!customerId,
    }
  );

  const { companyInfo, curatorInfo } = customerDetail || {};

  useEffect(() => {
    setValue("curatorId", "");
  }, [customerId]);

  useEffect(() => {
    console.log(customerDetail, curatorId);
    
    if (!!curatorId) {
      setValue("curatorId", curatorId)
    }
  }, [customerDetail]);

  return (
    <Box className="col-span-2 grid grid-cols-2 gap-4">
      <Box className="">
        <Typography className="text-sm font-medium mb-3">
          THÔNG TIN KHÁCH HÀNG
        </Typography>

        <Box className="grid gap-3 rounded p-3 bg-white">
          <FormCustomer
            controlProps={{
              name: "customerId",
              control: control,
              rules: { required: "Phải chọn mã khách hàng" }
            }}
            disabled={disabled}
          />

          <FormInputBase
            value={customerId ? companyInfo?.address : ""}
            disabled={true}
            label="Địa chỉ:"
          />

          <FormInputBase
            value={customerId ? companyInfo?.taxCode : ""}
            disabled={true}
            label="Mã số thuế:"
          />

          <FormInputBase
            value={customerId ? companyInfo?.professionName : ""}
            disabled={true}
            label="Lĩnh vực KD:"
          />
        </Box>
      </Box>

      <Box className="">
        <Typography className="text-sm font-medium mb-3">
          THÔNG TIN LIÊN HỆ
        </Typography>

        <Box className="grid gap-3 rounded p-3 bg-white">
          <FormSelect
            controlProps={{
              name: "curatorId",
              control: control,
              rules: { required: "Phải chọn người liên hệ" },
            }}
            options={curatorInfo || []}
            label={"Người liên hệ:"}
            callback={(opt) => setCurator(opt)}
            labelKey="curatorName"
            disabled={disabled}
          />

          <FormInputBase
            value={curatorId ? curator?.curatorDepartmentName : ""}
            disabled={true}
            label="Phòng ban"
          />

          <FormInputBase
            value={curatorId ? curator?.curatorPhone : ""}
            disabled={true}
            label="Điện thoại"
          />

          <FormInputBase
            value={curatorId ? curator?.curatorEmail : ""}
            disabled={true}
            label="Email"
          />
        </Box>
      </Box>
    </Box>
  );
};

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customer } from "src/api";
import { FormCustomer, FormInputBase } from "~modules-core/components";

export const OrderDetailCustomer: React.FC = () => {
  const {id} = useRouter().query;

  const { control, watch, setValue } = useFormContext();

  const { customerId, notFromQuote, curatorId } = watch();

  const { data: customerDetail } = useQuery(
    ["customerDetail", customerId],
    () => customer.getById(customerId).then((res) => res.data),
    {
      enabled: !!customerId,
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    const { curatorInfo = [], companyInfo = {} } = customerDetail || {};

    const curator = curatorInfo.find((cur: any) => cur?.id === curatorId);

    const { paymentLimit, paymentType } = companyInfo;

    setValue("paymentLimit", paymentLimit);

    setValue("paymentType", paymentType);

    const { curatorDepartment, curatorPhone, curatorEmail, receiverById } =
      curator || {};

    setValue("curatorDepartmentId", curatorDepartment);

    setValue("curatorPhone", curatorPhone);

    setValue("curatorEmail", curatorEmail);

    const { fullName, phone1, address } = receiverById || {};

    setValue("receiverFullName", fullName);

    setValue("receiverPhone", phone1);

    setValue("receiverAddress", address);
  }, [customerDetail, curatorId]);

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        THÔNG TIN DOANH NGHIỆP
      </Typography>

      <Box className="grid gap-4 bg-white rounded-sm flex-grow p-3">
        <FormCustomer
          controlProps={{
            name: "customerId",
            control,
          }}
          label="Khách hàng:"
          disabled={!notFromQuote || !!id}
        />

        <FormInputBase
          label="Địa chỉ:"
          disabled
          value={customerDetail?.companyInfo?.address}
        />

        <FormInputBase
          label="Mã số thuế:"
          disabled
          value={customerDetail?.companyInfo?.taxCode}
        />

        <FormInputBase
          label="Lĩnh vực KD:"
          disabled
          value={customerDetail?.companyInfo?.professionName}
        />
      </Box>
    </Box>
  );
};

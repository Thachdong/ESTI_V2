import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customer } from "src/api";
import { FormCustomer, FormInputBase } from "~modules-core/components";

export const OrderDetailCustomer: React.FC = () => {
  const { id } = useRouter().query;

  const { control, watch, setValue } = useFormContext();

  const { customerId, notFromQuote, curatorId, defaultReceiver } = watch();

  const { data: customerDetail } = useQuery(
    ["customerDetail", customerId],
    () => customer.getById(customerId).then((res) => res.data),
    {
      enabled: !!customerId,
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    const { curatorInfo = [] } = customerDetail || {};

    const curator = curatorInfo.find((cur: any) => cur?.id === curatorId);

    const { curatorDepartment, curatorPhone, curatorEmail, receiverById } =
      curator || {};

    setValue("curatorDepartmentId", curatorDepartment);

    setValue("curatorPhone", curatorPhone);

    setValue("curatorEmail", curatorEmail);
  }, [customerDetail, curatorId, defaultReceiver]);

  useEffect(() => {
    if (!!defaultReceiver) {
      const { curatorInfo = [], companyInfo = {} } = customerDetail || {};

      const curator = curatorInfo.find((cur: any) => cur?.id === curatorId);

      const { receiverById } =
        curator || {};
      const { fullName, phone1, address } = receiverById || {};

      setValue("receiverFullName", fullName);

      setValue("receiverPhone", phone1);

      setValue("receiverAddress", address);

      const { paymentLimit, paymentType } = companyInfo;

      setValue("paymentLimit", paymentLimit);

      setValue("paymentType", paymentType);
    }
  }, [defaultReceiver, customerDetail]);

  const { address, taxCode, professionName } =
    customerDetail?.companyInfo || {};

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        THÔNG TIN DOANH NGHIỆP
      </Typography>

      <Box className="grid gap-4 bg-white rounded flex-grow p-3">
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
          value={customerId ? address : ""}
        />

        <FormInputBase
          label="Mã số thuế:"
          disabled
          value={customerId ? taxCode : ""}
        />

        <FormInputBase
          label="Lĩnh vực KD:"
          disabled
          value={customerId ? professionName : ""}
        />
      </Box>
    </Box>
  );
};

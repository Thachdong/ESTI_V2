import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customer as customerApi } from "src/api";
import {
  FormCustomer,
  FormInput,
  FormInputBase,
} from "~modules-core/components";

export const QuoteDetailCustomer: React.FC = () => {
  const [customer, setCustomer] = useState<any>();

  const { control, watch } = useFormContext();

  const { customerId, isQuoteRequest } = watch();

  // DATA FETCHING
  const { data } = useQuery(
    ["customerDetail_" + customerId],
    () => customerApi.getById(customerId).then((res) => res.data),
    {
      enabled: !!customerId,
    }
  );

  // SIDE EFFECT
  useEffect(() => {
    setCustomer(data?.companyInfo || {});
  }, [data]);

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        Thông tin doanh nghiệp
      </Typography>

      <Box className="flex-grow bg-white rounded-sm p-3">
        <FormCustomer
          controlProps={{
            name: "customerId",
            control: control,
            rules: { required: "Phải chọn mã khách hàng" },
          }}
          disabled={isQuoteRequest}
        />

        <FormInputBase
          label="Tên khách hàng"
          className="my-4"
          disabled
          value={customer?.name}
        />

        <FormInputBase
          label="Mã số thuế"
          className="mb-4"
          disabled
          value={customer?.taxCode}
        />

        <FormInputBase
          label="Địa chỉ khách hàng"
          className="mb-4"
          multiline
          minRows={2}
          disabled
          value={customer?.address}
        />
      </Box>
    </Box>
  );
};

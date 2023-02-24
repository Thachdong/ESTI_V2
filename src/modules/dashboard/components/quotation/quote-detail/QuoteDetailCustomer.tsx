import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customer as customerApi } from "src/api";
import { FormCustomer, FormInputBase } from "~modules-core/components";

type TProps = {
  disabled: boolean;
};

export const QuoteDetailCustomer: React.FC<TProps> = ({ disabled }) => {
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
      <Typography className="font-bold uppercase mb-3 text-sm">
        Thông tin doanh nghiệp
      </Typography>

      <Box className="grid gap-3 bg-white rounded p-3">
        <FormCustomer
          controlProps={{
            name: "customerId",
            control: control,
            rules: { required: "Phải chọn mã khách hàng" },
          }}
          disabled={isQuoteRequest || disabled}
        />

        <FormInputBase label="Mã số thuế" disabled value={customer?.taxCode} />

        <FormInputBase
          label="Địa chỉ khách hàng"
          multiline
          minRows={2}
          disabled
          value={customer?.address}
        />
      </Box>
    </Box>
  );
};

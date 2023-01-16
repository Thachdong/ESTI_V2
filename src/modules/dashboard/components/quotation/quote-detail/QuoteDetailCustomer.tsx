import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customer as customerApi } from "src/api";
import { FormCustomer, FormInput } from "~modules-core/components";

export const QuoteDetailCustomer: React.FC = () => {
  const { control, watch } = useFormContext();

  const customerId = watch("customerId");

  const customerAvailable = watch("customerAvailable");

  useQuery(
    ["customerDetail"],
    () =>
      customerApi.getById(customerId).then((res) => {
        const { companyInfo, curatorInfo } = res.data;

        const { name, taxCode, address } = companyInfo || {};
        console.log(companyInfo, curatorInfo);
      }),
    {
      enabled: !!customerId,
    }
  );

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
        />

        <FormInput
          controlProps={{
            name: "companyName",
            control: control,
            rules: { required: "Phải nhập tên khách hàng" },
          }}
          label="Tên khách hàng"
          className="my-4"
        />

        <FormInput
          controlProps={{
            name: "companyTaxCode",
            control: control,
            rules: { required: "Phải nhập mã số thuế" },
          }}
          label="Mã số thuế"
          className="mb-4"
        />

        <FormInput
          controlProps={{
            name: "companyAddress",
            control: control,
            rules: { required: "Phải nhập địa chỉ khách hàng" },
          }}
          label="Địa chỉ khách hàng"
          className="mb-4"
          multiline
          minRows={2}
        />

        <FormInput
          controlProps={{
            name: "receiverAdress",
            control: control,
            rules: { required: "Phải nhập địa chỉ nhận hàng" },
          }}
          label="Địa chỉ nhận hàng"
          multiline
          minRows={2}
        />
      </Box>
    </Box>
  );
};

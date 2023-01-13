import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { customer } from "src/api";
import { FormInput, FormSelectAsync } from "~modules-core/components";

export const QuoteRequestDetailCustomer: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Box>
      <Typography className="font-bold uppercase mb-3">
        Thông tin doanh nghiệp
      </Typography>

      <Box className="bg-white grid gap-4 rounded-sm p-3">
        <FormSelectAsync
          label="Mã khách hàng"
          controlProps={{
            name: "customerId",
            control: control,
            rules: { required: "Phải chọn mã khách hàng" },
          }}
          fetcher={customer.getList}
          labelKey="branchCode"
        />

        <FormInput
          controlProps={{
            name: "companyName",
            control: control,
            rules: { required: "Phải nhập tên khách hàng" },
          }}
          label="Tên khách hàng"
        />

        <FormInput
          controlProps={{
            name: "companyTaxCode",
            control: control,
            rules: { required: "Phải nhập mã số thuế" },
          }}
          label="Mã số thuế"
        />

        <FormInput
          controlProps={{
            name: "companyAddress",
            control: control,
            rules: { required: "Phải nhập địa chỉ khách hàng" },
          }}
          label="Địa chỉ khách hàng"
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

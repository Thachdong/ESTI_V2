import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customer as customerApi } from "src/api";
import { FormCustomer, FormInput } from "~modules-core/components";

export const QuoteRequestDetailCustomer: React.FC = () => {
  const { control, watch, reset, setValue } = useFormContext();

  const customerId = watch("customerId");

  const customerAvailable = watch("customerAvailable");

  useQuery(
    ["customerDetail", customerId],
    () =>
      customerApi.getById(customerId).then((res) => {
        const { companyInfo, curatorInfo = [] } = res.data;

        console.log(curatorInfo);
        

        const { name, taxCode, address } = companyInfo || {};

        setValue("companyName", name);

        setValue("companyTaxCode", taxCode);

        setValue("companyAddress", address);

        const {curatorName, curatorDepartment, curatorPhone, curatorEmail, id, receiverById} = curatorInfo[0] || {};

        setValue("curatorName", curatorName);

        setValue("curatorDepartmentId", curatorDepartment);

        setValue("curatorPhone", curatorPhone);

        setValue("curatorEmail", curatorEmail);

        setValue("curatorId", id);

        setValue("receiverAdress", receiverById?.address);
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
        {customerAvailable && (
          <FormCustomer
            controlProps={{
              name: "customerId",
              control: control,
              rules: { required: "Phải chọn mã khách hàng" },
            }}
          />
        )}

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

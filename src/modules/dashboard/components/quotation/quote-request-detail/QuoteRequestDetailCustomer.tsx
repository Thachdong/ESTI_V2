import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customer as customerApi } from "src/api";
import { FormCustomer, FormInput } from "~modules-core/components";

type TProps = {
  disabled: boolean;
};

export const QuoteRequestDetailCustomer: React.FC<TProps> = ({ disabled }) => {
  const { control, watch, setValue } = useFormContext();

  const { id } = useRouter().query;

  const { customerId, customerAvailable } = watch();

  let initCustomerInfo = {};

  if (!!id && !customerId) {
    const {
      companyAddress,
      companyName,
      companyTaxCode,
      curatorDepartmentId,
      curatorEmail,
      curatorName,
      curatorPhone,
      receiverAddress,
    } = watch();

    initCustomerInfo = {
      companyName: companyName,
      taxCode: companyTaxCode,
      address: companyAddress,
      curatorCreate: [
        {
          curatorName: curatorName,
          curatorDepartment: curatorDepartmentId,
          curatorPhone: curatorPhone,
          curatorEmail: curatorEmail,
          curatorAddress: receiverAddress,
        },
      ],
    };
  }

  const { data } = useQuery(
    ["customerDetail", customerId],
    () => customerApi.getById(customerId).then((res) => res.data),
    {
      enabled: !!customerId,
    }
  );

  useEffect(() => {
    const { companyInfo, customer } = data || {};

    const { name, taxCode, address } = companyInfo || {};

    setValue("companyName", name);

    setValue("companyTaxCode", taxCode);

    setValue("companyAddress", address);

    const { salesId } = customer || {};

    setValue("salesId", salesId);
  }, [data]);

  const renderCustomerTag = useCallback(() => {
    if (!!id || customerAvailable) {
      return (
        <Box className="">
          <FormCustomer
            controlProps={{
              name: "customerId",
              control: control,
              rules: { required: "Phải chọn mã khách hàng" },
            }}
            disabled={disabled}
            defaultValue={initCustomerInfo}
            onAddCallback={(createdId: any) => setValue("customerId", createdId)}
          />
        </Box>
      );
    }

    if (!id && !customerId) {
      return (
        <FormInput
          controlProps={{
            name: "customerCode",
            control: control,
          }}
          label="Mã khách hàng:"
          className=""
          disabled={disabled}
        />
      );
    }
  }, [customerAvailable, id, disabled]);

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        Thông tin doanh nghiệp
      </Typography>

      <Box className="grid gap-3 bg-white rounded p-3">
        {renderCustomerTag()}

        <FormInput
          controlProps={{
            name: "companyName",
            control: control,
            rules: { required: "Phải nhập tên khách hàng" },
          }}
          label="Tên khách hàng:"
          disabled={!!id}
        />

        <FormInput
          controlProps={{
            name: "companyTaxCode",
            control: control,
            rules: { required: "Phải nhập mã số thuế" },
          }}
          label="Mã số thuế:"
          disabled={!!id}
        />

        <FormInput
          controlProps={{
            name: "companyAddress",
            control: control,
            rules: { required: "Phải nhập địa chỉ khách hàng" },
          }}
          label="Địa chỉ khách hàng:"
          multiline
          minRows={2}
          disabled={!!id}
        />

        <FormInput
          controlProps={{
            name: "receiverAddress",
            control: control,
            rules: { required: "Phải nhập địa chỉ nhận hàng" },
          }}
          label="Địa chỉ nhận hàng:"
          multiline
          minRows={2}
          disabled={!!id}
        />
      </Box>
    </Box>
  );
};

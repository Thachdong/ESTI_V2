import { Box } from "@mui/material";
import { useCallback } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customerType } from "src/api/customer-type";
import { FormInput, FormSelect } from "~modules-core/components";
import {
  accountTypeOptions,
  curatorDepartments,
  discountTypeOptions,
  genderData,
} from "~modules-core/constance";

type TProps = {
  isDisable: boolean;
  index: number;
};

export const CustomersCurator: React.FC<TProps> = ({ isDisable, index }) => {
  const { control: accountGroupControl, watch: accountGroupWatch } = useForm();

  const accountGroup = accountGroupWatch("accountGroup");

  const { control } = useFormContext();

  useFieldArray({
    control,
    name: "curatorCreate",
  });

  const { data: customerTypeOptions = [] } = useQuery(
    ["CustomerTypesList"],
    () => customerType.getAll().then((res) => res.data)
  );

  const renderDiscountTypeOptions = useCallback(
    (discountTypeOptions: any[]) => {
      if (accountGroup === 1) {
        return discountTypeOptions.slice(1, 3);
      }

      if (accountGroup === 2) {
        return [{ ...discountTypeOptions[0] }];
      }

      return [];
    },
    [accountGroup]
  );

  const renderCustomerTypeOptions = useCallback(
    (customerTypeOptions: any[]) => {
      return customerTypeOptions.filter(
        (type) => type?.accountType === accountGroup
      );
    },
    [accountGroup]
  );

  return (
    <>
      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-4 mb-4"
      >
        <legend>Thông tin tài khoản:</legend>

        <FormInput
          controlProps={{
            control,
            name: `curatorCreate.${index}.userName`,
            rules: { required: "Phải nhập tên tài khoản" },
          }}
          label="Tên tài khoản"
          disabled={isDisable}
          shrinkLabel
        />

        <FormSelect
          controlProps={{
            control: accountGroupControl,
            name: "accountGroup",
            rules: { required: "Phải chọn nhóm tài khoản" },
          }}
          options={accountTypeOptions}
          label="Nhóm tài khoản"
          disabled={isDisable}
          shrinkLabel
        />

        <FormSelect
          controlProps={{
            control,
            name: `curatorCreate.${index}.typeAccount`,
            rules: { required: "Phải chọn loại tài khoản" },
          }}
          options={renderCustomerTypeOptions(customerTypeOptions)}
          label="Loại tài khoản"
          disabled={isDisable || !accountGroup}
          shrinkLabel
          labelKey="levelName"
        />

        <FormSelect
          controlProps={{
            control,
            name: `curatorCreate.${index}.typeDiscount`,
            rules: { required: "Phải chọn loại chiết khấu" },
          }}
          options={renderDiscountTypeOptions(discountTypeOptions)}
          label="Loại chiết khấu"
          disabled={isDisable || !accountGroup}
          shrinkLabel
        />
      </Box>

      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-4 mb-4"
      >
        <legend>Thông tin người liên hệ:</legend>

        <FormInput
          controlProps={{
            control,
            name: `curatorCreate.${index}.curatorName`,
            rules: { required: "Phải nhập tên người liên hệ" },
          }}
          label="Tên người liên hệ"
          disabled={isDisable}
          shrinkLabel
        />

        <FormSelect
          options={curatorDepartments}
          controlProps={{
            control,
            name: `curatorCreate.${index}.curatorDepartment`,
            rules: { required: "Phải chọn phòng ban" },
          }}
          label="Phòng ban"
          disabled={isDisable}
          shrinkLabel
        />

        <FormSelect
          options={genderData}
          controlProps={{
            control,
            name: `curatorCreate.${index}.curatorGender`,
            rules: { required: "Phải chọn giới tính" },
          }}
          label="Giới tính"
          disabled={isDisable}
          shrinkLabel
        />

        <FormInput
          controlProps={{
            control,
            name: `curatorCreate.${index}.curatorPhone`,
            rules: { required: "Phải nhập số điện thoại" },
          }}
          label="Số điện thoại"
          disabled={isDisable}
          shrinkLabel
        />

        <FormInput
          controlProps={{
            control,
            name: `curatorCreate.${index}.curatorEmail`,
          }}
          label="Email"
          required={false}
          disabled={isDisable}
          shrinkLabel
        />

        <FormInput
          controlProps={{
            control,
            name: `curatorCreate.${index}.curatorAddress`,
            rules: { required: "Phải nhập địa chỉ" },
          }}
          label="Địa chỉ"
          multiline
          minRows={3}
          disabled={isDisable}
          className="col-span-2"
          shrinkLabel
        />
      </Box>
    </>
  );
};

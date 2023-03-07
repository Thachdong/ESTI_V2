import { Box } from "@mui/material";
import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customerType } from "src/api/customer-type";
import {
  FormDatepicker,
  FormInput,
  FormSelect,
} from "~modules-core/components";
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

export const CustomerDetailCurator: React.FC<TProps> = ({
  isDisable,
  index,
}) => {
  const { control, watch } = useFormContext();

  const accountType = watch(`contacts[${index}].accountType`);

  useFieldArray({
    control,
    name: "contacts",
  });

  const { data: customerTypeOptions = [] } = useQuery(
    ["CustomerTypesList"],
    () => customerType.getAll().then((res) => res.data)
  );

  const renderDiscountTypeOptions = useCallback(
    (discountTypeOptions: any[]) => {
      if (accountType === 1) {
        return discountTypeOptions.slice(1, 3);
      }

      if (accountType === 2) {
        return [{ ...discountTypeOptions[0] }];
      }

      return [];
    },
    [accountType]
  );

  const renderCustomerTypeOptions = useCallback(
    (customerTypeOptions: any[]) => {
      return customerTypeOptions.filter(
        (type) => type?.accountType === accountType
      );
    },
    [accountType]
  );

  return (
    <>
      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-3 mb-4"
      >
        <legend>Thông tin tài khoản:</legend>

        <FormInput
          controlProps={{
            control,
            name: `contacts.${index}.userName`,
            rules: { required: "Phải nhập tên tài khoản" },
          }}
          label="Tên tài khoản"
          disabled={isDisable}
        />

        <FormSelect
          controlProps={{
            control,
            name: `contacts.${index}.accountType`,
            rules: { required: "Phải chọn nhóm tài khoản" },
          }}
          options={accountTypeOptions}
          label="Nhóm tài khoản"
          disabled={isDisable}
        />

        <FormSelect
          controlProps={{
            control,
            name: `contacts.${index}.typeAccount`,
            rules: { required: "Phải chọn loại tài khoản" },
          }}
          options={renderCustomerTypeOptions(customerTypeOptions)}
          label="Loại tài khoản"
          disabled={isDisable || !accountType}
          labelKey="levelName"
        />

        <FormSelect
          controlProps={{
            control,
            name: `contacts.${index}.typeDiscount`,
            rules: { required: "Phải chọn loại chiết khấu" },
          }}
          options={renderDiscountTypeOptions(discountTypeOptions)}
          label="Loại chiết khấu"
          disabled={isDisable || !accountType}
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
            name: `contacts.${index}.curatorName`,
            rules: { required: "Phải nhập tên người liên hệ" },
          }}
          label="Tên người liên hệ"
          disabled={isDisable}
        />

        <FormSelect
          options={curatorDepartments}
          controlProps={{
            control,
            name: `contacts.${index}.curatorDepartment`,
            rules: { required: "Phải chọn phòng ban" },
          }}
          label="Phòng ban"
          disabled={isDisable}
        />

        <FormDatepicker
          controlProps={{
            control,
            name: `contacts.${index}.birthDay`,
            rules: { required: "Phải chọn ngày sinh" },
          }}
          label="Ngày sinh"
          disabled={isDisable}
        />

        <FormSelect
          options={genderData}
          controlProps={{
            control,
            name: `contacts.${index}.curatorGender`,
            rules: { required: "Phải chọn giới tính" },
          }}
          label="Giới tính"
          disabled={isDisable}
        />

        <FormInput
          controlProps={{
            control,
            name: `contacts.${index}.curatorPhone`,
            rules: { required: "Phải nhập số điện thoại" },
          }}
          label="Số điện thoại"
          disabled={isDisable}
        />

        <FormInput
          controlProps={{
            control,
            name: `contacts.${index}.curatorEmail`,
          }}
          label="Email"
          required={false}
          disabled={isDisable}
        />

        <FormInput
          controlProps={{
            control,
            name: `contacts.${index}.zaloNumber`,
          }}
          label="Tài khoản Zalo"
          required={false}
          disabled={isDisable}
        />

        <FormInput
          controlProps={{
            control,
            name: `contacts.${index}.curatorAddress`,
            rules: { required: "Phải nhập địa chỉ" },
          }}
          label="Địa chỉ"
          multiline
          minRows={3}
          disabled={isDisable}
          className="col-span-2"
        />
      </Box>
    </>
  );
};

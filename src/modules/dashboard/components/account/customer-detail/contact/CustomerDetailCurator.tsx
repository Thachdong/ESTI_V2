import { Box } from "@mui/material";
import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { curator, customer } from "src/api";
import { customerType } from "src/api/customer-type";
import {
  BaseButton,
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
import { toast } from "~modules-core/toast";

type TProps = {
  isDisable: boolean;
  index: number;
  refetch: () => void;
};

export const CustomerDetailCurator: React.FC<TProps> = ({
  isDisable,
  index,
  refetch,
}) => {
  const { control, watch } = useFormContext();

  const contactDetails = watch(`contacts[${index}]`);

  const { accountType, id, userName } = contactDetails || {};

  useFieldArray({
    control,
    name: "contacts",
  });

  // DATA FETCHING
  const { data: customerTypeOptions = [] } = useQuery(
    ["CustomerTypesList"],
    () => customerType.getAll().then((res) => res.data)
  );

  // METHODS
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

  const mutationDelete = useMutation((id: string) => curator.delete(id), {
    onSuccess: (data: any) => {
      toast.success(data?.resultMessage);

      refetch();
    },
  });

  const handleDelete = useCallback(async () => {
    if (confirm("Xác nhận xóa: " + userName)) {
      await mutationDelete.mutateAsync(id);
    }
  }, [userName, id]);

  const mutateUpdate = useMutation((id: string) => customer.resetPassword(id), {
    onSuccess: (data: any) => {
      toast.success(data?.resultMessage);
    },
  });

  const handleRessetPassword = useCallback(async () => {
    if (confirm("Xác nhận cấp lại mật khẩu tài khoản: " + userName)) {
      await mutateUpdate.mutateAsync(id);
    }
  }, [id, userName]);

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

        <Box className="col-span-2 flex items-center justify-end">
          <BaseButton onClick={handleRessetPassword} className="mr-3">
            Cấp lại mật khẩu
          </BaseButton>
          <BaseButton onClick={handleDelete} className="!bg-main-1">
            Xóa khách hàng
          </BaseButton>
        </Box>
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

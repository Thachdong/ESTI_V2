import { Box } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInput } from "~modules-core/components";

type TProps = {
  isDisable: boolean;
  index: number;
};

export const CustomerDetailCuratorBill: React.FC<TProps> = ({
  isDisable,
  index,
}) => {
  const { control } = useFormContext();

  useFieldArray({
    control,
    name: "contacts",
  });

  return (
    <Box
      component="fieldset"
      className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-3 mb-3"
    >
      <legend>Thông tin hóa đơn:</legend>

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.fullName`,
          rules: { required: "Phải nhập họ tên người nhận hóa đơn" },
        }}
        label="Họ tên người nhận hóa đơn"
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.email`,
        }}
        label="Email"
        required={false}
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.phone`,
          rules: { required: "Phải nhập số điện thoại" },
        }}
        label="Số điện thoại 1"
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.address`,
          rules: { required: "Phải nhập địa chỉ" },
        }}
        label="Địa chỉ"
        multiline
        minRows={1}
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.note`,
        }}
        label="Ghi chú"
        multiline
        minRows={2}
        disabled={isDisable}
      />
    </Box>
  );
};

import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInput } from "~modules-core/components";

type TProps = {
  isDisable: boolean;
  index: number;
};

export const CustomerDetailReceiver: React.FC<TProps> = ({
  isDisable,
  index,
}) => {
  const { control, watch, setValue } = useFormContext();

  useFieldArray({
    control,
    name: "contacts",
  });

  return (
    <Box
      component="fieldset"
      className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-3 mb-3"
    >
      <legend>Thông tin người nhận hàng:</legend>

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.receiverName`,
          rules: { required: "Phải nhập họ tên người nhận hàng" },
        }}
        label="Họ tên người nhận hàng"
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.receiverEmail`,
        }}
        label="Email"
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.phone1`,
          rules: { required: "Phải nhập số điện thoại 1" },
        }}
        label="Số điện thoại 1"
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.phone2`,
          rules: { required: "Phải nhập số điện thoại 2" },
        }}
        label="Số điện thoại 2"
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.receiverAddress`,
          rules: { required: "Phải nhập địa chỉ" },
        }}
        label="Địa chỉ"
        multiline
        minRows={3}
        disabled={isDisable}
      />
      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.receiverNote`,
          rules: undefined,
        }}
        label="Ghi chú"
        multiline
        minRows={3}
        disabled={isDisable}
      />
    </Box>
  );
};

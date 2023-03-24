import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInput } from "~modules-core/components";

type TProps = {
  index: number;
  type: string;
};

export const CustomersReceiver: React.FC<TProps> = ({
  index,
  type,
}) => {
  const [defaultValue, setDefaultValue] = useState(true);

  const { control, watch, setValue } = useFormContext();

  useFieldArray({
    control,
    name: "contacts",
  });

  const {
    curatorAddress,
    curatorEmail,
    curatorPhone,
    curatorName,
    curatorNote,
  } = watch("contacts")[index];

  useEffect(() => {
    if (defaultValue && type === "Add") {
      setValue(`contacts.${index}.receiverName`, curatorName);
      setValue(`contacts.${index}.receiverPhone1`, curatorPhone);
      setValue(`contacts.${index}.receiverEmail`, curatorEmail);
      setValue(`contacts.${index}.receiverAddress`, curatorAddress);
      setValue(`contacts.${index}.receiverNote`, curatorNote);
    }
  }, [
    type,
    defaultValue,
    curatorAddress,
    curatorEmail,
    curatorPhone,
    curatorName,
    curatorNote,
  ]);

  return (
    <Box
      component="fieldset"
      className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-3 mb-3"
    >
      <legend>Thông tin người nhận hàng:</legend>

      {type === "Add" && (
        <FormControlLabel
          control={<Checkbox size="small" />}
          label="Cùng thông tin người liên hệ"
          className="col-span-2"
          value={defaultValue}
          onChange={(e: any) => setDefaultValue(e.target.checked)}
          checked={defaultValue}
        />
      )}

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.receiverName`,
          rules: { required: "Phải nhập họ tên người nhận hàng" },
        }}
        label="Họ tên người nhận hàng"
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.receiverEmail`,
        }}
        label="Email"
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.receiverPhone1`,
          rules: { required: "Phải nhập số điện thoại 1" },
        }}
        label="Số điện thoại 1"
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: `contacts.${index}.receiverPhone2`,
        }}
        label="Số điện thoại 2"
        shrinkLabel
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
        shrinkLabel
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
        shrinkLabel
      />
    </Box>
  );
};
